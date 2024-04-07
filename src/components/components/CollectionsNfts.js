import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Clock from "./Clock";
import { GetNftsByCollection } from "../../helpers/getterFunctions";
import { connect } from "react-redux";
// import { LikeNft } from "../../apiServices";
import { Pagination } from "@material-ui/lab";
import Placeholder from "./placeholder";
import { perPageCount } from "./../../helpers/constants";
import { useNavigate } from "react-router-dom";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

const CollectionsNfts = (props) => {
  const [nfts, setNfts] = useState([]);
  const [height, setHeight] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate()
  const handleChange = (e, p) => {
    setCurrPage(p);
  };

  const returnPlaceHolder = () => {
    let ReturnedItem = [];
    if (totalPages > 0)
      for (let i = 0; i < perPageCount; i++) {
        ReturnedItem.push(<Placeholder />);
      }
    return ReturnedItem;
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        let details = await GetNftsByCollection(
          currPage,
          perPageCount,
          props.owned,
          props.collection
        );
        console.log("details are  ghfgh--------->50", details);
        if (details.length > 0) {
          setTotalPages(Math.ceil(details[0]?.count / perPageCount));
          setNfts(details);
          setLoading(false);
        }

      } catch (e) {
        console.log("error in collections nft api", e);
        setLoading(false);
        return;
      }
    };
    fetch();
  }, [props, currPage]);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  return (
    <div className="row">
      {loading ? returnPlaceHolder() : ""}
      {console.log("nfts are------------------>...>>>", nfts, nfts.length)}
      {nfts && nfts.length >= 1
        ? nfts.map((nft, index) => (
          <>
            {nft.isBlocked === true ? "" : <div
              key={index}
              className="d-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4"
            >
              <div className="nft__item">
                {nft.deadline && (
                  <div className="de_countdown">
                    <Clock deadline={nft.auction_end_date} />
                  </div>
                )}
                <div className="author_list_pp">
                  <span className="cursor-pointer" onClick={() => (window.location.href = nft.authorLink)}>
                    <img
                      className="lazy profile_img"
                      src={
                        nft.creater
                          ? process.env.REACT_APP_IPFS_URL + nft.creater
                          : nft.authorImg
                      }
                      alt=""
                    />
                    <i className="fa fa-check profile_img_check"></i>
                  </span>
                </div>

                <div
                  className="nft__item_wrap_carausel"
                  style={{ height: `${height}px` }}
                >
                  <Outer>
                    <span
                      onClick={() =>
                        navigate(`/itemDetail/${nft.id}`)
                      }
                    >
                      {nft.imageType === "mp4" ? <video className="lazy nft__item_preview  slider-img-preview " controls>
                        <source src={nft.previewImg} type="video/mp4" />
                      </video> : <img
                        onLoad={onImgLoad}
                        src={nft.previewImg}
                        className="lazy nft__item_preview  slider-img-preview"
                        alt=""
                      />}

                    </span>
                  </Outer>
                </div>
                <div className="nft__item_info">
                  <span
                    onClick={() =>
                      navigate(`/itemDetail/${nft.id}`)
                    }
                  >
                    <h4 className="nft_title_class">{nft.title}</h4>
                  </span>
                  <div className="nft__item_price">
                    {nft.price ? nft.price : ""}
                    <span>{nft.bid ? nft.bid : ""}</span>
                  </div>
                  {/* <div className="nft__item_action">
                    <span
                      onClick={() =>
                        (window.location.href = "/itemDetail/" + nft.id)
                      }
                    >
                      Buy Now
                    </span>
                  </div> */}
                  {/* <div className="nft__item_like">
                    <i
                      className="fa fa-heart"
                      onClick={() => {
                        LikeNft({ id: nft.id });
                      }}
                    ></i>
                    <span>{nft.likes}</span>
                  </div> */}
                </div>
              </div>
            </div>}

          </>

        ))
        : <div className='col-md-12'>
          <h4 className='no_data_text text-muted'>
            No NFTs Available
          </h4>
        </div>}
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
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.token,
    profileData: state.profileData,
  };
};

export default connect(mapStateToProps)(CollectionsNfts);
