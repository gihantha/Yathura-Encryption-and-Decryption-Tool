const filess = require('fs')
var rand = require("random-key");
var CryptoJS = require("crypto-js");
const fileModal = require('../modal/File.modal');
const jwt = require('jsonwebtoken')
const userModal = require('../modal/user.modal')

//file upload

fileUpload = async (req,res) =>{
    
    const token = req.headers.authorization
    //verfy currunt user
    const user = await jwt.verify(token,"U2FsdGVkX18+NzJ/NCxqqi+mRF8lOXO2LrE0y4HH9fuUL");
    console.log(user._id)
    let userEmail = ""
    //get user email
    if(user){
        const users = await userModal.findOne({_id:user._id});
        userEmail = users.email
        console.log(userEmail)
    }

    if(userEmail){
        
        const value = filess.readFileSync('./public/'+req.file.originalname,'utf8');
    
        //key generator
        const key = hashKeyGenerator()
        const isSent = SendHashKeyToMail(key,req.file.originalname,userEmail)
    
        if(isSent){
            if(req.body.option === "DES"){
                /// ================ encrypt data with des =================== ///
                var encrypted = CryptoJS.DES.encrypt(value,key); 
                const data = filess.writeFileSync('./public/'+req.file.originalname,encrypted.toString())
              
    
                /// =============== save to the database ==================== ///
              const savedFile = await fileModal.create({fileName:req.file.originalname,Algorithm:"DES"})
              if(savedFile){
                    res.send({success:true})
              }
              else{
                res.send({success:false})
              }
            
            }
            else if(req.body.option === "AES"){
                /// ================ encrypt data with aes =================== ///
                var encrypted = CryptoJS.AES.encrypt(value,key);
                const data = filess.writeFileSync('./public/'+req.file.originalname,encrypted.toString())
                
    
    
                /// =============== save to the database ==================== ///
                const savedFile = await fileModal.create({fileName:req.file.originalname,Algorithm:"AES"})
                if(savedFile){
                      res.send({success:true})
                }
                else{
                  res.send({success:false})
                }
    
            }
    
           // var decrypted = CryptoJS.AES.decrypt(encrypted, "12345555555");
           // var object = decrypted.toString(CryptoJS.enc.Utf8);
           // console.log(object);
            //res.send({success:true})
    
        }
        else{
            res.send("Something went wrong !")
        }

    }
    else{
        res.send({success:false})
    }



},

getAllFiles = async (req, res)=>{

    const fileList = await fileModal.find();
    if(fileList){
        res.send(fileList)
    }
    else{
        res.send({succuss:false})
    }

}

dowloadFile = async(req , res)=>{
    try{
        let Getkey = ""
        console.log(req.body)
        const {fileName,key} = req.body
        Getkey = key
        const value = filess.readFileSync('./public/'+fileName,'utf8');
        //get algorithem
        const findFile = await fileModal.findOne({fileName:fileName})
        console.log(findFile.Algorithm)

        if(findFile.Algorithm === "AES"){
            var decrypted = CryptoJS.AES.decrypt(value,Getkey);
            var object = decrypted.toString(CryptoJS.enc.Utf8);

            if(object.toString()){
                //filess.writeFileSync('./public/'+fileName,object.toString())
                res.send({content:object.toString(),fileName:fileName})
            }   
            else{
                res.send("error")
            }

        }
        else if(findFile.Algorithm === "DES"){
            var decrypted = CryptoJS.DES.decrypt(value,Getkey);
            var object = decrypted.toString(CryptoJS.enc.Utf8);

            if(object.toString()){
                //filess.writeFileSync('./public/'+fileName,object.toString())
                res.send({content:object.toString(),fileName:fileName})
            }   
            else{
                res.send("error")
            }

        }

    }
    catch(err){
        console.log(err)
        res.send("error")
    }
    
}


hashKeyGenerator = () =>{
     //console.log(rand.generateBase30(20))
     return rand.generateBase30(20)
}

SendHashKeyToMail =async(key,filename,email)=>{
   
    try{
        const nodemailer = require("nodemailer");
        let transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:'gihantha01@gmail.com', 
                pass:'gihantha582027',
            },
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from:'siriwardanahdth@gmail.com', // sender address
            to: `${email}`, // list of receivers
            subject: "Hash key", // Subject line
            text: `Your Hash Code For the ${filename} is ${key}`, // plain text body
        
        });
        if(info.messageId){
            console.log("Message sent: %s", info.messageId);
            return true
        }
        else{
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            return false
        }
          

    }catch(err){
        console.log(err)
    }

      
}


module.exports = {
    fileUpload,
    getAllFiles,
    dowloadFile
}