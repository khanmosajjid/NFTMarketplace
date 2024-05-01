/* eslint-disable array-callback-return */
/* eslint-disable no-eval */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Clock from "../components/Clock";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import { getAction, USER_MESSAGE } from "../../helpers/constants";
import {
  fetchBidNft,
  GetHistory,
  GetNftDetails,
  InsertHistory,
  getProfile,
  fetchOfferNft,
  checkBidOffer,
  getUnlockableContent,
} from "../../apiServices";
import Loader from "../components/loader";
import {
  createBid,
  handleAcceptBids,
  handleBuyNft,
  handleNftTransfer,
  handleRemoveFromAuction,
  handleUpdateBidStatus,
  createOffer,
  handleAcceptOffers,
  checkOwnerChangeAndUpdate,
  sign
} from "../../helpers/sendFunctions";
import { convertToEth } from "../../helpers/numberFormatter";
import { handleRemoveFromSale } from "../../helpers/sendFunctions";
import PopupModal from "../components/AccountModal/popupModal";
import { putOnMarketplace } from "../../helpers/sendFunctions";
import "./../../assets/images/avatar5.jpg";
import { NotificationManager } from "react-notifications";
import {
  CURRENCY,
  GENERAL_DATE,
  GENERAL_TIMESTAMP,
  ZERO_ADDRESS,
} from "../../helpers/constants";
import BigNumber from "bignumber.js";
import {
  getAllBidsByNftId,
  GetOwnerOfToken,
  getButtonsGroup,
  getButtonsByOrderGroup,
  checkIfOwned,
  fetchPageData,
  getBalance
} from "../../helpers/getterFunctions";
import { isEmpty } from "../../helpers/getterFunctions";
import "./../components-css/item-detail.css";
import { options } from "../../helpers/constants";
import { useParams } from "react-router-dom";
import Avatar from "./../../assets/images/avatar5.jpg";
import {
  checkIfValidAddress,
  getTokenSymbolByAddress,
  handleNetworkSwitch,
} from "./../../helpers/utils";
import { useCookies } from "react-cookie";
import contracts from "../../config/contracts";
import { perPageCount } from "./../../helpers/constants";
import { Pagination } from "@material-ui/lab";
import ConnectWallet from "../components/AccountModal/ConnectWallet";
import { showProcessingModal } from "../../utils";
import PolygonLogo from "../../assets/images/polygonLogo.png";
import { isEmptyObject } from "jquery";
import moment from "moment";
import UsdtTokenAddress from "../../config/contracts";
import evt from "./../../events/events";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
    border-bottom: solid 1px #dddddd;
  }                      <span>{nftDetails ? nftDetails?.nCreater?.sUserName : nftDetails.nCollection}</span>

  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const ItemDetails = function (props) {

  const [selectedMenu, setSelectedMenu] = useState(0) //0: Action, 1: History, 2: Active Bids, 3: Details, 4: Active Offers

  // LOADERS
  const [loading, setLoading] = useState(false);
  const [placeBidLoader, setPlaceBidLoader] = useState(false);
  const [placeOfferLoader, setPlaceOfferLoader] = useState(false);
  const [transferLoader, setTransferLoader] = useState(false);
  const [removeFromSaleLoader, setRemoveFromSaleLoader] = useState(false);
  const [putOnMarketplaceLoader, setPutOnMarketplaceLoader] = useState(false);
  const [orderState, setOrderState] = useState([]);
  const [nftDetails, setNftDetails] = useState({});
  const [orders, setOrders] = useState(null);
  const [isPopup, setIsPopup] = useState(false);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [isMarketplacePopup, setMarketplacePopup] = useState(false);
  const [marketplacePrice, setMarketplacePrice] = useState("");
  const [marketplaceSaleType, setMarketplaceSaleType] = useState(0);
  const [isOwned, setIsOwned] = useState(null);
  const [marketplaceQuantity, setMarketplaceQuantity] = useState(1);
  const [haveOrder, setHaveOrder] = useState("null");
  const [ownedQuantity, setOwnedQuantity] = useState();
  const [minimumBid, setMinimumBid] = useState("");
  const [endTime, setEndTime] = useState();
  const [selectedTokenAddress, setSelectedTokenAddress] = useState(
    contracts.USDT
  );
  const [beneficiary, setBeneficiary] = useState("");
  const [transferQuantity, setTransferQuantity] = useState(1);
  const [isTransferPopup, setIsTransferPopup] = useState(false);
  const [isPlaceABidPopup, setIsPlaceABidPopup] = useState(false);
  const [selectedOrderPaymentTokenData, setSelectedOrderPaymentTokenData] =
    useState();
  const [bidQty, setBidQty] = useState(1);
  const [bidPrice, setBidPrice] = useState("");
  const [currentOrderId, setCurrentOrderId] = useState();
  const [currentOrder, setCurrentOrder] = useState([])
  const [currentOrderSeller, setCurrentOrderSeller] = useState();
  const [bids, setBids] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentBuyPrice, setCurrentBuyPrice] = useState(0);
  const [currOrderLeftQty, setCurrOrderLeftQty] = useState(0);
  const [currentOrderMinBid, setCurrentOrderMinBid] = useState(0);
  const [metaData, setMetaData] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [history, setHistory] = useState([]);
  const [profile, setProfile] = useState();
  const [cookies, setCookie] = useCookies();
  const [currOrderType, setCurrOrderType] = useState();
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [checkoutLoader, setCheckoutLoader] = useState(false);
  const [connectedUserOrderId, setConnectedUserOrderId] = useState();
  const [highestBid, setHighestBid] = useState();
  const [showNotConnectedModal, setNotConnectedModal] = useState(false);
  const [isOfferModal, setIsOfferModal] = useState(false);
  const [offerPrice, setOfferPrice] = useState();
  const [offerQuantity, setOfferQuantity] = useState(1);
  const [reloadContent, setReloadContent] = useState(false);
  const [deactivated, setDeactivated] = useState(false);;
  const [offerLength, setOfferLength] = useState(0)
  const [isActiveBid, setIsActiveBid] = useState(false)
  const [isActiveOffer, setIsActiveOffer] = useState(false)
  const [bidsLength, setBidsLength] = useState(0)
  const [originalQty, setOriginalQty] = useState(null)
  const [userId, setUserId] = useState("");
  const [currBid, setCurrBid] = useState({})
  const [currOffer, setCurrOffer] = useState({})
  const [isLazyMint, setIsLazyMint] = useState("")
  const [buttons, setButtons] = useState(null);
  const [owners, setOwners] = useState([])
  const [ownerChange, setOwnerChange] = useState(false);
  const [currUserLazyMinted, setCurrUserLazyMinted] = useState(false)
  const [activeRefresh, setActiveRefresh] = useState(false)
  const [lockedContent, setLockedContent] = useState("")


  const resetStates = () => {
    setIsOfferModal(false)
    setIsPlaceABidPopup(false)
    setIsTransferPopup(false)
    setIsActiveBid(false)
    setIsActiveOffer(false)
    setIsPopup(false)
    setBuyQuantity(1)
    setHaveOrder("null")
    setIsOwned("null")
    setOfferQuantity(1)
    setOfferPrice("")
    setHighestBid("")
    setCurrOrderType("")
    setCurrentOrderId("")
    setBidQty(1)
    setBidPrice("")
    setCurrentBuyPrice(0)
    setCurrOrderLeftQty(0)
    setCurrentOrderMinBid(0)
    setCurrentOrderSeller("")
    setCurrOffer({})
    setCurrBid({});
    setBeneficiary("")
    setTransferQuantity(1)
    setOriginalQty("null")
    setOwnedQuantity("")
    setLoading(false)
    setLockedContent("")
  }

  evt.removeAllListeners("resetStates");
  evt.on("resetStates", resetStates);


  const refreshReload = () => {
    setReloadContent(!reloadContent)
  }
  evt.removeAllListeners("refreshReload");
  evt.on("refreshReload", refreshReload);


  const resetForm = () => {
    setMinimumBid("");
    setMarketplacePrice("");
    setMarketplaceQuantity(1);
    setMarketplaceSaleType(0);
    setEndTime();
  }

  let { id } = useParams();
  const toggleMarketplace = () => {
    setMarketplacePopup(!isMarketplacePopup);
    resetForm();
  };

  const onAuctionEnd = (index) => {
    let _orderState = orderState;
    _orderState[index] = true;
    setOrderState([orderState]);
  };

  const handleChange = (e, p) => {
    setCurrPage(p);
  };

  const renderButtons = (b, seller, price, orderId, qty, qtySold, key, paymentTokenData, timestamp, qtyLeft, orderType,
    sellerId,
    isUserHaveActiveOffer, isUserHaveActiveBid, order) => {

    if (b === "RemoveFromSale" && checkIfLoadedWithWallet()) {
      return RemoveFromSale(seller,
        price,
        orderId,
        qty,
        qtySold)
    }
    else if (b === "RemoveFromAuction" && checkIfLoadedWithWallet()) {
      return RemoveFromAuction(seller,
        price,
        orderId,
        key,
        qty,
        qtySold,
        paymentTokenData,
        timestamp)
    }
    else if (b === "BuyNow") {
      return buyNow(seller,
        price,
        orderId,
        qtyLeft,
        qty,
        orderType,
        sellerId,
        isUserHaveActiveOffer,
        order)
    }
    else if (b === "PlaceBid") {
      return placeABid(seller,
        price,
        orderId,
        timestamp,
        key,
        qty,
        paymentTokenData,
        sellerId,
        qtySold,
        isUserHaveActiveBid,
        isUserHaveActiveOffer,
        order)
    }
  }

  // Buy NFTs
  const modal = (
    <PopupModal
      content={
        <div className="popup-content1">
          <h3 className="modal_heading">Checkout</h3>
          <p className="bid_buy_text">
            You are about to purchase a{" "}
            <strong>
              {nftDetails
                ? nftDetails.nTitle?.length > 15
                  ? nftDetails.nTitle?.slice(0, 15) + "..."
                  : nftDetails.nTitle
                : ""}
            </strong>{" "}
            from <br />
            <strong>
              {nftDetails
                ? nftDetails?.nCreater?.sUserName
                  ? nftDetails?.nCreater?.sUserName
                  : nftDetails?.nCreater?.sWalletAddress
                    ? nftDetails?.nCreater?.sWalletAddress.slice(0, 11) +
                    "..." +
                    nftDetails?.nCreater?.sWalletAddress.slice(38, 42)
                    : ""
                : ""}
            </strong>
          </p>
          <div className="bid_user_details">
            <div className="polygonLogo">
              <img src={PolygonLogo} alt="logoImage" />
            </div>
            <div className="bid_user_address">
              <div>
                <span className="adr">{`${currentUser?.slice(0, 11) + "..." + currentUser?.slice(38, 42)
                  }`}</span>
                <span className="badge badge-success">Connected</span>
              </div>
              <span className="pgn">Polygon</span>
            </div>
          </div>
          {nftDetails.nType !== 1 ? (
            <>
              <h6 className="enter_quantity_heading required">
                {" "}
                Please Enter the Quantity
              </h6>
              <input
                className="form-control quantity-input-fields"
                type="text"
                placeholder="0"
                min="1"
                value={buyQuantity}
                onKeyPress={(e) => {
                  if (!/^\d*$/.test(e.key)) e.preventDefault();
                }}
                onChange={(e) => {
                  if (Number(e.target.value) > Number(currOrderLeftQty)) {
                    NotificationManager.error(
                      "Quantity should be less than order quantity",
                      "",
                      1500
                    );
                    return;
                  }
                  setBuyQuantity(e.target.value);
                }}
              ></input>
            </>
          ) : (
            ""
          )}


          <button
            disabled={loading}
            className="btn-main btn-buyNow content-btn1 mt-4"
            // style={{ color: props.color }}
            min="1"
            onClick={async () => {
              let res1 = await handleNetworkSwitch(currentUser);
              setCookie("balance", res1, { path: "/" });
              if (res1 === false) return;
              setIsPopup(false);
              setBuyQuantity(1)
              setCheckoutLoader(true);
              if (!currentUser) {
                NotificationManager.error(
                  "Please try to reconnect wallet",
                  "",
                  1500
                );
                setLoading(false);
                return;
              }

              let bal1 = await getBalance(currentUser)
              let bal = new BigNumber(convertToEth(bal1));

              let payableAmount;
              if (nftDetails && nftDetails.nType === 1)
                payableAmount = new BigNumber(1).multipliedBy(
                  new BigNumber(currentBuyPrice)
                );
              else
                payableAmount = new BigNumber(buyQuantity).multipliedBy(
                  new BigNumber(currentBuyPrice)
                );

              if (payableAmount.isGreaterThan(bal)) {
                NotificationManager.error("Not enough balance", "", 1500);
                setLoading(false);
                setCheckoutLoader(false);
                return;
              }
              if (Number(buyQuantity) < 1) {
                NotificationManager.error("Quantity can't be zero", "", 1500);
                setCheckoutLoader(false);
                setLoading(false);

                return;
              }

              let historyMetaData = {
                nftId: nftDetails._id,
                userId: nftDetails.nCreater._id,
                action: "Purchase",
                actionMeta: "Default",
                message: `${buyQuantity} Quantity For ${currentOrderMinBid} ${CURRENCY} by ${profile.sWalletAddress
                  ? profile.sWalletAddress.slice(0, 3) +
                  "..." +
                  profile.sWalletAddress.slice(39, 42)
                  : ""}`,

              };

              let sellerData = owners?.filter((o) => {
                return o?.address?.toLowerCase() === currentOrder?.oSellerWalletAddress?.toLowerCase()
              }
              )
              let res = await handleBuyNft(
                currentOrderId,
                nftDetails?.nType,
                currentUser?.toLowerCase(),
                buyQuantity,
                isLazyMint,
                historyMetaData,
                sellerData?.length > 0 ? sellerData[0] : []

              );
              setBuyQuantity(1);
              setReloadContent(!reloadContent)
              setCheckoutLoader(false);

            }}
          >
            Buy Now
          </button>

        </div >
      }
      handleClose={() => {
        setIsPopup(!isPopup);
        setBuyQuantity(1);
        setCheckoutLoader(false);
      }}
    />
  );

  //Make Offer Modal
  const makeOfferModal = (
    <PopupModal
      content={
        <div className="popup-content1">
          <h3 className="modal_heading">Checkout</h3>
          <p className="bid_buy_text">
            You are about to place a Offer for{" "}
            <strong>
              {nftDetails
                ? nftDetails.nTitle?.length > 15
                  ? nftDetails.nTitle?.slice(0, 15) + "..."
                  : nftDetails.nTitle
                : ""}
            </strong>{" "}
            from <br />
            <strong>
              {nftDetails
                ? nftDetails?.nCreater?.sUserName
                  ? nftDetails?.nCreater?.sUserName
                  : nftDetails?.nCreater?.sWalletAddress
                    ? nftDetails?.nCreater?.sWalletAddress.slice(0, 11) +
                    "..." +
                    nftDetails?.nCreater?.sWalletAddress.slice(38, 42)
                    : ""
                : ""}
            </strong>
          </p>
          <div className="bid_user_details">
            <div className="polygonLogo">
              <img src={PolygonLogo} alt="logoImage" />
            </div>
            <div className="bid_user_address">
              <div>
                <span className="adr">{`${currentUser?.slice(0, 11) + "..." + currentUser?.slice(38, 42)
                  }`}</span>
                <span className="badge badge-success">Connected</span>
              </div>
              <span className="pgn">Polygon</span>
            </div>
          </div>
          <h6 className="enter_quantity_heading required">
            Please Enter the Offer Quantity
          </h6>
          <input
            className="form-control quantity-input-fields"
            type="text"
            min="1"
            step="1"
            placeholder="Please Enter the Quantity"
            disabled={nftDetails ? nftDetails.nType === 1 : false}
            value={offerQuantity}
            onKeyPress={(e) => {
              if (!/^\d*$/.test(e.key)) e.preventDefault();
            }}
            onChange={(e) => {
              if (Number(e.target.value) > Number(currOrderLeftQty)) {
                NotificationManager.error(
                  "Quantity should be less than seller's order",
                  "",
                  1500
                );

                setPlaceOfferLoader(false);
                return;
              }
              setOfferQuantity(e.target.value);

            }}
          ></input>
          <h6 className="enter_price_heading required">
            Please Enter the Offer Price
          </h6>

          <input
            className="form-control price-input-fields"
            type="text"
            min="1"
            placeholder="Please Enter Price(USDT)"


            value={offerPrice}
            onKeyPress={(e) => {
              if (offerPrice?.length > 25) e.preventDefault();
            }}
            onChange={(e) => {
              const re = /^\d*\.?\d*$/;
              let val = e.target.value;
              if (e.target.value === "" || re.test(e.target.value)) {
                const numStr = String(val);
                if (numStr.includes(".")) {
                  if (numStr.split(".")[1]?.length > 15) {
                    return
                  }
                }
                setOfferPrice(val);

              }
            }}
          ></input>


          <button
            className="btn-main content-btn1 mt-4 btn-placeABid"
            style={{ color: props.color }}
            onClick={async () => {
              if (currentUser === undefined) {
                setNotConnectedModal(true)
                return;
              }

              if (!offerPrice || isNaN(offerPrice)) {
                NotificationManager.error("Please Enter Offer Price", "", 1500);
                return;
              }
              else if (offerPrice === 0) {
                NotificationManager.error("Price Not Equal to 0", "", 1500);
                return;
              }
              if (!offerQuantity || isNaN(offerQuantity)) {
                NotificationManager.error("Please Enter Offer Qty", "", 1500);
                return;
              }

              if (
                cookies["chain_id"] !==
                process.env.REACT_APP_CHAIN_ID
              ) {

                let res = await handleNetworkSwitch();

                setCookie("balance", res, { path: "/" });
                if (res === false) {
                  setPlaceOfferLoader(false);
                  return;
                };
              }
              setIsPlaceABidPopup(false);
              setBidPrice("")
              setBidQty(1)
              if (!offerPrice || offerPrice === "") {
                NotificationManager.error("Please Enter Offer Price", "", 1500);

                return;
              }
              else if (offerPrice === 0) {
                NotificationManager.error("Price Not Equal to 0", "", 1500);

                return;
              }
              if (Number(offerQuantity) < 1) {
                NotificationManager.error(
                  "Quantity can't be less than or equal to zero",
                  "",
                  1500
                );

                return;
              }
              setCheckoutLoader(true);
              setIsOfferModal(false);




              if (
                nftDetails &&
                currentOrderId &&
                currentUser &&
                currentOrderSeller
              ) {
                await createOffer(
                  nftDetails._id,
                  currentOrderId,
                  currentOrderSeller,
                  currentUser,
                  nftDetails.nType,
                  offerQuantity,
                  offerPrice ? offerPrice : 0,
                  nftDetails,
                  currOffer
                );

                // resetStates()
                setReloadContent(!reloadContent)
                setOfferQuantity(1);
                setOfferPrice("");
                setCheckoutLoader(false);
              }
            }}
          >
            {
              isActiveOffer
                ? "Update Offer"
                : "Make Offer"
            }
          </button>
        </div>
      }
      handleClose={() => {
        // if (!isActiveOffer) {
        //   setOfferQuantity(1);
        //   setOfferPrice("");
        // }
        setIsOfferModal(!isOfferModal)


        setCheckoutLoader(false);
      }}
    />
  );

  const transferModal = (
    <PopupModal
      content={
        <div className="popup-content1">
          <h3 className="enter_quantity_heading required">
            {" "}
            Please Enter the Beneficiary
          </h3>
          <input
            className="form-control quantity-input-fields"
            type="text"
            placeholder="Please enter the address"
            value={beneficiary}
            onChange={(e) => setBeneficiary(e.target.value)}
            required
          ></input>
          <h3 className="enter_quantity_heading required">
            {" "}
            Please Enter the Quantity
          </h3>
          <input
            className="form-control quantity-input-fields"
            type="text"
            min="1"
            step="1"
            disabled={nftDetails ? nftDetails.nType === 1 : false}
            placeholder="Please enter quantity like 1,2.."
            value={transferQuantity}
            onKeyPress={(e) => {
              if (!/^\d*$/.test(e.key)) e.preventDefault();
            }}
            onChange={(e) => {
              let qty = ((Number(isLazyMint) === 2 || Number(isLazyMint) === 0) && !currUserLazyMinted) ? originalQty : ownedQuantity
              if (Number(e.target.value) > qty) {
                NotificationManager.error(
                  "Transfer quantity should be less than owned quantity",
                  "",
                  1500
                );

                setTransferLoader(false);
                return;
              }

              setTransferQuantity(e.target.value);
            }}
          ></input>
          <button
            className="btn-main content-btn1 mt-4 btn-btnTransfer"
            style={{ color: props.color }}
            onClick={async () => {
              let res1 = await handleNetworkSwitch(currentUser);
              setCookie("balance", res1, { path: "/" });
              if (res1 === false) return;
              setTransferQuantity(transferQuantity)
              setBeneficiary("")
              setIsTransferPopup(false);

              setTransferLoader(true);
              if (!checkIfValidAddress(beneficiary)) {
                NotificationManager.error("Please enter the wallet address", "", 1500);
                setTransferLoader(false);
                return;
              }
              if (currentUser.toLowerCase() === beneficiary.toLowerCase()) {
                NotificationManager.error(
                  "Transfer to your wallet is not permitted",
                  "",
                  3000
                );
                setTransferLoader(false);
                return;
              }
              if (Number(transferQuantity) < 1) {
                NotificationManager.error("Quantity can't be zero", "", 3000);
                setTransferLoader(false);
                return;
              }

              if (nftDetails && originalQty !== "null") {
                let res;
                if (haveOrder === true) {
                  res = await handleNftTransfer(
                    nftDetails.nCollection,
                    currentUser,
                    beneficiary,
                    transferQuantity,
                    nftDetails.nTokenID,
                    nftDetails.nType,
                    nftDetails._id,
                    ownedQuantity,
                    connectedUserOrderId


                  );
                } else {
                  res = await handleNftTransfer(
                    nftDetails.nCollection,
                    currentUser,
                    beneficiary,
                    transferQuantity,
                    nftDetails.nTokenID,
                    nftDetails.nType,
                    nftDetails._id,
                    ownedQuantity,
                    connectedUserOrderId,
                  );
                }

                if (res === true) {

                  try {
                    let historyMetaData = {
                      nftId: nftDetails._id,
                      userId: nftDetails.nCreater._id,
                      action: "Transfer",
                      actionMeta: "Default",
                      message: `${transferQuantity} Quantity to ${beneficiary.slice(0, 3) +
                        "..." +
                        beneficiary.slice(39, 42)
                        } by ${profile.sWalletAddress
                          ? profile.sWalletAddress.slice(0, 3) +
                          "..." +
                          profile.sWalletAddress.slice(39, 42)
                          : ""
                        }`,

                    };

                    await InsertHistory(historyMetaData);
                  }
                  catch (e) {
                    console.log("error in history api", e);
                    return;
                  }


                }
                resetStates()
                setReloadContent(!reloadContent)
                setBeneficiary("")
                setTransferQuantity(1)
                setTransferLoader(false);
              }
            }
            }
          >
            Transfer NFT
          </button>
        </div>
      }
      handleClose={() => {
        setBeneficiary("")
        setTransferQuantity(1)
        setIsTransferPopup(!isTransferPopup);
      }}
    />
  );

  const hiddenContentModal = (
    <PopupModal
      content={
        <div className="popup-content1">
          {loading ? <Loader /> : ""}
          <h3 style={{ "font-size": "x-large" }}>Hidden Content</h3>
          <h5 style={{ color: "lightslategrey" }}>
            Hidden content is some secret information from seller to you
          </h5>
          <h4 style={{ color: "#53a0b5" }}>
            {isOwned && isOwned !== "null" && nftDetails ? (
              lockedContent ? (
                <div className="show-hidden-content">
                  {lockedContent}
                </div>
              ) : (
                <div className="not-authorized">No Content!!</div>
              )
            ) : (
              <div className="not-authorized">
                You don't have Authorization!!
              </div>
            )}
          </h4>
        </div>
      }
      handleClose={() => {
        setLockedContent("")
        setIsUnlocked(!isUnlocked);
      }}
    />
  );

  const placeBidModal = (
    <PopupModal
      content={
        <div className="popup-content1">
          <h3 className="modal_heading">Checkout</h3>
          <p className="bid_buy_text">
            You are about to place a bid for{" "}
            <strong>
              {nftDetails
                ? nftDetails.nTitle?.length > 15
                  ? nftDetails.nTitle?.slice(0, 15) + "..."
                  : nftDetails.nTitle
                : ""}
            </strong>{" "}
            from <br />
            <strong>
              {nftDetails
                ? nftDetails?.nCreater?.sUserName
                  ? nftDetails?.nCreater?.sUserName
                  : nftDetails?.nCreater?.sWalletAddress
                    ? nftDetails?.nCreater?.sWalletAddress.slice(0, 11) +
                    "..." +
                    nftDetails?.nCreater?.sWalletAddress.slice(38, 42)
                    : ""
                : ""}
            </strong>
          </p>
          <div className="bid_user_details">
            <div className="polygonLogo">
              <img src={PolygonLogo} alt="logoImage" />
            </div>
            <div className="bid_user_address">
              <div>
                <span className="adr">{`${currentUser?.slice(0, 11) + "..." + currentUser?.slice(38, 42)
                  }`}</span>
                <span className="badge badge-success">Connected</span>
              </div>
              <span className="pgn">Polygon</span>
            </div>
          </div>
          <h6 className="enter_quantity_heading required">
            Please Enter the Bid Quantity
          </h6>
          <input
            className="form-control quantity-input-fields"
            type="text"
            min="1"
            step="1"
            placeholder="Please Enter the Quantity"
            disabled={nftDetails ? nftDetails.nType === 1 : false}
            value={bidQty}
            onKeyPress={(e) => {
              if (!/^\d*$/.test(e.key)) e.preventDefault();
            }}
            onChange={(e) => {
              if (Number(e.target.value) > Number(currOrderLeftQty)) {
                NotificationManager.error(
                  "Quantity should be less than seller's order",
                  "",
                  1500
                );

                setPlaceBidLoader(false);
                return;
              }
              setBidQty(e.target.value);

            }}
          ></input>
          <h6 className="enter_price_heading required">
            Please Enter the Bid Price(USDT)
          </h6>

          <input
            className="form-control price-input-fields"
            type="text"
            min="1"
            placeholder="Please Enter Price"
            value={bidPrice}
            onKeyPress={(e) => {
              if (bidPrice?.length > 25) e.preventDefault();
            }}
            onChange={(e) => {
              const re = /^\d*\.?\d*$/;
              let val = e.target.value;
              if (e.target.value === "" || re.test(e.target.value)) {
                const numStr = String(val);
                if (numStr.includes(".")) {
                  if (numStr.split(".")[1]?.length > 15) {
                    return
                  }
                }
                setBidPrice(val);

              }
            }}
          ></input>

          <button
            className="btn-main content-btn1 mt-4 btn-placeABid"
            style={{ color: props.color }}
            onClick={async () => {

              if (
                cookies["chain_id"] !==
                process.env.REACT_APP_CHAIN_ID
              ) {

                let res = await handleNetworkSwitch();

                setCookie("balance", res, { path: "/" });
                if (res === false) return;
              }

              if (!bidPrice) {
                NotificationManager.error(
                  "Please Enter Valid Bid Price",
                  "",
                  1500
                );
                return;
              }
              if (Number(bidQty) < 1) {
                NotificationManager.error(
                  "Quantity can't be less than or equal to zero",
                  "",
                  1500
                );
                setPlaceBidLoader(false);
                return;
              }

              if (Number(bidPrice) < Number(currentOrderMinBid)) {
                NotificationManager.error(
                  `Price should be more than ${currentOrderMinBid} ${selectedOrderPaymentTokenData?.symbol}`,
                  "",
                  1800
                );
                setPlaceBidLoader(false);
                return;
              }
              setPlaceBidLoader(true);
              setIsPlaceABidPopup(false);
              setBidPrice("")
              setBidQty(1)

              if (!isActiveBid) {
                setCurrBid({});
              }
              if (
                nftDetails &&
                currentOrderId &&
                currentUser &&
                currentOrderSeller && isLazyMint !== ""
              ) {
                await createBid(
                  nftDetails._id,
                  currentOrderId,
                  currentOrderSeller,
                  currentUser,
                  nftDetails.nType,
                  bidQty,
                  bidPrice ? bidPrice : 0,
                  isLazyMint,
                  currBid
                );


                resetStates()
                setReloadContent(!reloadContent)

                setPlaceBidLoader(false);
                setBidQty(1);
                setBidPrice("");



              }
            }}
          >
            {isActiveBid ? "Update Bid" : "Place A Bid"}
          </button>

        </div>
      }
      handleClose={() => {
        setIsPlaceABidPopup(!isPlaceABidPopup);
        if (!isActiveBid) {
          setBidQty(1);
          setBidPrice("");
        }

      }}
    />
  );

  const fetchData = async (isWithoutLoader = false) => {
    console.log("btnnnnnnnnnnnnnnnnnnnnn","Helloo");
    if (!isWithoutLoader) {
      setLoading(true)
    }
    let resp = await fetchPageData(id, currentUser);
    if (resp.errorStatus !== true) {
      setOrders(resp.orders)
      setConnectedUserOrderId(resp.connectedUserOrderId)
      setHaveOrder(resp.haveOrder)
      setIsLazyMint(resp.isLazyMint)
      setOrderState(resp.orderState)
      setOwnedQuantity(resp.ownedQuantity)
      setIsOwned(resp.isOwned)
      setOwners(resp.owners)
      setCurrUserLazyMinted(resp.currUserLazyMinted)
      console.log('qnnnnnnnn',originalQty)
      if (originalQty !== "null") {
        let btns = getButtonsByOrderGroup(resp.currUserLazyMinted, resp.ownedQuantity, originalQty, currentUser, resp.orders)
        console.log("btnnnnnnnnnnnnnnnnnnnnn",btns);
        setButtons(btns)
      }
      setLoading(false);

    }
    else {
      setLoading(false)
    }

  }

  useEffect(() => {
    const fetch = async () => {
      setCurrentUser(cookies.selected_account);
      setNotConnectedModal(false);
      if (localStorage.getItem("decrypt_userId")) {
        setUserId(localStorage.getItem("decrypt_userId"))
      }
      if (cookies.selected_account) {
        let _profile = await getProfile();
        if (_profile.data.sStatus === "deactivated") {
          setTimeout(() => {
            NotificationManager.error("Admin Has Deactivated Your Account", "", 1200);

            setDeactivated(true)
          }, 1200)
        }

        setProfile(_profile.data);
      }

    }
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.selected_account, reloadContent, localStorage.getItem("decrypt_userId"), reloadContent]);


  useEffect(() => {
    const fetch = async () => {
      let data
      if (id && id !== undefined) {
        data = await GetNftDetails(id);
        if (isEmptyObject(data)) {
          window.location.href = "/profile";
        }

      }
      let datas = data.nOwnedBy.filter((d, key) => {
        if (d.address) {
          return d?.address?.toLowerCase() === currentUser?.toLowerCase();
        }
      });

      let _ownedQuantity = ""
      if (datas?.length > 0) {
        _ownedQuantity = datas[0].quantity
      }
      // let bal = await GetOwnerOfToken(data.nCollection, data.nTokenID, data.nType, currentUser, true);
      // console.log("ball", bal, _ownedQuantity, isLazyMint)
      console.log('refreeeeeeeee',currentUser,data)
      if (currentUser && currentUser !== "null" && _ownedQuantity !== undefined && parseInt(window.sessionStorage.getItem("chain_id")) === parseInt(process.env.REACT_APP_CHAIN_ID)) {
        console.log('refreeeeeeeee-2',data?.nLazyMintingStatus,typeof(data?.nLazyMintingStatus))
        if ((data?.nLazyMintingStatus) == 2 || (data?.nLazyMintingStatus) == 0) {
          console.log('refreeeeeeeee',"now work")
          let bal = await GetOwnerOfToken(data.nCollection, data.nTokenID, data.nType, currentUser, true);
          console.log('refreeeeeeeee',bal)
          setOriginalQty(bal)

          let res = await checkOwnerChangeAndUpdate(bal, _ownedQuantity, data.nTokenID, data.nCollection, currentUser)
          console.log("respp", res)
          if (res) {
            // await fetchData(true)
            setOwnerChange(!ownerChange)
          }
          return;
        }
        else {
          console.log('refreeeeeeeee','else')
          setOriginalQty(0)
          return
        }
       
      }


      if (parseInt(window.sessionStorage.getItem("chain_id")) !== parseInt(process.env.REACT_APP_CHAIN_ID)) {
        setOriginalQty(_ownedQuantity)
      }
    }
    fetch()
  }, [currentUser, reloadContent]);

  useEffect(() => {
    async function fetch() {
      //setLoading(true);

      if (id && id !== undefined) {
        let data = await GetNftDetails(id);

        // if (isEmptyObject(data)) {
        //   window.location.href = "/profile";
        // }
        console.log("datta",data);
        setNftDetails(data);
      }
      //setLoading(false);
    }
    fetch();
  }, [id, currentUser])

  useEffect(
    () => {
      fetchData(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile, id, currentUser, currOrderType, reloadContent, originalQty]
  );




  useEffect(() => {
    console.log("currentOrderId", currentOrderId)
    const fetchCurrOffer = async () => {
      let searchParams = {
        nftID: id,
        buyerID: userId,
        bidStatus: "MakeOffer",
        orderID: currentOrderId,
      };

      let _data = await fetchOfferNft(searchParams);
      if (_data && _data?.data?.length > 0) {

        console.log("offerrs", _data?.data)

        const b = _data.data[0];
        setCurrOffer(b)
        setOfferPrice(convertToEth(b?.oBidPrice?.$numberDecimal));
        setOfferQuantity(b?.oBidQuantity)
      }
    };

    const fetchCurrBid = async () => {
      let searchParams = {
        nftID: id,
        buyerID: userId,
        bidStatus: "Bid",
        orderID: currentOrderId,
      };

      let _data = await fetchBidNft(searchParams);
      if (_data && _data?.data?.length > 0) {
        console.log("bidd", _data?.data)
        const b = _data.data[0];

        setCurrBid(b)
        setBidPrice(convertToEth(b?.oBidPrice?.$numberDecimal));
        setBidQty(b?.oBidQuantity)
      }

    };

    const fetchAllBids = async () => {

      if (id) {
        let data = await getAllBidsByNftId(id);
        console.log('oferrrs',data)
        let _highestBid = {};
        let bidLength, offerLength;
        _highestBid = data?.highestBid;
        bidLength = data?.bidLength;
        offerLength = data?.offerLength;
        data = data?.data;

        if (data?.length > 0 && isEmpty(data[0])) data = [];
        if (data?.length === 0) data = []

        setBids(data);
        console.log("offer data", data)
        setHighestBid(_highestBid);
        setBidsLength(bidLength);
        setOfferLength(offerLength)
      }
      //setLoading(false);
    };

    if (userId && currentUser !== "null" && currentOrderId) {
      fetchCurrOffer();
      fetchCurrBid();
    }
    fetchAllBids();
  }, [id, currentUser, reloadContent, userId, ownerChange, currentOrderId]);


  useEffect(() => {
    const fetchMeta = async () => {
      if (nftDetails && nftDetails.nHash) {
        let resp = await fetch(
          process.env.REACT_APP_IPFS_URL + nftDetails?.nHash
        );
        resp = await resp.json();
        setMetaData(eval(resp.attributes));
      }
    };

    // fetchMeta();
  }, [nftDetails, reloadContent]);


  useEffect(() => {
    const fetch = async () => {
      //setLoading(true);
      if (nftDetails && nftDetails._id) {
        let history = await GetHistory({
          nftId: nftDetails._id,
          userId: "All",
          action: "All",
          actionMeta: "All",
          page: currPage,
          limit: perPageCount,
        });
        setHistory(history.results[0]);
        setTotalPages(Math.ceil(history.count / perPageCount));
      }
      //setLoading(false);
    };
    fetch();
  }, [nftDetails, currPage, reloadContent]);

  const checkIfLoadedWithWallet = () => {
    if (orders === "null" || isOwned === "null" || originalQty === "null" || haveOrder === "null" || currentUser === "null" || buttons === "null") {
      return false
    }
    else
      return true
  }

  const Transfer = () => (
    < div >
      {checkIfLoadedWithWallet() && Number(originalQty) > 0 &&
        <span
          className={
            transferLoader
              ? "spn-disabled btn-main btn-btnTransfer"
              : "btn-main btn-btnTransfer"
          }
          onClick={async () => {
            let res1 = await handleNetworkSwitch(currentUser);
            setCookie("balance", res1, { path: "/" });
            if (res1 === false) return;
            if (!currentUser) {
              setNotConnectedModal(true);

              setTransferLoader(false);
              return;
            }
            setIsTransferPopup(true);
            setBeneficiary("")
            setTransferQuantity(1)
          }}
        >
          Transfer NFT
        </span>
      }
    </div >

  );

  const RemoveFromSale = (
    seller,
    price,
    orderId,
    qty,
    qtySold
  ) => (
    <div className="de_tab">
      {removeFromSaleLoader
        ? showProcessingModal(
          `Removing ${qty} qty from sale. Please do not refresh...`
        )
        : ""}

      <div className="row">
        <div className="col item_author_ram">
          <div className="item_list">
            <div className="item_list_pp">
              <span>
                <img
                  className="lazy"
                  src={
                    seller && seller.sProfilePicUrl
                      ? seller.sProfilePicUrl
                      : Avatar
                  }
                  alt=""
                />
              </span>
            </div>
            <div className="item_list_info bidsList">
              <div className="row">
                <div className="col vCenter bidsText">
                  <h6>
                    {seller?.length > 20
                      ? seller.slice(0, 6) +
                      "...." +
                      seller.slice(seller?.length - 6, seller?.length)
                      : seller}
                  </h6>
                  <p>
                    {qty - qtySold} / {nftDetails.nQuantity}{" "}
                    {qty - qtySold / nftDetails.nQuantity > 1
                      ? "editions"
                      : "edition"}{" "}
                    for{" "}
                    <b>
                      {price} {CURRENCY}
                    </b>{" "}
                    each on sale
                  </p>
                </div>
                <div className="d-flex flex-wrap">

                  <div className="vCenter itemDet-btn make_offer">
                    <span
                      className={
                        removeFromSaleLoader
                          ? "spn-disabled btn-main btn-removefromsale"
                          : "btn-main btn-removefromsale"
                      }
                      onClick={async () => {
                        // let res1 = await handleNetworkSwitch(currentUser);
                        // setCookie("balance", res1, { path: "/" });
                        // if (res1 === false) return;
                        if (!currentUser) {
                          console.log("herreee");
                          setNotConnectedModal(true);

                          setRemoveFromSaleLoader(false);
                          return;
                        }
                        setRemoveFromSaleLoader(true);
                        console.log("herer again is");
                        let res = await handleRemoveFromSale(
                          orderId,
                          currentUser?.toLowerCase(),
                          nftDetails.nType,
                          currUserLazyMinted
                        );
                        if (res === false) {
                          setRemoveFromSaleLoader(false);
                          resetStates()
                          setReloadContent(!reloadContent)
                          return;
                        }
                        try {
                          let historyMetaData = {
                            nftId: nftDetails._id,
                            userId: nftDetails.nCreater._id,
                            action: "Marketplace",
                            actionMeta: "Unlisted",
                            message: `${qty} editions by ${profile.sWalletAddress
                              ? profile.sWalletAddress.slice(0, 3) +
                              "..." +
                              profile.sWalletAddress.slice(39, 42)
                              : ""}`,
                          };

                          await InsertHistory(historyMetaData);
                          resetStates()
                          setReloadContent(!reloadContent)
                        } catch (e) {
                          return;
                        }
                        setRemoveFromSaleLoader(false);
                      }}
                    >
                      Remove From Sale
                    </span>
                  </div>
                  <div className="vCenter itemDet-btn make_offer">
                    {Transfer()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RemoveFromAuction = (
    seller,
    price,
    orderId,
    key,
    qty,
    qtySold,
    paymentTokenData,
    timestamp
  ) => (
    <div className="de_tab">
      <div className="row">
        <div className="col item_author_ram">
          <div className="item_list">
            <div className="item_list_pp">
              <span>
                <img
                  className="lazy"
                  src={
                    seller && seller.sProfilePicUrl
                      ? seller.sProfilePicUrl
                      : Avatar
                  }
                  alt=""
                />
              </span>
            </div>
            <div className="item_list_info bidsList">
              <div className="row">
                <div className="col vCenter bidsText">
                  <h6>
                    {seller?.length > 20
                      ? seller.slice(0, 6) +
                      "...." +
                      seller.slice(seller?.length - 6, seller?.length)
                      : seller}{" "}
                  </h6>
                  <p>
                    {timestamp !== GENERAL_TIMESTAMP
                      ? "Put on Timed Auction "
                      : "Open for Bids "}{" "}
                    with minimum bid of{" "}
                  </p>
                  <h6>
                    {price} {paymentTokenData ? paymentTokenData.symbol : ""}
                  </h6>
                  <p>
                    at {qty - qtySold}/{nftDetails ? nftDetails.nQuantity : 0}{" "}
                    {qty - qtySold / (nftDetails ? nftDetails.nQuantity : 0) > 1
                      ? "editions"
                      : "edition"}{" "}
                    for{" "}
                    <b>
                      {price} {paymentTokenData?.symbol}
                    </b>{" "}
                    each
                  </p>
                  <div className="Auctions_ends">
                    {timestamp !== GENERAL_TIMESTAMP ? (
                      !orderState[key] && Date.parse(moment.utc(timestamp * 1000).local().format()) - Date.parse(new Date()) > 0 ? (
                        <>
                          Auction ends in
                          <div className="de_countdown">

                            <Clock
                              deadline={moment.utc(timestamp * 1000).local().format()}
                              onAuctionEnd={onAuctionEnd}
                              index={key}
                            />
                          </div>
                        </>
                      ) : (
                        "Auction Ended"
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="d-flex flex-wrap">
                  <div className="vCenter itemDet-btn make_offer">
                    <span
                      className={
                        loading
                          ? "spn-disabled btn-removefromauction"
                          : "btn-main btn-removefromauction"
                      }
                      onClick={async () => {


                        let res1 = await handleNetworkSwitch(currentUser);
                        setCookie("balance", res1, { path: "/" });
                        if (res1 === false) return;

                        if (currentUser === undefined) {
                          setNotConnectedModal(true)
                          return
                        }

                        if (!currentUser) {
                          setNotConnectedModal(true);

                          setRemoveFromSaleLoader(false);
                          return;
                        }
                        if (deactivated === true) {
                          NotificationManager.error("Admin has deactivated your account", "", 1200);
                          return;
                        }
                        setRemoveFromSaleLoader(true);
                        let res = await handleRemoveFromAuction(
                          orderId,
                          currentUser?.toLowerCase(),
                          nftDetails.nType,
                          currUserLazyMinted
                        );
                        if (res === false) {
                          setRemoveFromSaleLoader(false);
                          resetStates()
                          setReloadContent(!reloadContent)
                          return;
                        }
                        try {
                          let historyMetaData = {
                            nftId: nftDetails._id,
                            userId: nftDetails.nCreater._id,
                            action: "Marketplace",
                            actionMeta: "Unlisted",
                            message: `${qty} editions by ${profile.sWalletAddress
                              ? profile.sWalletAddress.slice(0, 3) +
                              "..." +
                              profile.sWalletAddress.slice(39, 42)
                              : ""
                              }`,

                          };

                          await InsertHistory(historyMetaData);
                          resetStates()
                          setReloadContent(!reloadContent)
                          setRemoveFromSaleLoader(false);
                        } catch (e) {
                          setRemoveFromSaleLoader(false);
                          return;
                        }
                      }}
                    >
                      Remove From Auction
                    </span>
                  </div>
                  <div className="vCenter itemDet-btn make_offer">
                    {Transfer()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const placeABid = (
    seller,
    price,
    orderId,
    timestamp,
    key,
    qty,
    paymentTokenData,
    sellerId,
    qtySold,
    isUserHaveActiveBid,
    isUserHaveActiveOffer,
    order
  ) => {
    return (
      <div className="de_tab" key={key}>
        <div className="row">
          <div className="col item_author_ram">
            <div className="item_list">
              <div className="item_list_pp">
                <span>
                  <img
                    className="lazy"
                    src={
                      seller && seller.sProfilePicUrl
                        ? seller.sProfilePicUrl
                        : Avatar
                    }
                    alt=""
                  />
                </span>
              </div>
              <div className="item_list_info">
                <div className="vCenter bidsText">
                  <h6>
                    {seller?.length > 20
                      ? seller.slice(0, 6) +
                      "...." +
                      seller.slice(seller?.length - 6, seller?.length)
                      : seller}
                  </h6>
                  <p>
                    {timestamp !== GENERAL_TIMESTAMP
                      ? "Put on Timed Auction"
                      : "Open for Bids"}{" "}
                    with minimum bid of{" "}
                    <b>
                      {price} {paymentTokenData ? paymentTokenData.symbol : ""}
                    </b>
                    <span>
                      at {qty - qtySold}/{nftDetails ? nftDetails.nQuantity : 0}{" "}
                      {qty - qtySold / (nftDetails ? nftDetails.nQuantity : 0) >
                        1
                        ? "editions"
                        : "edition"}{" "}
                      for{" "}
                      <b>
                        {price} {paymentTokenData?.symbol}
                      </b>{" "}
                      each
                    </span>
                  </p>
                  <div className="Auctions_ends">
                    {timestamp !== GENERAL_TIMESTAMP ? (
                      !orderState[key] && Date.parse(moment.utc(timestamp * 1000).local().format()) - Date.parse(new Date()) > 0 ? (
                        <>

                          <div>Auction ends in</div>
                          <div className="de_countdown">


                            <Clock
                              deadline={moment.utc(timestamp * 1000).local().format()}
                              onAuctionEnd={onAuctionEnd}
                              index={key}
                            />
                          </div>
                        </>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="vCenter d-flex itemDet-btn make_offer">
                  <span
                    className={
                      orderState[key] || Date.parse(moment.utc(timestamp * 1000).local().format()) - Date.parse(new Date()) <= 0
                        ? "spn-disabled  btn-placeABid"
                        : "btn-main btn-placeABid"
                    }
                    onClick={async () => {


                      if (
                        cookies["chain_id"] !==
                        process.env.REACT_APP_CHAIN_ID
                      ) {

                        NotificationManager.error("Please switch chain");
                        let res = await handleNetworkSwitch();
                        setCookie("balance", res, { path: "/" });
                        if (res === false) return;
                      }

                      let res = await handleNetworkSwitch();
                      setCookie("balance", res, { path: "/" });
                      if (res === false) return;

                      if (isUserHaveActiveBid) {
                        setIsActiveBid(true)
                      }
                      else {
                        setIsActiveBid(false)
                      }
                      if (isUserHaveActiveOffer) {
                        setIsActiveOffer(true)
                      }
                      else {
                        setIsActiveOffer(false)
                      }
                      if (deactivated === true) {
                        NotificationManager.error("Admin has deactivated your account", "", 1200);
                        return;
                      }

                      if (moment.utc(timestamp * 1000).local().format() < moment(new Date()).format()) {
                        return;
                      }
                      if (!currentUser) {
                        setNotConnectedModal(true);

                        setPlaceBidLoader(false);
                        return;
                      }

                      setSelectedOrderPaymentTokenData(paymentTokenData);
                      setCurrOrderLeftQty(qty - qtySold);
                      setCurrentOrderMinBid(price);
                      setCurrentOrderId(orderId);
                      setCurrentOrder(order)
                      setCurrentOrderSeller(sellerId);
                      setCurrentOrder(order)
                      setIsPlaceABidPopup(true);


                      if (!isUserHaveActiveBid) {
                        setBidPrice("")
                        setBidQty(1)
                        setCurrBid({})
                      }
                    }}
                  >

                    {moment.utc(timestamp * 1000).local().format() >= moment(new Date()).format() &&
                      !orderState[key] && Date.parse(moment.utc(timestamp * 1000).local().format()) - Date.parse(new Date()) > 0
                      ? isUserHaveActiveBid
                        ? "Update Bid"
                        : "Place A Bid"
                      : "Auction Ended"}
                  </span>
                  <span
                    className=
                    "btn-main btn-placeABid"

                    onClick={async () => {
                      if (
                        cookies["chain_id"] !==
                        process.env.REACT_APP_CHAIN_ID
                      ) {

                        NotificationManager.error("Please switch chain");
                        let res = await handleNetworkSwitch();
                        setCookie("balance", res, { path: "/" });
                        if (res === false) return;
                      }

                      let res = await handleNetworkSwitch();
                      setCookie("balance", res, { path: "/" });
                      if (res === false) return;
                      if (currentUser === undefined) {
                        setNotConnectedModal(true);
                        return
                      }

                      if (!currentUser) {
                        setNotConnectedModal(true);
                        setPlaceBidLoader(false);
                        return;
                      }


                      if (deactivated === true) {
                        NotificationManager.error("Admin has deactivated your account", "", 1200);
                        return;
                      }

                      setSelectedOrderPaymentTokenData(paymentTokenData);
                      setCurrOrderLeftQty(qty - qtySold);
                      setCurrentOrderMinBid(price);
                      setCurrentOrderId(orderId);
                      setCurrentOrderSeller(sellerId);
                      setCurrentOrder(order)
                      setIsPopup(false)
                      if (isUserHaveActiveOffer) {
                        setIsActiveOffer(true)
                      } else {
                        // setBuyQuantity(1)
                        setOfferPrice("")
                        setOfferQuantity(1)
                        setIsActiveOffer(false)
                        setCurrOffer({})
                      }
                      setIsOfferModal(true);


                    }}
                  >

                    {
                      isUserHaveActiveOffer
                        ? "Update Offer"
                        : "Make Offer"
                    }

                  </span>
                </div>
              </div>

              <div className="spacer-10"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const buyNow = (
    seller,
    price,
    orderId,
    qtyLeft,
    qty,
    orderType,
    sellerId,
    isUserHaveActiveOffer,
    order
  ) => (
    <div className="de_tab">
      <div className="row">
        <div className="col-md-12">
          <div className="item_author author_item_list align-items-start">
            <div className="author_list_pp">
              <span>
                <img
                  className="lazy"
                  src={
                    seller && seller.sProfilePicUrl
                      ? seller.sProfilePicUrl
                      : Avatar
                  }
                  alt=""
                />
                <i className="fa fa-check"></i>
              </span>
            </div>
            <div className="author_list_info">
              <h6>
                {seller?.length > 20
                  ? seller.slice(0, 6) +
                  "...." +
                  seller.slice(seller?.length - 6, seller?.length)
                  : seller}
              </h6>
              <p>
                {qtyLeft} / {qty}{" "}
                {qtyLeft / qty > 1 ? "editions" : "edition"} for{" "}
                <b>
                  {price} {CURRENCY}
                </b>{" "}
                each
              </p>

              <div className="vCenter itemDet-btn make_offer">
                <span
                  className="btn-main btn-buyNow"
                  onClick={async () => {
                    if (currentUser === undefined) {
                      setNotConnectedModal(true)
                      return
                    }
                    if (deactivated) {
                      NotificationManager.error("Admin Has Deactivated Your Account", "", 1500)
                      return
                    }
                    let res = await handleNetworkSwitch(currentUser);
                    setCookie("balance", res, { path: "/" });
                    if (res === false) return;
                    if (!currentUser) {
                      setNotConnectedModal(true);

                      setLoading(false);
                      return;
                    }

                    setCurrentBuyPrice(price);
                    setCurrOrderLeftQty(qtyLeft);
                    setCurrOrderType(orderType);
                    setCurrentOrderId(orderId);
                    setCurrentOrder(order)
                    setCurrentOrderMinBid(price);
                    setIsPopup(true);
                    setBuyQuantity(1)
                  }}
                >
                  Buy Now
                </span>
                <span
                  className="btn-main btn-buyNow"
                  onClick={async () => {

                    if (currentUser === undefined) {
                      setNotConnectedModal(true)
                      return
                    }
                    if (isUserHaveActiveOffer) {
                      setIsActiveOffer(true)
                    }
                    else {
                      setIsActiveOffer(false)
                    }

                    let res = await handleNetworkSwitch(currentUser);
                    setCookie("balance", res, { path: "/" });
                    if (res === false) return;
                    if (!currentUser) {
                      setNotConnectedModal(true);

                      setLoading(false);
                      return;
                    }
                    if (deactivated === true) {
                      NotificationManager.error("Admin has deactivated your account", "", 1200);
                      return;
                    }
                    setSelectedOrderPaymentTokenData(UsdtTokenAddress.USDT);
                    setCurrentBuyPrice(price);
                    setCurrOrderLeftQty(qtyLeft);
                    setCurrOrderType(orderType);
                    setCurrentOrderId(orderId);
                    setCurrentOrder(order)
                    setCurrentOrderMinBid(price);
                    setIsPopup(false)


                    setCurrentOrderSeller(sellerId);
                    setCurrentOrder(order)
                    if (isUserHaveActiveOffer) {
                      setIsActiveOffer(true)
                    } else {
                      setIsActiveOffer(false)
                      setCurrOffer({})
                      setOfferPrice("")
                      setOfferQuantity(1)
                    }
                    setIsOfferModal(true);
                  }}
                >
                  {
                    isUserHaveActiveOffer
                      ? "Update Offer"
                      : "Make Offer"
                  }
                </span>

              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );

  const NotForSale = () => (
    <div className="p_list">
      <ul className="de_nav notForSale text-left">
        <li id="Mainbtn" className="active">
          Not For Sale
        </li>
      </ul>

      <div className="p_list_pp">
        {console.log("nftDetails?.nCreater", nftDetails?.nCreater)}
        <span>
          Created by{" "}
          {nftDetails && nftDetails?.nCreater
            ? nftDetails?.nCreater?.sWalletAddress?.slice(0, 5) +
            "......" +
            nftDetails?.nCreater?.sWalletAddress?.slice(37, 42)
            : "0x00.."}
        </span>
      </div>
    </div>
  );

  const PutOnMarketPlace = () => (
    <div className="row">
      <div className="col item_author_ram">
        <div className="item_list">
          <div className="item_list_pp">
            <span>
              <img
                className="lazy"
                src={
                  nftDetails && nftDetails?.sProfilePicUrl
                    ? nftDetails?.sProfilePicUrl
                    : Avatar
                }
                alt=""
              />
            </span>
          </div>
          <div className="item_list_info bidsList">
            <div className="row">
              <div className="col vCenter bidsText">
                {console.log("nftDetails?.nCreater", nftDetails)}
                <h6>
                  Created by{" "}
                  {nftDetails?.nCreater?.sWalletAddress?.length > 20
                    ? nftDetails?.nCreater?.sWalletAddress?.slice(0, 6) +
                    "...." +
                    nftDetails?.nCreater?.sWalletAddress.slice(
                      nftDetails?.nCreater?.sWalletAddress?.length - 6,
                      nftDetails?.nCreater?.sWalletAddress?.length
                    )
                    : nftDetails?.nCreater?.sWalletAddress}
                </h6>

                <p> at {(isLazyMint === 2 || isLazyMint === 0) && !currUserLazyMinted ? originalQty : ownedQuantity}/{nftDetails ? nftDetails.nQuantity : 0}{" "}
                  {parseInt(ownedQuantity) > 1
                    ? "editions"
                    : "edition"}{" "}
                  each
                </p>
              </div>

              <div className="d-flex flex-wrap">

                <div className="vCenter itemDet-btn make_offer">
                  <span
                    className={
                      loading
                        ? "spn-disabled btn-main btn-putonMarket"
                        : "btn-main btn-putonMarket"
                    }
                    onClick={async () => {
                      if (profile.sStatus === "blocked") {
                        NotificationManager.error("Admin Has Blocked Your Account", "", 1200);
                        return;


                      }
                      if (!currentUser || currentUser === undefined) {
                        setNotConnectedModal(true);
                        setPutOnMarketplaceLoader(false);
                        return;
                      }
                      await handleNetworkSwitch(currentUser);

                      toggleMarketplace();
                      resetForm();
                    }}
                  >
                    Put On Marketplace
                  </span>
                </div>
                <div className="vCenter itemDet-btn make_offer">
                  {Transfer()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  const handleDate = (ev) => {

    if (!ev.target["validity"].valid) {
      NotificationManager.error(`Date must be ${moment(new Date()).add(60, "seconds").format('lll')} or later`, "", 1200);
      setEndTime("")
      return;
    }
    const dt = ev.target["value"];
    const ct = moment(new Date()).format();
    if (dt) {

      if (dt < ct) {
        NotificationManager.error(`Date must be ${moment(new Date()).add(60, "seconds").format('lll')} or later`, "", 1200)
        setEndTime("")
        return;
      }
      setEndTime(dt);
    } else {
      setEndTime("")
    }
  }

  return (
    <div>
      <GlobalStyles />
      {isPopup ? modal : ""}
      {isOfferModal ? makeOfferModal : ""}
      {checkoutLoader
        ? showProcessingModal(
          "Transaction is in progress. Please do not refresh..."
        )
        : ""}
      {putOnMarketplaceLoader
        ? showProcessingModal(
          `Placing on marketplace. Please do not refresh...`
        )
        : ""}
      {transferLoader
        ? showProcessingModal(
          `Transferring ${transferQuantity} qty to ${beneficiary.slice(0, 3) + "..." + beneficiary.slice(39, 42)
          }. Please do not refresh...`
        )
        : ""}
      {placeBidLoader
        ? showProcessingModal("Placing Bid. Please do not refresh...")
        : ""}

      {placeOfferLoader
        ? showProcessingModal("Placing offer. Please do not refresh...")
        : ""}

      {removeFromSaleLoader
        ? showProcessingModal(
          "Removing NFT from sale. Please do not refresh..."
        )
        : ""}
      {loading ? <Loader /> : ""}
      {isTransferPopup ? transferModal : ""}
      {isPlaceABidPopup ? placeBidModal : ""}
      {isUnlocked ? hiddenContentModal : ""}
      {showNotConnectedModal ? (
        <ConnectWallet
          content={
            "Get started with your wallet to sign messages and send transactions to Polygon blockchain"
          }
          handleClose={() => setNotConnectedModal(false)}
        />
      ) : (
        ""
      )}

      <section className="container">
        <div className="row mt-md-5 pt-md-4">
          <div className="col-md-6 text-center nft_image_box">
            {nftDetails && nftDetails.nNftImageType === "mp4" ? <video className="img-fluid nftimg nft_image" controls>
              <source src={nftDetails.nNftImage} type="video/mp4" />
            </video> : <img
              src={nftDetails ? nftDetails.nNftImage : ""}
              className="img-fluid img-rounded explore_item_img_col nft_image mb-sm-30"
              alt=""
            />}

          </div>
          <div className="col-md-6">
            <div className="item_info mb-4">

              <div className="d-flex justify-content-between align-items-center"> <h2 className="font_48 text-dark NunitoBold mb-0">
                {nftDetails ? nftDetails.nTitle : ""}
              </h2>
                <i title="Reload Content" onClick={async () => {
                  setActiveRefresh(true);
                  setReloadContent(!reloadContent)
                  setTimeout(() => {
                    setActiveRefresh(false);
                  }, 5000)
                }} className={`${activeRefresh ? "active" : ""} fa fa-refresh`} aria-hidden="true"></i></div>

              <div className="item_info_counts ">


                {highestBid !== undefined && !isEmptyObject(highestBid) ? (
                  <div className="detail_item ">
                    <div className="detail_btn">
                      <div
                        className="item_info_lock"
                        style={{ cursor: "pointer" }}
                      >
                        Highest {highestBid.oBidStatus === "Bid" ? "Bid" : "Offer"} at{" "}
                        {Number(
                          convertToEth(highestBid?.oBidPrice?.$numberDecimal)
                        ).toFixed(4)}{" "}
                        {highestBid.paymentSymbol ? highestBid.paymentSymbol : "USDT"}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {nftDetails.nLockedContent ? (
                  <div className="detail_item">
                    <div className="detail_btn">
                      <div
                        className="item_info_lock"
                        onClick={async () => {
                          let sig = await sign()
                          let data = await getUnlockableContent({ nftId: id, sSignature: sig, sWalletAddress: currentUser, sMessage: USER_MESSAGE })
                          setLockedContent(data)
                          console.log("data0", data)
                          setIsUnlocked(!isUnlocked)
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <i
                          className={isUnlocked ? "fa fa-unlock" : "fa fa-lock"}
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <p className="nft_dis">{nftDetails ? nftDetails.nDescription : ""}</p>
              <div className="de_tab">
                <div className="row">
                  <div className="col-md-4">
                    <div className="item_author author_item_list">
                      <div className="author_list_pp">
                        <a href={`/author/${nftDetails?.nCreater?._id}`}>
                          <span>
                            <img
                              title={
                                nftDetails.nCreater
                                  ? nftDetails.nCreater.sWalletAddress.slice(
                                    0,
                                    3
                                  ) +
                                  "..." +
                                  nftDetails.nCreater.sWalletAddress.slice(
                                    39,
                                    42
                                  )
                                  : ""
                              }
                              className="lazy"
                              src={
                                nftDetails && nftDetails?.nCreater?.sProfilePicUrl
                                  ? nftDetails?.nCreater?.sProfilePicUrl
                                  : Avatar
                              }
                              alt=""
                            />
                          </span>
                        </a>
                      </div>
                      <div className="author_list_info">
                        <h6>Creator</h6>
                        <p>
                          {nftDetails && nftDetails?.nCreater?.sWalletAddress
                            ? nftDetails?.nCreater?.sUserName
                              ? nftDetails?.nCreater?.sUserName
                              : nftDetails?.nCreater?.sWalletAddress.slice(0, 4) +
                              "..." +
                              nftDetails?.nCreater?.sWalletAddress.slice(38, 42)
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="item_author author_item_list">
                      <div className="author_list_pp">
                        <a href={`/collection/?addr=${nftDetails.nCollection}`}>
                          <span>
                            <img
                              className="lazy"
                              src={
                                nftDetails && nftDetails.sCollectionDetail
                                  ? nftDetails.sCollectionDetail?.collectionImage
                                  : Avatar
                              }
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </a>
                      </div>
                      <div className="author_list_info">
                        <h6>Collection</h6>
                        <p>
                          {nftDetails && nftDetails.nCollection
                            ? nftDetails.nCollection.slice(0, 4) +
                            "..." +
                            nftDetails.nCollection.slice(38, 42)
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="spacer-10"></div>
            <div className="de_tab">
              <ul className="de_nav itemdetail_nav text-left">
                <li id="Mainbtn1" className={selectedMenu === 0 ? "active" : ""}>
                  <span onClick={() => setSelectedMenu(0)}>Action</span>
                </li>
                <li id="Mainbtn" className={selectedMenu === 1 ? "active" : ""}>
                  <span onClick={() => setSelectedMenu(1)}>History</span>
                </li>
                <li id="Mainbtn2" className={selectedMenu === 2 ? "active" : ""}>
                  <span onClick={() => setSelectedMenu(2)}>Active Bids</span>
                </li>
                <li id="Mainbtn3" className={selectedMenu === 3 ? "active" : ""}>
                  <span onClick={() => setSelectedMenu(3)}>Details</span>
                </li>
                <li id="Mainbtn4" className={selectedMenu === 4 ? "active" : ""}>
                  <span onClick={() => setSelectedMenu(4)}>Active Offer</span>
                </li>
                {/* <li id="Mainbtn4" className={selectedMenu === 5 ? "active" : ""}>
                  <span onClick={() => setSelectedMenu(5)}>Owners</span>
                </li> */}
              </ul>

              {isMarketplacePopup ? (
                <>
                  <PopupModal
                    content={
                      <div className="popup-content1 text-start">

                        <>
                          <h3 className="modal_headeing">Put on Marketplace</h3>
                          <h6 className="formlabel">Select method</h6>
                          <div className="de_tab tab_methods">
                            <ul className="de_nav text-center">
                              <li
                                id="btn1"
                                className={marketplaceSaleType === 0 ? "active" : ""}
                                onClick={() => setMarketplaceSaleType(0)}
                              >
                                <span>
                                  <i className="fa fa-tag"></i>Fixed price
                                </span>
                              </li>
                              <li id="btn2" className={marketplaceSaleType === 1 ? "active" : ""} onClick={() => setMarketplaceSaleType(1)}>
                                <span>
                                  <i className="fa fa-hourglass-1"></i>Timed
                                  auction
                                </span>
                              </li>
                              <li id="btn3" className={marketplaceSaleType === 2 ? "active" : ""} onClick={() => setMarketplaceSaleType(2)}>
                                <span>
                                  <i className="fa fa-users"></i>Open for bids
                                </span>
                              </li>
                            </ul>


                          </div>
                        </>
                        <div className="de_tab_content pt-3">
                          <div id="price" className={marketplaceSaleType === 0 ? "show" : "hide"}>
                            <h5 className="required">Price</h5>
                            <input
                              type="text"
                              name="item_price"
                              id="item_price"
                              min="0"
                              max="18"
                              value={marketplacePrice}
                              onKeyPress={(e) => {
                                if (marketplacePrice?.length > 25) e.preventDefault();
                              }}
                              onChange={(e) => {
                                const re = /^\d*\.?\d*$/;
                                let val = e.target.value;
                                if (e.target.value === "" || re.test(e.target.value)) {
                                  const numStr = String(val);
                                  if (numStr.includes(".")) {
                                    if (numStr.split(".")[1]?.length > 15) {
                                      return
                                    }
                                  }
                                  setMarketplacePrice(val);

                                }
                              }}
                              className="form-control"
                              placeholder={`Please Enter Price (${CURRENCY})`}
                            />
                          </div>

                          <div id="minimumAmount" className={marketplaceSaleType !== 0 ? "show" : "hide"}>
                            <h5 className="formlabel required">
                              Minimum bid
                            </h5>
                            <input
                              type="text"
                              name="item_price_bid"
                              id="item_price_bid"
                              min="0"
                              max="18"
                              className="form-control"
                              value={minimumBid}
                              onKeyPress={(e) => {
                                if (minimumBid?.length > 25) e.preventDefault();
                              }}
                              onChange={(e) => {
                                const re = /^\d*\.?\d*$/;
                                let val = e.target.value;
                                if (e.target.value === "" || re.test(e.target.value)) {
                                  const numStr = String(val);
                                  if (numStr.includes(".")) {
                                    if (numStr.split(".")[1]?.length > 15) {
                                      return
                                    }
                                  }
                                  setMinimumBid(val);
                                }
                              }}
                              placeholder="Enter Minimum Bid"
                            />
                          </div>

                          <div id="quantity" className="show">
                            <h5 className="formlabel required">Quantity</h5>
                            <input
                              type="text"
                              name="item_price"
                              id="item_price"
                              min="1"
                              disabled={nftDetails.nType === 1}
                              value={marketplaceQuantity}
                              onKeyPress={(e) => {
                                if (!/^\d*$/.test(e.key)) e.preventDefault();
                              }}
                              onChange={(e) => {
                                let qty = !currUserLazyMinted ? Number(originalQty) : Number(ownedQuantity)
                                if (
                                  Number(e.target.value) > qty
                                ) {
                                  NotificationManager.error(
                                    "Quantity should be less than owned quantity",
                                    "",
                                    1500
                                  );

                                  setLoading(false);
                                  return;
                                }
                                setMarketplaceQuantity(e.target.value);
                              }}
                              className="form-control"
                              placeholder={`Please Enter Quantity`}
                            />
                          </div>

                          <div id="Exp-payment-token" className={marketplaceSaleType !== 0 ? "show" : "hide"}>
                            <div className="spacer-20"></div>
                            <div className="row">
                              <div className="col-md-6">
                                <h5 className="formlabel required">
                                  Payment Token
                                </h5>
                                <select
                                  className="form-control selectOpt"
                                  onChange={(e) => {
                                    setSelectedTokenAddress(e.target.value);

                                  }}
                                >
                                  {options
                                    ? options?.map((option, key) => {
                                      return (
                                        <option value={option.value} key={key}>
                                          {option.title}
                                        </option>
                                      );
                                    })
                                    : ""}
                                </select>
                              </div>
                              <div className={`col-md-6 ${marketplaceSaleType === 1 ? "show" : "hide"}`}>
                                <h5 className="formlabel required">
                                  Expiration date
                                </h5>
                                <input
                                  type="datetime-local"
                                  id="meeting-time"
                                  name="meeting-time"
                                  min={moment(new Date()).format().substring(0, 16)}
                                  className="form-control"
                                  onChange={handleDate}
                                  value={(endTime || "")?.toString()?.substring(0, 16)}
                                ></input>
                              </div>
                            </div>
                          </div>
                        </div>






                        <div className="spacer-single"></div>
                        <button
                          id="submit"
                          className="btn-main btn-putonMarket"
                          onClick={async () => {
                            if (!currentUser) {
                              setNotConnectedModal(true);
                              return;
                            }
                            if (
                              parseInt(marketplaceQuantity) >
                              parseInt(nftDetails.nQuantity) ||
                              parseInt(marketplaceQuantity) < 1
                            ) {
                              NotificationManager.error(
                                "Incorrect Quantity Amount",
                                "",
                                3000
                              );

                              return;
                            }

                            if (marketplaceSaleType === 0) {
                              if (marketplacePrice === undefined || marketplacePrice === "" || marketplacePrice <= 0) {
                                NotificationManager.error("Please Enter a price", "", 1200);
                                return;
                              }
                              else if (marketplaceQuantity === "") {
                                NotificationManager.error("Please Enter Quantity", "", 800);
                                return;
                              }
                            } else if (marketplaceSaleType === 1) {
                              if (minimumBid === undefined || minimumBid === "" || minimumBid <= 0) {
                                NotificationManager.error("Please Enter Minimum Bid", "", 1200);
                                return;
                              }
                              if (endTime === "" || endTime === undefined) {
                                NotificationManager.error("Please Enter Expiration date", "", 1200);
                                return;
                              }
                              if (endTime < moment(new Date()).format()) {
                                NotificationManager.error(`Expiration date must be ${moment(new Date()).add(60, "seconds").format('lll')} or later`, "", 1200)
                                return;
                              }
                            } else {
                              if (minimumBid === undefined || minimumBid === "" || minimumBid <= 0) {
                                NotificationManager.error("Please Enter Minimum Bid", "", 1200);
                                return;
                              }
                            }

                            setMarketplacePopup(false);
                            setPutOnMarketplaceLoader(true);
                            let orderData = {
                              nftId: nftDetails._id,
                              collection: nftDetails.nCollection,
                              price: marketplacePrice
                                ? marketplacePrice
                                : "0",
                              quantity: marketplaceQuantity,
                              saleType:
                                marketplaceSaleType === 1 ||
                                  marketplaceSaleType === 2
                                  ? 1
                                  : 0,
                              salt: Math.round(Math.random() * 10000000),
                              endTime: endTime ? moment.utc(endTime).format("YYYY-MM-DD HH:mm:ss") : GENERAL_TIMESTAMP,
                              chosenType: marketplaceSaleType,
                              minimumBid: minimumBid !== "" ? minimumBid : 0,
                              auctionEndDate: endTime
                                ? moment.utc(endTime).format("YYYY-MM-DD HH:mm:ss")
                                : new Date(GENERAL_DATE),
                              tokenAddress:
                                marketplaceSaleType === 0
                                  ? ZERO_ADDRESS
                                  : selectedTokenAddress,
                              tokenId: nftDetails.nTokenID,
                              erc721: nftDetails.nType === 1,
                            };

                            let res = await putOnMarketplace(
                              currentUser ? currentUser : "",
                              orderData,
                              currUserLazyMinted
                            );

                            if (res === false) {
                              setPutOnMarketplaceLoader(false);
                              resetForm()
                              setReloadContent(!reloadContent)
                              return;
                            }
                            try {
                              let historyMetaData = {
                                nftId: nftDetails._id,
                                userId: nftDetails.nCreater._id,
                                action: "Marketplace",
                                actionMeta: "Listed",
                                message: `${marketplaceQuantity} Quantity For ${marketplacePrice
                                  ? marketplacePrice
                                  : minimumBid
                                    ? minimumBid
                                    : 0
                                  } ${marketplaceSaleType === 0
                                    ? CURRENCY
                                    : getTokenSymbolByAddress(
                                      selectedTokenAddress
                                    )
                                  } by ${profile.sWalletAddress
                                    ? profile.sWalletAddress.slice(0, 3) +
                                    "..." +
                                    profile.sWalletAddress.slice(39, 42)
                                    : ""
                                  }`,

                              };

                              await InsertHistory(historyMetaData);
                              setReloadContent(!reloadContent)

                            } catch (e) {
                              return;
                            }
                            setPutOnMarketplaceLoader(false);
                            resetForm();
                          }}
                        >
                          Put On Marketplace
                        </button>
                      </div>
                    }
                    handleClose={toggleMarketplace}
                  />
                </>
              ) : (
                ""
              )}
              <div className="de_tab_content">
                {selectedMenu === 0 &&
                  <div className="tab-2 onStep fadeIn historyTab scrollable">
                    {console.log("orrr", originalQty)}
                    {console.log("orders", orders)}
                    {console.log("buttons", buttons)}
                    {console.log("currentUser", currentUser)}
                    {orders === null || buttons === null || currentUser === null?
                       <Loader /> 
                    //  <p> hhhhhhhhhhhhhhhhhhhhhhhhh</p>
                    //  {console.log(orders,)}
                      : (orders !== null && isOwned !== null && originalQty !== null && currentUser !== null && buttons !== null) ?
                        getButtonsGroup(isLazyMint, 0, haveOrder, false, false, ownedQuantity, originalQty, currentUser, orders).length > 0 ?
                          getButtonsGroup(isLazyMint, 0, haveOrder, false, false, ownedQuantity, originalQty, currentUser, orders).map((b, i) => {
                            // return <button>{b}</button>
                            return b === "PutOnMarketplace" ? PutOnMarketPlace() : ""
                          }) : "" : ""}

                    {!loading && orders?.length >= 1 && buttons?.length > 0 && buttons[0]?.length > 0 && orders !== "null" &&
                      !isEmpty(orders[0]) ? orders?.map((order, i) => {

                        if (buttons?.length > 0 && buttons !== "null") {
                          return buttons[i]?.map((b, i) => {
                            return renderButtons(b, order?.oSellerWalletAddress,
                              convertToEth(order?.oPrice?.$numberDecimal),
                              order._id,
                              order.oQuantity,
                              order.quantity_sold, i, order.paymentTokenData,
                              order.oValidUpto,
                              order.oQuantity - order.quantity_sold, order.oType,
                              order.oSeller,
                              order.isUserHaveActiveOffer === undefined ? false : order.isUserHaveActiveOffer,
                              order.isUserHaveActiveBid === undefined ? false : order.isUserHaveActiveBid, order)
                          })
                        }


                      })
                      : !loading && orders !== "null" && !isOwned && buttons !== "null" && buttons?.length <= 0 && getButtonsGroup(isLazyMint, 0, haveOrder, false, false, ownedQuantity, originalQty, currentUser, orders)?.length <= 0 && currentUser !== "null" ?
                        NotForSale() : ""
                    }

                  </div>}

                {selectedMenu === 1 &&
                  <div className="tab-1 onStep fadeIn historyTab scrollable">
                    {history && history?.length > 0
                      ? history?.map((h, i) => {

                        return (
                          <div className="row mb-4" key={i}>
                            <div className="col-lg-12">
                              <div className="item_author author_item_list align-items-start">
                                <div className="author_list_pp">
                                  <span>
                                    <img
                                      className="lazy"
                                      src={
                                        h && h.sProfilePicUrl
                                          ? h.sProfilePicUrl
                                          : Avatar
                                      }
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div className="author_list_info">
                                  <h6>
                                    {getAction(h.action, h.actionMeta)
                                      .toString()
                                      .toUpperCase()}{" "}
                                    {"  "}
                                  </h6>
                                  {h.message}
                                  <p>
                                    {moment.utc(h.sCreated).local().fromNow()
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                      : ""}
                    <div className="row customRow">
                      <div className="col-lg-12">
                        {totalPages > 1 ? (
                          <Pagination
                            count={totalPages}
                            size="large"
                            page={currPage}
                            variant="outlined"
                            shape="rounded"
                            onChange={handleChange}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>}

                {selectedMenu === 2 &&
                  <div className="tab-1 onStep fadeIn historyTab scrollable">
                    {bids && bidsLength >= 1 && nftDetails
                      ? bids?.map((bid, key) => {
                        return (
                          <div className="row" key={key}>
                            {bid.isOffer === false && bid.bidStatus !== "Accepted" && bid.bidStatus === "Bid" ?
                              <>
                                <div className="col item_author_ram ">
                                  <div className="item_list">
                                    <div className="item_list_pp bidsList">
                                      <span>
                                        <img
                                          className="lazy"
                                          src={
                                            bid.bidderProfile
                                              ? bid.bidderProfile
                                              : Avatar
                                          }
                                          alt=""
                                        />
                                      </span>
                                    </div>
                                    <div className="item_list_info bidsList">
                                      <div className="row">
                                        <div className="col vCenter bidsText">
                                          Bid by{" "}
                                          <h6>
                                            {bid.bidder?.length > 20
                                              ? bid.bidder.slice(0, 6) +
                                              "...." +
                                              bid.bidder.slice(
                                                bid.bidder?.length - 6,
                                                bid.bidder?.length
                                              )
                                              : bid.bidder}
                                            &nbsp; at
                                          </h6>
                                          <p>Bid Price &nbsp;
                                            {convertToEth(
                                              bid.bidPrice
                                                ? +" " + bid.bidPrice + " "
                                                : " 0 "
                                            )}
                                            &nbsp;
                                            {bid.paymentSymbol
                                              ? bid.paymentSymbol + " "
                                              : " "}
                                            For {bid.bidQuantity}/
                                            {nftDetails.nQuantity}
                                          </p>
                                        </div>
                                        <div className="col vCenter">
                                          <div className="customCol centerAlign">
                                            <div className="button_section">
                                              {currentUser?.toLowerCase() !==
                                                bid?.bidder?.toLowerCase() &&
                                                currentUser?.toLowerCase() ===
                                                bid?.seller?.toLowerCase() ? (
                                                <>
                                                  <button
                                                    className="accept_btn"
                                                    onClick={async () => {
                                                      let res1 =
                                                        await handleNetworkSwitch(
                                                          currentUser
                                                        );
                                                      setCookie(
                                                        "balance",
                                                        res1,
                                                        { path: "/" }
                                                      );
                                                      if (res1 === false)
                                                        return;
                                                      if (!profile) {
                                                        return;
                                                      }
                                                      if (!currentUser) {
                                                        setNotConnectedModal(
                                                          true
                                                        );
                                                        setLoading(false);
                                                        return;
                                                      }
                                                      setLoading(true);
                                                      let res2 = await checkBidOffer(bid.bidId)
                                                      if (res2.message === "Data not found") {
                                                        setReloadContent(!reloadContent)
                                                        NotificationManager.error("There is no active bid to accept", "", 1500);
                                                        setLoading(false);
                                                        return
                                                      }
                                                      await handleAcceptBids(
                                                        bid,
                                                        nftDetails.nType,
                                                        currentUser.slice(
                                                          0,
                                                          3
                                                        ) +
                                                        "..." +
                                                        currentUser.slice(
                                                          39,
                                                          42
                                                        ),
                                                        nftDetails.nTitle,
                                                        currUserLazyMinted,
                                                        nftDetails
                                                      );

                                                      resetStates()
                                                      setReloadContent(!reloadContent)
                                                      setLoading(false);
                                                    }}
                                                  >
                                                    Accept
                                                  </button>
                                                  <button
                                                    className="reject_btn "
                                                    onClick={async () => {
                                                      let res1 =
                                                        await handleNetworkSwitch(
                                                          currentUser
                                                        );
                                                      setCookie(
                                                        "balance",
                                                        res1,
                                                        { path: "/" }
                                                      );
                                                      if (res1 === false)
                                                        return;
                                                      if (!currentUser) {
                                                        setNotConnectedModal(
                                                          true
                                                        );
                                                        setLoading(false);
                                                        return;
                                                      }
                                                      setLoading(true);
                                                      await handleUpdateBidStatus(
                                                        bid.bidId,
                                                        "Rejected",
                                                        bid,
                                                        nftDetails?.nType,
                                                        isLazyMint,
                                                        "Bid",
                                                        currentUser,
                                                      );
                                                      resetStates()
                                                      setReloadContent(!reloadContent)
                                                      setLoading(false);
                                                    }}
                                                  >
                                                    Reject
                                                  </button>
                                                </>
                                              ) : currentUser?.toLowerCase() ===
                                                bid?.bidder?.toLowerCase() &&
                                                currentUser?.toLowerCase() !==
                                                bid?.seller?.toLowerCase() ? (
                                                <>
                                                  <button
                                                    className="cancel_btn "
                                                    onClick={async () => {
                                                      let res1 =
                                                        await handleNetworkSwitch(
                                                          currentUser
                                                        );
                                                      setCookie(
                                                        "balance",
                                                        res1,
                                                        { path: "/" }
                                                      );
                                                      if (res1 === false)
                                                        return;
                                                      if (!currentUser) {
                                                        setNotConnectedModal(
                                                          true
                                                        );
                                                        setLoading(false);
                                                        return;
                                                      }
                                                      setLoading(true);
                                                      await handleUpdateBidStatus(
                                                        bid.bidId,
                                                        "Cancelled",
                                                        bid,
                                                        nftDetails?.nType,
                                                        isLazyMint,
                                                        "Bid",
                                                        currentUser
                                                      );
                                                      resetStates()
                                                      setReloadContent(!reloadContent)

                                                      setLoading(false);
                                                    }}
                                                  >
                                                    Cancel
                                                  </button>
                                                </>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="spacer-10"></div>
                              </>
                              : ""}
                          </div>
                        );
                      })
                      : <div className='col-md-12'>
                        <h4 className='no_data_text text-muted text-left'>
                          No Bids Available
                        </h4>
                      </div>}
                  </div>}

                {selectedMenu === 3 &&
                  <div className="tab-1 onStep fadeIn historyTab scrollable">


                    <div className="spacer-20"></div>
                    <div className="nft_attr_section">
                      <div className="row gx-2">
                        {metaData && metaData?.length > 0
                          ? metaData?.map((data, key) => {
                            return (
                              <div className="col-lg-4 col-md-6 col-sm-6" key={key}>
                                <div className="nft_attr">
                                  <h5>{data.trait_type}</h5>
                                  <h4>{data.value}</h4>
                                </div>
                              </div>
                            );
                          })
                          : <div className='col-md-12'>
                            <h4 className='no_data_text text-muted'>
                              No Properties Added
                            </h4>
                          </div>}
                      </div>


                    </div>
                  </div>}

                {selectedMenu === 4 &&
                  <div className="tab-1 onStep fadeIn historyTab scrollable">
                    {offerLength && offerLength >= 1 && nftDetails
                      ? bids?.map((bid, key) => {
                        return (
                          <div className="row" key={key}>
                            {bid.isOffer === true && bid.bidStatus === "MakeOffer" ?
                              <>
                                <div className="col item_author_ram ">
                                  <div className="item_list">
                                    <div className="item_list_pp bidsList">
                                      <span>
                                        <img
                                          className="lazy"
                                          src={
                                            bid.bidderProfile
                                              ? bid.bidderProfile
                                              : Avatar
                                          }
                                          alt=""
                                        />
                                      </span>
                                    </div>
                                    <div className="item_list_info bidsList">
                                      <div className="row">
                                        <div className="col vCenter bidsText">
                                          Offer by{" "}
                                          <h6>
                                            {bid.bidder?.length > 20
                                              ? bid.bidder.slice(0, 6) +
                                              "...." +
                                              bid.bidder.slice(
                                                bid.bidder?.length - 6,
                                                bid.bidder?.length
                                              )
                                              : bid.bidder}
                                            &nbsp; at
                                          </h6>
                                          <p> Offer Price &nbsp;
                                            {convertToEth(
                                              bid.bidPrice
                                                ? +" " + bid.bidPrice + " "
                                                : " 0 "
                                            )}
                                            &nbsp;
                                            {bid.paymentSymbol
                                              ? bid.paymentSymbol + " "
                                              : " "}
                                            For {bid.bidQuantity}/
                                            {nftDetails.nQuantity}
                                          </p>
                                        </div>
                                        <div className="col vCenter">
                                          <div className="customCol centerAlign">
                                            <div className="button_section">
                                              {currentUser?.toLowerCase() !==
                                                bid?.bidder?.toLowerCase() &&
                                                currentUser?.toLowerCase() ===
                                                bid?.seller?.toLowerCase() ? (
                                                <>
                                                  <button
                                                    className="accept_btn"
                                                    onClick={async () => {
                                                      let res1 =
                                                        await handleNetworkSwitch(
                                                          currentUser
                                                        );
                                                      setCookie(
                                                        "balance",
                                                        res1,
                                                        { path: "/" }
                                                      );
                                                      if (res1 === false)
                                                        return;
                                                      if (!profile) {
                                                        return;
                                                      }
                                                      if (!currentUser) {
                                                        setNotConnectedModal(
                                                          true
                                                        );
                                                        setLoading(false);
                                                        return;
                                                      }
                                                      setLoading(true);
                                                      let res2 = await checkBidOffer(bid.bidId)
                                                      if (res2.message === "Data not found") {
                                                        setReloadContent(!reloadContent)
                                                        NotificationManager.error("There is no active Offer to accept", "", 1500);
                                                        setLoading(false);
                                                        return
                                                      }
                                                      await handleAcceptOffers(
                                                        bid,
                                                        nftDetails.nType,
                                                        currentUser.slice(
                                                          0,
                                                          3
                                                        ) +
                                                        "..." +
                                                        currentUser.slice(
                                                          39,
                                                          42
                                                        ),
                                                        currUserLazyMinted,
                                                        nftDetails,
                                                        currentUser

                                                      );
                                                      resetStates()
                                                      setReloadContent(!reloadContent)
                                                      setLoading(false);
                                                    }}
                                                  >
                                                    Accept
                                                  </button>
                                                  <button
                                                    className="reject_btn "
                                                    onClick={async () => {
                                                      let res1 =
                                                        await handleNetworkSwitch(
                                                          currentUser
                                                        );
                                                      setCookie(
                                                        "balance",
                                                        res1,
                                                        { path: "/" }
                                                      );
                                                      if (res1 === false)
                                                        return;
                                                      if (!currentUser) {
                                                        setNotConnectedModal(
                                                          true
                                                        );
                                                        setLoading(false);
                                                        return;
                                                      }
                                                      setLoading(true);
                                                      await handleUpdateBidStatus(
                                                        bid.bidId,
                                                        "Rejected",
                                                        bid,
                                                        nftDetails?.nType,
                                                        isLazyMint,
                                                        "Offer",
                                                        currentUser
                                                      );
                                                      resetStates()
                                                      setReloadContent(!reloadContent)
                                                      setLoading(false);
                                                    }}
                                                  >
                                                    Reject
                                                  </button>
                                                </>
                                              ) : currentUser?.toLowerCase() ===
                                                bid?.bidder?.toLowerCase() &&
                                                currentUser?.toLowerCase() !==
                                                bid?.seller?.toLowerCase() ? (
                                                <>
                                                  <button
                                                    className="cancel_btn "
                                                    onClick={async () => {
                                                      let res1 =
                                                        await handleNetworkSwitch(
                                                          currentUser
                                                        );
                                                      setCookie(
                                                        "balance",
                                                        res1,
                                                        { path: "/" }
                                                      );
                                                      if (res1 === false)
                                                        return;
                                                      if (!currentUser) {
                                                        setNotConnectedModal(
                                                          true
                                                        );
                                                        setLoading(false);
                                                        return;
                                                      }
                                                      setLoading(true);
                                                      await handleUpdateBidStatus(
                                                        bid.bidId,
                                                        "Cancelled",
                                                        bid,
                                                        nftDetails?.nType,
                                                        isLazyMint,
                                                        "Offer",
                                                        currentUser
                                                      );
                                                      resetStates()
                                                      setReloadContent(!reloadContent)
                                                      setLoading(false);
                                                    }}
                                                  >
                                                    Cancel
                                                  </button>
                                                </>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="spacer-10"></div>
                              </>
                              : ""}
                          </div>
                        );
                      })
                      : <div className='col-md-12'>
                        <h4 className='no_data_text text-muted'>
                          No Offers Available
                        </h4>
                      </div>}
                  </div>}

                {selectedMenu === 5 &&
                  <div className="tab-1 onStep fadeIn historyTab scrollable">
                    <div className="nft_attr_section">
                      <ul className="owners_list">
                        {owners?.length > 0 ? owners?.map((o, i) => {
                          return (<li key={i}>
                            <b>{o.address}</b> owns <b>{o.quantity} Qty </b>
                          </li>)
                        }) : ""}
                      </ul>


                    </div>
                  </div>}

              </div >
            </div >
          </div >
        </div >
      </section >

      <Footer />
    </div >
  );
};

export default ItemDetails;
