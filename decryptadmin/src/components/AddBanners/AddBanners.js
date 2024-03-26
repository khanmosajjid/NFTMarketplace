import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import {useToast} from "@chakra-ui/toast"
import { navigate } from '@reach/router';
import { insertBanner } from '../../apiService';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';

const AddBanners = () => {

  let res = sessionStorage.getItem("Authorization")
  console.log("res is -------->", res)
  if(res == null){
    window.location.href = '/'
    // setTimeout(function(){window.location.reload()}, 100);
  }

const [deskTopImage, setdeskTopImage] = useState(null);
const [mobileImage, setmobileImage] = useState(null);
const [text, setText] = useState();
const [collection, setCollection] = useState();
const [nft, setNft] = useState();
const [order, setOrder] = useState(0);

const toast = useToast()



  const addBanner = async() =>{
  
    if(order===0){

      toast ({title: "Order Should Not Be Start With Zero", status:"error",duration: 2000, position:"top", isClosable: true})

      // setTimeout(function(){window.location.reload()}, 800);

      return;

    } else if(order===""){

        toast ({title: "Order Should Not Be Empty", status:"error",duration: 2000, position:"top", isClosable: true})

        return;

      }else if(order > 13){

        toast ({title: "Order Should Not Be Greater Than 13", status:"error",duration: 2000, position:"top", isClosable: true})

        return;

      }
    //if(text==="" || text === null || text === undefined){
    //  toast ({title: "Please Enter Banner Link", status:"error",duration: 2000, position:"top", isClosable: true})
    //  // setTimeout(function(){window.location.reload()}, 800);
    //  return;
    //}

    if(deskTopImage){

       let data={
        banner_image_desktop:deskTopImage,
        banner_URL:text,
        collection_Name:collection,
        nft_Name:nft,
        order:order
       }

      let insertresult=await insertBanner(data);
      console.log("insert banner---->",insertresult)
      if(insertresult.message==="Banner Successfully created"){
        toast ({title: "successfully submitted", status:"success",duration:2000, position:"top", isClosable: true});
        setTimeout(function(){window.location.reload()}, 800);
       
      }else {
        toast ({title: "Something went wrong", status:"error", position:"top", isClosable: true})
        // setTimeout(function(){window.location.reload()}, 800);
      }
      setdeskTopImage('');
      setmobileImage('');
      setText('')
      
      console.log("state is ------->", text)

      }else{
        toast ({title: "Image Not Found", status:"error", position:"top",  isClosable: true})
        // setTimeout(function(){window.location.reload()}, 2000);
    }
  }

  return (
  <div className="container-scroller"> 
    <Navbar />
    <div className="container-fluid page-body-wrapper">
      <Sidebar/>
        <div className='main-panel'>
          <div className="content-wrapper">
            <div className='row'>
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    {/* <form className="forms-sample"> */}
                      <>
                        <h4 className="card-title mb-4">Banners</h4>
                        <div className="mb-4 form-group">
                          {/* <h1>Upload and Display Image </h1> */}
                          <label htmlFor="exampleInputusername1">Banner Image Desktop*</label>
                          {deskTopImage && (
                            <div>
                            <img alt="not fount" width={"250px"} src={URL.createObjectURL(deskTopImage)} />
                            <br />
                            {/* <button onClick={()=>setdeskTopImage(null)}>Remove</button> */}
                            </div>
                          )}
                          <br /> 
                          <input
                            className='form-control file-upload-info'
                            type="file"
                            name="myImage"
                            accept='.png,.jpg,.jpeg'
                            onChange={(event) => {
                              console.log(event.target.files[0]);
                              setdeskTopImage(event.target.files[0]);
                            }}
                          />
                        </div>
                        {/*<div className="mb-4 form-group">*/}
                          {/* <h1>Upload Image For Desktop and Display  </h1> */}
                          {/*<label htmlFor="exampleInputusername1">Banner Image Mobile(Recommended  size 200x400px)*</label>
                          {mobileImage && (
                            <div>
                            <img alt="not fount" width={"250px"} src={URL.createObjectURL(mobileImage)} />
                            <br />*/}
                            {/* <button onClick={()=>setmobileImage(null)}>Remove</button> */}
                            {/*</div>
                          )}
                          <br />
                          <input
                            className='form-control file-upload-info'
                            type="file"
                            name="myImage"
                            accept='.png,.jpg,.jpeg'
                            onChange={(event) => {
                              console.log(event.target.files[0]);
                              setmobileImage(event.target.files[0]);
                            }}
                          />*/}
                        {/*</div>*/}
                        {/* <textarea className="mb-4 form-group"  rows="4" /> */}
                        {/* <label className="mb-4 form-group">Collection Address*</label> */}
                        <Form.Group className="mb-4 form-group" controlId="exampleForm.ControlTextarea1">
                          <label htmlFor="exampleInputusername1">Banner Link(Optional)</label>
                          <Form.Control as="textarea" onChange={e => setText(e.target.value)} value={text} rows={1} />
                        </Form.Group>
                        <div className="mb-4 form-group">
                          <label> Collection Name(Optional)</label>
                          <input type='text' className='form-control mb-3' onChange={e =>setCollection(e.target.value)} value={collection} />
                        </div>
                        <div className="mb-4 form-group">
                          <label> NFTs Name(Optional)</label>
                          <input type='text' className='form-control mb-3' onChange={e =>setNft(e.target.value)} value={nft} />
                        </div>
                        <div className="mb-4 form-group">
                          <label> Order</label>
                          <input type='text' className='form-control mb-3' onChange={e => setOrder(e.target.value.replace(/\D/g, ''))} value={order} />
                        </div>
                        
                        <button className="btn btn-gradient-primary mr-2" onClick={addBanner} >Submit</button>
                      </>
                    {/* </form> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
        <Footer/>
  </div>  
  );
};
export default AddBanners






















/////////////////////////code///////////////////////


  // const [image, setImage] = useState();
//   console.log("image is -------->", image);

//     const addBanner =() =>{
      
//       setImage('')

//     }


//   return (
//     <div className='row'>
//     <div className="col-lg-12 grid-margin">
//         <div className="card mb-5">
//           <div className="card-body">
//             <form className="forms-sample">
//   <h4 className="card-title mb-4">Banners</h4>
//   <Form>
//     <Form.Group controlId="formFile" className="mb-4 form-group">
//     <label htmlFor="exampleInputusername1">Banner Image Desktop(Recomended size 400x1900px)*</label>
//       <div className="image">
//       <Form.Control value={image} type="file" />
//           <img src="" width="100" height="50" />
//         </div>
//     </Form.Group>
//     <Form.Group controlId="formFile" className="mb-4 form-group">
//     <label htmlFor="exampleInputusername1">Banner Image Mobile(Recomended size 200x400px)*</label>
//       <Form.Control type="file" />
//     </Form.Group>
//     <Form.Group className="mb-4 form-group" controlId="exampleForm.ControlTextarea1">
//     <label htmlFor="exampleInputusername1">Collection Address*</label>
//       <Form.Control as="textarea" rows={5} />
//     </Form.Group>
//     <button type="submit" className="btn btn-gradient-primary mr-2" onClick={addBanner} >Submit</button>
//   </Form>
// </form>
// </div>
// </div>
// </div>
// </div>
//   )
// }