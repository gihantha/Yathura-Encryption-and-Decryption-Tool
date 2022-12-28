import { Form ,Button} from 'semantic-ui-react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const Login =()=> {
    const location = useLocation();
    const [email, setemail] = React.useState("")
    const [password, setpassword] = React.useState("")
    const [error, seterror] = React.useState(false)
    const Navigate = useNavigate()


    const OnchangeEmailName=(e)=>{
        setemail(e.target.value)
    }


    const OnchangePassword =(e)=>{
        setpassword(e.target.value)
    }

    const onSubmit = async()=>{
        const res = await axios.post('http://localhost:3000/user/login',{"email":email,"password":password});
        if(res.data.token){
            alert(res.data.token)
            localStorage.setItem('token',res.data.token)
            Navigate('/')
            
        }
        else{
            seterror(true)
            alert("Login Faild")
            Navigate('/login')
        }
    }
   if(location.pathname === '/login'){
    if(error){
        alert("Login Faild")
    }
    return(
     
        <div className="login" style={{width:"40%"}}>
            
               <h1>Login</h1>
              <Form>
                         
                <Form.Input fluid label='Email' type="email" placeholder='Enter Email' onChange={OnchangeEmailName} />                
                <Form.Input fluid label='Email' type="password" placeholder='Enter password' onChange={OnchangePassword}  />
                        
                <Button primary onClick={onSubmit}>Login</Button>
                    
              </Form>
              

        </div>
   )
   }
   
   

}
export default Login;