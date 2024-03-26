import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { navigate } from '@reach/router';
import { useToast } from '@chakra-ui/toast';
import { getBanners, deleteBanner } from '../../apiService';
import { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';


const AllBanners = () => {

  const [nftList, setNftList] = useState()
  const [msg, setMsg] = useState(true)
  const [close, SetClose] = useState(true);
  const [allBanners, setAllBanners] = useState();

  const toast = useToast();

  let res = sessionStorage.getItem("Authorization")
  console.log("res is -------->", res)
  if(res == null){
    window.location.href = '/'
    // setTimeout(function(){window.location.reload()}, 100);
  }

  useEffect(() => {
    async function getAllBanners() {
      let bannerRes = await getBanners();
      console.log("banner res is----->", bannerRes);
      setAllBanners(bannerRes)

    }
    getAllBanners();
  }, [])

  const popup = () => {
    setMsg(!msg);
    // console.log("msg is -------->", msg);
  }

  return (
    <>
      <div className="container-scroller">
        <Navbar />

        <div className="container-fluid page-body-wrapper">
          <Sidebar />

          <div className='main-panel'>
            <div className="content-wrapper">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">All Banners</h4>
                  <div className="form-inline justify-content-end mb-3">
                    {/* <div className="input-group">
                      <input placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" type="text" className="form-control form-control" />
                      <div className="input-group-append">
                        <button className="btn btn-sm btn-gradient-primary" type="button">Search</button>
                      </div>
                    </div> */}
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Order</th>
                          <th>Image</th>
                          <th>Banner Link</th>

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allBanners ? allBanners.map((item, key) =>
                          <>
                            <tr key={key}>
                              <td>{item.order}</td>
                              <td>
                                <img src={item?.bDesktopFileHash}></img>
                              </td>
                              <td>{item.bannerURL}</td>


                              <td colSpan={2}>
                                {/*<button type="button" onClick={popup} data-bs-toggle="tooltip" title="Update Status" className="btn btn-gradient-primary btn-rounded btn-icon mr-2">
                       <i className="mdi mdi-pencil"></i>
                     </button>*/}
                                <button type="button" className="btn btn-gradient-primary btn-rounded btn-icon" data-bs-toggle="tooltip" title="Delete" onClick={async () => {
                                  let res = await deleteBanner(item._id)
                                  console.log("res of toggle status is--->", res)
                                  // alert(res.message);
                                  toast({ title: res.message, status: "success", position: "top", duration: 9000, isClosable: true, })
                                  setTimeout(function () { window.location.reload() }, 800);
                                  //window.location.reload()

                                }} >
                                  <i className="mdi mdi-delete"></i>
                                </button>




                              </td>
                            </tr>
                          </>
                        )
                          : "Loading"}


                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <Footer/>
      </div>
    </>

  )
}

export default AllBanners
