const express = require('express')
const multer = require('multer')
const fileUploadController = require('../controller/fileUpload.controller')
const path = require("path");
const app = express.Router();


const storage = multer.diskStorage({
    destination:'./public',
    filename: function(req,file,cb){
        console.log(file.originalname)
        cb(null,file.originalname)

    }
})

const upload = multer({
    storage:storage,
    limits:{fieldSize:100000}
})

app.post('/upload',upload.single('file'),fileUploadController.fileUpload)


app.get('/getAllFiles',fileUploadController.getAllFiles)

app.post('/download/',fileUploadController.dowloadFile)

module.exports = app