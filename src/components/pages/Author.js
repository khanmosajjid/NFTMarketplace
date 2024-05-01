import React, { useEffect, useState } from "react";
import ColumnZero from "../components/ColumnZero";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Avatar from "./../../assets/images/avatar5.jpg";
import { NotificationManager } from "react-notifications";
import { GetIndividualAuthorDetail, getProfile } from "../../apiServices";
// import { Follow, GetIndividualAuthorDetail } from "../../apiServices";
import Loader from "../components/loader";
import GeneralCollectionsPage from "../components/GeneralCollectionsPage";
import "./../components-css/author.css";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const Author = function (props) {
  const [openMenu, setOpenMenu] = useState(true);
  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const [openMenu3, setOpenMenu3] = useState(false);
  const [openMenu4, setOpenMenu4] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [profilePic, setProfilePic] = useState(Avatar);
  const [fullName, setFullName] = useState("Unnamed");
  const [userName, setUserName] = useState("@unnamed");
  const [address, setAddress] = useState("0x0..");
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [paramType, setParamType] = useState(0);
  // const [followEvent, setFollowEvent] = useState(false);
  // const [isFollowing, setIsFollowing] = useState(false);
  // const [following, setFollowing] = useState(0);
  // const [followers, setFollowers] = useState(0);
  const [cookies] = useCookies(["selected_account", "Authorization"]);

  let { id } = useParams();

  useEffect(() => {
    setParamType(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // let id = props.match.params.id;

    async function fetch() {
      // if (!localStorage.getItem("Authorization")) return;
      // if (id === props?.profileData?.profileData?._id) {
      //   window.location.href = "/profile";
      // }
      if (id) {
        setLoading(true);
        let data = await GetIndividualAuthorDetail({
          userId: id,
          currUserId: localStorage.getItem('decrypt_userId'),
        });
        setProfileInfo(data);
        // setIsFollowing(data?.user_followings?.length > 0);
        // setFollowing(data?.user_followings_size);
        // setFollowers(data?.user_followers_size);
        setLoading(false);
      }
    }
    fetch();
    async function fetchData() {
      const profileInfo = await getProfile();
      if (profileInfo) {
        let profileData = profileInfo;
        if (profileData.oName && profileData._id && profileData._id == id) {
          window.location.href = "/profile";
        }
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, cookies.Authorization]);

  useEffect(() => {
    let _profileData = profileInfo;
    if (
      _profileData.oName &&
      _profileData.oName.sFirstname &&
      _profileData.oName.sLastname
    ) {
      setFullName(
        _profileData.oName.sFirstname + " " + _profileData.oName.sLastname
      );
    } else {
      setFullName("Unnamed");
    }

    if (_profileData.sUserName) {
      setUserName("@" + _profileData.sUserName);
    } else {
      setUserName("@unnamed");
    }

    if (_profileData.sWalletAddress) {
      setAddress(_profileData.sWalletAddress);
    } else {
      setAddress("0x0..");
    }

    let sProfilePicUrl =
      _profileData.sProfilePicUrl === undefined
        ? Avatar
        : _profileData.sProfilePicUrl;
    setProfilePic(sProfilePicUrl);
    setProfileData(_profileData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileInfo]);

  // useEffect(() => {
  //   // let id = props.match.params.id;
  //   async function fetch() {
  //     let data = await GetIndividualAuthorDetail({
  //       userId: id,
  //       currUserId:
  //         props.profileData && props.profileData.profileData
  //           ? props.profileData.profileData._id
  //           : "",
  //     });
  //     setIsFollowing(data?.user_followings?.length > 0);
  //     setFollowers(data.user_followers_size);
  //     setFollowing(data.user_followings_size);
  //   }
  //   fetch();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [followEvent]);

  const handleBtnClick = () => {
    setOpenMenu(true);
    setOpenMenu1(false);
    //setOpenMenu2(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    // document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    setParamType(0);
  };

  const handleBtnClick1 = () => {
    setOpenMenu1(true);
    //setOpenMenu2(false);
    setOpenMenu(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.add("active");
    // document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    setParamType(1);
  };

  // const handleBtnClick2 = () => {
  //   setOpenMenu2(!true);
  //   setOpenMenu(false);
  //   setOpenMenu1(false);
  //   setOpenMenu3(false);
  //   setOpenMenu4(false);
  //   document.getElementById("Mainbtn").classList.remove("active");
  //   document.getElementById("Mainbtn1").classList.remove("active");
  //   document.getElementById("Mainbtn2").classList.add("active");
  //   document.getElementById("Mainbtn3").classList.remove("active");
  //   document.getElementById("Mainbtn4").classList.remove("active");
  //   props.dispatch(
  //     nftListParamsUpdate({
  //       paramType: 2,
  //     })
  //   );
  // };

  const handleBtnClick3 = () => {
    setOpenMenu(false);
    //setOpenMenu2(false);
    setOpenMenu1(false);
    setOpenMenu3(true);
    setOpenMenu4(false);
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    // document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.add("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    setParamType(3);
  };

  const handleBtnClick4 = () => {
    setOpenMenu(false);
    //setOpenMenu2(false);
    setOpenMenu1(false);
    setOpenMenu3(false);
    setOpenMenu4(true);
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    // document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.add("active");
    setParamType(4);
  };

  return loading ? (
    <Loader />
  ) : (
    <div>
      <GlobalStyles />
      <section
        id="profile_banner"
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url(${"/img/background/Rectangle11.png"})`,
        }}
      >
        <div className="mainbreadcumb"></div>
      </section>
      <section className="container no-bottom">
        <div className="row">
          <div className="col-md-8">
            {/* <div className="d_profile de-flex"> */}
              {/* <div className="de-flex-col"> */}
                <div className="profile_avatar">
                  <div className="position-relative author_pic">
                    <img src={profilePic} alt="" />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="profile_name">
                    <div>
                      <h2 className="font_30 NunitoExtraBold text-dark mb-0">{fullName}</h2>
                      <p className="font_18 NunitoExtraBold color_theme mb-2">{userName}</p>

                      <CopyToClipboard
                        text={address}
                        onCopy={() => {
                          NotificationManager.success("Copied!!");
                        }}
                        
                      >
                        <div id="wallet" className="font_18 NunitoLight text-dark d-flex align-items-center">
                          {/* {address} */}
                          {address?.slice(0, 8) + "..." + address?.slice(34, 42)}
                          <button id="btn_copy" title="Copy Address" className="ml3 font_14 NunitoLight d-flex align-items-center">
                            Copy
                          </button> 
                        </div>
                        {/* <button id="btn_copy" title="Copy Text">
                          Copy
                        </button> */}
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              {/* </div> */}

              

              {/* <div className="profile_follow de-flex">
                <div className="de-flex-col">
                  <div className="profile_follower">{following} followers</div>
                </div>
                <div className="de-flex-col">
                  <div className="profile_follower">{followers} following</div>
                </div>
                <div className="de-flex-col">
                  <div className="profile_follower">
                    <button
                      className="follow"
                      onClick={async () => {
                        if (!cookies.selected_account) {
                          NotificationManager.error(
                            "Please try logging in",
                            "",
                            800
                          );
                          return;
                        }
                        if (props.authorData && props.authorData.authorData) {
                          let res = await Follow(
                            props.authorData.authorData._id
                          );
                          setFollowEvent(!followEvent);
                          NotificationManager.success(res);
                        }
                      }}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                  </div>
                </div>
              </div> */}
            {/* </div> */}
          </div>
          {/* <div className="col-md-4">
            <ul className="author_f">
              <li><Link to="" className="NunitoLight font_18 text-dark">5.2k Followers</Link></li>
              <li><Link to="" className="round-btn">Follow</Link></li>
            </ul>
            
          </div> */}
        </div>
      </section>
      
      
      <section className="container no-top">
        <div className="row my-5">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav text-left">
                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}>On Sale </span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>Created </span>
                </li>
                {/* <li id="Mainbtn2" className="">
                  <span onClick={handleBtnClick2}>Liked </span>
                </li> */}
                <li id="Mainbtn3" className="">
                  <span onClick={handleBtnClick3}>Owned </span>
                </li>
                <li id="Mainbtn4" className="">
                  <span onClick={handleBtnClick4}>Collections</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {openMenu && (
          <div id="zero1" className="onStep fadeIn">
            <ColumnZero
              authorId={id}
              isAuthor={true}
              paramType={paramType}
              profile={profileData}
            />
          </div>
        )}
        {openMenu1 && (
          <div id="zero2" className="onStep fadeIn">
            <ColumnZero
              authorId={id}
              isAuthor={true}
              paramType={paramType}
              profile={profileData}
            />
          </div>
        )}
        {openMenu2 && (
          <div id="zero3" className="onStep fadeIn">
            <ColumnZero
              authorId={id}
              isAuthor={true}
              paramType={paramType}
              profile={profileData}
            />
          </div>
        )}
        {openMenu3 && (
          <div id="zero4" className="onStep fadeIn">
            <ColumnZero
              authorId={id}
              isAuthor={true}
              paramType={paramType}
              profile={profileData}
            />
          </div>
        )}
        {openMenu4 && (
          <div id="zero5" className="onStep fadeIn">
            <GeneralCollectionsPage userId={id} isAllCollection={false} />
          </div>
        )}
      </section>
      )
      <Footer />
    </div>
  );
};



export default Author;
