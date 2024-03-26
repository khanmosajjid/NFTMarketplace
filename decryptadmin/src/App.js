// import logo from './logo.svg';
import './App.css';
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
// import DashboardPage from './pages/DashboardPage';
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Users from './components/Users/Users';
import NFTs from './components/NFTs/NFTs';
import NewsletterEmails from './components/NewsletterEmails/NewsletterEmails';
import FAQs from './components/FAQs/FAQs';
import AllFAQs from './components/AllFAQs/AllFAQs';
import AddBanners from './components/AddBanners/AddBanners';
import AllBanners from './components/AllBanners/AllBanners';
import Footer from './components/Footer/Footer';
import Category from './components/Category/Category';
import { Login } from './components/Login/Login';

// import { useState } from 'react';


function App() {

  
  let res = sessionStorage.getItem('Authorization')
  console.log("res is --------->", res);
  
   
  return (
   
              <div className="App">
                <div className="container-scroller"> 

                <Routes>
                   
                  <Route path="/dashboard" element={ <Dashboard /> } />
                  <Route path="/user" element={ <Users /> } />
                  <Route path="/nfts" element={ <NFTs /> } />
                  <Route path="/banners" element={ <AddBanners />} />
                  <Route path="/allbanners" element={ <AllBanners />} />
                  <Route path="/" element={<Login/> }/>

                </Routes>
               
 
                 {/* <Routes>
                   <Route path="/" element={<Login/> }/>
                 </Routes> */}
               
                   
              
            {/* <div className="main-panel"> */}
              {/* <div className="content-wrapper"> */}
            
             
                {/* <Routes>  
                  <Route path="/" element={ <Dashboard /> } />
                  <Route path="/user" element={ <Users /> } />
                  <Route path="/nfts" element={ <NFTs /> } /> */}
                  {/* <Route path="/newsletterpage" element={ <NewsletterEmails />} /> */}
                  {/* <Route path="/faqs" element={ <FAQs />} /> */}
                  {/* <Route path="/allfaqs" element={ <AllFAQs />} /> */}
                  {/* <Route path="/banners" element={ <AddBanners />} />
                  <Route path="/allbanners" element={ <AllBanners />} /> */}
                  {/* <Footer /> */}
                
                  {/* <Route path="/" element={<Login/> }/> */}
                  {/* <Footer /> */}
                {/* </Routes> */}

               {/* <Footer />   */}
           
         </div>
       </div>
   
  );
}

export default App;














//////////////////////////////////////////


// let urlVar = window.location.href
  // let isUrl = urlVar.includes("/login");

 {/* { isUrl == true ? 
      <></>
      :
       <Navbar /> 
      
      } */}
          {/* <Navbar /> */}
          {/* <div className="container-fluid page-body-wrapper"> */}
         
          {/* { isUrl == true ? 
            <>
            </>
            :
            <Sidebar /> 
           
            } */}
            {/* <Sidebar /> */}

             
            
            {/* <div className="main-panel">
              <div className="content-wrapper"> */}
                
                // <Routes>  
                //   <Route path="/" element={ <Dashboard /> } />
                //   <Route path="/user" element={ <Users /> } />
                //   <Route path="/nfts" element={ <NFTs /> } />
                  {/* <Route path="/newsletterpage" element={ <NewsletterEmails />} /> */}
                  // <Route path="/faqs" element={ <FAQs />} />
                  // <Route path="/allfaqs" element={ <AllFAQs />} />
                  // <Route path="/banners" element={ <AddBanners />} />
                  // <Route path="/allbanners" element={ <AllBanners />} />
                  {/* <Route path="/category" element={ <Category />} /> */}
                  // <Route path="/login" element={<Login/> }/>
              //   </Routes>
              // </div>
              {/* <Footer /> */}
            // </div>
         
      //   </div>
      // </div>
   
//   );
// }

// export default App;

 
