const express = require('express')
const app = express.Router()
const userController = require('../controller/user.controller')


//REGISTER USER POST METHOD
app.post('/signup',userController.userRegister)

//USER LOGIN
app.post('/login',userController.userLogin)

module.exports = app



