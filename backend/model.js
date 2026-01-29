const mongoose = require ('mongoose')
const schema= new mongoose.Schema({
    username:{type:String, required:true}, // the variables name usewd here should be the same while storing the username in register 
    password : {type:String, required:true},
    email : {type:String, required:true},
    wallets:[
        {
            address:String,
            chain:String,
            label:String
        }
    ]
})

const userdetails=  mongoose.model('userdetails',schema)
module.exports=userdetails;