const mongoose = require('mongoose')

const file = new mongoose.Schema({

    fileName :{
        type:String,
        required:true
    },
    Algorithm:{
        type:String,
        required:true
    },



},{collection:"File"})

module.exports = mongoose.model("File",file)