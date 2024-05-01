import React, { useState, useEffect } from "react";
import CollectionsNfts from "../components/CollectionsNfts";
// import ColumnZeroTwo from "../components/ColumnZeroTwo";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import {
  GetCollectionsByAddress,
  GetIndividualAuthorDetail,
  GetMetaOfCollection,
  getProfile
} from "../../apiServices";
import Loader from "../components/loader";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import Avatar from "./../../assets/images/avatar5.jpg";
import { useCookies } from "react-cookie";
import { convertToEth } from "../../helpers/numberFormatter";
import { useSearchParams } from "react-router-dom/dist";
import { useNavigate } from "react-router-dom";
import CollectionSection from "../components/collectionNew";

const GlobalStyles = createGlobalStyle`
header#myHeader.navbar.white a {

    color: #fff;

  }

  header#myHeader.navbar.white.sticky a{

    color: #111;

  }

  header#myHeader.navbar.white .logo .d-none{

    display: block !important;

  }

  header#myHeader.navbar.white .logo .d-block{

    display: none !important;

  }

  header#myHeader.navbar.white.sticky .logo .d-none{

    display: none !important;

  }

  header#myHeader.navbar.white.sticky .logo .d-block{

    display: block !important;

  }

  @media only screen and (max-width: 1199px) {

    .navbar{

      background: #403f83;

    }

    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{

      background: #111;

    }

    .item-dropdown .dropdown a{

      color: #111 !important;

    }

  }
`;

const Collection = function (props) {
  const [openMenu, setOpenMenu] = useState(true);
  const [openMenu1, setOpenMenu1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authorDetails, setAuthorDetails] = useState(false);
  const [collectionDetails, setCollectionDetails] = useState([]);
  const [profile, setProfile] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [cookies] = useCookies(["selected_account", "Authorization"]);
  const [metaData, setMetaData] = useState({})
  let navigate = useNavigate()
  useEffect(() => {
    if (cookies.selected_account) setCurrentUser(cookies.selected_account);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.selected_account]);

  useEffect(() => {
    const fetch = async () => {
      if (currentUser) {
        console.log('hhh', localStorage.getItem("decrypt_authorization"));
        // let _profile = await getProfile();
        // setProfile(_profile);
      }
    };
    fetch();
  }, [currentUser]);

  let [param] = useSearchParams();
  console.log(param.get('addr'));
  let addr = param.get('addr')

  useEffect(() => {
    async function fetch() {
      if (addr) {
        setLoading(true);
        let data = await GetCollectionsByAddress({ sContractAddress: addr });

        setCollectionDetails(data);

        setLoading(false);
      }
    }
    fetch();
  }, [addr]);

  useEffect(() => {
    async function fetch() {
      if (collectionDetails) {
        setLoading(true);
        let data = await GetIndividualAuthorDetail({
          userId: collectionDetails.oCreatedBy,
          currUserId: profile ? profile._id : localStorage.getItem('decrypt_userId'),
        });

        let metadata = await GetMetaOfCollection({ collectionId: collectionDetails.sContractAddress });
        //  metaData['floorPrice']=convertToEth(metadata.floorPrice)
        setMetaData(metadata)
        setAuthorDetails(data);

        setLoading(false);
      }
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionDetails, profile]);

  const handleBtnClick = () => {
    setOpenMenu(true);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(true);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="collection_cd">
      <GlobalStyles />
      <section
        id="profile_banner"
        className="jumbotron no-bg background-img"
        style={{
          backgroundImage: `url(${collectionDetails.collectionImage})`,
        }}
      >
        <div className="container">
          <div className="mainbreadcumb1"></div>
        </div>
      </section>

      <section className="container d_coll no-top no-bottom">
        <div className="row">
          <div className="col-md-12">
            <div className="coll_profile">
              <div className="coll_profile_avatar">
                <div className="coll_profile_img">
                  <a href={"/author/" + authorDetails._id} >
                    {/* <img
                      src={
                        authorDetails.sProfilePicUrl
                          ? authorDetails.sProfilePicUrl
                          : Avatar
                      }
                      alt=""
                    /> */}

                    <div  style={styles.container}>
                      <img className="col-4" src={collectionDetails.collectionImage} alt="NFT" style={styles.collImg} />

                      <div className="col-8 container-items">
                        
                          <h2 className="title-h">{collectionDetails ? collectionDetails.sName : ""}</h2>
                          <p style={{color:"#9b9b9b", marginTop:10}} className="title-p">
                            {collectionDetails.sDescription}
                          </p>
                      
                        <section className="collection-detail-card">
                          <div className="collection-card">
                            <h5 style={{color:"#9b9b9b"}}>Floor Price</h5>
                            <h5 style={{fontSize:"20px",color:"black",marginTop:8}}>{collectionDetails?.sFloorPrice}</h5>
                          </div>
                          <div className="collection-card">
                            <h5 style={{color:"#9b9b9b"}}>Trade Volume</h5>
                            <h5 style={{fontSize:"20px",color:"black",marginTop:8}}>${metaData?.volume!=0?convertToEth(metaData?.volume):0}</h5>
                          </div>
                          <div className="collection-card">
                            <h5 style={{color:"#9b9b9b"}}>Latest Price</h5>
                            <h5 style={{fontSize:"20px",color:"black",marginTop:8}}>${metaData?.latestPrice?convertToEth(metaData?.latestPrice):0}</h5>
                          </div>
                          <div className="collection-card">
                            <h5 style={{color:"#9b9b9b"}}>Total Items</h5>
                            <h5 style={{fontSize:"20px",color:"black",marginTop:8}}>{metaData.items}</h5>
                          </div>
                        </section>
                      </div>



                    </div>
                  </a>
                  {/* <i className="fa fa-check"></i> */}
                </div>

                {/* <div className="profile_name">
                  <h4 className="font_36 text-dark NunitoBold mb-0 mt-3">
                    {collectionDetails ? collectionDetails.sName : ""}
                  </h4>

                  <CopyToClipboard
                    text={
                      collectionDetails
                        ? collectionDetails.sContractAddress
                        : ""
                    }
                    onCopy={() => {
                      NotificationManager.success("Copied!!");
                    }}
                  >
                    <div id="wallet" className="profile_wallet font_18 text-dark NunitoLight">
                      {collectionDetails && collectionDetails.sContractAddress
                        ?
                        collectionDetails.sContractAddress.slice(0, 5) +
                        "......" +
                        collectionDetails.sContractAddress.slice(37, 42) : ""
                      }
                    
                    </div>
                   
                  </CopyToClipboard>

                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="collection-desc">
        <h3>{collectionDetails.sDescription}</h3>
      </div>
      <section className="collection-detail-card">
        <div className="collection-card">
          <h1 style={{ minHeight: "1rem", fontSize: "2rem" }}>Floor Price</h1>
          <p>${convertToEth(metaData.floorPrice)}</p>
        </div>
        <div className="collection-card">
          <h1 style={{ minHeight: "1rem", fontSize: "2rem" }}>Trade Volume</h1>
          <p>3000</p>
        </div>
        <div className="collection-card">
          <h1 style={{ minHeight: "1rem", fontSize: "2rem" }}>Latest Price</h1>
          <p>3000</p>
        </div>
        <div className="collection-card">
          <h1 style={{ minHeight: "1rem", fontSize: "2rem" }}>Total Items</h1>
          <p>{metaData.items}</p>
        </div>
      </section> */}

      <section className="container no-top">
        {/* <div className="row mt-4 mb-5">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav">
                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}>On Sale</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>Owned</span>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
        {openMenu && (
          <div id="zero1" className="onStep fadeIn" >
            <CollectionsNfts
              owned={false}
              collection={
                collectionDetails ? collectionDetails.sContractAddress : ""}

            // collectionDetails && collectionDetails.sContractAddress ? <video className="img-fluid nftimg" controls>
            //   <source  src={`https://${collectionDetails.nNftImage}`} type="video/mp4" />
            // </video>
            //   : ""}
            />


          </div>
        )}
        {openMenu1 && (
          <div id="zero2" className="onStep fadeIn">
            <CollectionsNfts
              owned={true}
              collection={
                collectionDetails ? collectionDetails.sContractAddress : ""
              }
            />
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifycontent: "justify",
    alignItems: "center",
    gap: "15px",
    padding:"28px"
  },
  collImg: {
  
      width: "250px",
      height: "250px",
      marginLeft: "15px",
      // marginTop: "32px",
      borderRadius: "12px"
  
  }
}


export default Collection;
