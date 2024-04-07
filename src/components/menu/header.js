import React, { useEffect, useState } from "react";
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";
import AccountModal from "./../components/AccountModal/Accountmodal";
import Group from "./../../assets/images/Group.png";
import logo2 from "./../../assets/images/logo-2.png";
import logo1 from "./../../assets/images/logo1.png";
import DecryptNFTLogo2 from "./../../assets/images/DecryptNFT-Logo2.png";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const Header = function () {
  const [showmenu, btn_icon] = useState(false);
  const [cookies] = useCookies(["selected_account"]);
  const [currentAccount, setCurrentAccount] = useState("");
  let navigate =useNavigate()

  useEffect(() => {
    console.log(cookies.selected_account)
    if (cookies.selected_account) {
      setCurrentAccount(cookies.selected_account);
    }
    else{
      setCurrentAccount('');
      // navigate('/')
    }
  }, [cookies.selected_account]);

  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        totop.classList.add("show");
      } else {
        header.classList.remove("sticky");
        totop.classList.remove("show");
      }
      if (window.pageYOffset > sticky) {
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  return (
    <header id="myHeader" className="navbar white">
      <div className="container">
        <div className="row w-100-nav">
          <div className="logo px-0">
            <div className="navbar-title navbar-item">
              <a href="/">
                <img src={logo1} style={{width:"80px",height:"60px"}} className="img-fluid d-block" alt="#" />
                <img src={logo2} className="img-fluid d-3" alt="#" />
                {/* <img
                  src={logo1}
                  className="img-fluid d-none"
                  alt="#"
                /> */}
              </a>
            </div>
          </div>

          {/* <div className="search">
            <input
              id="quick_search"
              className="xs-hide"
              name="quick_search"
              placeholder="search item here..."
              type="text"
            />
          </div> */}

          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu && (
                <div className="menu">
                  <div className="navbar-item">
                    <a href="/explore" onClick={() => btn_icon(!showmenu)}>
                      Explore
                    </a>
                  </div>
                  {currentAccount ? (
                    <div className="navbar-item">
                      <a
                        href="/createOption"
                        onClick={() => btn_icon(!showmenu)}
                      >
                        Create
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                  {currentAccount ? (
                    <div className="navbar-item">
                      <a href="/profile" onClick={() => btn_icon(!showmenu)}>
                        Profile
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </Breakpoint>

            <Breakpoint xl>
              <div className="menu">
                <div className="navbar-item">
                  <a href="/explore">
                    Explore
                    <span className="lines"></span>
                  </a>
                </div>
                {currentAccount ? (
                  <div className="navbar-item">
                    <a href="/createOption">
                      Create
                      <span className="lines"></span>
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {currentAccount ? (
                  <div className="navbar-item">
                    <a href="/profile">
                      Profile
                      <span className="lines"></span>
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Breakpoint>
          </BreakpointProvider>

          <div className="mainside">
            <AccountModal  navigate={navigate}/>
          </div>
        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
    </header>
  );
};
export default Header;
