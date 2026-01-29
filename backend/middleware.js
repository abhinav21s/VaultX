const jwt = require('jsonwebtoken')
require("./env.js")
exports.authenticate=(req,res,next)=>{
           
  try { 
    const header=req.headers.authorization;
    console.log(header)
    if(!header){
        return res.status(404).json({message:"Token not provided"})
    }
    const token=header.split(" ")[1]

    const decoded=jwt.verify(token,process.env.JWTKEY)
   console.log(decoded)
     req.user=decoded;

    next()
}

catch(err){
    res.json({message:"Server Error",
        error:err.message
    })
}
}