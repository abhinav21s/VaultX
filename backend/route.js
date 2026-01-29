const express = require('express')
const route = express.Router();
const  {register,login, userdetails, connectwallet} = require('./controller.js')
const {authenticate} = require("./middleware.js")
route.post('/register',register)
route.post('/login',login)
route.get('/userdetails',authenticate,userdetails)
route.post('/connectwallet',authenticate,connectwallet)

module.exports=route;