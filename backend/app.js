const express = require('express')
const connectdb=require('./db.js')
const route=require("./route.js")
const cors = require("cors")
const app = express();

app.use(express.json())
app.use(cors())
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running"
  })
})

app.get('/',(req,res)=>{
    res.send("Server Running")
})
app.use("/cypher",route)
connectdb();


app.listen(3000,()=>{
    console.log("Server started")
})