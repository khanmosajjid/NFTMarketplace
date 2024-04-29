import { ethers } from "ethers";
import contracts from "../config/contracts";

export const GENERAL_TIMESTAMP = 2214189165;
export const GENERAL_DATE = "01/03/2040";
export const CURRENCY = "MATIC";
export const MAX_ALLOWANCE_AMOUNT = ethers.constants.MaxInt256;
export const options = [
  // { value: contracts.WETH, title: "WMATIC" },
  // { value: contracts.USDC, title: "USDC" },
  { value: contracts.USDT, title: "USDT" },
];

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const MAX_FILE_SIZE = 50;
export const perPageCount = 12;
export const Network = {
  name: "Mumbai",
  chainId: process.env.REACT_APP_CHAIN_ID,
  _defaultProvider: (providers) =>
    new providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL),
};


export const getAction = (action, actionMeta) => {
  if (action === "Marketplace") {
    if (actionMeta === "Listed") {
      return "Listed";
    } else return "Unlisted";
  } else if (action === "Purchase") {
    return "Purchased";
  } else if (action === "Bids") {
    if (actionMeta === "Accept") {
      return "Accepted";
    } else if (actionMeta === "Reject") return "Rejected";
  } else if (action === "Transfer") {
    return "Transferred";
  } else if (action === "Creation") {
    return "Created";
  }
  return "";
};

export const USER_MESSAGE = "This is to verify if you are authorized user or not to view this content"