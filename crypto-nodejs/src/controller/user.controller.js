const userModal = require('../modal/user.modal')
const jwt = require('jsonwebtoken')
userRegister = async ( req ,res )=>{
      const { email,password} = req.body
        try{

            const user = await userModal.create({"password":password,"email":email})
            if(user){
                res.send({sucess:true})
            }else{
                res.send({sucess:false})
            }
        }
        catch(err){
            res.send({err:err})
        }
   
     
}
passwordBycrypt =(password)=>{
   
}

userLogin = async ( req ,res )=>{
    const {email , password} = req.body
    //====== create token ======= //   
    const finduser = await userModal.findOne({email:email,password:password})
    if(finduser){
        const token =  jwt.sign({_id:finduser._id},"U2FsdGVkX18+NzJ/NCxqqi+mRF8lOXO2LrE0y4HH9fuUL");
        res.status(200).send({token:token})
    }
    else{
        res.status(404).send({err:"User Not Found"})
    }


}

module.exports ={
    userRegister,
    userLogin

}