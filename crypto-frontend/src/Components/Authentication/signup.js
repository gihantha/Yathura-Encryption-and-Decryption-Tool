import { Form ,Button} from 'semantic-ui-react'
import React from 'react'
import axios from 'axios';
import { createBrowserHistory } from 'history'
import { UseHistory } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
const SignUp =()=> {
    //const location = useLocation();
    
    const [email, setemail] = React.useState("")
    const [password, setpassword] = React.useState("")
    const [error, seterror] = React.useState(false)
    const history =  createBrowserHistory()
    const navigate = useNavigate();

    const OnchangeEmailName=(e)=>{
        setemail(e.target.value)
    }


    const OnchangePassword =(e)=>{
        setpassword(e.target.value)
    }

    const onSubmit = async()=>{
        const res = await axios.post('http://localhost:3000/user/signup',{"email":email,"password":password});
        if(res){
            if(res.data.sucess){
                alert("Registerd Succuss")
                navigate('/login')
                
            }
            else{
                alert("Something went wrong")
            }
        }
        else{
            seterror(true)
        }
    }
  
    if(error){
        alert("Login Faild")
    }
    return(
     
        <div className="Signup" style={{width:"40%"}}>
            
               <h1>Signup</h1>
              <Form>
                         
                <Form.Input fluid label='Enter Email' type="email" placeholder='Enter Email' onChange={OnchangeEmailName} />                
                <Form.Input fluid label='Enter Password' type="password" placeholder='Enter password' onChange={OnchangePassword}  />
                        
                <Button primary onClick={onSubmit}>Sign Up</Button>
                    
              </Form>
              

        </div>
   )
 
   
   

}
export default SignUp;