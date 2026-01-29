const mongoose =require('mongoose')
require("./env.js")
const connectdb=()=>{
      try{
        mongoose.connect(process.env.MONGOURL)
        console.log("Connection Successfull");
      }
      catch{
        console.log(`Error occured ${err.messsage}`)
      }
}

module.exports=connectdb;
