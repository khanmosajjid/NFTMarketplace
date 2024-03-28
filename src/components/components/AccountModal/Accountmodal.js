/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { connect } from "react-redux";
import { tokenUpdate, userProfileDataLoaded } from "./../../../redux/actions";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import detectEthereumProvider from "@metamask/detect-provider";
import { Networks } from "./networks";
import { Login, Logout, Register } from "./../../../apiServices";
import { checkuseraddress } from "./../../../apiServices";
import { NotificationManager } from "react-notifications";
import PopupModal from "./popupModal";
import { BsExclamationLg } from "react-icons/bs";
import "../../../App.css";
import { useCookies } from "react-cookie";
import evt from "../../../events/events"
import { getCurrentProvider } from "../../../helpers/getterFunctions";
import { useNavigate } from "@reach/router";
var CryptoJS = require("crypto-js");

async function initWeb3(provider) {
  const web3 = new Web3(provider);

  await web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber,
      },
    ],
  });

  return web3;
}

const AccountModal = (props) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [userDetails, setUserDetails] = useState()
 
  let web3Modal = null;
  let web3 = null;
  let provider = null;

  // to initilize the web3Modal

  const init = async () => {
    const providerOptions = {
      // walletconnect: {
      //   package: WalletConnectProvider,
      //   options: {
      //     rpc: {
      //       80001: process.env.REACT_APP_RPC_URL,
      //     },
      //   },
      // },
    };

    web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: false,
      providerOptions: providerOptions,
    });

    provider = await detectEthereumProvider();
    web3 = await initWeb3(provider);
    if (web3 && provider) {
      if (web3.eth) {
        provider.on("accountsChanged", async function (accounts) {
          let acc = await web3?.eth?.getAccounts();
          if (!currentAccount) {
            console.log("hereee inside !curr acc")
            return
          }

          removeCookie("selected_account", { path: "/" });
          console.log("cookies updates", cookies.selected_account)
          removeCookie("balance", { path: "/" })
          localStorage.removeItem("decrypt_userId")
          localStorage.removeItem("decrypt_authorization")
          evt.emit("resetStates");
          // evt.emit("refreshReload");
          setCurrentAccount(null);

        });

        provider.on("chainChanged", async (_chainId) => {
          if(parseInt(_chainId, 16).toString() !== process.env.REACT_APP_CHAIN_ID){
            setWrongNetwork(true)
            setIsPopup(true)
            
            return;
          }
          console.log(
            "333",
            parseInt(_chainId, 16).toString() !==
            process.env.REACT_APP_CHAIN_ID,
            parseInt(_chainId, 16).toString(),
            process.env.REACT_APP_CHAIN_ID
          );

          window.sessionStorage.setItem(
            "chain_id",
            parseInt(_chainId, 16).toString()
          );

        });
      }
    }
  };

  init();



  useEffect(() => {
    async function update() {
      if (cookies.selected_account !== null) {
        setCurrentAccount(cookies.selected_account);

        if (provider) {
          web3 = await initWeb3(provider);
          let bal = await web3.eth.getBalance(cookies.selected_account);

          setCookie("balance", bal);
        }
      }
    }

    update();
  }, [cookies.selected_account, web3, provider]);
  // action on connect wallet button

  const onConnect = async () => {
    console.log("on connect is called---->")
    //Detect Provider
    try {

      provider = await web3Modal.connect();

      if (provider.open) {
        await provider.open();
        web3 = initWeb3(provider);
      }
      if (!provider) {
        console.log("no provider found");
      } else {
        web3 = new Web3(provider);
        await ConnectWallet();
      }
      evt.emit("resetStates");
      evt.emit("refreshReload");
      const chainId = await web3.eth.getChainId();
      window.sessionStorage.setItem("chain_id", chainId.toString());
      console.log("111", chainId.toString() !== process.env.REACT_APP_CHAIN_ID);

    } catch (error) {
      console.log(error);
    }
  };


  // connect wallet

  const ConnectWallet = async () => {
    if ("caches" in window) {
      caches.keys().then((names) => {
        // Delete all the cache files
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    try {
      const chainId = await web3.eth.getChainId();
      const networkId = await web3.eth.net.getId();
      console.log(networkId)
      if(networkId!=80001){
       setWrongNetwork(true)
       setIsPopup(true)
       return;
      }
        
      console.log("chain id", chainId);
      console.log("222", chainId.toString() !== process.env.REACT_APP_CHAIN_ID);
      window.sessionStorage.setItem("chain_id", chainId.toString());

      if (web3 && web3.eth) {
        const accounts = await web3.eth.getAccounts();
        console.log("accounts is---->",accounts)
        let sig
        let nonce = "";
        const siteUrl = "MARKETPLACE";
        let originalMessage;

        try {
          let provider = await getCurrentProvider();
          console.log("provider", provider)


          // await web3.eth.getTransactionCount(accounts[0]).then(async (result) => {
          //   nonce = CryptoJS.AES.encrypt(JSON.stringify(result), 'DASecretKey').toString();
          // })

          console.log("nonce", nonce)
          // await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();

          originalMessage = `Welcome to Decrypt NFT Marketplace!\n\nClick to sign in and accept the Decrypt NFT Marketplace Terms of Service: ${siteUrl}/\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours.\n\nWallet address:\n${accounts[0]}\n\nNonce:\n${nonce}`;

          sig = await signer.signMessage(originalMessage);

        } catch (e) {
          console.log("err", e);
          if (e.code === "ACTION_REJECTED") {
            NotificationManager.error("messages.userDenied");
            return false;
          }
        }


        if (!sig)
          return
        console.log("sig", sig)
        try {
          let token = await Login(accounts[0], sig, accounts[0], originalMessage);
          console.log("token is 251------>", token)
          setCookie("selected_account", accounts[0], { path: "/" });
          let bal = await web3.eth.getBalance(accounts[0]);
          setCookie("balance", bal, { path: "/" });
          setCurrentAccount(accounts[0]);
          NotificationManager.success("Logged In Successfully", "", 800);
        } catch (e) {
          NotificationManager.error("Failed to Login", "", 800);
          return;
        }
      }
    } catch (error) {
      if (error.message) {
        console.log("error", error.message);
      }
    }
  };

  //  disconnect wallet

  const onDisconnect = useCallback(async () => {
    if (!web3) {
      removeCookie("selected_account", { path: "/" });
      removeCookie("balance", { path: "/" });
      localStorage.removeItem("decrypt_userId")
      localStorage.removeItem("decrypt_authorization")
    }

    removeCookie("balance", { path: "/" });
    removeCookie("selected_account", { path: "/" });
    localStorage.removeItem("decrypt_userId")
    localStorage.removeItem("decrypt_authorization")
    sessionStorage.clear();
    localStorage.clear();
    setCurrentAccount(null);
    await web3Modal.clearCachedProvider();
    web3Modal = null;
    provider = null;
    web3 = null;
    await Logout();
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.disconnect();
    }
    if ("caches" in window) {
      caches.keys().then((names) => {
        // Delete all the cache files
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    evt.emit("resetStates");
    if (window.location.pathname === '/profile') {
      window.location.href = "/"
    }
    // window.location.reload();
  }, []);


  evt.removeAllListeners("disconnectWallet");
  evt.on("disconnectWallet", onDisconnect);

  evt.removeAllListeners("onConnect");
  evt.on("onConnect", onConnect);

  useEffect(() => {
    if (provider) {
      provider.on("chainChanged", async (_chainId) => {
       
        console.log(
          "444",
          parseInt(_chainId, 16).toString() !== process.env.REACT_APP_CHAIN_ID,
          parseInt(_chainId, 16).toString(),
          process.env.REACT_APP_CHAIN_ID
        );
        window.sessionStorage.setItem(
          "chain_id",
          parseInt(_chainId, 16).toString()
        );

      });
    }
  }, [currentAccount, props, provider]);

  useEffect(() => {
    async function updateAccount() {
      if (provider) {
        setCookie("selected_account", currentAccount, { path: "/" });

        web3 = initWeb3(provider);
        if (web3 && web3.eth) {
          let bal = await web3?.eth?.getBalance(currentAccount);
          setCookie("balance", bal);
        }
      }
    }
    if (currentAccount) {
      updateAccount();
    }
  }, [currentAccount, provider]);

  useEffect(() => {
    if (provider) {
      provider.on("disconnect", (error) => {
        console.log(error);
      });
    }
  }, [provider]);



  const handleNetworkSwitch = async (networkName) => {
    console.log(networkName);
    // try {
    //   try {
    //     await window.ethereum.request({
    //       method: "wallet_switchEthereumChain",
    //       params: [{ chainId: Networks[networkName].chainId }],
    //     });
    //     NotificationManager.success("Chain switched successfully");
    //   } catch (e) {
    //     if (e.code === 4902) {
    //       try {
    //         await window.ethereum.request({
    //           method: "wallet_addEthereumChain",
    //           params: [{ ...Networks[networkName] }],
    //         });
    //       } catch (addError) {
    //         console.error(addError);
    //         NotificationManager.success("Something went wrong");
    //       }
    //     } else {
    //       console.log(e)
    //       NotificationManager.success("Something went wrong");
    //     }
    //   }

    // } catch (e) {
    //   console.log("error in switch", e);
    // }
    // onConnect();
   
   try{ 
    // console.log(Networks[networkName]);
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Networks[networkName].chainId }],
      });
      NotificationManager.success("Chain switched successfully");
      setWrongNetwork(false)
      setIsPopup(false)
    } 
    catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{ ...Networks[networkName] }],
          });
          NotificationManager.success("Chain added successfully");
        } catch (addError) {
          console.error("Error adding chain:", addError);
          NotificationManager.error("Failed to add chain");
        }
      } else {
        console.error("Error switching chain:", switchError);
        NotificationManager.error("Failed to switch chain");
      }
    } }
    catch (outerError) {
      console.error("Error in switch:", outerError);
      NotificationManager.error("Failed to switch chain");
    }
  
  };

  const togglePopup = () => {
    setIsPopup(!isPopup);
    props.navigate('/')
  };

  useEffect(() => {
    setCurrentAccount(cookies.selected_account);
  }, [cookies.selected_account]);

  return (
    <>
      <button
        className="btn-main"
        style={{ color: props.color }}
        onClick={
          currentAccount ? onDisconnect : onConnect
        }
      >
        {currentAccount
          ? currentAccount.slice(0, 5) + "..." + currentAccount.slice(37, 42)
          : "Connect Wallet"}

      </button>
      {wrongNetwork ? (
        <>
          {isPopup && (
            <PopupModal
              content={
                <div className="popup-content">
                  <BsExclamationLg className="BsExclamationLg" />
                  <h2>WRONG NETWORK</h2>
                  <p>Please switch to {process.env.REACT_APP_NETWORK}</p>
                  <button
                    className="btn-main content-btn"
                    style={{ color: props.color }}
                    onClick={() =>
                      handleNetworkSwitch(process.env.REACT_APP_NETWORK)
                    }
                  >
                    Switch Network
                  </button>
                </div>
              }
              handleClose={togglePopup}
            />
          )}
        </>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    profileData: state.profileData,
  };
};

export default connect(mapStateToProps)(AccountModal);
