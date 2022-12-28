import React from 'react'
import { Tab } from 'semantic-ui-react'
import FileUpload  from './fileUploadComponent'
import FileList from './fileList'
const panes = [
  {
    menuItem: 'File Encryption',
    render: () => <FileUpload/>,
  },
  {
    menuItem: 'File Decryption',
    render: () =><FileList /> ,
  },
]

const TabExampleSecondaryPointing = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
)

export default TabExampleSecondaryPointing