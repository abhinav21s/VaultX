const express = require('express')
const route = express.Router();
const  {register,login, userdetails, connectwallet,getwallet, deletewallet} = require('./controller.js')
const {authenticate} = require("./middleware.js")
route.post('/register',register)
route.post('/login',login)
route.get('/userdetails',authenticate,userdetails)
route.post('/connectwallet',authenticate,connectwallet)
route.get('/getwallet',authenticate,getwallet)
route.delete('/deletewallet',authenticate,deletewallet)
module.exports=route;