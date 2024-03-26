import React, { useState, useEffect } from 'react';
import { getNftList } from '../../helpers/getterFunctions';
import { toggleNFTStatus } from '../../apiService';
import { useToast } from '@chakra-ui/toast';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { Pagination } from "@material-ui/lab";
import Footer from '../Footer/Footer';
// import { Navigate, useNavigate } from 'react-router-dom';


const NFTs = () => {

  const [nftList, setNftList] = useState()
  const [msg, setMsg] = useState(true)
  const [close, SetClose] = useState(true)
  const [nftData, setNftData] = useState()

  const [currPage, setCurrPage] = useState(1);
  const perPageCount = 10;
  const [totalPages, setTotalPages] = useState(1);


  const toast = useToast();
  // const navigate = useNavigate();
  let res = sessionStorage.getItem("Authorization")
  console.log("res is -------->", res)
  if (res == null) {
    window.location.href = "/"
    // setTimeout(function(){window.location.reload()}, 100);
  }

  useEffect(() => {

    let searchData = {
      length: perPageCount,
      start: (currPage - 1) * perPageCount,
      sTextsearch: '',
      sSellingType: '',
      sSortingType: 'Recently Added'
    };

    async function getAllNftList() {

      let userData = await getNftList(searchData)
      console.log("nft Data in user section------->", userData.data)
      setNftList(userData.data)

      let totalpage = Math.ceil(userData.recordsTotal / perPageCount);
      console.log("total pages is", totalpage)
      setTotalPages(totalpage);

    }



    getAllNftList()
  }, [currPage])


  const handleChangePage = (e, p) => {
    setCurrPage(p);
    console.log("p is ---->", p);
  };



  const popup = (item) => {
    console.log("nft data in popup is------->", item);
    setNftData(item)
    setMsg(!msg);

  }

  const handleClose = () => {
    if (close == true) {
      window.location.reload()
    }
    SetClose(!close)
    // console.log("close is------>", close);
  }


  return (
    <div className="container-scroller"> 
      <Navbar /> 
      
    <div className="container-fluid page-body-wrapper">
    <Sidebar/>
    <div className="main-panel"><div className="content-wrapper">
    <div className='row'>
      {msg ? '' 
      :
        <>
        <div className='cust_model'>  
        <h2>Please Update Your Status</h2>
        {nftData.nNftImageType==="Image"?
        <img src={nftData.nNftImage}></img>:<video className="img-fluid nftimg" controls>
        <source  src={nftData.nNftImage} type="video/mp4" />
      </video>}
        <div className='button'>
        <button type="button" className="btn btn-primary" placeholder="close" onClick={handleClose}>Close</button>
        </div>
        </div>  
        <div className='cust_overlay'></div>
        </>
        }

        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">NFTs</h4>
                <div className="form-inline justify-content-end mb-3">
                    <div className="input-group">
                      <input placeholder="Search Recipient's username" aria-label="NFT Name" aria-describedby="basic-addon2" type="text" className="form-control form-control"

                        onChange={async (e) => {


                          let searchData = {
                            length: perPageCount,
                            start: (currPage - 1) * perPageCount,
                            sTextsearch: e.target.value,
                            sSellingType: '',
                            sSortingType: 'Recently Added',
                            // limit: perPageCount,
                            // page: currPage
                          };
                          let userData = await getNftList(searchData)
                          console.log("user data is---->", userData)

                          setNftList(userData.data)


                        }}

                      />
                      <div className="input-group-append">
                        {/*<button className="btn btn-sm btn-gradient-primary" type="button"
                            onClick={async(e)=>{
                              
                              let searchData ={
                                length: perPageCount,
                                start:(currPage-1)*perPageCount,
                                sTextsearch: e.target.value,
                                sSellingType: '',
                                sSortingType: 'Recently Added',
                                // limit: perPageCount,
                                // page: currPage
                              };
                              let userData=await getNftList(searchData)
                                  console.log("user data is---->",userData)
                                    
                                  setNftList(userData.data)
                            
                              
                            }}
                            >Search</button>*/}
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Creator</th>
                          <th>Current Owner</th>
                          <th>Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {nftList ? nftList.map((item, key) =>
                          <>
                            <tr key={key}>
                              <td>{item.nTitle}</td>
                              <td>{item.oCreator[0].sWalletAddress}</td>
                              <td>{item.nOwnedBy ? item.nOwnedBy.map((item, key) =>
                                <div key={key}>
                                  {item.name ? item.name : "Test"}
                                </div>
                              ) : "Loading"}</td>
                              <td>{item && item.nType === 1 ? "Fixed Sale" : "Auction"}</td>
                              <td>
                                {item && item.isBlocked === false ?
                                  <>
                                    <button type="button" onClick={() => {
                                      console.log("on click is called")
                                      popup(item)
                                    }} data-bs-toggle="tooltip" title="View NFT" className="btn btn-gradient-primary btn-rounded btn-icon mr-2">
                                      <i className="mdi mdi-eye"></i>
                                    </button>
                                    <button type="button" className="btn btn-gradient-primary btn-rounded btn-icon" data-bs-toggle="tooltip" title="Block NFT" onClick={async () => {
                                      let res = await toggleNFTStatus(item._id, "false")
                                      console.log("res of toggle status is--->", res)
                                      // alert(res.message);
                                      toast({ title: res.message, status: "success", position: "top", duration: 9000, isClosable: true, })
                                      setTimeout(function () { window.location.reload() }, 800);
                                      //window.location.reload()

                                    }} >
                                      <i className="mdi mdi-block-helper"></i>
                                    </button>
                                  </>
                                  : <button type="button" className="btn btn-gradient-primary btn-rounded btn-icon" data-bs-toggle="tooltip" title="Update Status" onClick={async () => {
                                    let res = await toggleNFTStatus(item._id, "true")
                                    console.log("res of toggle status is--->", res)
                                    // alert(res.message);
                                    toast({ title: res.message, status: "success", position: "top", duration: 9000, isClosable: true, })
                                    setTimeout(function () { window.location.reload() }, 800);
                                    //window.location.reload()

                                  }} >
                                    <i className="mdi mdi-checkbox-marked-circle-outline"></i>
                                  </button>}

                              </td>
                            </tr>
                          </>
                        )
                          : "Loading"}


                      </tbody>
                    </table>
                  </div>

                  <div className="">

                    {totalPages >= 1 ? (
                      <Pagination
                        count={totalPages}
                        size="large"
                        page={currPage}
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChangePage}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NFTs
