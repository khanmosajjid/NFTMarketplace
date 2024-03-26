import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Clock from "./Clock";
import { GetOnSaleItems, GetSearchedNft } from "../../apiServices";
import { LikeNft } from "../../apiServices";
// import { checkIfLiked } from "../../helpers/getterFunctions";
import { connect } from "react-redux";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { Pagination } from "@material-ui/lab";
import Avatar from "./../../assets/images/avatar5.jpg";
import Placeholder from "./placeholder";
import { perPageCount } from "./../../helpers/constants";
import eventEmitter from "../../events/events";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

var NftPreview = {
  background: "red",
  // backgroundImage: "",
};

const ExploreItems = (props) => {
  const [height, setHeight] = useState(0);
  const [items, setItems] = useState("none");
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  useEffect(() => {

    window.scrollTo(0, 0);
    async function fetchData() {
      let data;
      setLoading(true);
      let searchText = "";
      let saleType = "";
      let itemType = "";
      if (props.searchedData) {
        searchText = props.searchedData;
      }
      if (props.exploreSaleType?.exploreSaleType !== -1) {
        saleType = props.exploreSaleType?.exploreSaleType;
      }
      if (props.nftType !== -1) {
        itemType = props.nftType;
      }
      let itemsList = "none";
      data = {
        page: currPage,
        limit: perPageCount,
        sTextsearch: searchText,
        sSellingType: saleType,
        itemType: itemType,
      };
      itemsList = await GetOnSaleItems(data);
      setTotalPages(Math.ceil(itemsList.count / perPageCount));

      if (itemsList && itemsList?.results?.length > 0) {
        itemsList = itemsList.results[0];
      }

      console.log("sale data is 80----->", itemsList)

      setItems(
        itemsList
      );
      setLoading(false);
    }
    fetchData();
  }, [props, props.profileData, currPage, props.searchBtnClick]);

  const refreshState = () => {
    setLoading(true)
    setItems("none")

  }

  eventEmitter.on("refreshState", refreshState)

  const handleChange = (e, p) => {
    console.log("here", p, e);
    setCurrPage(p);
  };

  return (
    <div className="row">
      {console.log("loading---->", loading, items)}
      {!loading && items !== "none" && items.length > 0
        ? items.map((nft, index) => {

          return (
            <>
              {nft.isBlocked === true ?
                "" : <div
                  key={index}
                  className="d-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4"
                >

                  <div className="nft__item m-0">
                    {nft.deadline && (
                      <div className="de_countdown">
                        <Clock deadline={nft.nOrders.oValidUpto} />
                      </div>
                    )}
                    <div className="author_list_pp">
                      <span className="cursor-pointer"
                        onClick={() =>
                          (window.location.href = `./author/${nft.nCreater._id}`)
                        }
                      >
                        <img
                          title={
                            nft.nCreater
                              ? nft.nCreater.sWalletAddress.slice(0, 3) +
                              "..." +
                              nft.nCreater.sWalletAddress.slice(0, 3)
                              : ""
                          }
                          style={NftPreview}
                          className="lazy profile_img"
                          src={
                            nft.nCreater?.sProfilePicUrl
                              ? nft.nCreater.sProfilePicUrl
                              : Avatar
                          }
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        (window.location.href = `./itemDetail/${nft._id}`)
                      }
                      className="nft__item_wrap_carausel cursor-pointer"
                    // style={{ height: `${height}px` }}
                    >
                      <Outer>
                        {nft && nft.nNftImageType === "mp4" ? <video className="lazy nft__item_preview slider-img-preview" onLoad={onImgLoad} controls>
                          <source src={`${nft.nNftImage}`} type="video/mp4" />
                          <source src={`https://${nft.nNftImage}`} type="video/mp4" />
                        </video> : <img
                          onLoad={onImgLoad}
                          src={nft ? nft.nNftImage : ""}
                          className="lazy nft__item_preview slider-img-preview"
                          alt=""
                        />}
                        {/*<img
                     onLoad={onImgLoad}
                     src={nft.nNftImage}
                     className="lazy nft__item_preview slider-img-preview"
                     alt=""
                   />*/}
                      </Outer>
                    </div>
                    <div className="nft__item_info">
                      <span className="cursor-pointer"
                        onClick={() =>
                          (window.location.href = `./itemDetail/${nft._id}`)
                        }
                      >
                        <h4 className="nft_title_class font_14 NunitoExtraBold text-dark">
                          {nft.nTitle
                            ? nft.nTitle.length > 15
                              ? nft.nTitle.slice(0, 15) + "..."
                              : nft.nTitle
                            : ""}
                        </h4>
                      </span>
                      <div className="nft__item_price">
                        {/* {convertToEth(nft?.nOrders[0]?.oPrice.$numberDecimal)} ETH */}
                      </div>
                      <div className="nft__item_action">
                        <span className="cursor-pointer"
                          onClick={() =>
                            (window.location.href = `/itemDetail/${nft._id}`)
                          }
                        >
                          Buy
                        </span>
                      </div>

                      {/* LIKE STARTS */}
                      <div className="nft__item_like">
                        {/* {likedItems && likedItems[index] ? (
                   <i
                     id={`item${index}`}
                     style={{ color: "red" }}
                     className="fa fa-heart"
                     onClick={async () => {
                       await LikeNft({ id: nft._id });

                       setLikeEvent(!likeEvent);
                       setLikedIndex(index);
                       console.log("like index", index);
                       NotificationManager.success(
                         "Nft disliked successfully"
                       );
                     }}
                   ></i>
                 ) : (
                   <i
                     id={`item${index}`}
                     className="fa fa-heart"
                     onClick={async () => {
                       await LikeNft({ id: nft._id });
                       setLikeEvent(!likeEvent);
                       setLikedIndex(index);
                       console.log("like index", index);
                       NotificationManager.success(
                         "Nft liked successfully"
                       );
                     }}
                   ></i>
                 )}
                 <span id={`totalLikes${index}`}>
                   {totalLikes && totalLikes[index]
                     ? totalLikes[index]
                     : 0}
                 </span> */}
                      </div>

                      {/* LIKE STARTS */}
                    </div>
                  </div>

                </div>}
            </>

          );
        }) : ""}

      {console.log("items", items)}
      {loading && items === "none" ? <div className="loader-div1 d-flex justify-content-center" role="status">
        <span className="sr-only" id="loading"></span>

      </div> : !loading && items !== "none" && items.length <= 0 ? <div className='col-md-12'>
        <h4 className='no_data_text text-muted'>
          No NFTs Available
        </h4>
      </div> : ""}
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
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    token: state.token,
    exploreSaleType: state.exploreSaleType,
    profileData: state.profileData,
  };
};

export default connect(mapStateToProps)(ExploreItems);
