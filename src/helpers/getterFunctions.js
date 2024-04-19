

import {
  exportInstance,
  GetCollectionsByAddress,
  GetCollectionsNftList,
  GetMyLikedNft,
  getUsersCollections,
  GetMyOnSaleNft,
  GetNftDetails,
  getOrderDetails,
  GetOwnedNftList,
  getAllCollections,
  GetHotCollections,
  fetchOfferNft,
  getCollectionsList,
  GetOrdersByNftId,
} from "../apiServices";
import { ethers } from "ethers";
import contracts from "../config/contracts";
import erc20Abi from "./../config/abis/erc20.json";
import erc721Abi from "./../config/abis/extendedERC721.json";
import erc1155Abi from "./../config/abis/extendedERC1155.json";
import { fetchBidNft } from "../apiServices";
import { GENERAL_DATE, GENERAL_TIMESTAMP, ZERO_ADDRESS } from "./constants";
import NotificationManager from "react-notifications/lib/NotificationManager";
import Avatar from "./../assets/images/avatar5.jpg";
import { getTokenSymbolByAddress } from "./utils";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import { slowRefresh } from "./NotifyStatus";
import { isEmptyObject } from "jquery";

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const buildSellOrder = async (id) => {
  let details;
  try {
    details = await getOrderDetails({ orderId: id });
    const order = [
      details.oSellerWalletAddress,
      details.oTokenAddress,
      details.oTokenId,
      details.oQuantity,
      details.oType,
      details.oPaymentToken,
      details.oPrice ? details.oPrice.$numberDecimal : "0",
      details.oValidUpto,
      details.oBundleTokens,
      details.oBundleTokensQuantities,
      details.oSalt,
    ];
    if (isEmptyObject(details)) {
      return false
    }
    return order;
  } catch (e) {
    console.log("error in api", e);
  }
};

export const buildBuyerOrder = async (bidData) => {
  let buyerOrder = []
  let amount = new BigNumber(bidData?.bidPrice?.toString())
    .multipliedBy(new BigNumber(bidData.bidQuantity?.toString()))
    .toString();
  if (bidData.isOffer === true) {
    for (let key = 0; key < 11; key++) {
      switch (key) {
        case 0:
          buyerOrder.push(bidData?.bidder);
          break;

        case 1:
          buyerOrder.push(bidData?.tokenAddress);
          break;
        case 2:
          buyerOrder.push(bidData?.tokenId);
          break;
        case 3:
          buyerOrder.push(bidData?.bidQuantity);
          break;
        case 4:
          buyerOrder.push(1);

          break;
        case 5:
          buyerOrder.push(bidData?.paymentToken);
          break;
        case 6:
          buyerOrder.push(amount);

          break;
        case 7:
          buyerOrder.push(bidData?.oBidDeadline);

          break;
        case 8:
          buyerOrder.push([]);
          break;
        case 9:
          buyerOrder.push([]);
          break;
        default:
          buyerOrder.push(parseInt(bidData?.salt));
      }
    }
  }
  else {
    let sellerOrder = await buildSellOrder(bidData?.orderId);
    if (sellerOrder === false) {
      slowRefresh(1000)
      return false
    }


    for (let key = 0; key < 11; key++) {
      switch (key) {
        case 0:
          buyerOrder.push(bidData?.bidder);
          break;

        case 1:
          buyerOrder.push(sellerOrder[key]);
          break;
        case 2:
          buyerOrder.push(sellerOrder[key]);
          break;
        case 3:
          buyerOrder.push(Number(bidData?.bidQuantity));

          break;
        case 4:
          buyerOrder.push(Number(sellerOrder[key]));

          break;
        case 5:
          buyerOrder.push(sellerOrder[key]);
          break;
        case 6:
          buyerOrder.push(amount);

          break;
        case 7:
          buyerOrder.push(bidData?.oBidDeadline);

          break;
        case 8:
          buyerOrder.push([]);
          break;
        case 9:
          buyerOrder.push([]);
          break;
        default:
          buyerOrder.push(parseInt(bidData?.salt));
      }
    }
  }

  return buyerOrder
}

export const getAllBidsByNftId = async (nftId) => {
  let dummyData = await fetchBidNft({
    nftID: nftId,
    orderID: "All",
    buyerID: "All",
    bidStatus: "All",
  });



  let data = [];
  let highestBid = 0;
  let highestBidData = {};
  let orderPaymentToken = [];
  let offerLength = 0;
  let bidLength = 0;

  let bidsWithNoOrder = []
  for (let i = 0; i < dummyData?.data?.length; i++) {
    try {
      if (dummyData.data[i]?.oBidStatus !== "Accepted" && dummyData.data[i]?.oBidStatus !== "Rejected") {
        console.log("dummyData.data[i].oOrderId", dummyData, dummyData.data[i].oOrderId)
        let _orderPaymentToken = await getOrderDetails({
          orderId: dummyData.data[i].oOrderId,
        });
        console.log("hhh", _orderPaymentToken)
        if (isEmptyObject(_orderPaymentToken)) {
          bidsWithNoOrder.push(i)
        }
        else
          orderPaymentToken.push(_orderPaymentToken.oPaymentToken);
      }
      else {
        bidsWithNoOrder.push(i)
      }
    }
    catch (e) {
      console.log("err", e)
      bidsWithNoOrder.push(i)
    }
  }
  console.log("bids with no order", bidsWithNoOrder)

  dummyData?.data
    ? // eslint-disable-next-line array-callback-return
    dummyData.data.map(async (d, i) => {
      if (!bidsWithNoOrder.includes(i)) {
        console.log("bids with no iii", i)
        if (d.oBidStatus !== "Accepted" && d.oBidStatus !== "Rejected") {
          let paymentSymbol = "";
          if (orderPaymentToken[i] !== ZERO_ADDRESS) {
            paymentSymbol = getTokenSymbolByAddress(orderPaymentToken[i]);
          }
          if (Number(d.oBidPrice.$numberDecimal) > Number(highestBid)) {
            highestBid = Number(d.oBidPrice.$numberDecimal);
            highestBidData = d;
            highestBidData.paymentSymbol = paymentSymbol;
          }
          if (d.oBidStatus === "MakeOffer") {
            offerLength += 1
          }
          if (d.oBidStatus === "Bid") {
            bidLength += 1
          }


          data.push({
            bidId: d._id,
            bidQuantity: d.oBidQuantity,
            bidPrice: d.oBidPrice.$numberDecimal,
            seller: d.oOwner.sWalletAddress,
            orderId: d.oOrderId,
            bidder: d.oBidder.sWalletAddress,
            bidderProfile: d.oBidder.sProfilePicUrl,
            buyerSignature: d.oBuyerSignature,
            bidderFullName: d.oBidder.oName
              ? d.oBidder.oName.sFirstname
              : d.oBidder
                ? d.oBidder.sWalletAddress
                : "Unnamed",
            nftId: d.oNFTId,
            owner: d.oSeller,
            oBidDeadline: d.oBidDeadline,
            paymentSymbol: paymentSymbol,
            isOffer: d.isOffer,
            bidStatus: d.oBidStatus,
            salt: d.salt,
            tokenId: d.tokenId,
            tokenAddress: d.tokenAddress,
            paymentToken: d.paymentToken
          });
        }
      }
    })
    : data.push([]);

  return { data: data, highestBid: highestBidData, offerLength, bidLength };
};

export const getUsersNFTs = async (
  currPage,
  pagePerCount,
  paramType,
  walletAddress,
  userId,
  isAuthor
) => {
  let formattedData = [];
  let details = [];
  if (walletAddress === "") {
    return [];
  }
  let searchParams;
  try {
    if (paramType === 0) {
      searchParams = {
        userId: userId,
        sortType: -1,
        sortKey: "nTitle",
        page: currPage,
        limit: pagePerCount,
      };
      details = await GetMyOnSaleNft(searchParams);
    } else if (paramType === 1) {
      searchParams = {
        page: currPage,
        limit: pagePerCount,
        userId: userId,
        searchType: "createdBy",
      };
      details = await GetOwnedNftList(searchParams);
    } else if (paramType === 2) {
      searchParams = {
        userId: userId,
        page: currPage,
        limit: pagePerCount,
      };
      details = await GetMyLikedNft(searchParams);
    } else if (paramType === 3) {
      searchParams = {
        sortType: -1,
        sortKey: "nTitle",
        page: currPage,
        searchType: "owned",
        limit: pagePerCount,
        userWalletAddress: walletAddress,
      };
      details = await GetOwnedNftList(searchParams);
    }

    details = details.data;
    if (details?.message === "not found") {
      return [];
    }
    if (details && details.results && details.results?.length > 0) {
      let arr = details.results[0];

      if (arr) {
        // eslint-disable-next-line array-callback-return
        arr.map((data, key) => {
          data.previewImg = data.nNftImage;
          data.deadline =
            data.nOrders?.length > 0
              ? data.nOrders[0].oValidUpto !== GENERAL_TIMESTAMP
                ? data.nOrders[0].oValidUpto
                : ""
              : "";
          data.auction_end_date =
            data.nOrders?.length > 0
              ? data.nOrders[0].auction_end_date !== GENERAL_DATE
                ? data.nOrders[0].auction_end_date
                : ""
              : "";
          data.authorLink = `/author/${data.nCreater._id}`;
          data.previewLink = "#";
          data.nftLink = "#";
          data.bidLink = "#";
          data.authorImg =
            data.nCreater && data.nCreater.sProfilePicUrl
              ? data.nCreater.sProfilePicUrl
              : Avatar;
          data.title = data ? data.nTitle : "";
          data.price = "";
          data.bid = "";
          data.likes = data.nUser_likes?.length;
          data.id = data ? data._id : "";
          data.count = details ? details.count : 1;
          data.authorAddress = data ? data.nCreater?.sWalletAddress : "";
          formattedData.push(data);
        });
      } else return false;
    }

    return formattedData;
  } catch (e) {
    console.log("error in api", e);
    return false;
  }
};

export const getCollections = async (
  currPage,
  perPageCount,
  userId,
  isAllCollections = false,
  ERC721 = "",
  searchedData = ""
) => {
  try {
    let result = [];
    let reqParams = { page: currPage, limit: perPageCount, userId: userId };

    let formattedData = [];
    if (isAllCollections) {
      reqParams = {
        page: currPage,
        limit: perPageCount,
        erc721: ERC721,
        sTextsearch: searchedData,
        sortType: -1,
      };
      result = await GetHotCollections(reqParams);
      if (!result) return [];
    } else {
      result = await getUsersCollections(reqParams);
      if (!result) return [];
    }
    let arr = result.results;
    arr
      ? arr.map((data, key) => {
        return formattedData.push({
          collectionImage: data.collectionImage
            ? data.collectionImage
            : "./img/author/author-7.jpg",
          authorImage:
            data.oUser.length > 0
              ? data.oUser[0].sProfilePicUrl
                ? data.oUser[0].sProfilePicUrl
                : Avatar
              : Avatar,
          collectionName: data.sName,
          collectionType: data.erc721 ? "ERC721" : "ERC1155",
          collectionAddress: data.sContractAddress,
          createdBy: data.sCreatedBy,
          authorId: data.oUser.length > 0 ? data.oUser[0]._id : "",
          count: result.count,
          authorAddress:
            data.oUser.length > 0 ? data.oUser[0].sWalletAddress : "",
        });
      })
      : formattedData.push([]);

    return formattedData;
  } catch (e) {
    console.log("error in api", e);
  }
};


const toTypedOrder = (
  account,
  tokenAddress,
  id,
  quantity,
  listingType,
  paymentTokenAddress,
  valueToPay,
  deadline,
  bundleTokens,
  bundleTokensQuantity,
  salt
) => {
  const domain = {
    chainId: process.env.REACT_APP_CHAIN_ID,
    name: "Digital Arms Marketplace",
    verifyingContract: contracts.MARKETPLACE,
    version: "V1.3",
  };

  const types = {
    Order: [
      { name: "user", type: "address" },
      { name: "tokenAddress", type: "address" },
      { name: "tokenId", type: "uint256" },
      { name: "quantity", type: "uint256" },
      { name: "listingType", type: "uint256" },
      { name: "paymentToken", type: "address" },
      { name: "value", type: "uint256" },
      { name: "deadline", type: "uint256" },
      { name: "bundleTokens", type: "uint256[]" },
      { name: "bundleTokensQuantity", type: "uint256[]" },
      { name: "salt", type: "uint256" },
    ],
  };

  const value = {
    user: account,
    tokenAddress: tokenAddress,
    tokenId: id,
    quantity: quantity,
    listingType: listingType,
    paymentToken: paymentTokenAddress,
    value: valueToPay,
    deadline: deadline,
    bundleTokens: bundleTokens,
    bundleTokensQuantity: bundleTokensQuantity,
    salt: salt,
  };

  return { domain, types, value };
};

export const getSignature = async (signer, ...args) => {
  try {
    const order = toTypedOrder(...args);
    console.log("order is---->",order);
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer1 = provider.getSigner();
    const signedTypedHash = await signer1._signTypedData(
      order.domain,
      order.types,
      order.value
    );
    console.log("signed type Hash",signedTypedHash)
    const sig = ethers.utils.splitSignature(signedTypedHash);

    return [sig.v, sig.r, sig.s];
  } catch (e) {
    if (e.code === 4001) {
      NotificationManager.error("User denied ");
      return false;
    }
    console.log("error in api", e);
    return false;
  }
};

export const getNextId = async (collection) => {
  try {
    let details = await GetCollectionsByAddress({
      sContractAddress: collection,
    });
    return details.nextId;
  } catch (e) {
    console.log("error in api", e);
  }
};

export const readReceipt = async (hash) => {
  try {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const receipt = await provider.getTransactionReceipt(hash.hash);
    let contractAddress = receipt.logs[0].address;
    return contractAddress;
  } catch (e) {
    console.log("error in api", e);
  }
};

export const getUsersTokenBalance = async (account, tokenAddress) => {
  let token;
  token = await exportInstance(tokenAddress, erc20Abi);
  let userBalance = await token.balanceOf(account);
  return userBalance.toString();
};

export const getTokenNameAndSymbolByAddress = async (address) => {
  try {
    if (address === ZERO_ADDRESS) return;
    let token = await exportInstance(address, erc20Abi);
    let symbol = await token.symbol();
    let name = await token.name();

    return {
      symbol: symbol,
      name: name,
    };
  } catch (e) {
    return {
      symbol: "",
      name: "",
    };
  }
};

export const getPaymentTokenInfo = async (userWallet, tokenAddress) => {
  try {
    if (tokenAddress === ZERO_ADDRESS)
      return {
        symbol: "",
        name: "",
      };
    if (userWallet === "") {
      return getTokenNameAndSymbolByAddress(tokenAddress);
    }
    let token = await exportInstance(tokenAddress, erc20Abi);
    let symbol = await token.symbol();
    let name = await token.name();
    let allowance = await token.allowance(userWallet, contracts.MARKETPLACE);
    let balance = await token.balanceOf(userWallet);
    return {
      symbol: symbol,
      name: name,
      balance: balance.toString(),
      allowance: allowance.toString(),
    };
  } catch (e) {
    return {
      symbol: "",
      name: "",
      balance: "",
      allowance: "",
    };
  }
};

export const checkIfLiked = async (nftId, authorId) => {
  let nftDetails = await GetNftDetails(nftId);
  let data = nftDetails?.nUser_likes?.filter((d) => {
    return d === authorId;
  });
  return data?.length > 0;
};


export const GetNftsByCollection = async (
  currPage,
  pagePerCount,
  owned,
  collection
) => {
  // let status;

  let formattedData = [];
  let details = [];

  let searchParams;
  try {
    searchParams = {
      page: currPage,
      limit: pagePerCount,
      collection: collection,
    };
    details = await GetCollectionsNftList(searchParams, owned);
  } catch (e) {
    console.log("Error in api", e);
  }

  let arr = [];
  if (details && details.results && details.results.length > 0)
    arr = details.results[0];
  else return [];


  arr
    ? arr.map(async (data, key) => {
      formattedData[key] = {
        deadline:
          data && data.nOrders.length > 0
            ? data.nOrders[0].oValidUpto !== GENERAL_TIMESTAMP
              ? data.nOrders[0].oValidUpto
              : ""
            : "",
        auction_end_date:
          data && data.nOrders.length > 0
            ? data.nOrders[0].auction_end_date !== GENERAL_DATE
              ? data.nOrders[0].auction_end_date
              : ""
            : "",
        authorLink: `/author/${data.nCreater._id}`,
        previewLink: "#",
        nftLink: "#",
        bidLink: "#",
        authorImg: data.nCreater.sProfilePicUrl
          ? data.nCreater.sProfilePicUrl
          : Avatar,
        previewImg: data.nNftImage ? data.nNftImage : Avatar,
        title: data ? data.nTitle : "",
        imageType: data ? data.nNftImageType : "",
        price: "",
        bid: "",
        likes: data.nUser_likes?.length,
        id: data ? data._id : "",
        count: details.count,
        isBlocked: data.isBlocked
        // creator: authorData.sProfilePicUrl?`https://decryptnft.mypinata.cloud/ipfs/${authorData.sProfilePicUrl}`:"",
      };
    })
    : (formattedData[0] = {});

  return formattedData;
};

export const GetOwnerOfToken = async (
  collection,
  tokenId,
  isERC721,
  account,
  calledThroughItemDetailPage = false
) => {
  try {

    let collectionInstance = await exportInstance(
      collection,
      isERC721 === 1 ? erc721Abi.abi : erc1155Abi.abi
    );

    console.log('jjjjjjjjjjjjjjj',collectionInstance)
    let balance = 0;
    if (isERC721 === 1) {
      console.log('blll-if',tokenId)
      let owner = await collectionInstance.ownerOf(tokenId)
      console.log('bll-if',owner)
      if (owner.toLowerCase() === account.toLowerCase()) {
        balance = "1";
      }
    } 
    else {
      console.log('blll',"else")
      balance = await collectionInstance.balanceOf(account, tokenId);
    }
    console.log("blllllll",balance);
    if (balance === 0) {
      return 0
    }
    console.log("balance",balance);
    return balance.toString();
  }
  catch (err) {
    console.log("err", err)
    if (err.toString().includes("unknown account #0") && calledThroughItemDetailPage) {
      NotificationManager.error("Not able to detect account, Please check if wallet is locked")
    }
    return 0
  }
};

export const checkIfCollectionNameAlreadyTaken = async (collName) => {
  try {
    let collections = await getAllCollections();
    collections = collections.filter((col) => col.sName === collName);
    if (collections.length > 0) return true;
    else return false;
  } catch (e) {
    console.log("error", e);
    return;
  }
};

export const getBalance = async (account) => {
  let web3 = new Web3(Web3.givenProvider);
  let bal = await web3.eth.getBalance(account);

  return bal.toString();
};


//getting allOfferbyNFTId
export const getAllOffersByNftId = async (nftId) => {

  let dummyData = await fetchOfferNft({
    nftID: nftId,
    buyerID: "All",
    bidStatus: "All",
  });

  let data = [];

  dummyData?.data
    ? // eslint-disable-next-line array-callback-return
    dummyData.data.map((d, i) => {
      data.push({
        bidId: d._id,
        bidQuantity: d.oBidQuantity,
        bidPrice: d.oBidPrice.$numberDecimal,
        seller: d.oOwner.sWalletAddress,
        orderId: d.oOrderId,
        bidder: d.oBidder.sWalletAddress,
        bidderProfile: d.oBidder.sProfilePicUrl,
        buyerSignature: d.oBuyerSignature,
        bidderFullName: d.oBidder.oName
          ? d.oBidder.oName.sFirstname
          : d.oBidder
            ? d.oBidder.sWalletAddress
            : "Unnamed",
        nftId: d.oNFTId,
        owner: d.oSeller,
      });
    })
    : data.push([]);

  return data;
};



export const connect = async () => {
  if (window.ethereum) {
    // commented for future use
    return new Promise((resolve, reject) => {

      let temp = window.ethereum.enable();
      // web3.eth.accounts.create();
      if (temp) {
        resolve(temp)
      } else {
        reject(temp);
      }

    })
  } else {
    this.toaster.error('No account found! Make sure the Ethereum client is configured properly. ', 'Error!')
    return 'error'
  }
}

export const getAllCollectionsList = async (
  currPage,
  perPageCount,
  userId,
  isAllCollections = false,
  ERC721 = "",
  searchedData = ""
) => {
  try {
    let result = [];
    let reqParams = { page: currPage, limit: perPageCount, userId: userId };

    let formattedData = [];
    if (isAllCollections) {
      reqParams = {
        page: currPage,
        limit: perPageCount,
        erc721: ERC721,
        sTextsearch: searchedData,
        sortType: -1,
      };
      result = await getCollectionsList(reqParams);
      if (!result) return [];
    } else {
      result = await getUsersCollections(reqParams);
      if (!result) return [];
    }
    let arr = result.results;
    arr
      ? arr.map((data, key) => {
        return formattedData.push({
          collectionImage: data.collectionImage
            ? data.collectionImage
            : "./img/author/author-7.jpg",
          authorImage:
            data.oUser.length > 0
              ? data.oUser[0].sProfilePicUrl
                ? data.oUser[0].sProfilePicUrl
                : Avatar
              : Avatar,
          collectionName: data.sName,
          collectionType: data.erc721 ? "ERC721" : "ERC1155",
          collectionAddress: data.sContractAddress,
          createdBy: data.sCreatedBy,
          authorId: data.oUser.length > 0 ? data.oUser[0]._id : "",
          count: result.count,
          authorAddress:
            data.oUser.length > 0 ? data.oUser[0].sWalletAddress : "",
        });
      })
      : formattedData.push([]);

    return formattedData;
  } catch (e) {
    console.log("error in api", e);
  }
};

const getButtonsBySaleType = (haveOrder, saleType, haveBid, haveOffer, isOwned) => {
  let buttons = []
  if (haveOrder && isOwned) {
    if (saleType === 0) {
      buttons.push("RemoveFromSale")
    }
    else if (saleType === 1) {
      buttons.push("RemoveFromAuction")
    }
  }
  else if (!haveOrder) {
    if (saleType === 0) {
      buttons.push("BuyNow")
    }
    else if (saleType === 1) {
      if (haveBid) {
        buttons.push("UpdateBid")
      }
      else {
        buttons.push("PlaceBid")
      }
    }

    if (haveOffer) {
      buttons.push("UpdateOffer")
    }
    else {
      buttons.push("MakeOffer")
    }
  }
  // else {
  //   if (!haveOrder && isOwned) {
  //     buttons.push("PutOnMarketplace")
  //   }
  // }
  return buttons
}

export const getButtonsGroup = (isLazyMint, saleType, haveOrder, haveBid, haveOffer, ownedQty, originalQty, currUser, _orders) => {

  let isOwned = checkIfOwned(isLazyMint, ownedQty, originalQty)

  if (_orders && _orders?.length >= 1 && !isEmpty(_orders[0]) && currUser && _orders !== "null") {
    let datas = _orders?.filter((data, key) => {
      return (
        data.oSellerWalletAddress?.toLowerCase() ===
        currUser?.toLowerCase()
      );
    });
    if (datas?.length >= 1) {
      haveOrder = true
    } else {
      haveOrder = false
    }
  }
  let buttons = []
  if (isOwned) {

    if (!haveOrder) {
      buttons.push("PutOnMarketplace")
    }
  }

  return buttons
}

export const checkIfOwned = (isLazyMint, ownedQty, originalQty) => {
  if (isLazyMint) {
    if (Number(ownedQty) > 0) {
      return true
    }
    else return false
  }
  else {

    if (Number(originalQty) > 0) {
      return true
    }
    else return false
  }
}

const checkIfHaveOrder = (orderData, currUser) => {
  if (orderData === "") {
    return false
  }
  if (orderData.oSellerWalletAddress?.toLowerCase() === currUser?.toLowerCase()) {
    return true
  }
  else
    return false
}

export const getButtonsByOrderGroup = (isLazyMint, ownedQty, originalQty, currUser, orders) => {
  let isOwned = checkIfOwned(isLazyMint, ownedQty, originalQty)
  let orderBtn = []
  for (let i = 0; i < orders.length; i++) {
    let haveOrder = checkIfHaveOrder(orders[i], currUser)

    let buttonsG1 = []
    buttonsG1 = getButtonsBySaleType(haveOrder, orders[i].oType, false, false, isOwned)
    orderBtn.push(buttonsG1)

  }
  return orderBtn
}

export const fetchPageData = async (id, currentUser) => {
  let data = {}
  let response = {}
  response.errorStatus = false
  try {
    if (id && id !== undefined) {
      data = await GetNftDetails(id);
    }
    response.isLazyMint = data.nLazyMintingStatus
    if (data && data.nOwnedBy && currentUser && currentUser !== "null") {
      response.owners = data.nOwnedBy
      let datas = data.nOwnedBy.filter((d, key) => {
        if (d.address) {
          return d?.address?.toLowerCase() === currentUser?.toLowerCase();
        }
      });

      if (datas?.length >= 1) {
        response.isOwned = true
        response.ownedQuantity = datas[0].quantity
        response.currUserLazyMinted = datas[0].lazyMinted
      }
      else {
        response.isOwned = false
        response.ownedQuantity = 0
      }
    }

    let searchParams = {
      nftId: data._id,
      sortKey: "oTokenId",
      sortType: -1,
      page: 1,
      limit: 4,
    };

    let d = await GetOrdersByNftId(searchParams);

    if (d.results?.length === 0) {
      response.orders = []
      response.haveOrder = false
    } else {
      let _orderState = [];
      for (let i = 0; i < d.results?.length; i++) {
        _orderState[i] = false;

        let searchParams = {
          nftID: data._id,
          orderID: d.results[i]._id,
          buyerID: "All",
          bidStatus: "All",
        };

        let _data = await fetchBidNft(searchParams);
        if (data && currentUser && currentUser !== "null") {
          if (d.results[i].oPaymentToken !== ZERO_ADDRESS) {
            let paymentData = await getPaymentTokenInfo(
              currentUser,
              d.results[i].oPaymentToken
            );

            paymentData.paymentToken = d.results[i].oPaymentToken;
            d.results[i].paymentTokenData = paymentData;
          }
          for (let j = 0; j < _data.data?.length; j++) {

            if (
              _data.data[j]?.oBidder?.sWalletAddress?.toLowerCase() ===
              currentUser?.toLowerCase() && _data.data[j].oBidStatus === "Bid"
            ) {
              d.results[i].isUserHaveActiveBid = true;

            } else if (d.results[i].isUserHaveActiveBid !== true) {
              d.results[i].isUserHaveActiveBid = false;
            }
            if (
              _data.data[j]?.oBidder?.sWalletAddress?.toLowerCase() ===
              currentUser?.toLowerCase() && _data.data[j].oBidStatus === "MakeOffer"
            ) {
              d.results[i].isUserHaveActiveOffer = true;

            } else if (d.results[i].isUserHaveActiveOffer !== true) {
              d.results[i].isUserHaveActiveOffer = false;
            }
          }
        } else {
          let paymentData = await getPaymentTokenInfo(
            "",
            d.results[i].oPaymentToken
          );
          paymentData.paymentToken = d.results[i].oPaymentToken;
          d.results[i].paymentTokenData = paymentData;
        }
      }
      response.orderState = _orderState
      let _orders = d.results;
      if (_orders && _orders?.length >= 1 && !isEmpty(_orders[0]) && currentUser && currentUser !== "null") {
        let datas = _orders.filter((data, key) => {
          return (
            data.oSellerWalletAddress?.toLowerCase() ===
            currentUser?.toLowerCase()
          );
        });
        if (datas?.length >= 1) {
          response.connectedUserOrderId = datas[0]._id
          response.haveOrder = true
        } else {
          response.haveOrder = false
        }
      }
      response.orders = d.results ? d.results : []

    }

  }
  catch (e) {
    console.log("e", e)
    response.error = e
    response.errorStatus = true
  }
  return response
}

export const getCurrentProvider = async () => {
  return new ethers.providers.Web3Provider(window.ethereum)
}