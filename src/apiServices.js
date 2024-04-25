import { ethers } from "ethers";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { slowRefresh } from "./helpers/NotifyStatus";

import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
import eventEmitter from "./events/events";

export const exportInstance = async (SCAddress, ABI) => {
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer = provider.getSigner();
  let a = new ethers.Contract(SCAddress, ABI, signer);
  console.log("contract is----->",a)

  if (a) {
    return a;
  } else {
    return {};
  }
};

export const Register = async (account) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sWalletAddress: account,
    }),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/auth/Register",
      requestOptions
    );

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson && (await response.json());

    // check for error response
    if (!response.ok) {
      // get error message from body or default to response status
      const error = (data && data.message) || response.status;
      return Promise.reject(error);
    }
  } catch (error) {
    //   this.setState({ postId: data.id });

    // this.setState({ errorMessage: error.toString() });
    console.error("There was an error!", error);
  }
};

export const Login = async (account, signature, wallet, message) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true, // should be there
    credentials: 'include',// should be there
    body: JSON.stringify({
      sWalletAddress: account,
      sSignature: signature,
      sWalletAddress: wallet,
      sMessage: message
    }),
  };
  console.log("dataaa", account, signature, wallet, message )
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/auth/Login",
      requestOptions
    );

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson && (await response.json());

    localStorage.setItem("decrypt_userId", data.data.userId)
    // check for error response
    if (!response.ok) {
      // get error message from body or default to response status
      const error = (data && data.message) || response.status;
      return Promise.reject(error);
    }
    localStorage.setItem("decrypt_authorization", data.data.token);
    return data.data.token;
    //   this.setState({ postId: data.id });
  } catch (error) {
    // this.setState({ errorMessage: error.toString() });
    console.error("There was an error!", error);
  }
};

export const Logout = async () => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getHeaders(),
      },
    };
    const response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/auth/Logout",
      requestOptions
    );

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson && (await response.json());

    localStorage.removeItem("userId")
    window.sessionStorage.removeItem("Authorization", data.data.token);
  } catch (e) {
    console.log("error", e);
    return [];
  }
};

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getProfile = async () => {
  try {
    console.log("proffffff",localStorage.getItem("decrypt_authorization"));
    const response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/user/Profile",
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("decrypt_authorization"),
          credentials: true,
        },
      }
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson && (await response.json());

    if (data.statusCode === 404 || data.statusCode === 401) {

      //NotificationManager.error("Disconnect and connect wallet again","",3000); 
    }

    return data;
  } catch (e) {
    console.log("error", e);
    return [];
  }
};

export const getHeaders = () => {
  let t = localStorage.getItem("decrypt_authorization");
  return t && t !== undefined ? t : "";
};

export const checkuseraddress = async (account) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sWalletAddress: account,
    }),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/auth/checkuseraddress",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson && (await response.json());
    return data.message;
  } catch (err) {
    return err;
  }
};

export const updateProfile = async (account, data) => {
  let formData = new FormData();

  formData.append("sUserName", data.uname);
  formData.append("sFirstname", data.fname);
  formData.append("sLastname", data.lname);
  formData.append("sBio", data.bio);
  formData.append("sWebsite", data.website);
  formData.append("sEmail", data.email);
  formData.append("sWalletAddress", account);
  if (data.profilePic)
    formData.append("userProfile", data.profilePic ? data.profilePic : "");

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
    body: formData,
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/user/updateProfile",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.message;
  } catch (err) {
    return err;
  }
};

export const Follow = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
    body: JSON.stringify({ id: data }),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/user/follow",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.message;
  } catch (err) {
    return err;
  }
};

export const GetAllUserDetails = async (searchData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization:localStorage.getItem("Authorization"),
    },
    body: JSON.stringify(searchData),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/user/allDetails",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const GetIndividualAuthorDetail = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:localStorage.getItem("decrypt_authorization"),
    },
    body: JSON.stringify(data),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/user/profileDetail",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const getUsersCollections = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization:localStorage.getItem("Authorization"),
    },
    body: JSON.stringify(data),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/collectionList",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    if (datas.data) return datas.data;
    return [];
  } catch (err) {
    return err;
  }
};




export const getBanner = async () => {
  // let searchData = {
  //   length: 9,
  //   start: 0,
  //   eType: ["All"],
  //   sTextsearch: "",
  //   sSellingType: "",
  //   sSortingType: "Recently Added",
  //   sFrom: 0,
  //   sTo: 0,
  //   sGenre: [],
  // };
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/getBanner",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const getOwnedList = async () => {
  // let searchData = {
  //   length: 9,
  //   start: 0,
  //   eType: ["All"],
  //   sTextsearch: "",
  //   sSellingType: "",
  //   sSortingType: "Recently Added",
  //   sFrom: 0,
  //   sTo: 0,
  //   sGenre: [],
  // };
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/getAllNfts",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const createCollection = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
    body: data,
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/createCollection",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());

    return datas.message;
  } catch (err) {
    return err;
  }
};

export const getAllCollections = async () => {
  const requestOptions = {
    method: "GET",
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/getCollections",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const getCollectionWiseList = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/allCollectionWiseList",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};




export const GetHotCollections = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/getHotCollections",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const getCollectionsList = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/getAllCollections",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const Like = async () => { };

export const getOrderDetails = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/order/getOrder",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const GetOnSaleItems = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/getOnSaleItems",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const GetNftDetails = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/viewnft/" + id,
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());

    return datas.data ? datas.data : [];
  } catch (err) {
    return err;
  }
};

export const SetNFTOrder = async (data) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("decrypt_authorization"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/setNFTOrder",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const UpdateOrderStatus = async (data) => {
  const requestOptions = {
    method: "PUT",

    headers: {
      Authorization: localStorage.getItem("decrypt_authorization"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/order/updateOrder",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const LikeNft = async (data) => {
  const requestOptions = {
    method: "POST",

    headers: {
      Authorization: localStorage.getItem("decrypt_authorization"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/like",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const GetCollectionsByAddress = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL +
      "/nft/getCollectionDetailsByAddress/",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const GetMetaOfCollection = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL +
      "/nft/getMetaDataOfCollection/",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const GetCollectionsById = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/getCollectionDetailsById/",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const GetOwnedNftList = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/getOwnedNFTList",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas;
  } catch (err) {
    return err;
  }
};

export const GetMyCollectionsList = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/myCollectionList",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const GetMyLikedNft = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/getUserLikedNfts",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas;
  } catch (err) {
    return err;
  }
};

export const GetMyOnSaleNft = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/getUserOnSaleNfts",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas;
  } catch (err) {
    return err;
  }
};

export const GetCollectionsNftList = async (data, owned = false) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
    body: JSON.stringify(data),
  };
  try {
    let response = await fetch(
      !owned
        ? process.env.REACT_APP_API_BASE_URL + "/nft/getCollectionNFT"
        : process.env.REACT_APP_API_BASE_URL + "/nft/getCollectionNFTOwned",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const GetSearchedNft = async (data, owned = false) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/getSearchedNft",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const updateBidNft = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
    body: JSON.stringify(data),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/bid/updateBidNft",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas;
  } catch (err) {
    return err;
  }
};

export const fetchBidNft = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
    body: JSON.stringify(data),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/bid/fetchBidNft",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const GetOrdersByNftId = async (data) => {
  //   {
  //     "nftId": "6229812aa2c3ed3120651ca6",
  //     "sortKey": "oTokenId",
  //     "sortType": -1,
  //     "page": 1,
  //     "limit": 4
  // }

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/order/getOrdersByNftId",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const createNft = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
    body: data,
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/create",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());

    return datas;
  } catch (err) {
    return err;
  }
};

export const createOrder = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("decrypt_authorization"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/order/createOrder",
      requestOptions
    );

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());

    return datas;
  } catch (err) {
    return err;
  }
};

//Create Offer
export const createOfferNFT = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
    body: JSON.stringify(data),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/bid/createOfferNft",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};
//Create offer ends

//Fetch offer start
export const fetchOfferNft = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getHeaders(),
    },
    body: JSON.stringify(data),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/bid/fetchOfferNft",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    console.log("'error in offer-->", err);
    return err;
  }
};
//Fetch offer ends

export const DeleteOrder = async (data) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/order/deleteOrder",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

//Delete Offer
export const DeleteOfferOrder = async (data) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/order/deleteOfferOrder",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const deleteBids = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getHeaders(),
    },
    body: JSON.stringify(data),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/bid/deleteBidsByBidId",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};


export const TransferNfts = async (data) => {

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/transferNfts",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const createBidNft = async (data) => {

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
    body: JSON.stringify(data),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/bid/createBidNft",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};



export const checkBidOffer = async (data) => {
  let data1 = {
    bidID: data
  }
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
    body: JSON.stringify(data1),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/bid/checkBidOffer",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas;
  } catch (err) {
    return err;
  }
};

export const acceptBid = async (data) => {

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
    body: JSON.stringify(data),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/bid/acceptBidNft",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

//Accept Offer
export const acceptOffer = async (data) => {

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
    body: JSON.stringify(data),
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/bid/acceptOfferNft",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const InsertHistory = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/history/insert",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const GetHistory = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/history/fetchHistory",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    return err;
  }
};

export const UpdateTokenCount = async (data) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("decrypt_authorization"),
    },
  };
  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + `/nft/updateCollectionToken/${data}`,
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    return datas.data;
  } catch (err) {
    console.log("error in updatetoken count", err);
    return err;
  }
};


export const UpdateStatus = async (data, historyData, key) => {
  const requestOptions = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: getHeaders(),
    },
    body: JSON.stringify(data)
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/updateStatus",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());
    if (datas.statusCode !== 409 && historyData !== "" && historyData !== undefined && datas.statusCode !== 404) {
      await InsertHistory(historyData)
    }
    if (datas.statusCode === 409) {
      return false
    }
    return datas.data;
  } catch (err) {
    return err;
  }
};



export const getOwners = async (address, tokenId) => {

  try {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-API-Key': 'vnzcfmmv4ySCB7OfrB4C7tB2eQfs07RyDPpRTeGNP6YLN1NVFxbw75cOMiRMExvI'
      }
    };

    let response = await fetch(`https://deep-index.moralis.io/api/v2/nft/${address}/${tokenId}/owners?chain=mumbai&format=decimal`, options)
    response = await response.json()
    return response.result
  }

  catch (e) {
    console.log("e", e)
    return []
  }

}

export const updateOwner = async (data) => {
  const requestOptions = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/updateOwner",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());

    return datas.data;
  } catch (err) {
    return err;
  }
};

export const checkOwnerChange = async (data) => {
  const requestOptions = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/updateOwnerWithOrder",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());

    return datas.data;
  } catch (err) {
    return err;
  }
};

export const checkAuthorization = async () => {
  console.log("h1")
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getHeaders()
    },
  };

  try {
    if (getHeaders()) {
      let response = await fetch(
        process.env.REACT_APP_API_BASE_URL + "/auth/checkIfAuthorized",
        requestOptions
      );

      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const datas = isJson && (await response.json());
      console.log("authorization", datas)
      if (datas.statusCode === 200) return datas.data;
      else if (datas.statusCode == 401) {
        // eventEmitter.emit("disconnectWallet")
        return false
      }
    }
    else {
      return false
    }
  } catch (err) {
    return err;
  }
};
export const getUnlockableContent = async (data) => {
  const requestOptions = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "Authorization": getHeaders()
    },
    body: JSON.stringify(data)
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/getUnlockableContent",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());

    return datas.data;
  } catch (err) {
    return err;
  }
};

export const updateVolume = async (data) => {
  const requestOptions = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "Authorization": getHeaders()
    },
    body: JSON.stringify(data)
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_API_BASE_URL + "/nft/updateCOllectionVolume",
      requestOptions
    );
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const datas = isJson && (await response.json());

    return datas.data;
  } catch (err) {
    return err;
  }
};