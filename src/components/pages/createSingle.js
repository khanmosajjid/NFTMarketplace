import React, { useState, useEffect, useRef } from "react";
import {
  createNft,
  createOrder,
  getProfile,
  getUsersCollections,
  InsertHistory,
  SetNFTOrder,
  UpdateStatus
} from "./../../apiServices";
import Clock from "../components/Clock";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import { exportInstance, UpdateTokenCount } from "../../apiServices";
import contracts from "../../config/contracts";
import { ethers } from "ethers";
import Loader from "../components/loader";
import extendedERC721Abi from "./../../config/abis/extendedERC721.json";
import $ from "jquery";
import "../../App.css";
import {
  CURRENCY,
  GENERAL_DATE,
  GENERAL_TIMESTAMP,
  MAX_FILE_SIZE,
} from "../../helpers/constants";
import NotificationManager from "react-notifications/lib/NotificationManager";
import {
  checkIfCollectionNameAlreadyTaken,
  getSignature,
} from "../../helpers/getterFunctions";
import { handleCollectionCreation } from "../../helpers/sendFunctions";
import { options } from "../../helpers/constants";
import { Row, Col } from "react-bootstrap";
import Avatar from "./../../assets/images/avatar5.jpg";
import { convertToEth } from "../../helpers/numberFormatter";
import ItemNotFound from "./ItemNotFound";
import "./../components-css/create.css";
import {
  checkIfValidFileExtension,
  checkIfValidAddress,
  getMaxAllowedDate,
  getTokenSymbolByAddress,
  handleNetworkSwitch,
} from "../../helpers/utils";
import { getTokenNameAndSymbolByAddress } from "./../../helpers/getterFunctions";
import { useCookies } from "react-cookie";
import previewImage from "./../../assets/images/preview.jpeg";
import { showProcessingModal } from "../../utils";
import UploadImg from "../../assets/images/upload-image.jpg";
import moment from "moment";

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

const CreateSingle = (props) => {
  const uploadedImage = React.useRef(null);
  const [nftFiles, setNftFiles] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isUnlock, setIsUnlock] = useState(true);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [royalty, setRoyalty] = useState("");
  const [floorPrice, setFloorPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [collections, setCollections] = useState([]);
  const [nftContractAddress, setNftContractAddress] = useState("");
  const [nftImage, setNftImage] = useState("");
  const [nftDesc, setNftDesc] = useState("");
  const [nftTitle, setNftTitle] = useState("");
  const [nextId, setNextId] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [isOpenForBid, setIsOpenForBid] = useState();
  const [timeLeft, setTimeLeft] = useState();
  const [isTimedAuction, setIsTimedAuction] = useState();

  const [collaborators, setCollaborators] = useState([]);
  const [currCollaborator, setCurrCollaborator] = useState();
  const [collaboratorPercents, setCollaboratorPercents] = useState([]);
  const [currCollaboratorPercent, setCurrCollaboratorPercent] = useState();

  const [propertyKeys, setPropertyKeys] = useState([]);
  const [currPropertyKey, setCurrPropertyKey] = useState();
  const [propertyValues, setPropertyValues] = useState([]);
  const [currPropertyValue, setCurrPropertyValue] = useState();

  const [saleType, setSaleType] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [salt, setSalt] = useState();
  const [isPopup, setIsPopup] = useState(false);
  const [isPutOnMarketplace, setIsPutOnMarketPlace] = useState(true);
  const [chosenType, setChosenType] = useState(0);
  const [minimumBid, setMinimumBid] = useState();
  const [endTime, setEndTime] = useState();
  const [selectedTokenAddress, setSelectedTokenAddress] = useState(
    contracts.USDT
  );
  const [isAdvancedSetting, setIsAdvancedSetting] = useState(false);

  /************ Create NFT Popup Checks ********** */
  const [isShowPopup, setisShowPopup] = useState(false);
  const [hideClosePopup, sethideClosePopup] = useState(true);
  const [hideRedirectPopup, sethideRedirectPopup] = useState(false);
  const [ClosePopupDisabled, setClosePopupDisabled] = useState(true);
  const [RedirectPopupDisabled, setRedirectPopupDisabled] = useState(true);
  const [createdItemId, setCreatedItemId] = useState();
  const [isUploadPopupClass, setisUploadPopupClass] =
    useState("checkiconDefault");
  const [isApprovePopupClass, setisApprovePopupClass] =
    useState("checkiconDefault");
  const [isMintPopupClass, setisMintPopupClass] = useState("checkiconDefault");
  const [isRoyaltyPopupClass, setisRoyaltyPopupClass] =
    useState("checkiconDefault");
  const [isPutOnSalePopupClass, setisPutOnSalePopupClass] =
    useState("checkiconDefault");
  const [lockedContent, setLockedContent] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState(CURRENCY);
  const [profile, setProfile] = useState();
  const [cookies, setCookie] = useCookies(["selected_account", "Authorization"]);
  const [collectionCreation, setCollectionCreation] = useState(false);
  const [isLazyMinting, setIsLazyMinting] = useState(false);
  const [onTimedAuction, setOnTimedAuction] = useState(false);
  const [videoFile, setVideoFile] = useState();
  const [nftType, setNftType] = useState("Image")
  const [blocked, setBlocked] = useState(false);
  const [deactivated, setDeactivated] = useState(false)
  const [img, setImg] = useState()

  const myRef = React.createRef();

  const fileRef = useRef();
  const fileRefCollection = useRef();

  const togglePopup = () => {
    if (!currentUser) {
      NotificationManager.error("Please Connect Your Wallet", "", 1500);
      return;
    }
    if (blocked) {
      NotificationManager.error("Admin Has Blocked Your Account", "", 1500);
      return;
    }
    if (deactivated) {
      NotificationManager.error("Admin Has deactivated Your Account", "", 1500);
      return;
    }

    setIsPopup(!isPopup);
  };

  useEffect(() => {
    setCurrentUser(cookies.selected_account);
  }, [cookies.selected_account]);

  useEffect(() => {
    setIsOpenForBid(false);
    setIsTimedAuction(false);
    setSaleType(0);
    setQuantity(1);
    setTimeLeft("December, 30, 2022");
    setSalt(Math.round(Math.random() * 10000000));
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let profile = await getProfile();
      console.log("profile data is---->", profile)

      if (profile?.data?.sStatus === "deactivated") {
        NotificationManager.error("Admin Has Deactivated Your Account", "", 1500);
        setDeactivated(true)
        setTimeout(() => {
        }, 1500)
      }
      if (profile.data.sStatus === "blocked") {
        NotificationManager.error("Admin Has Blocked  Your Account", "", 1500);
        setBlocked(true)
        setTimeout(() => {
        }, 1500)
      }
      setProfile(profile.data);
      let collectionsList = await getUsersCollections({
        page: 1,
        limit: 100,
        userId: profile.data?._id,
      });

      if (collectionsList && collectionsList?.results?.length >= 1) {
        collectionsList.results = collectionsList?.results.filter(
          (collection) => {
            return collection.erc721 === true;
          }
        );
        setCollections(collectionsList.results);
      }

      if (profile.data && profile.data.sProfilePicUrl) {
        setProfilePic(profile.data.sProfilePicUrl);
      } else {
        setProfilePic(Avatar);
      }
      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.Authorization, cookies.selected_account, isPopup, currentUser]);

  function onClickRefreshState() {
    setImage("")
    setTitle("")
    setDescription("")
    setRoyalty("")
    setFloorPrice(0)
    setFiles("")
    setSymbol()
  }

  function closePopup() {
    setisShowPopup(false);
    sethideClosePopup(true);
    sethideRedirectPopup(false);
    setClosePopupDisabled(true);
    setRedirectPopupDisabled(true);
    setisUploadPopupClass("checkiconDefault");
    setisApprovePopupClass("checkiconDefault");
    setisMintPopupClass("checkiconDefault");
    setisRoyaltyPopupClass("checkiconDefault");
    setisPutOnSalePopupClass("checkiconDefault");
  }

  function stopCreateNFTPopup() {
    sethideRedirectPopup(false);
    setClosePopupDisabled(false);
    sethideClosePopup(true);
  }

  function closeCreateNFTPopup() {
    sethideClosePopup(false);
    setRedirectPopupDisabled(false);
    sethideRedirectPopup(true);
  }

  function redirectCreateNFTPopup() {
    if (createdItemId) window.location.href = `/itemDetail/${createdItemId}`;
    else window.location.href = `/profile`;
  }

  function inputPrice(event) {
    const re = /[+-]?[0-9]+\.?[0-9]*/;

    let val = event.target.value;
    if (val === "" || re.test(val)) {
      const numStr = String(val);
      if (numStr.includes(".")) {
        if (numStr.split(".")[1].length > 8) {
        } else {
          if (val.split(".").length > 2) {
            val = val.replace(/\.+$/, "");
          }
          if (val.length === 1 && val !== "0.") {
            val = Number(val);
          }
          setPrice(val);
        }
      } else {
        if (val.split(".").length > 2) {
          val = val.replace(/\.+$/, "");
        }
        if (val.length === 1 && val !== "0.") {
          val = Number(val);
        }
        setPrice(val);
      }
    }
  }

  function inputPriceAuction(event) {
    const re = /[+-]?[0-9]+\.?[0-9]*/;
    let val = event.target.value;
    if (event.target.value === "" || re.test(event.target.value)) {
      const numStr = String(val);
      if (numStr.includes(".")) {
        if (numStr.split(".")[1].length > 8) {
        } else {
          if (val.split(".").length > 2) {
            val = val.replace(/\.+$/, "");
          }
          if (val.length === 1 && val !== "0.") {
            val = Number(val);
          }
          setMinimumBid(val);
        }
      } else {
        if (val.split(".").length > 2) {
          val = val.replace(/\.+$/, "");
        }
        if (val.length === 1 && val !== "0.") {
          val = Number(val);
        }
        setMinimumBid(val);
      }
    }
  }

  const onChange = (e) => {
    var nftFiles = e.target.files;
    var filesArr = Array.prototype.slice.call(nftFiles);
    var file = e.target.files[0];
    let extension = file.type.split("/").pop();



    console.log("filess externsion in createsingle is-------->", extension)
    setNftFiles([...nftFiles, ...filesArr]);
    if (e.target.files && e.target.files[0]) {
      if (extension === "mp4") {
        setNftType("mp4")
        // setNftImage(e.target.files[0])
      } else {
        setNftType("Image")
      }
    }


    if (
      !checkIfValidFileExtension(file, ["jpg", "jpeg", "gif", "png", "mp4"])
    ) {
      NotificationManager.error("This file type not supported", "", 1500);
      return;
    }
    if (file.size / 1000000 > MAX_FILE_SIZE)
      NotificationManager.warning(
        `File size should be less than ${MAX_FILE_SIZE} MB`
      );

    document.getElementById("file_name").style.display = "none";

    //const { current } = uploadedImage;
    //current.file = file;
    //reader.onload = (e) => {
    //  current.src = e.target.result;
    //};
    setNftFiles([...nftFiles, ...filesArr]);
    if (e.target.files && e.target.files[0]) {
      if (extension === "mp4") {

        let blobURL = URL.createObjectURL(e.target.files[0]);
        console.log(blobURL);


        setImg(blobURL);
        console.log("mp4 is changed")
        setNftImage(e.target.files[0])
      }
      else {
        let img = e.target.files[0];
        setNftImage(img);

      }

    }
  };

  const onCollectionImgChange = (e) => {
    if (!window.FileReader) {
      // This is VERY unlikely, browser support is near-universal
      return;
    }

    var file = e.target.files[0];
    if (
      !checkIfValidFileExtension(file, ["jpg", "jpeg", "gif", "png"])
    ) {
      NotificationManager.error("This file type not supported", "", 1500);
      return;
    }
    if (file.size / 1000000 > MAX_FILE_SIZE)
      NotificationManager.warning(
        `File size should be less than ${MAX_FILE_SIZE} MB`,
        "",
        1500
      );

    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    document.getElementById("collection_file_name").style.display = "none";
    setFiles([...files, ...filesArr]);
    if (e.target.files && e.target.files[0]) {
      let imgC = e.target.files[0];
      setImage(imgC);
    }
  };

  const handleCollectionCreate = async () => {
    // let res = await handleNetworkSwitch(currentUser);
    // setCookie("balance", res, { path: "/" })
    // if (res === false) return;
    console.log("here----->")
    setIsPopup(false);
    setCollectionCreation(true);
    if (!currentUser && profile) {
      NotificationManager.error("Please Connect Your Wallet", "", 1500);
      return;
    }
    if (files && files.length > 0) {
      if (files[0].size / 1000000 > MAX_FILE_SIZE) {
        NotificationManager.error(
          `File size should be less than ${MAX_FILE_SIZE} MB`,
          "",
          1500
        );
        return;
      }
    }
    try {
      let _title = title.replace(/^\s+|\s+$/g, "");

      if (_title === "" || _title === undefined) {
        NotificationManager.error("Please Enter Title", "", 1500);
        setCollectionCreation(false);
        return;
      }
      if (image === undefined || image === "") {
        NotificationManager.error("Please Upload Image", "", 1500);
        setCollectionCreation(false);
        return;
      }
      let _symbol = symbol.replace(/^\s+|\s+$/g, "");

      if (_symbol === "" || _symbol === undefined) {
        NotificationManager.error("Please Enter Symbol", "", 1500);
        setCollectionCreation(false);
        return;
      }

      let res = await checkIfCollectionNameAlreadyTaken(_title);
      console.log("here for checking")

      if (res === true) {
        NotificationManager.error("Collection Name Already Taken", "", 1500);
        setCollectionCreation(false);
        return;
      }
      setCollectionCreation(true);
      console.log("here againg for testing")
      let collectionData = {
        sName: _title,
        sDescription: description,
        nftFile: image,
        erc721: JSON.stringify(true),
        sRoyaltyPercentage: Number(royalty) * 100,
        quantity: 1,
        floorPrice:floorPrice,
        symbol: symbol,
      };
      let collectionsList = "";
      try {
        console.log("in this")
        let ress = await handleCollectionCreation(
          true,
          collectionData,
          currentUser
        );
        console.log("profile is 456----------->", profile)
        collectionsList = await getUsersCollections({
          page: 1,
          limit: 100,
          userId: profile._id,
        });


        if (ress === false) {
          setCollectionCreation(false);
          window.location.reload();
        }
      } catch (e) {
        setCollectionCreation(false);
        return;
      }

      setCollectionCreation(false);
      togglePopup();
      if (collectionsList && collectionsList?.results?.length > 0) {
        collectionsList.results = collectionsList?.results.filter(
          (collection) => {
            return collection.erc721 === true;
          }
        );
        setCollections(collectionsList?.results);
      }
      onClickRefreshState()
      //window.location.reload();
    } catch (e) {
      setCollectionCreation(false);
      togglePopup();
      console.log(e);
    }
  };

  const validateInputs = () => {
    let sum = 0;
    for (let i = 0; i < collaboratorPercents.length; i++) {
      sum = sum + Number(collaboratorPercents[i]);
    }
    if (sum > 100) {
      NotificationManager.error(
        "Total percentage should be less than 100",
        "",
        1500
      );

      return false;
    }
    if (!nftContractAddress) {
      NotificationManager.error("Please Choose Valid Collection", "", 1500);
      return false;
    }
    // if(title==""){
    //   NotificationManager.error("Please choose valid title");
    //   return false;
    // }

    return true;
  };

  const handleNftCreation = async () => {
    let res1 = await handleNetworkSwitch(currentUser);
    let res;
    setCookie("balance", res1, { path: "/" })
    if (res1 === false) return;
    let options;
    if (!currentUser) {
      NotificationManager.error("Please Connect Your Wallet", "", 1500);
      return;
    }
    if (blocked) {
      NotificationManager.error("Admin Has Blocked Your Account", "", 1500);
      return;
    }
    if (deactivated) {
      NotificationManager.error("Admin Has Deactivated Your Account", "", 1500);
      return;
    }
    if (nftFiles && nftFiles.length > 0) {
      if (nftFiles[0].size / 1000000 > MAX_FILE_SIZE) {
        NotificationManager.error(
          `File size should be less than ${MAX_FILE_SIZE} MB`
        );
        return;
      }
    }
    let _nftTitle = nftTitle.replace(/^\s+|\s+$/g, "");

    if (!nftImage) {
      NotificationManager.error("Please Upload NFT Image", "", 1500);
      return;
    }
    if (_nftTitle === "" || _nftTitle === undefined) {
      NotificationManager.error("Please Enter NFT Title", "", 1500);
      return;
    }
    if (quantity === "" || quantity === 0 || quantity === undefined) {
      NotificationManager.error("Please Enter NFT Quantity", "", 1500);
      return;
    }

    if (Number(quantity) < 1) {
      NotificationManager.error("Quantity can't be 0", "", 1500);
      return;
    }
    if (isPutOnMarketplace) {
      if (chosenType === 0 && Number(price) <= 0) {
        NotificationManager.error("Price can't be less than zero", "", 1500);
        return;
      }
      if ((chosenType === 1 || chosenType === 2) && Number(minimumBid) <= 0) {
        NotificationManager.error(
          "minimum bid amount can't be less than zero",
          "",
          1500
        );
        return;
      }
    }

    if (onTimedAuction && endTime === undefined) {
      NotificationManager.error("Please Select an Expiration Date");
      return;
    }

    try {
      console.log("update collection token before called", nftContractAddress)
      await UpdateTokenCount(nftContractAddress);
      console.log("update collection token is called")
    } catch (e) {
      console.log("error in update token count 556", e);
    }
    if (currentUser && profile) {
      try {
        let isValid = validateInputs();
        if (!isValid) return;

        setisShowPopup(true);

        setisApprovePopupClass("clockloader");

        const NFTcontract = await exportInstance(
          nftContractAddress,
          extendedERC721Abi.abi
        );

        console.log("NFTcontract", NFTcontract);

        try {

          options = {
            from: currentUser,
            gasLimit: 9000000,
            value: 0,
          };
          let approval = await NFTcontract.isApprovedForAll(
            currentUser,
            contracts.MARKETPLACE,
            options
          );
          let approvalRes;

          if (approval) {
            setisApprovePopupClass("checkiconCompleted");
          }
          if (!approval) {
            approvalRes = await NFTcontract.setApprovalForAll(
              contracts.MARKETPLACE,
              true,
              options
            );
            approvalRes = await approvalRes.wait();
            if (approvalRes.status === 0) {
              NotificationManager.error("Transaction failed", "", 1500);
              return;
            }

            if (approvalRes.status == 1) {
              setisApprovePopupClass("checkiconCompleted");
            } else {
              setisApprovePopupClass("errorIcon");
              stopCreateNFTPopup();

              return;
            }
            NotificationManager.success("Approved", "", 1500);
          }
        } catch (e) {
          console.log("err", e);
          if (e.toString().includes("unknown account #0")) {
            NotificationManager.error("Not able to detect wallets, Please check if metamask is unlocked");

          }
          setisApprovePopupClass("errorIcon");
          stopCreateNFTPopup();
          return;
        }

        setisMintPopupClass("clockloader");

        console.log("next id is-------->", nextId)
        let res1 = {};

        try {
          const options = {
            from: currentUser,
            gasLimit: 9000000,
            value: 0,
          };
          let metaData = [];
          for (let i = 0; i < propertyKeys.length; i++) {
            if (propertyKeys[i]?.trim() !== "" && propertyValues[i]?.trim() !== "") {
              metaData.push({
                trait_type: propertyKeys[i],
                value: propertyValues[i],
              });
            }

          }
          let mintRes = {}
          if (isLazyMinting) {
            res1.status = 1;
            mintRes.hash = ""
            var fd = new FormData();
            fd.append("metaData", JSON.stringify(metaData));
            fd.append("nCreatorAddress", currentUser.toLowerCase());
            fd.append("nTitle", _nftTitle);
            fd.append("nftFile", nftImage);
            fd.append("nQuantity", quantity);
            fd.append("nCollaborator", [...collaborators]);
            fd.append("nCollaboratorPercentage", [...collaboratorPercents]);
            fd.append("nRoyaltyPercentage", 10);
            fd.append("nCollection", nftContractAddress);
            fd.append("nDescription", nftDesc);
            fd.append("nTokenID", nextId);
            fd.append("nType", 1);
            fd.append("lockedContent", lockedContent);
            fd.append("nLazyMintingStatus", isLazyMinting ? 1 : 0);
            fd.append("nNftImageType", nftType)
            fd.append("hash", isLazyMinting ? "" : mintRes?.hash)
            fd.append("hashStatus", isLazyMinting ? 1 : 0)
            try {
              res = await createNft(fd);
              console.log("response of create nft is----->", res)
              try {
                let historyMetaData = {
                  nftId: res.data._id,
                  userId: res.data.nCreater,
                  action: "Creation",
                  actionMeta: "Default",
                  message: `By ${profile.sWalletAddress
                    ? profile.sWalletAddress.slice(0, 3) +
                    "..." +
                    profile.sWalletAddress.slice(39, 42)
                    : ""
                    } `,
                };

                await InsertHistory(historyMetaData);
              } catch (e) {
                console.log("error in history api", e);
                NotificationManager.error("Something went wrong while creating History")
                return;
              }
            } catch (e) {
              console.log("err", e);
              return;
            }

          }
          else if (!isLazyMinting) {
            mintRes = await NFTcontract.mint(currentUser, nextId, options);
            console.log("mintRes1 is----->", res1)
            console.log("nft description is------>", nftDesc);
            var fd = new FormData();
            fd.append("metaData", JSON.stringify(metaData));
            fd.append("nCreatorAddress", currentUser.toLowerCase());
            fd.append("nTitle", _nftTitle);
            fd.append("nftFile", nftImage);
            fd.append("nQuantity", quantity);
            fd.append("nCollaborator", [...collaborators]);
            fd.append("nCollaboratorPercentage", [...collaboratorPercents]);
            fd.append("nRoyaltyPercentage", 10);
            fd.append("nCollection", nftContractAddress);
            fd.append("nDescription", nftDesc);
            fd.append("nTokenID", nextId);
            fd.append("nType", 1);
            fd.append("lockedContent", lockedContent);
            fd.append("nLazyMintingStatus", isLazyMinting ? 1 : 0);
            fd.append("nNftImageType", nftType)
            fd.append("hash", isLazyMinting ? "" : mintRes?.hash)
            fd.append("hashStatus", isLazyMinting ? 1 : 0)

            try {
              res = await createNft(fd);
              console.log("response of create nft is----->", res)
              try {
                let historyMetaData = {
                  nftId: res.data._id,
                  userId: res.data.nCreater,
                  action: "Creation",
                  actionMeta: "Default",
                  message: `By ${profile && profile.sWalletAddress
                    ? profile.sWalletAddress.slice(0, 3) +
                    "..." +
                    profile.sWalletAddress.slice(39, 42)
                    : ""
                    } `,
                };

                await InsertHistory(historyMetaData);
                res1 = await mintRes.wait()
              } catch (e) {
                if (e.code = "CALL_EXCEPTION") {
                  NotificationManager.error("Something went wrong in token Minting");
                  return;
                }
                console.log("error in history api", e);
                NotificationManager.error("Something went wrong while creating History");
                return;
              }
            } catch (e) {
              console.log("err", e);
              return;
            }
          }


          if (res1.status === 0) {
            NotificationManager.error("Transaction failed", "", 1500);
            return;
          } else if (res1.status === 1) {
            let req = {
              "recordID": res.data._id,
              "DBCollection": "NFT",
              "hashStatus": 1
            }
            try {
              await UpdateStatus(req)
              //NotificationManager.success("NFT created successfully", "", 1500)
              //slowRefresh(1000)

            }
            catch (e) {
              console.log("updateStatus catch", e)
              return
            }
          }

        } catch (minterr) {
          console.log("mint err is--->", minterr)
          setisMintPopupClass("errorIcon");
          stopCreateNFTPopup();
          return;
        }


        setisMintPopupClass("checkiconCompleted");
        setisRoyaltyPopupClass("clockloader");

        let localCollabPercent = [];
        for (let i = 0; i < collaboratorPercents.length; i++) {
          localCollabPercent[i] = Number(collaboratorPercents[i]) * 100;
        }
        if (collaborators.length > 0) {
          try {

            const options = {
              from: currentUser,
              gasLimit: 9000000,
              value: 0,
            };
            let collaborator = await NFTcontract.setTokenRoyaltyDistribution(
              collaborators,
              localCollabPercent,
              nextId,
              options
            );
            collaborator = await collaborator.wait();
            if (collaborator.status === 0) {
              NotificationManager.error("Transaction failed", "", 1500);
              return;
            }
            stopCreateNFTPopup();
          } catch (Collerr) {
            setisRoyaltyPopupClass("errorIcon");
            stopCreateNFTPopup();
            return;
          }
        }
        setisRoyaltyPopupClass("checkiconCompleted");
        setisUploadPopupClass("clockloader");
        let metaData = [];
        for (let i = 0; i < propertyKeys.length; i++) {
          metaData.push({
            trait_type: propertyKeys[i],
            value: propertyValues[i],
          });
        }

        // let metaDataJson = JSON.stringify(metaData);
        console.log('yok', process.env.REACT_APP_IPFS_URL +'/'+ res?.data?.nHash)
        let tokenURI = process.env.REACT_APP_IPFS_URL +'/'+ res?.data?.nHash
        try {
          let tokenUri = await NFTcontract.setCustomTokenUri(
            nextId,
            tokenURI,
            { from: currentUser, value: 0 }
          );
          tokenUri = await tokenUri.wait()
          if (tokenUri && tokenUri.status === 0) {
            return;
          }
          console.log("response of create nft is----->", res)
        }
        catch (e) {
          console.log("error in token uri", e)
          setisUploadPopupClass("errorIcon");
          stopCreateNFTPopup();
          return;
        }

        if (
          res.message ===
          "Invalid file type! Only JPG, JPEG, PNG, GIF, MP4, MP3 & MPEG  files are allowed. "
        ) {
          setisUploadPopupClass("errorIcon");
          stopCreateNFTPopup();
          NotificationManager.error(
            "Invalid file type! Only JPG, JPEG, PNG, GIF, MP4, MP3 & MPEG  files are allowed. ",
            "",
            1500
          );
          return;
        }
        console.log("response is------>", res?.data)
        setCreatedItemId(res?.data?._id);


        if (res.data) {
          setisUploadPopupClass("checkiconCompleted");
          setisPutOnSalePopupClass("clockloader");
        } else {
          setisUploadPopupClass("errorIcon");
          stopCreateNFTPopup();
          return;
        }

        let _deadline;
        let _price;
        console.log("minimumBid is----->", typeof minimumBid, minimumBid)
        console.log("price is----->", typeof price, price)

        let _auctionEndDate;
        if (chosenType === 0) {
          _deadline = GENERAL_TIMESTAMP;
          _auctionEndDate = GENERAL_DATE;
          if (isPutOnMarketplace) {
            _price = ethers.utils.parseEther(price.toString()).toString();
          }

        } else if (chosenType === 1) {
          let minmBid = minimumBid.toString()
          let _endTime = new Date(endTime).valueOf() / 1000;
          _auctionEndDate = endTime;
          _deadline = _endTime;
          if (isPutOnMarketplace) {
            _price = ethers.utils.parseEther(minmBid.toString()).toString();
          }

        } else if (chosenType === 2) {
          let minmBid = minimumBid.toString()
          _deadline = GENERAL_TIMESTAMP;
          _auctionEndDate = GENERAL_DATE;
          if (isPutOnMarketplace) {
            _price = ethers.utils.parseEther(minmBid).toString();
          }

        }

        if (isPutOnMarketplace) {
          let sellerOrder = [
            currentUser.toLowerCase(),
            nftContractAddress,
            nextId,
            quantity,
            saleType,
            saleType !== 0
              ? selectedTokenAddress
              : "0x0000000000000000000000000000000000000000",
            _price,
            _deadline,
            [],
            [],
            salt,
          ];
          console.log("seller order is------->", sellerOrder);

          console.log(
            "token uri",
            NFTcontract,
            nextId,
            currentUser,
            `https://ipfs.io/ipfs/${res.data.nHash}`
          );
          


          let signature = await getSignature(currentUser, ...sellerOrder);
          if (signature === false) {
            setisPutOnSalePopupClass("errorIcon");
            stopCreateNFTPopup();
            return;
          }
          let reqParams = {
            nftId: res.data._id,
            seller: currentUser.toLowerCase(),
            tokenAddress:
              saleType !== 0
                ? selectedTokenAddress
                : "0x0000000000000000000000000000000000000000",
            collection: nftContractAddress,
            price: _price,
            quantity: quantity,
            saleType: saleType,
            validUpto: _deadline,
            signature: signature,
            tokenId: nextId,
            auctionEndDate: _auctionEndDate,
            salt: salt,
          };

          let data = "";
          try {
            data = await createOrder(reqParams);
            try {
              let historyMetaData = {
                nftId: res.data._id,
                userId: res.data.nCreater,
                action: "Marketplace",
                actionMeta: "Listed",
                message: `For ${convertToEth(_price)} ${saleType === 0 ? CURRENCY : selectedTokenSymbol
                  } by ${currentUser.slice(0, 3) + "..." + currentUser.slice(39, 42)
                  } `,

              };

              await InsertHistory(historyMetaData);
            } catch (e) {
              console.log("error in history api", e);
              NotificationManager.error("Something went wrong while creating History")

              return;
            }
          } catch (DataErr) {
            setisPutOnSalePopupClass("errorIcon");
            NotificationManager.error("Something went wrong while creating Order")
            stopCreateNFTPopup();
            return;
          }
          try {
            await SetNFTOrder({
              orderId: data.data._id,
              nftId: data.data.oNftId,
            });
          } catch (NFTErr) {
            setisPutOnSalePopupClass("errorIcon");
            NotificationManager.error("Something went wrong while setting Order")
            stopCreateNFTPopup();
            return;
          }
          setisPutOnSalePopupClass("checkiconCompleted");
        }
        setisPutOnSalePopupClass("checkiconCompleted");
        closeCreateNFTPopup();
        // window.location.href = "/profile";
      } catch (err) {
        console.log("error", err);
        stopCreateNFTPopup();
        setisPutOnSalePopupClass("errorIcon");
        return;
      }
    }
  };

  const handleShow = () => {
    setOnTimedAuction(false);
    document.getElementById("tab_opt_1").classList.add("show");
    document.getElementById("tab_opt_1").classList.remove("hide");
    document.getElementById("tab_opt_2").classList.add("hide");
    document.getElementById("tab_opt_2").classList.remove("show");
    document.getElementById("tab_opt_3").classList.remove("show");
    document.getElementById("tab_opt_3").classList.add("hide");

    document.getElementById("btn1").classList.add("active");
    document.getElementById("btn2").classList.remove("active");
    document.getElementById("btn3").classList.remove("active");
    setSaleType(0);
    setChosenType(0);
    setPrice("");
    setMinimumBid("");
    setSelectedTokenSymbol("MATIC");
  };

  const handleShow1 = () => {
    setOnTimedAuction(true);
    document.getElementById("tab_opt_1").classList.add("hide");
    document.getElementById("tab_opt_1").classList.remove("show");
    document.getElementById("tab_opt_2").classList.remove("hide");
    document.getElementById("tab_opt_2").classList.add("show");
    document.getElementById("tab_opt_3").classList.add("hide");
    document.getElementById("tab_opt_3").classList.remove("show");
    document.getElementById("btn1").classList.remove("active");
    document.getElementById("btn2").classList.add("active");
    document.getElementById("btn3").classList.remove("active");
    setSaleType(1);
    setChosenType(1);
    setPrice("");
    setMinimumBid("");
    setSelectedTokenSymbol(options[0].title);
  };

  const handleShow2 = () => {
    setOnTimedAuction(false);
    document.getElementById("tab_opt_1").classList.add("hide");
    document.getElementById("tab_opt_1").classList.remove("show");
    document.getElementById("tab_opt_2").classList.add("hide");
    document.getElementById("tab_opt_2").classList.remove("show");
    document.getElementById("tab_opt_3").classList.remove("hide");
    document.getElementById("tab_opt_3").classList.add("show");
    document.getElementById("btn1").classList.remove("active");
    document.getElementById("btn2").classList.remove("active");
    document.getElementById("btn3").classList.add("active");
    setSaleType(1);
    setChosenType(2);
    setPrice("");
    setMinimumBid("");
    setSelectedTokenSymbol(options[0].title);
  };

  const handleShow3 = () => {
    document.getElementById("btn4").classList.add("active");
  };

  const handleShow4 = (address, i) => {
    setNftContractAddress(address);
    $(".active").removeClass("clicked");
    $("#my_cus_btn" + i).addClass("clicked position-relative");
  };

  const unlockClick = () => {
    setIsActive(true);
  };

  const unlockHide = () => {
    setIsActive(false);
  };

  const clickToUnlock = () => {
    if (isPutOnMarketplace) {
      setIsUnlock(false);
      setIsPutOnMarketPlace(false);
      document.getElementById("tab_opt_1").classList.add("hide");
      document.getElementById("tab_opt_1").classList.remove("show");
      document.getElementById("tab_opt_2").classList.add("hide");
      document.getElementById("tab_opt_2").classList.remove("show");
      document.getElementById("tab_opt_3").classList.add("hide");
      document.getElementById("tab_opt_3").classList.remove("show");
    } else {
      setIsUnlock(true);
      setIsPutOnMarketPlace(true);
    }
  };

  const clickToLazyMint = () => {
    if (isLazyMinting) {
      setIsLazyMinting(false);
    } else {
      setIsLazyMinting(true);
    }
  };

  const handleAddProperty = async () => {
    if (currPropertyKey === "" || currPropertyValue === "" || currPropertyKey === undefined || currPropertyValue === undefined) {
      setCurrPropertyKey("");
      setCurrPropertyValue("");
      NotificationManager.error("Invalid inputs", "", 1500);
      return;
    } else {
      if (currPropertyKey.trim().length === 0 || currPropertyValue.trim().length === 0) {
        NotificationManager.error("Space not allowed", "", 800);
        return;
      }
    }

    let tempArr1 = [];
    let tempArr2 = [];
    if (currPropertyKey) {
      tempArr1.push(...propertyKeys, currPropertyKey);
      tempArr2.push(...propertyValues, currPropertyValue);
    }

    setPropertyKeys(tempArr1);
    setPropertyValues(tempArr2);
    setCurrPropertyKey("");
    setCurrPropertyValue("");
  };

  const handleRemoveProperty = async (index) => {
    let tempArr1 = [...propertyKeys];
    tempArr1[index] = "";
    setPropertyKeys(tempArr1);
    let tempArr2 = [...propertyValues];
    tempArr2[index] = "";
    setPropertyValues(tempArr2);
  };

  const handleAddCollaborator = async () => {
    let data =
      collaborators.length > 0
        ? collaborators.filter(
          (collab) => collab.toLowerCase() === currCollaborator.toLowerCase()
        )
        : [];
    if (data.length > 0) {
      NotificationManager.error("Collaborator already added", "", 1500);
      return;
    }
    console.log("curr collab percentage is---->", currCollaboratorPercent)
    if (currCollaborator === "" || currCollaboratorPercent === "" || currCollaboratorPercent === undefined || currCollaboratorPercent === "undefined") {
      NotificationManager.error("Invalid inputs", "", 1500);
      return;
    }

    if (currCollaboratorPercent <= 0) {
      NotificationManager.error("percentage should  be greater than 0", "", 1500);
      return;
    }
    if (!checkIfValidAddress(currCollaborator)) {
      NotificationManager.error("Invalid Address", "", 1500);
      return;
    }

    if (Number(currCollaboratorPercent) > 100) {
      NotificationManager.error("percentage should be less than 100", "", 1500);
    }

    let tempArr1 = [];
    let tempArr2 = [];
    if (currCollaborator) {
      tempArr1.push(...collaborators, currCollaborator.toLowerCase());
      tempArr2.push(...collaboratorPercents, Number(currCollaboratorPercent));
    }

    let sum = 0;
    for (let i = 0; i < tempArr2.length; i++) {
      sum = sum + Number(tempArr2[i]);
    }
    if (sum > 100) {
      NotificationManager.error(
        "Total percentage should be less than 100",
        "",
        1500
      );
      return;
    }
    setCollaborators(tempArr1);
    setCollaboratorPercents(tempArr2);
    setCurrCollaborator("");
    setCurrCollaboratorPercent("");
  };

  const handleRemoveCollaborator = async (index) => {
    let tempArr1 = [];
    let j = 0;
    for (let i = 0; i < collaborators.length; i++) {
      if (i === index) {
        continue;
      }
      tempArr1[j++] = collaborators[i];
    }
    setCollaborators(tempArr1);
    let tempArr2 = [];
    j = 0;
    for (let i = 0; i < collaborators.length; i++) {
      if (i === index) {
        continue;
      }
      tempArr2[j++] = collaboratorPercents[i];
    }
    setCollaboratorPercents(tempArr2);
  };

  const PropertiesSection = () => {
    return (
      <Row className="property mt-5">
        <Col>
          <input
            type="text"
            className="property-input property-key form-control"
            placeholder="eg. Background"
            value={currPropertyKey}
            onChange={(e) => setCurrPropertyKey(e.target.value)}
          ></input>
        </Col>

        <Col>
          {" "}
          <input
            type="text"
            className="property-input property-value form-control"
            placeholder="eg. Black"
            value={currPropertyValue}
            onChange={(e) => setCurrPropertyValue(e.target.value)}
          ></input>
        </Col>
      </Row>
    );
  };

  const handleDate = (ev) => {
    if (!ev.target["validity"].valid) return;
    // console.log("evv.target", ev.target["value"]);
    const dt = ev.target["value"];
    const ct = moment(new Date()).format();

    if (dt < ct) {
      NotificationManager.error(
        "Start date should not be of past date",
        "",
        1500
      );
      return;
    }
    setEndTime(dt);
  }

  return !currentUser ? (
    <ItemNotFound />
  ) : (
    <div>
      <GlobalStyles />
      {collectionCreation ? (
        showProcessingModal(
          "Collection creation is under process. Please do not refresh the page"
        )
      ) : (
        <></>
      )}
      {loading ? <Loader /> : ""}
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
                  Create Single NFT
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-7 offset-lg-1 4">
            <div id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <div className="mb40">
                  <label className="required">Choose Collection</label>
                  <div className="de_tab tab_methods">
                    <div className="scrollable">
                      <ul className="de_nav">
                        <li id="btn4" className="active " onClick={handleShow3}>
                          <span onClick={togglePopup}>
                            <i className="fa fa-plus"></i>Create New
                          </span>
                        </li>

                        {isPopup && (
                          <div className="collection-popup-box">
                            <span
                              className="close-icon"
                              onClick={() => {
                                togglePopup();
                                window.location.reload();
                              }}
                            >
                              x
                            </span>
                            <div className="add-collection-box">
                              <div className="add-collection-popup-content text-center">
                                <div className="CollectionPopupBox">
                                  <div className="row">
                                    <h3>Collections</h3>
                                    <div
                                      id="form-create-item"
                                      className="form-border"
                                      action="#"
                                    >
                                      <div className="collection-field-set">
                                        <span className="sub-heading">
                                          Upload Collection Cover
                                        </span>
                                        <div className="fileUploader">
                                          <div className="row align-items-center justify-content-center">

                                            <div className="d-create-file col uploadImg-right">
                                              <p id="collection_file_name">
                                                We recommend an image of at least
                                                450x450. PNG, JPG or GIF .
                                                Max
                                                {MAX_FILE_SIZE}mb.
                                              </p>
                                              {files && files.length > 0 ? (
                                                <p>{files[0].name}</p>
                                              ) : (
                                                ""
                                              )}
                                              <div className="col-md-12  uploadImg-container">
                                                {console.log("collection.collectionImage", image
                                                  // , URL.createObjectURL(image)
                                                )}
                                                {!image ? (
                                                  <img
                                                    alt=""
                                                    src={UploadImg}
                                                    onError={() => {
                                                      console.log("error")
                                                      NotificationManager.error("File is not an Image file")
                                                      setImage("")
                                                      setFiles([])
                                                    }}
                                                    className=""
                                                    onClick={() =>
                                                      fileRefCollection.current.click()
                                                    }
                                                  />
                                                ) : (
                                                  <img
                                                    src={URL.createObjectURL(image)}
                                                    id="get_file_2"
                                                    className="collection_cover_preview"
                                                    onError={() => {
                                                      console.log("error")
                                                      NotificationManager.error("File is not an Image file")
                                                      setImage("")
                                                      setFiles([])
                                                    }}
                                                    alt={URL.createObjectURL(image)}
                                                    onClick={() =>
                                                      fileRefCollection.current.click()
                                                    }
                                                  />
                                                )}

                                                <input
                                                  id="upload_file_Upload_collection"
                                                  type="file"
                                                  ref={fileRefCollection}
                                                  required
                                                  onChange={(e) =>
                                                    onCollectionImgChange(e)
                                                  }
                                                />
                                                <div className="img-size">
                                                  {files && files.length > 0
                                                    ? files[0].size / 1000000 +
                                                    "MB"
                                                    : ""}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="spacer-20"></div>

                                        <label className="createColTitle m-0 required">
                                          Title
                                        </label>
                                        <input
                                          type="text"
                                          name="item_title"
                                          value={title}
                                          required
                                          id="item_title"
                                          className="form-control createColInput"
                                          placeholder="e.g. 'Crypto Funk"
                                          onChange={(e) => {
                                            setTitle(e.target.value);
                                          }}
                                        />

                                        <h5 className="createColTitle m-0 required">
                                          Symbol
                                        </h5>

                                        <input
                                          type="text"
                                          name="item_title"
                                          value={symbol}
                                          id="item_title"
                                          className="form-control createColInput"
                                          placeholder="e.g. 'CF"
                                          onChange={(e) => {
                                            setSymbol(e.target.value);
                                          }}
                                        />

                                        <h5 className="createColTitle m-0">
                                          Description{" "}
                                          <span className="optional_text">
                                            (optional)
                                          </span>
                                        </h5>
                                        <input
                                          type="text"
                                          name="item_desc"
                                          required
                                          id="item_desc"
                                          value={description}
                                          className="form-control createColInput"
                                          placeholder="e.g. 'This is very limited item (Max To 250 Words)'"
                                          onChange={(e) => {
                                            if (e.target.value.length > 250) {
                                              NotificationManager.error("Enter Valid Text ", "", 1500)

                                              return;

                                            }
                                            setDescription(e.target.value);
                                          }
                                          }

                                        ></input>

                                        <h5 className="createColTitle m-0">
                                          Royalties{" "}
                                          <span className="optional_text">
                                            (optional)
                                          </span>
                                        </h5>
                                        <input
                                          type="Number"
                                          name="item_royalties"
                                          min="0"
                                          value={royalty}
                                          required
                                          id="item_royalties"
                                          className="form-control createColInput"
                                          placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 50%"
                                          onChange={(e) => {
                                            if (Number(e.target.value) > 50) {
                                              NotificationManager.error(
                                                "Percentage should be less than 50%",
                                                "",
                                                1500
                                              );

                                              return;
                                            }
                                            var t = e.target.value;
                                            e.target.value =
                                              t.indexOf(".") >= 0
                                                ? t.substr(0, t.indexOf(".")) +
                                                t.substr(t.indexOf("."), 3)
                                                : t;
                                            setRoyalty(Number(e.target.value));
                                          }}
                                        />

                                        <h5 className="createColTitle m-0 required">
                                          Floor Price
                                        </h5>

                                        <input
                                          type="text"
                                          name="item_title"
                                          value={floorPrice}
                                          id="item_title"
                                          className="form-control createColInput"
                                          placeholder="e.g. 'CF"
                                          onChange={(e) => {
                                            setFloorPrice(e.target.value);
                                          }}
                                        />

                                        <button
                                          id="submit"
                                          className="round-btn create-collection-btn"
                                          onClick={() => {
                                            handleCollectionCreate();
                                          }}
                                        >
                                          Create Collection
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {collections && collections.length >= 1
                          ? collections.map((collection, index) => {
                            return (
                              <li
                                key={index}
                                id={`my_cus_btn${index}`}
                                className="active position-relative"
                                ref={myRef}
                                onClick={(e) => {
                                  console.log("next id is--------->", collection.nextId)
                                  handleShow4(collection.sContractAddress, index);
                                  setNextId(collection.nextId);
                                }}
                              >

                                <span className="span-border radio-img">

                                  <img
                                    className="choose-collection-img image"
                                    alt=""
                                    height="10px"
                                    width="10px"
                                    src={collection.collectionImage}
                                  ></img>
                                  <p>{collection.sName}</p>
                                </span>
                              </li>
                            );
                          })
                          : ""}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mb40">
                  <label className="required">Upload file</label>
                  <div className="d-create-file">
                    <div className="uploadFile">
                      {" "}
                      <p id="file_name">
                        We recommend an image of at least 450x450. PNG, JPG,
                        GIF or MP4. Max
                        {MAX_FILE_SIZE}
                        mb.
                      </p>
                    </div>

                    <p className="mb-0">
                      {nftFiles && nftFiles.length > 0 ? (
                        <>
                          {nftFiles[0].name.length > 50
                            ? nftFiles[0].name.slice(0, 10) +
                            nftFiles[0].name.slice(
                              nftFiles[0].name.length - 4,
                              nftFiles[0].name.length
                            )
                            : nftFiles[0].name}
                        </>
                      ) : (
                        ""
                      )}
                    </p>
                    <div className="browse">
                      <input
                        type="button"
                        id="get_file"
                        className="round-btn mt-4"
                        value="Browse"
                        onClick={() => {
                          fileRef.current.click();
                          console.log("mp4 change")
                        }}
                      />
                      <input
                        id="upload_file_Upload"
                        type="file"
                        ref={fileRef}
                        onChange={(e) => onChange(e)}

                      />
                    </div>
                  </div>
                </div>

                <div className="switch-with-title mb40">
                  <h5>
                    <i className="fa fa- fa-unlock-alt id-color-2 mr10"></i>
                    Unlock Once Purchased
                  </h5>
                  <div className="de-switch">
                    <input
                      type="checkbox"
                      id="switch-unlock"
                      className="checkbox"
                    />
                    {isActive ? (
                      <label
                        htmlFor="switch-unlock"
                        onClick={unlockHide}
                      ></label>
                    ) : (
                      <label
                        htmlFor="switch-unlock"
                        onClick={unlockClick}
                      ></label>
                    )}
                  </div>
                  <div className="clearfix"></div>
                  <p className="p-info pb-3">
                    {" "}
                    Unlock content after successful transaction.
                  </p>

                  {isActive ? (
                    <div id="unlockCtn" className="hide-content">
                      <input
                        type="text"
                        name="item_unlock"
                        id="item_unlock"
                        value={lockedContent}
                        className="form-control"
                        onChange={(e) => setLockedContent(e.target.value)}
                        placeholder="Access key, code to redeem or link to a file..."
                      />
                    </div>
                  ) : null}
                </div>

                <div className="switch-with-title mb40">
                  <h5>
                    <i className="fa fa- fa-unlock-alt id-color-2 mr10"></i>
                    Put On Marketplace
                  </h5>

                  <div className="de-switch">
                    <input
                      type="checkbox"
                      id="switch-unlock1"
                      className="checkbox"
                      checked={isUnlock}
                    />

                    <label
                      htmlFor="switch-unlock1"
                      onClick={clickToUnlock}
                    ></label>
                  </div>
                </div>


                {/* <div className="spacer-single"></div> */}
                {isUnlock ? (
                  <>

                    <div className="de_tab tab_methods">
                      <div className="mb40">
                        <label>Select method</label>
                        <ul className="de_nav">
                          <li id="btn1" className="active " onClick={handleShow}>
                            <span>
                              <i className="fa fa-tag"></i>Fixed price
                            </span>
                          </li>
                          <li id="btn2" onClick={handleShow1}>
                            <span>
                              <i className="fa fa-hourglass-1"></i>Timed auction
                            </span>
                          </li>
                          <li id="btn3" onClick={handleShow2}>
                            <span>
                              <i className="fa fa-users"></i>Open for bids
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="mb40">
                        <div className="de_tab_content">
                          <div id="tab_opt_1">
                            <label className="required">Price</label>
                            <input
                              type="text"
                              name="item_price"
                              id="item_price"
                              value={price}
                              max="18"
                              min="0"
                              onChange={(e) => {
                                if (Number(e.target.value) > 100000000000000) {
                                  return;
                                }

                                inputPrice(e);
                              }}
                              onKeyPress={(e) => {
                                if (!/^\d*\.?\d*$/.test(e.key))
                                  e.preventDefault();
                              }}
                              className="form-control"
                              placeholder={`0 (${CURRENCY})`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                <div className="mb40">
                  <div className="switch-with-title">
                    <h5>
                      <i className="fa fa- fa-unlock-alt id-color-2 mr10"></i>
                      Lazy Minting
                    </h5>

                    <div className="de-switch">
                      <input
                        type="checkbox"
                        id="switch-unlock1"
                        className="checkbox"
                        checked={isLazyMinting}
                      />

                      <label
                        htmlFor="switch-unlock1"
                        onClick={clickToLazyMint}
                      ></label>
                    </div>
                  </div>
                </div>


                {/* <div className="spacer-single"></div> */}
                <div className="de_tab_content">
                  <div id="tab_opt_2" className="hide">
                    <div className="mb40">
                      <label className="required">Minimum bid</label>
                      <input
                        type="text"
                        name="item_price_bid"
                        id="item_price_bid"
                        value={minimumBid}
                        min="0"
                        max="18"
                        onKeyPress={(e) => {
                          if (!/^\d*\.?\d*$/.test(e.key)) e.preventDefault();
                        }}
                        onChange={(e) => {
                          if (Number(e.target.value) > 100000000000000) {
                            return;
                          }
                          inputPriceAuction(e);
                        }}
                        className="form-control"
                        placeholder="0"
                      />
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="required">Payment Token</label>
                        <select
                          className="form-control selectOpt"
                          onChange={(e) => {
                            setSelectedTokenAddress(e.target.value);
                            let symbol = getTokenSymbolByAddress(
                              e.target.value
                            );
                            setSelectedTokenSymbol(symbol);
                          }}
                        >
                          {options
                            ? options.map((option, key) => {
                              return (
                                <option value={option.value}>
                                  {option.title}
                                </option>
                              );
                            })
                            : ""}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="required">Expiration date</label>
                        <input
                          type="datetime-local"
                          id="meeting-time"
                          name="meeting-time"
                          min={moment(new Date()).format().substring(0, 16)}
                          // min={getMaxAllowedDate()}
                          className="form-control"
                          onChange={handleDate}
                        // onChange={(e) => {
                        //   setEndTime(new Date(e.target.value));
                        // }}
                        />
                      </div>
                    </div>
                  </div>

                  <div id="tab_opt_3" className="hide">
                    <div className="mb40">
                      <label className="required">Minimum bid</label>
                      <input
                        type="text"
                        name="item_price_bid"
                        id="item_price_bid"
                        min="0"
                        max="18"
                        value={minimumBid}
                        onKeyPress={(e) => {
                          if (!/^\d*\.?\d*$/.test(e.key)) e.preventDefault();
                        }}
                        onChange={(e) => {
                          if (Number(e.target.value) > 100000000000000) {
                            return;
                          }
                          inputPriceAuction(e);
                        }}
                        className="form-control"
                        placeholder="0"
                      />
                    </div>

                    <div className="mb40">
                      <label className="required">Payment Token</label>
                      <select
                        className="form-control selectOpt"
                        onChange={(e) => {
                          setSelectedTokenAddress(e.target.value);
                          let symbol = getTokenSymbolByAddress(e.target.value);
                          setSelectedTokenSymbol(symbol);
                        }}
                      >
                        {options
                          ? options.map((option, key) => {
                            return (
                              <option value={option.value}>
                                {option.title}
                              </option>
                            );
                          })
                          : ""}
                      </select>
                    </div>
                  </div>
                </div>
                {/* <div className="spacer-20"></div> */}
                <div className="mb40">
                  <label className="required">Title</label>
                  <input
                    type="text"
                    name="item_title"
                    id="item_title"
                    onChange={(e) => {
                      if (e.target.value.length > 50) {
                        return;
                      }
                      setNftTitle(e.target.value);
                    }}
                    value={nftTitle}
                    className="form-control"
                    placeholder="Crypto"
                  />
                </div>
                <div className="mb40">
                  <label>Description (Optional)</label>
                  <textarea
                    onChange={(e) => {
                      if (e.target.value.length > 250) {
                        NotificationManager.error("Enter Valid Text ", "", 1500)
                        return;
                      }
                      setNftDesc(e.target.value);
                    }}
                    value={nftDesc}
                    data-autoresize
                    name="item_desc"
                    id="item_desc"
                    className="form-control"
                    placeholder="My NFT Description (Max To 250 Words)"
                  />
                </div>


                <div
                  className={
                    isLazyMinting ? "hideCollaborator" : "showCollaborator"
                  }
                >

                  <div className="mb40">
                    <label>Collaborator (Optional)</label>
                    <input
                      type="text"
                      name="item_collaborator"
                      id="item_collaborator"
                      onChange={(e) => {
                        setCurrCollaborator(e.target.value);
                      }}
                      value={currCollaborator}
                      className="form-control"
                      placeholder="Please Enter Collaborator's Wallet Address"
                      maxLength={42}
                    />
                    <input
                      type="Number"
                      name="item_collaborator_percent"
                      id="item_collaborator_percent"
                      onChange={(e) => {
                        if (Number(e.target.value) > 100) {
                          NotificationManager.error("Invalid Percent", "", 1500);
                        }

                        var t = e.target.value;
                        e.target.value =
                          t.indexOf(".") >= 0
                            ? t.substr(0, t.indexOf(".")) +
                            t.substr(t.indexOf("."), 3)
                            : t;
                        setCurrCollaboratorPercent(e.target.value);
                      }}
                      min="0"
                      value={currCollaboratorPercent}
                      className="form-control"
                      placeholder="Percent"
                    />
                  </div>
                </div>
                <div className="d-flex multibtn">
                  <button
                    id="submit"
                    className={isLazyMinting ? "hideCollaborator " : "showCollaborator round-btn mr-3 mb-2 "}
                    onClick={() => {
                      handleAddCollaborator();
                    }}
                  >
                    Add Collaborator
                  </button>
                  <button
                    className="btn-main showHideBtn mb-2"
                    onClick={() => setIsAdvancedSetting(!isAdvancedSetting)}
                  >
                    {isAdvancedSetting
                      ? "Hide Advanced Settings"
                      : "Show Advanced Settings"}
                  </button>
                </div>
                {/* </div> */}

                <ul>
                  {collaborators && collaboratorPercents
                    ? collaborators.map((collaborator, key) => {
                      return collaborator !== "" ? (
                        <li className="added_collaborator_list">
                          <div className="d-flex justify-content-around align-items-baseline">
                            <label>
                              {collaborator.slice(0, 5) +
                                "..." +
                                collaborator.slice(38, 42)}{" "}
                              :{" "}
                              <span>
                                {Number(collaboratorPercents[key]) + "%"}
                              </span>
                            </label>
                            <button
                              className="remove-btn round-btn"
                              onClick={() => {
                                handleRemoveCollaborator(key);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ) : (
                        ""
                      );
                    })
                    : ""}
                </ul>


                {isAdvancedSetting ? PropertiesSection() : ""}
                {isAdvancedSetting ? (
                  <button
                    id="submit"
                    className="round-btn"
                    onClick={() => {
                      handleAddProperty();
                    }}
                  >
                    Add Property
                  </button>
                ) : (
                  ""
                )}
                <div className="spacer-40"></div>
                <div className="nft_attr_section">
                  <div className="row gx-2">
                    {propertyKeys && propertyValues
                      ? propertyKeys.map((propertyKey, key) => {
                        return propertyKey !== "" ? (
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="createProperty">
                              <div className="nft_attr">
                                <h5>{propertyKey}</h5>
                                <h4>{propertyValues[key]}</h4>
                              </div>
                              <button
                                className="remove-btn round-btn removeBTN"
                                onClick={() => {
                                  handleRemoveProperty(key);
                                }}
                              >
                                <i className="fa fa-trash" aria-hidden="true"></i>
                              </button>
                            </div>
                          </div>
                        ) : (
                          ""
                        );
                      })
                      : ""}
                  </div>
                </div>
                <div className="spacer-10"></div>
                <button
                  id="submit"
                  className="round-btn"
                  onClick={async () => {
                    await handleNftCreation();
                  }}
                >
                  Create NFT
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <label>Preview item</label>
            <div className="preview_section nft__item m-0">
              {isTimedAuction ? (
                <div className="de_countdown">
                  <Clock deadline={timeLeft} />
                </div>
              ) : (
                ""
              )}

              <div className="author_list_pp">
                <span>
                  {profilePic !== undefined ? (
                    <img
                      className="lazy profile_img"
                      src={profilePic ? profilePic : Avatar}
                      alt=""
                    />
                  ) : (
                    <img
                      className="lazy author_list_pp1_img"
                      src={Avatar}
                      alt=""
                    />
                  )}

                  <i className="fa fa-check profile_img_check"></i>
                </span>
              </div>
              <div className="nft__item_wrap_carausel">
                <span>
                  {nftType && nftType === "Image" ?
                    <img
                      src={
                        nftImage ? URL.createObjectURL(nftImage) : previewImage
                      }
                      onError={() => {
                        console.log("error")
                        setNftImage("")
                        setNftFiles([])
                        NotificationManager.error("File is not an Image file")
                      }}
                      key={nftImage}
                      id="get_file_2"
                      className="lazy nft__item_preview slider-img-preview"
                      alt=""
                    /> : <video className="img-fluid nftimg  nft__item_preview slider-img-preview"
                      src={
                        nftImage ? URL.createObjectURL(nftImage) : previewImage
                      }
                      onError={() => {
                        console.log("error")
                        setNftImage("")
                        setNftFiles([])
                        NotificationManager.error("File is not an Image file")
                      }}
                      controls />}
                </span>
              </div>
              <div className="nft__item_info">
                <span>
                  <h4 className="nft_title_class">
                    {nftTitle
                      ? nftTitle.length > 15
                        ? nftTitle.slice(0, 15) + "..."
                        : nftTitle
                      : "NFT NAME"}
                  </h4>
                </span>
                <div className="nft__item_price">
                  {isUnlock && price > 0
                    ? price + " " + CURRENCY
                    : minimumBid > 0
                      ? minimumBid + " " + selectedTokenSymbol
                      : `0 ${selectedTokenSymbol}`}
                </div>

              </div>
            </div>
          </div>
        </div>
        {
          isShowPopup ? (
            <div className="popup-bg" id="CreateNftLoader">
              <div className="loader_popup-box">
                <div className="row">
                  <h2 className="col-12 d-flex justify-content-center mt-2 mb-3">
                    Follow Steps
                  </h2>
                </div>

                <div className="row customDisplayPopup">
                  <div className="col-3 icontxtDisplayPopup">
                    <div className={isApprovePopupClass}></div>
                  </div>
                  <div className="col-8 icontxtDisplayPopup">
                    <h5 className="popupHeading">Approve</h5>
                    <span className="popupText">
                      This transaction is conducted only once per collection
                    </span>
                  </div>
                </div>
                <div className="row customDisplayPopup">
                  <div className="col-3 icontxtDisplayPopup">
                    <div className={isMintPopupClass}></div>
                  </div>
                  <div className="col-8 icontxtDisplayPopup">
                    <label className="popupHeading">Mint</label>
                    <span className="popupText">
                      Send transaction to create your NFT
                    </span>
                  </div>
                </div>
                <div className="row customDisplayPopup">
                  <div className="col-3 icontxtDisplayPopup">
                    <div className={isRoyaltyPopupClass}></div>
                  </div>
                  <div className="col-8 icontxtDisplayPopup">
                    <label className="popupHeading">Royalty</label>
                    <span className="popupText">
                      Setting Royalty % for your NFT
                    </span>
                  </div>
                </div>
                <div className="row customDisplayPopup">
                  <div className="col-3 icontxtDisplayPopup">
                    <div className={isUploadPopupClass}></div>
                  </div>
                  <div className="col-8 icontxtDisplayPopup">
                    <label className="popupHeading">Upload</label>
                    <span className="popupText">
                      Uploading of all media assets and metadata to IPFS
                    </span>
                  </div>
                </div>
                {isPutOnMarketplace ? (
                  <div className="row customDisplayPopup">
                    <div className="col-3 icontxtDisplayPopup">
                      <div className={isPutOnSalePopupClass}></div>
                    </div>
                    <div className="col-8 icontxtDisplayPopup">
                      <label className="popupHeading">Put on sale</label>
                      <span className="popupText">
                        Sign message to set fixed price
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="row customDisplayPopup">
                  {hideClosePopup ? (
                    <button
                      className="closeBtn round-btn"
                      disabled={ClosePopupDisabled}
                      onClick={closePopup}
                    >
                      Close
                    </button>
                  ) : (
                    ""
                  )}
                  {hideRedirectPopup ? (
                    <button
                      className="closeBtn round-btn"
                      disabled={RedirectPopupDisabled}
                      onClick={redirectCreateNFTPopup}
                    >
                      Close
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )
        }
      </section >

      <Footer />
    </div >
  );
};

export default CreateSingle;
