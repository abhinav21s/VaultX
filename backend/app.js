const express = require('express')
const connectdb=require('./db.js')
const route=require("./route.js")
const cors = require("cors")
const app = express();
app.use(express.json())
app.use(cors())
app.use("/cypher",route)
connectdb();

app.listen(3000,()=>{
    console.log("Server started")
})