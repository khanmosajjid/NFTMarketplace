import React,{useState,useEffect} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { getFAQsData } from '../../apiService';
import { navigate } from '@reach/router';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

const AllFAQs = () => {

  let res = sessionStorage.getItem("Authorization")
  console.log("res is -------->", res)
  if(res == null){
    window.location.href = '/'
    // setTimeout(function(){window.location.reload()}, 100);
  }
  
  const [faqData,setFaqData]=useState()
  const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
  
  useEffect(()=>{
    async function getFaqsData(){{
      let data=await getFAQsData()
      console.log("faq data is--->",data,typeof data,data.length)
      if(data){
        setFaqData(data)
      }
       
    }}
    getFaqsData()
  },[])
  
  return (
    <div className='row'>
    <div className="container-scroller"> 
    <Navbar /> 
    
  <div className="container-fluid page-body-wrapper">
  <Sidebar/>
  <div className='main-panel'>
    <div className="content-wrapper">
      
        <Accordion defaultActiveKey="0">
        {faqData&&faqData.length>0?faqData.map((data,key)=>(
          <Accordion.Item eventKey={key} className='mb-3'>
          <Accordion.Header className='btn btn-gradient-primary btn-lg btn-block text-left p-0 mb-0'>{data.oFAQs_data.sQuestion}</Accordion.Header>
          <Accordion.Body className='p-4 card-description'>
             {renderHTML(data.oFAQs_data.sAnswer)}
          </Accordion.Body>
        </Accordion.Item>
        )):"Loading"}
          
        
        </Accordion>
      </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default AllFAQs
