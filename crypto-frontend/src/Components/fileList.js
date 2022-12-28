import axios from 'axios'
import React from 'react'
import fileDownload from 'js-file-download'
import { Modal ,Button,Form} from 'semantic-ui-react'
import { Icon, Table } from 'semantic-ui-react'
const FileList = ()=> {
   
    const [key, setKey] = React.useState("")
    const [fileName, setfileName] = React.useState("")
    const [fileList, setfileList] = React.useState([])
    const [open, setOpen] = React.useState(false)
    React.useEffect(() => {
        //api call
        axios.get('http://localhost:3000/getAllFiles').then((res)=>{
            setfileList(res.data)
            //console.log(fileList[0].fileName)

        }).catch((err)=>{
            console.log(err)
        })
    }, [])

    const DownLoadFile = async(e)=>{
            
            axios.post('http://localhost:3000/download',{fileName:fileName,key:key}).then((res)=>{
                console.log(res.data)
                if(res.data.fileName){
                    fileDownload(res.data.content,res.data.fileName)
                }
                else{
                    alert("Invalid Key ")
                }
                

            }).catch((err)=>{

            })
    }
    const Onchangekey =(e)=>{
        setKey(e.target.value)

    }
    return(
     
        <div className="file" style={{width:"60%", marginLeft:"20%"}}>
            <h1>Enctypted Files</h1>

          
              <Table celled striped>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>All Encrypted Files</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    {fileList.map((file)=>{
                       
                        return(
                           
                            <Table.Body>
                            <Table.Row>
                                
                                <Table.Cell collapsing>
                                <Icon name='folder' /> {file.fileName}
                                </Table.Cell>
                                <Table.Cell>Encrypted {file.fileName}</Table.Cell>
        
                                <Table.Cell collapsing textAlign='right'>
                                 <button onClick={()=>{
                                    
                                     setfileName(file.fileName)
                                     setOpen(true)
                                 }}>Download</button>
                                </Table.Cell>
                            </Table.Row>
            
                            </Table.Body>
                            
                        )
                })}
                         


               
             
  </Table>
  <Modal
      centered={false}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      
    >
      <Modal.Header>Enter Hash Key for DownLoad {fileName} File</Modal.Header>
      <Modal.Content>
        <Modal.Description>
        <Form>
            <Form.Input fluid label='EnTer Hash key' type="email" placeholder='Enter Email' onChange={Onchangekey} />                                             
        </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={DownLoadFile}>Download File</Button>
      </Modal.Actions>
    </Modal>
              

        </div>
        

        
   )
   }
   
   


export default FileList;