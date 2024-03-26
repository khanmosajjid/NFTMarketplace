import { navigate } from '@reach/router';
import React, { useState } from 'react';
// import { Collapse } from 'react-bootstrap';
import {  NavLink } from "react-router-dom";
import face1 from '../../assets/images/avatar5.jpg';
// import {useToast} from "@chakra-ui/toast"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useToast } from '@chakra-ui/toast';



const Sidebar = () => {

  const toast = useToast()
  
  const Signout = () =>{
     
    // confirmAlert({
    //   title: 'Are You Sure',
    //   message: 'You Want to Logout This Account',
    //   buttons: [
    //     {
    //       label: 'Yes',
    //       onClick: () => alert('Confirm')
    //     },
    //     {
    //       label: 'No',
    //       onClick: () => alert('Confirm')
    //     }
    //   ]
    // });
   
  
    
    
    let storage = sessionStorage.clear();
    console.log("ss is----->", sessionStorage)
    if(storage == null){
      window.location.href = "/"
      // setTimeout(function(){window.location.reload()}, 100);
      
    } 
    
  }

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <a href="!#" className="nav-link" onClick={evt =>evt.preventDefault()}>
            <div className="nav-profile-image">
              <img src={face1} alt="profile" />
              <span className="login-status online"></span> {/* change to offline or busy as needed */}
            </div>
            <div className="nav-profile-text">
              <span className="font-weight-bold mb-2">Admin</span>
              {/* <span className="text-secondary text-small">Project Manager</span> */}
            </div>
            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
          </a>
        </li>
        <li className="nav-item">
          <NavLink to={"/dashboard"} className="text-decoration-none text-light nav-link" activeclassname="active-link">
            <span className="menu-title">Dashboard</span>
            <i className="mdi mdi-home menu-icon"></i>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/user"} className="text-decoration-none text-light nav-link" activeclassname="active-link">
            <span className="menu-title">User</span>
            <i className="mdi mdi-contacts menu-icon"></i>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/nfts"} className="text-decoration-none text-light nav-link" activeclassname="active-link">
            <span className="menu-title">NFTs</span>
            <i className="mdi mdi-crosshairs-gps menu-icon"></i>
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink to={"/NewsLetterPage"} className="text-decoration-none text-light nav-link" activeclassname="active-link">
            <span className="menu-title">Newsletter Emails</span>
            <i className="mdi mdi-email-open menu-icon"></i>
          </NavLink>
        </li> */}
        {/* <li className="nav-item">
          <NavLink to={"/user"} className="text-decoration-none text-light nav-link" activeclassname="active-link">
            <span className="menu-title">CMS Management</span>
            <i className="mdi mdi-file-multiple menu-icon"></i>
          </NavLink>
        </li> */}
        {/* <li className="nav-item">
          <NavLink to={"/faqs"} className="text-decoration-none text-light nav-link" activeclassname="active-link">
            <span className="menu-title">FAQs</span>
            <i className="mdi mdi-plus-circle menu-icon"></i>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/allfaqs"} className="text-decoration-none text-light nav-link" activeclassname="active-link">
            <span className="menu-title">All FAQs</span>
            <i className="mdi mdi-plus-circle menu-icon"></i>
          </NavLink>
        </li> */}
        {/* <li className="nav-item">
          <NavLink to={"/user"} className="text-decoration-none text-light nav-link" activeclassname="active-link">
            <span className="menu-title">Banners</span>
            <i className="mdi mdi-account-card-details menu-icon"></i>
          </NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink to={"/banners"} className="text-decoration-none text-light nav-link" activeclassname="active-link">
            <span className="menu-title">Add Banners</span>
            <i className="mdi mdi-briefcase-upload menu-icon"></i>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/allbanners"} className="text-decoration-none text-light nav-link" activeclassname="active-link">
            <span className="menu-title">All Banners</span>
            <i className="mdi mdi-check-all menu-icon"></i>
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink to={"/category"} className="text-decoration-none text-light nav-link" activeclassname="active-link">
            <span className="menu-title">Category</span>
            <i className="mdi mdi-check-all menu-icon"></i>
          </NavLink>
        </li> */}
        <li className="nav-item">
          
          {/* <NavLink to={"/"} className="text-decoration-none text-light nav-link" activeclassname="active-link">
            <span className="menu-title">Login</span>
            
            <i className="mdi mdi-check-all menu-icon"></i>
          </NavLink> */}
          <a href='' className="text-decoration-none text-light nav-link" onClick={Signout}>
          <span className="menu-title">Logout</span>
           <i className="mdi mdi-check-all menu-icon"></i>
          {/* <button className="text-decoration-none text-light nav-link" onClick={Signout}>
          <span className="menu-title">Logout</span>
          <i className="mdi mdi-check-all menu-icon"></i>
          </button> */}
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
