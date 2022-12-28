import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
//import FileUpload from '../src/Components/fileUploadComponent'
import { Routes ,Route ,BrowserRouter} from 'react-router-dom';
import Login from '../src/Components/Authentication/login'
import SignUp from '../src/Components/Authentication/signup'
import TabExampleSecondaryPointing from '../src/Components/NavBar'

ReactDOM.render(
  
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/signUp' element={<SignUp/>} />
            <Route path='/' element={<TabExampleSecondaryPointing/>} />
            {/* <Login />
            <TabExampleSecondaryPointing/> */}
        </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
  ,
  document.getElementById('root')
);
reportWebVitals();
