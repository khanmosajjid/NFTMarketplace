/* eslint-disable react/jsx-no-comment-textnodes */

import React, { useEffect, useState } from "react";
import ColumnZero from "../components/ColumnZero";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import { getProfile } from "../../apiServices";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Avatar from "./../../assets/images/avatar5.jpg";
import { NotificationManager } from "react-notifications";
import "../components-css/profile-page.css";
import { BsPencilSquare } from "react-icons/bs";
import GeneralCollectionsPage from "../components/GeneralCollectionsPage";
import Loader from "../components/loader";
import ItemNotFound from "./ItemNotFound";
import { useCookies } from "react-cookie";
import $ from 'jquery';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    // background: #403f83;
    // border-bottom: solid 1px #403f83;
    background: #8155E5;
    border-bottom: 1px solid #8155E5;
  }
  header#myHeader.sticky .btn-main {
    background: #fff;
    color: #8155E5 !important;
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



const PersonalProfile = function (props) {
  const [openMenu, setOpenMenu] = useState(true);
  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const [openMenu3, setOpenMenu3] = useState(false);
  const [openMenu4, setOpenMenu4] = useState(false);
  const [profilePic, setProfilePic] = useState(Avatar);
  const [fullName, setFullName] = useState("Unnamed");
  const [userName, setUserName] = useState("@unnamed");
  const [address, setAddress] = useState("0x0..");
  const [authorization, setAuthorization] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [cookies] = useCookies(["selected_account", "Authorization"]);
  const [paramType, setParamType] = useState(0);

  useEffect(() => {
    setCurrentUser(cookies.selected_account);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.selected_account]);

  useEffect(() => {
    setAuthorization(cookies.Authorization);
    setParamType(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.Authorization]);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      if (currentUser) {
       
        const profileInfo = await getProfile();

        if (profileInfo) {
          let profileData = profileInfo?.data;
          if (
            profileData?.oName &&
            profileData?.oName?.sFirstname &&
            profileData?.oName?.sLastname
          ) {
            setFullName(
              profileData?.oName?.sFirstname + " " + profileData?.oName?.sLastname
            );
          } else {
            setFullName("Unnamed");
          }

          if (profileData?.sUserName) {
            setUserName("@" + profileData?.sUserName);
          } else {
            setUserName("@unnamed");
          }

          if (profileData?.sWalletAddress) {
            setAddress(profileData?.sWalletAddress);
          } else if (currentUser) {
            setAddress(currentUser);
          } else {
            setAddress("0x0..");
          }

          let sProfilePicUrl =
            profileData?.sProfilePicUrl === undefined
              ? Avatar
              : profileData?.sProfilePicUrl;
          setProfilePic(sProfilePicUrl);
          setProfileData(profileData);
          setLoading(false);
        }
      } else {
        setAddress("0x0..");
        setLoading(false);
      }
    }
    fetchData();
  }, [authorization, currentUser]);

  const handleBtnClick = (docId, index) => {
    console.log("Doc ID", docId, index)
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    $(".MainbtnClass").removeClass("active");
    $("#" + docId).addClass("active");
    if (index === 0) {
      setOpenMenu(true);
    }
    if (index === 1) {
      setOpenMenu1(true);
    }
    if (index === 3) {
      setOpenMenu3(true);
    }
    if (index === 4) {
      setOpenMenu4(true);
    }
    setParamType(index);
  };


  return !currentUser ? (
    <ItemNotFound />
  ) : (
    <div>
      {loading ? <Loader /> : ""}
      <GlobalStyles />
      <section
        // id="profile_banner"
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url(${"/img/background/Rectangle11.png"})`,
        }}
      >
        <div className="mainbreadcumb"></div>
      </section>
      <section className="container no-bottom">
        <div className="row">
          <div className="col-md-12">
            <div className="d_profile de-flex">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  <div className="personal_profile_img">
                    <img src={profilePic ? profilePic : ""} alt="" />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="profile_name">
                    <h4>
                      <div className="d-flex">
                        {fullName}
                        <BsPencilSquare
                          className="BsPencilSquare"
                          onClick={() => {
                            window.location.href = "/updateProfile";
                          }}
                        />
                      </div>
                      <span className="profile_username">
                        {userName ? userName : "@unnamed"}
                      </span>
                      <CopyToClipboard
                        text={address}
                        onCopy={() => {
                          NotificationManager.success("Copied!!");
                        }}
                      >
                        <span id="wallet" className="profile_wallet">
                          {currentUser
                            ? currentUser.slice(0, 5) +
                            "......" +
                            currentUser.slice(37, 42)
                            : "0x00.."}

                        </span>
                      </CopyToClipboard>
                    </h4>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section className="container no-top">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav text-left mb-5">
                <li id="Mainbtn" className="MainbtnClass active">
                  <span onClick={() => handleBtnClick('Mainbtn', 0)}>On Sale</span>
                </li>
                <li id="Mainbtn1" className="MainbtnClass">
                  <span onClick={() => handleBtnClick('Mainbtn1', 1)}>Created </span>
                </li>
                <li id="Mainbtn3" className="MainbtnClass">
                  <span onClick={() => handleBtnClick('Mainbtn3', 3)}>Owned </span>
                </li>
                <li id="Mainbtn4" className="MainbtnClass">
                  <span onClick={() => handleBtnClick('Mainbtn4', 4)}>Collections </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {openMenu && (
          <div id="zero1" className="onStep fadeIn">
            <ColumnZero
              isProfile={true}
              paramType={paramType}
              profile={profileData}
            />
          </div>
        )}
        {openMenu1 && (
          <div id="zero2" className="onStep fadeIn">
            <ColumnZero
              isProfile={true}
              paramType={paramType}
              profile={profileData}
            />
          </div>
        )}
        {openMenu2 && (
          <div id="zero3" className="onStep fadeIn">
            <ColumnZero
              isProfile={true}
              paramType={paramType}
              profile={profileData}
            />
          </div>
        )}
        {openMenu3 && (
          <div id="zero4" className="onStep fadeIn">
            <ColumnZero
              isProfile={true}
              paramType={paramType}
              profile={profileData}
            />
          </div>
        )}
        {openMenu4 && (
          <div id="zero5" className="onStep fadeIn">
            <GeneralCollectionsPage
              userId={profileData?._id}
              isAllCollections={false}
            />
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default PersonalProfile;
