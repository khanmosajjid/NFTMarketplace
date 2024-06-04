import React from "react";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { Networks } from "./../components/AccountModal/networks";
import { handleNetworkSwitch } from "../../helpers/utils";
import SingleOption from '../SVG/SingleOption';
import MultiOption from '../SVG/MultiOption';
import evt from "../../events/events"


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
    color: rgba(255, 255, 255, .5);
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

const Createpage = () => {
  return (
    <div className="create-option">
      <GlobalStyles />

      <section
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url(${"./img/background/Rectangle11.png"})`,
        }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="font_64 text-center NunitoBold text-light">
                  Create Collectible
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 text-center">
            <p className="collectibleText color_A0 font_24 NunitoBold">
              Choose “Single” for one of a kind or “Multiple” if you want to
              sell one collectible multiple times
            </p>
            <div className="d-flex row">
              <div className="col-md-6">
                <div className="opt-create"
                  onClick={async () => {
                    window.location.href = "/createSingle";
                    console.log("window sessionStorage is---> ", window.sessionStorage.getItem("chain_id"))
                    console.log("chain id--->", process.env.REACT_APP_CHAIN_ID)
                    if( window.sessionStorage.getItem("chain_id")===null){
                     
                      evt.emit("disconnectWallet")
                      NotificationManager.error("Please Connect Your Wallet");
                      return;
                    }
                    else if (
                      window.sessionStorage.getItem("chain_id") !==
                      process.env.REACT_APP_CHAIN_ID
                    ) {
                      //NotificationManager.error("Please switch chain");
                      let res = await handleNetworkSwitch();
                      if (res === false) return;
                      
                    } else window.location.href = "/createSingle";
                  }}
                >
                  <div className="option_white">
                    <div className="">
                      <img src="./img/misc/Singleoption.png" alt="" />
                      {/* <SingleOption /> */}
                      <h3 className="text-dark font_24 NunitoBold">Single</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="opt-create"
                   onClick={async () => {
                    window.location.href = "/createMultiple";
                    console.log("window sessionStorage is---> ", window.sessionStorage.getItem("chain_id"))
                    console.log("chain id--->", process.env.REACT_APP_CHAIN_ID)
                    if( window.sessionStorage.getItem("chain_id")===null){
                      console.log("chain id is null")
                      evt.emit("disconnectWallet")
                      NotificationManager.error("Please Connect Your Wallet");
                      
                      return;
                    }
                    else if (
                      window.sessionStorage.getItem("chain_id") !==
                      process.env.REACT_APP_CHAIN_ID
                    ) {
                      //NotificationManager.error("Please switch chain");
                      let res = await handleNetworkSwitch();
                      if (res === false) return;
                      
                    } else window.location.href = "/createMultiple";
                  }}
                >
                  <div className="option_white">
                    <div className="">
                      <img src="./img/misc/Multiploption.png" alt="" />
                      {/* <MultiOption /> */}
                      <h3 className="text-dark font_24 NunitoBold">Multiple</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Createpage;
