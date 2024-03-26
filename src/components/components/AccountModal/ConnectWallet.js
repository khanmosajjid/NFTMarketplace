import React from "react";
import PolygonLogo from "./../../../assets/images/polygonLogo.png";
import '../../components-css/item-detail.css';
import evt from "../../../events/events";


const ConnectWallet = (props) => {
  console.log("props connectWallet are---->",props)

  return <div className="popup-box">
     
         <div className="box main-box">
         <span className="close-icon cw-close-icon" onClick={props.handleClose}>x</span>
           <div className="box-body">
             <img src={PolygonLogo} className="polygon-logo"/>
             <span>   {props.content}</span>
           </div>
           <div className="box-footer">
           <button type="button" className="connectWalletBtn" onClick={() => {
              //let res1=await handleNetworkSwitch(currentUser);
              //setCookie("balance",res1,{path: "/"});
              //if(res1===false) return;
            props.handleClose();
            evt.emit("onConnect");
           }}>Connect Wallet</button>
           </div>
         </div>
  </div>

}

export default ConnectWallet;