const express= require('express')
const  {z} = require('zod')
const userdetails=require('./model.js')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const app = express();
require("./env.js")

exports.register = async (req,res)=>{
    try{
        const format=z.object({
            username : z.string(),
            password : z.string(),
            email : z.string().email()
        })

        const username=req.body.username;
        const password=req.body.password;
        const email=req.body.email;
        
        const user={
            username:username,
            password:password,
            email:email
        }
        const inputverify=format.safeParse(user)

        if(!inputverify.success){
            return res.status(400).json({message:"Invalid input format"})
        }
        const existinguser= await userdetails.findOne({email})
        if(existinguser){
            return res.status(400).json({message:"User already exists"})
        }
        const hashpass = await bcrypt.hash(password,10)//whay await used here ?
        const userd = new userdetails({
              username,
              password:hashpass,
              email
        })

       await userd.save(); // in await the cotrol will go the next function will not stay in the same function so console will print only sfter the await
       console.log("User Registered successfully")
       res.json({message:"user registered succesfully"})
       
    }
    catch(err){
        res.json({message:"Server Error",
           error:err.message
    })
    }
}

exports.login=async (req,res)=>{
    try
    {
        const email = req.body.email;
    const password = req.body.password;

    const user=await userdetails.findOne({email})//this returns the entire document of that username including the email and te password
    if(!user){
       return res.status(401).json({message:"Email not found"})
        
    }
    const verifypass= await bcrypt.compare(password,user.password)
    
   
    if(!verifypass){
       return res.status(401).json({message:"Password is incorrect"})
        
    }

    const jtkey = process.env.JWTKEY;

    const jtoken = jwt.sign({username:user.username,userId:user._id},
        jtkey,
    {expiresIn:"1d"})
    res.json({message:"Successfully loged in ",
        token:jtoken
    })
    
}

catch(err)
{
    res.json({message:"Server Error",
        error:err.message
    })
}


}

exports.userdetails=(req,res)=>{
    console.log(req.user)
    res.json({
        userid:req.user.userId,
        username:req.user.username
    })
}


exports.connectwallet=async (req,res)=>{
   try{
     const {address,chain,label} = req.body;
    
     const user = await userdetails.findById(req.user.userId)

     if(!user){
        return res.status(404).json({message:"User not found"})
     }

     const existingwallet =  user.wallets.find(
        w=>w.address.toLowerCase() === address.toLowerCase()
     )
     if(existingwallet){
         existingwallet.chain=chain
         existingwallet.label=label
     }
     else{
        user.wallets.push({
            address,
            chain,
            label
        })
       
     }

     await user.save()
      res.json({message:"Wallet Added Successfully"})   
   }
   catch(err){
    res.json({message:"Server Error",
        error:err.message
    })
   }

}

exports.getwallet=async (req,res)=>{
   try {
    const user = await userdetails.findById(req.user.userId);
    if(!user){
       return res.status(404).json({message:"User not found"})
    }
    
    res.json({wallet:user.wallets})
}

catch(err) {
     res.json({message:"Server Error",
        error:err.message
     })
}
    
}

exports.deletewallet = async (req, res) => {
  try {
    const { address } = req.body
    const userId = req.user.userId

    console.log("=== DELETE WALLET DEBUG ===")
    console.log("User ID:", userId)
    console.log("Address to delete:", address)

    if (!address) {
      return res.status(400).json({ message: "Wallet address required" })
    }

    const user = await userdetails.findById(userId)
    
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    console.log("Wallets before delete:", user.wallets.length)

    // ✅ MANUALLY filter out the wallet (case-insensitive)
    const normalizedAddress = address.toLowerCase()
    user.wallets = user.wallets.filter(
      w => w.address.toLowerCase() !== normalizedAddress
    )

    console.log("Wallets after filter:", user.wallets.length)

    // ✅ Save the updated user
    await user.save()

    console.log("=== DELETE SUCCESSFUL ===")

    res.json({ 
      success: true, 
      message: "Wallet deleted successfully",
      wallets: user.wallets
    })

  } catch (error) {
    console.error("❌ Delete wallet error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}