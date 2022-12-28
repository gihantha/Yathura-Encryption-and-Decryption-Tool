import axios from 'axios'
import React from 'react'
import Select from 'react-select'
import { Button} from 'semantic-ui-react'
import {Input } from 'semantic-ui-react'
import { Modal } from 'semantic-ui-react'
import { createBrowserHistory } from 'history'
import '../css/fileupload.css'

 const FileUpload =()=> {
    const [open, setOpen] = React.useState(false)
    const [file,setFile] = React.useState("")
    const [option , setOption] = React.useState("")

     React.useEffect(() => {
       
         if(localStorage.getItem('token') === null){
          createBrowserHistory().push('/login')
         }
         else{
          createBrowserHistory().push('/')
         }
     }, [])



    const options = [
       
        { key: 'DES', text: 'DES', label: 'DES' },
        { key: 'AES', text: 'AES', label: 'AES' },
      ]
    const onFilechangeHandler =(e)=>{
        
        setFile(e.target.files[0])
        
        
    }
    const onOptionHandler =(e)=>{
        setOption(e.text)
    }
    const  onSubmit = async (e) =>{
        const token = localStorage.getItem('token')
        const formData = new FormData()
        formData.append("option",option )
        formData.append("file",file)

        const res = await axios.post('http://localhost:3000/upload',formData,{ headers: {
          'Authorization': `${token}`
        }});

        if(res.data.success){
            setOpen(true)
        }

   
      
    } 
    const download = async()=>{
      const res = await axios.post('http://localhost:3000/',{});
      console.log(res.data)
      //fileDownload(res.data,"text.txt")
   }
    if(localStorage.getItem('token') != null){
      return (
    
        <div className="App" >
           
            <center><h1>Secure File Upload</h1></center>
            <div style={{marginLeft: "30%",marginTop:"5%",width:"40%",padding:"12px"}}>
            <Input
            label={
                "FILE"
            }
            labelPosition='right'
            type="file"
            onChange={onFilechangeHandler}
            placeholder='Find domain'
        />
         <div className="select" style={{marginTop:"12px",width:"30%"}}>
            <Select   options={options} onChange={onOptionHandler}  />
         </div>
         <div className="btn" style={{marginTop:"10%"}}>
         <Button onClick={onSubmit} positive>Upload File and Key Generate</Button>
         
         </div>
        </div>
            <Modal
          centered={false}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          
        >
          <Modal.Header> Uploaded SuccussFully !</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              Your File Upload Succussfully , Please find The Key your Email 
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setOpen(false)}>OK</Button>
          </Modal.Actions>
        </Modal>
    
        </div>
        
      );

    }
    else{
       return(
         <div className="invalid">
               <h1>404 Page Not Found</h1>

         </div>
       );
    }
 


}

export default FileUpload;
