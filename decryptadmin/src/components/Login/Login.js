import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import logo from '../../assets/images/logo.png'; 
import { adminlogin } from '../../apiService';
import {useToast} from "@chakra-ui/toast";




export const Login = () => {


  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
 

  const navigate = useNavigate();
  const toast = useToast()

  const signin = async() =>{
    

    console.log("user mail and password : ", userEmail, userPassword);
  // let loginResult = await adminlogin(userEmail,userPassword)
  
   try {

    let loginResult = await adminlogin(userEmail,userPassword)
    console.log("result is----->", loginResult);
    navigate('/dashboard')
    // toast ({title: "Admin Login successful", status:"success", duration:2000, position:"top", isClosable: true,})
    // setTimeout(function(){window.location.reload()}, 100);
      
  }
  
   catch(error){
    console.log("error ----->",error);
    toast ({title: error, status:"error", position:"top", duration:2000, isClosable: true,})
    // setTimeout(function(){window.location.reload()}, 2000);
    // alert(error)
   }

 
  
  
    // console.log("result is ---->", loginResult) 
    // if(loginResult && loginResult.length>0){
    //   navigate('/');
    //   toast ({title: "successfully Login", status:"success", position:"top"})
    //   // window.location.reload()  
    // }

    }


  return (

     
    <div className='login_div'>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={ logo } alt="logo"/>
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light mb-2">Sign in to continue.</h6>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field mb-3">
                    <Form.Control type="email" name="email" onChange={(e)=>{setUserEmail(e.target.value)}} placeholder="Username" className="border-radius-0" />
                  </Form.Group>
                  <Form.Group className="d-flex search-field mb-3">
                    <Form.Control type="password" name="password" onChange={(e)=>{setUserPassword(e.target.value)}} placeholder="Password" className="border-radius-0"  />
                  </Form.Group>
                  {/* <div className="mt-3">
                    <a href='#' className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" 
                    onClick={signin}>SIGN IN</a>
                  </div> */}
                  <div className="d-flex mt-4">
                    <button type='button' className="btn btn-block btn_yellow border-radius-0 btn-lg font-weight-medium auth-form-btn" 
                    onClick={signin}>SIGN IN</button>
                  </div>
                  {/* <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">Forgot password?</a>
                  </div> */}
                  {/* <div className="mb-2">
                    <button type="button" className="btn btn-block btn-primary auth-form-btn">
                      <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                    </button>
                  </div>*/}
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/user-pages/register" className="text-primary">Create</Link>
                  </div> 
                </Form>
              </div>
            </div>
          </div>
       
        </div>  
       </div>
  )
}

