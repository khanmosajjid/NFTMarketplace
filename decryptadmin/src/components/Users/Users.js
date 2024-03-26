import React, { useState, useEffect } from 'react';
import { getUsers } from '../../helpers/getterFunctions';
import {toggleUserStatus} from "../../apiService"
import { useToast } from '@chakra-ui/toast';
import { Pagination } from "@material-ui/lab";
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';


const Users = () => {
  // const inventorys = []
  const [contacts, setContacts] = useState([]);
  const [searchText,setSearchText]=useState();

   const [currPage, setCurrPage] = useState(1);
   const perPageCount = 10;
   const [totalPages, setTotalPages] = useState(1);

  const toast = useToast();


  let res = sessionStorage.getItem("Authorization")
  console.log("res is -------->", res)
  if(res == null){
    window.location.href = "/"
    // setTimeout(function(){window.location.reload()}, 100);
  }
 

  useEffect(()=>{
   
    let searchData ={
      length: perPageCount,
      start:(currPage-1)*perPageCount,
      sTextsearch: '',
      sSellingType: '',
      sSortingType: 'Recently Added',
    
    };
    
    async function getAllUsers(){
      let userData = await getUsers(searchData)
      // console.log("userData in user section------->",userData,userData.recordsTotal)
      setContacts(userData?.data);
      
      let totalpage=Math.ceil(userData.recordsTotal / perPageCount);
      console.log("total pages is",totalpage)
      setTotalPages(totalpage);
     
    }

    getAllUsers()
  },[currPage])

  //const handleNext = async () =>{
    
  //    searchData.length = searchData.length * perPageCount;
  //    await getAllUsers(searchData);

  //}


  //const handleChangeAddForm = (e) => {
  //  e.preventDefault();
  //  //setAllValue({...allValues, [e.target.name]: e.target.value});
  //  // console.log(allValues);
  //}

  //const handleClickAddForm = (e) => {
  //  e.preventDefault();
    
  //   console.log("contact is----->",contacts)

  //  const unique_id = nanoid();

  //  const newcontact = {
  //    id: unique_id,
  //    //username: allValues.username,
  //    //address: allValues.address,
  //    //status: allValues.status,
  //  }

  //  const newcontacts = [...contacts, newcontact];
 
  //  setContacts(newcontacts);
  //  // console.log(newcontacts);

  //}

  //const handleDelete = (e) => {
  //  e.preventDefault();
  //  const row = [...contacts];
  //  row.splice(e,1);
  //  setContacts(row);
  //  // window.location.reload();
  //}

  useEffect(() => {
    localStorage.setItem('Contacts', JSON.stringify(contacts));
  }, [contacts]);

   const handleChangePage = (e,p) => {
     setCurrPage(p);
     console.log("p is ---->",p);
   };
  

  return (
    <div className="container-scroller"> 
      <Navbar /> 

    <div className="container-fluid page-body-wrapper">
      <Sidebar/>
    <div className='main-panel'>
    <div className="content-wrapper">
            {/* <div className="card mb-5">
               <div className="card-body">
                <form className="forms-sample">
                  <h1>{allValues}</h1>
                  <Form.Group className='form-group'>
                    <label htmlFor="exampleInputusername1">Username</label>
                    <Form.Control type="text" id="exampleInputusername1" placeholder="Username" size="lg" name="username" onChange={handleChangeAddForm}  />
                  </Form.Group>
                  <Form.Group className='form-group'>
                    <label htmlFor="exampleInputEmail1">Address</label>
                    <Form.Control type="text" id="exampleInputusername1" placeholder="Address" size="lg" name="address" onChange={handleChangeAddForm} />
                  </Form.Group>
                  <Form.Group className='form-group'>
                    <label htmlFor="exampleSelectGender">Status</label>
                    <select className="form-control" name="Status" defaultValue="Select Pending"  onChange={handleChangeAddForm} >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inprogress">Inprogress</option>
                    </select>
                  </Form.Group>
                  <button type="submit" className="btn btn-gradient-primary mr-2" onClick={handleClickAddForm}>Submit</button>
                  <button className="btn btn-light">Cancel</button>
                </form>

                
              </div>
            </div> */}
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Users</h4>
                <div className="form-inline justify-content-end mb-3">
                    <div className="input-group">
                        <input placeholder="Wallet Address" 
                        aria-label="Recipient' username" aria-describedby="basic-addon2" 
                        type="text" className="form-control form-control"
                         onChange={async(e)=>{
                        
                          
                          let searchData ={
                            length: perPageCount,
                            start:(currPage-1)*perPageCount,
                            sTextsearch: e.target.value,
                            sSellingType: '',
                            sSortingType: 'Recently Added',
                            
                          };
                          let userData=await getUsers(searchData)
                          setContacts(userData.data);
                          
  
                        }}
                         />
                        {/* <div className="input-group-append">
                            <button className="btn btn-sm btn-gradient-primary" type="button" onClick={async()=>{
                              console.log("search text is---->",searchText)
                              //searchData.sTextsearch=searchText;
                              //console.log("sarch data  is--->",searchData)
                              let searchDataaa= {
                                length: 12,
                                start: 0,
                                sTextsearch:e.target.value,
                                sSellingType: '',
                                sSortingType: 'Recently Added'
                              };
                              let userData=await getUsers(searchDataaa)
                                
                                setContacts(userData)
                            
                              
                            }}>Search</button>
                        </div> */}
                    </div>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody> 
                      {contacts?
                        contacts.map((item,key) => (
                          <tr key={key}>
                            <td>{item.sUserName?item.sUserName:"Test"}</td>
                            <td>{item.sWalletAddress}</td>
                            <td><label className="badge badge-danger">{item.sStatus}</label></td>
                            
                            {item.sStatus==="active"?
                            <><td>
                            <button type="button" data-bs-toggle="tooltip" title="Blocked user " className="btn btn-gradient-primary btn-rounded btn-icon mr-2" onClick={async()=>{
                              let res=await toggleUserStatus(item._id,"blocked")
                              console.log("response is--->",res)
                              // alert(res.message);
                              toast({ title:res.message, status:"success", position:"top",duration:800, isClosable:true,})
                              setTimeout(function(){window.location.reload()}, 800);
                              
                            }}>
                                <i className="mdi mdi-block-helper"></i>
                            </button>
                            <button onClick={async()=>{
                              let res=await toggleUserStatus(item._id,"deactivated")
                              // alert(res.message);
                              toast({ title:res.message, status:"success", position:"top",duration:800, isClosable:true, })
                              setTimeout(function(){window.location.reload()}, 800);
                              
    
                            }} type="button" className="btn btn-gradient-primary btn-rounded btn-icon" data-bs-toggle="tooltip" title="Deactivated">
                                <i className="mdi mdi-delete"></i>
                            </button>
                        </td></>:<><td>
                                <button type="button" data-bs-toggle="tooltip" title="Unblocked User" className="btn btn-gradient-primary btn-rounded btn-icon mr-2" onClick={async()=>{
                                  let res=await toggleUserStatus(item._id,"active")
                                  // alert(res.message);
                                   toast({ title:res.message, status:"success", position:"top", duration:800, isClosable:true,})
                                   setTimeout(function(){window.location.reload()}, 800);
                                  
                                }}>
                                    <i className="mdi mdi-checkbox-marked-circle-outline"></i>
                                </button>

                            </td></>}

                          </tr>
                          )
                        )
                        :"No User Found"
                      }
                    </tbody>
                  </table>  
                  
                   </div>
                   <div className="">
                    
                
                 
               
                            {totalPages >= 1 ? 
                             <Pagination
                              count={totalPages}
                              size="large"
                              page={currPage}
                              variant="outlined"
                              shape="rounded"
                              onChange={handleChangePage}                              
                              />
                              : 
                              console.log("Hello pagination")
                             }
                </div>
                </div>
                
                      
              </div>
            </div>
           </div>
        </div>      
            <Footer/>
      </div>
  )
}

export default Users
