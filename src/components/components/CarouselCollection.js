import React, { Component, useEffect, useState } from "react";
import Slider from "./slick-loader/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { GetHotCollections } from "../../apiServices";
import { connect } from "react-redux";
import Loader from "./loader";
import Avatar from "./../../assets/images/avatar5.jpg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return <div {...props}></div>;
  }
}

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const CollectionList = (props) => {
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    //initialSlide: 0,
    responsive: [
      {
        breakpoint: 2040,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          //infinite: false,
        },
      },
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          //infinite: false,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          //infinite: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          //infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  // let navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      // if (!localStorage.getItem("Authorization")) return;
      setLoading(true);
      let reqParam = {
        page: 1,
        limit: 6,
        sortType: -1,
      };
      let collectionsList = await GetHotCollections(reqParam);
      console.log("collectin list is---->107",collectionsList)
      if (collectionsList&&collectionsList?.results?.length > 0) {
        collectionsList = collectionsList.results;
        setCollections(collectionsList);
      }

      setLoading(false);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="nft">
      <Slider {...settings}>
        {collections && collections.length > 0
          ? collections.map((collection, key) => {
              return (
                <>
                <CustomSlide className="itm" key={key}>
                  <div className="nft_coll">
                    <div
                      className="nft_wrap"
                      onClick={() =>
                        // alert('hi')
                        props.navigate(`/collection/?addr=${collection?.sContractAddress}`)
                        // (window.location.href = `/collection/?addr=${collection?.sContractAddress}`)
                      }
                    >
                      <span>
                        <img
                          src={collection.collectionImage}
                          className="lazy img-fluid collection-slider-img"
                          alt=""
                        />
                      </span>
                    </div>
                    
                    <div className="nft_coll_info">
                    <div className="nft_coll_pp">
                      <span
                        onClick={() =>
                         props.navigate( `/author/${collection.oCreatedBy}`)
                        }
                      >
                        <img
                          title={
                            collection.oUser.length > 0
                              ? collection.oUser[0].sWalletAddress.slice(0, 3) +
                                "..." +
                                collection.oUser[0].sWalletAddress.slice(39, 42)
                              : ""
                          }
                          className="lazy"
                          src={
                            collection.oUser.length > 0
                              ? collection.oUser[0].sProfilePicUrl
                                ? collection.oUser[0].sProfilePicUrl
                                : Avatar
                              : Avatar
                          }
                          alt={""}
                        />
                        <i className="fa fa-check"></i>
                      </span>
                      
                    </div>
                      <span
                        onClick={() =>
                          props.navigate(`/collection/?addr=${collection.sContractAddress}`)
                        }
                      >
                        <h4 className="nft_title_class font_14 NunitoExtraBold text-dark">
                          {collection.sName
                            ? collection.sName.length > 15
                              ? collection.sName.slice(0, 15) + "..."
                              : collection.sName
                            : ""}
                        </h4>
                      </span>
                      {/* <span>{collection.erc721 ? "ERC721" : "ERC1155"}</span> */}
                    </div>
                  </div>
                </CustomSlide>
               </>
                
              );
            })
          : ""}
        {collections.length > 0 ? (
          <CustomSlide className="itm item_view">
            {/* <div className="d-item" href="/exploreCollections"> */}
              <div className="nft__item ">
                <a href="/exploreCollections" className="view_slide align-items-center justify-content-center d-flex">
                    {/* <div className="author_list_pp d-none">
                      <span></span>
                    </div> */}
                    {/* <div
                      className="nft__item_wrap_carauselll"
                      style={{ height: `${height}px` }}
                    > */}
                      <Outer>
                        View All
                      </Outer>
                    {/* </div> */}
                    {/* <div
                      className="nft__item_info"
                      style={{ visibility: "hidden" }}
                    >
                      <span>
                        <h4>3</h4>
                      </span>
                      <div className="nft__item_price">1</div>
                      <div className="nft__item_action">
                        <span>3</span>
                      </div>
                      <div className={"nft__item_like"}></div>
                    </div> */}
                </a>
              </div>
            {/* </div> */}
          </CustomSlide>
        ) : (
          ""
        )}
      </Slider>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    profileData: state.profileData,
  };
};

export default connect(mapStateToProps)(CollectionList);
