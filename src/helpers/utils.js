import contracts from "../config/contracts";
import { Networks } from "./../components/components/AccountModal/networks";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { getBalance } from "./getterFunctions";
import { Cookies } from "react-cookie";

const cookies = new Cookies();



export const checkIfValidFileExtension = (file, validExtensions) => {
  let extension = file.type.split("/").pop();
  let isValid = validExtensions.filter((e) => {
    return e === extension;
  });
  if (isValid.length > 0) {
    return true;
  }
  return false;
};

export const checkIfValidAddress = (addr) => {
  if (addr.length <= 41) {
    return false;
  }
  return true;
};

export const getMaxAllowedDate = () => {
  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  var maxDate = year + "-" + month + "-" + day;
  return maxDate;
};

export const getTokenSymbolByAddress = (addr) => {
  if (addr === contracts.WMATIC) {
    return "WMATIC";
  } else if (addr === contracts.USDC) {
    return "USDC";
  } else if (addr === contracts.USDT) {
    return "USDT";
  }
  return "";
};

export const handleNetworkSwitch = async (account) => {
  // setIsPopup(false);
  // setWrongNetwork(false);
  try {
    try {
      let res1 = await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: Networks[process.env.REACT_APP_NETWORK]?.chainId,
          },
        ],
      });
      cookies.set("chain_id",process.env.REACT_APP_CHAIN_ID, { path: "/" })

      return true
    } catch (e) {
      console.log("error in handle network switch is--->>", e)
      if (e.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{ ...Networks[process.env.REACT_APP_NETWORK] }],
          });
          let res = await getBalance(account);
          return res;
        } catch (addError) {
          console.error("chain error is---->", addError);
          if (addError.toString().includes() === "")
            if (addError.code === 4001) {
              NotificationManager.error("User denied", "", 1500);
            }

          return false;
        }
      } if (e.code === 4001) {
        console.log("in else if", e.code)
        NotificationManager.error("User denied", "", 1500);
        return false
      }
      // else {
      //   NotificationManager.success("Chain Switch Successfully", "", 1500);
      //   return false;
      // }
    }
  } catch (e) {
    if (e.code === 4001) NotificationManager.error("User denied", "", 1500);
    console.log("error in switch", e);
    return false;
  }
};
