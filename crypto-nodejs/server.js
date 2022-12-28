const cors = require('cors')
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
var CryptoJS = require("crypto-js");
const filess = require('fs')
app.use(cors());
app.use(express.static('public'))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))


//========= IMPORT ROUTERS ========================= //
const userRouter = require('./src/routes/user.router')
const uploadRouter = require('./src/routes/fileUpload.router')

//========= USE ROUTERS =========================== //
app.use('/',uploadRouter)
app.use('/user',userRouter)


//================= DATABASE CONNECTION ============= //
mongoose.connect('mongodb+srv://testUser:asGn9ADDsAqhy19h@cluster0.drgk4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',()=>{
    console.log("Database Connected")
})



//================= MIDDLEWARE USEAGE ============= //
app.listen(3000 , ()=>{
    console.log("Server running on port 3000")
})

// app.post('/encrypt' , (req , res)=>{
//     let Getkey = ""
//     const {fileName,key} = req.body
//     Getkey = key
//     const value = filess.readFileSync('./public/'+fileName,'utf8');
//     var encrypted = CryptoJS.AES.encrypt(value,Getkey);
//     const data = filess.writeFileSync('./public/'+fileName,encrypted.toString())

// })