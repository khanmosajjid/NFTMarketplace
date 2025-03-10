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
import "bootstrap/dist/css/bootstrap.min.css";
import "./accdrop1.css";

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
  const [selectedTraits, setSelectedTraits] = useState({});
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const [traitValueMap, setTraitValueMap] = useState(new Map());
  let navigate = useNavigate();
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
          const newTraitValueMap = new Map();

          details.forEach((nft) => {
            nft.attributes?.forEach((attribute) => {
              const { trait_type, value } = attribute;
              let type = trait_type?.toLowerCase().trim();
              if (!newTraitValueMap.has(type)) {
                newTraitValueMap.set(trait_type.toLowerCase().trim(), {
                  values: new Set(),
                  count: 0,
                });
              }
              console.log("jjjjiooo", newTraitValueMap);
              const traitData = newTraitValueMap.get(type);
              traitData.values.add(value);
              traitData.count += 1;
              newTraitValueMap.set(type, {
                ...traitData,
                count: traitData.values.size,
              });
            });
          });
          console.log("trrrr0", newTraitValueMap);
          setTraitValueMap(newTraitValueMap);
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

  const handleCheckboxChange = (traitType, value) => {
    setSelectedTraits((prev) => ({
      ...prev,
      [traitType]: {
        ...prev[traitType],
        [value]: !prev[traitType]?.[value],
      },
    }));
  };

  useEffect(() => {
    const filterNFTs = () => {
      const filtered = nfts.filter((nft) => {
        return Object.entries(selectedTraits).every(([traitType, values]) => {
          const selectedValues = Object.entries(values)
            .filter(([_, isSelected]) => isSelected)
            .map(([value]) => value);

          if (selectedValues.length === 0) return true; // No values selected for this trait

          return nft.attributes.some(
            (attr) =>
              attr.trait_type.toLowerCase().trim() ===
                traitType.toLowerCase().trim() &&
              selectedValues.includes(attr.value)
          );
        });
      });
     
      setFilteredNFTs(filtered);
    };

    filterNFTs();
  }, [selectedTraits, nfts]);
  return (
    <div className="d-flex flex-row">
      <div style={{ marginRight: "20px", height: "200px" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "15px",
            paddingTop: "10px",
            backgroundColor: "white",
            paddingBottom: "10px",
            borderRadius: "8px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <span
            style={{
              paddingTop: "15px",
              paddingLeft: "35px",
              fontWeight: "1000",
              fontSize: "17px",
            }}
          >
            Traits
          </span>
          <div
            className="accordion"
            id="accordionExample"
            style={{
              overflowY: "scroll",
              overflowX: "hidden",
              marginTop: "10px",
            }}
          >
            {[...traitValueMap].map(([traitType, traitData], i) => (
              <div
                className="accordion-item"
                style={{ border: "none" }}
                key={i}
              >
                <h2 className="accordion-header" id={i}>
                  <button
                    className="accordion-button custom-accordion-button position-relative"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${i}`}
                    aria-expanded="true"
                    aria-controls={`collapse${i}`}
                    style={{
                      width: "300px",
                      color: "black",
                      paddingLeft: "20px",
                      paddingRight: "10px",
                      border: "none",
                      backgroundColor: "transparent",
                      outline: "none",
                      display: "flex",
                      alignItems: "center",
                      boxShadow: "none",
                    }}
                  >
                    <span style={{ paddingLeft: "15px", fontWeight: "bold" }}>
                      {traitType}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "auto",
                      }}
                    >
                      <span style={{ paddingRight: "10px" }}>
                        {traitData?.count}
                      </span>
                    </div>
                  </button>
                </h2>
                <div
                  id={`collapse${i}`}
                  className="accordion-collapse collapse show"
                  aria-labelledby={`heading${i}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body" style={{ paddingLeft: "px" }}>
                    {[...traitData?.values].map((value, index) => (
                      <div className="form-check px-2 d-flex" key={index}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id={`flexCheckDefault${index}`}
                          onChange={() =>
                            handleCheckboxChange(traitType, value)
                          }
                          style={{ marginLeft: "10px"}}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`flexCheckDefault${index}`}
                          style={{ fontSize: "15px", paddingLeft: "10px"  }}
                        >
                          {value}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row  collection_row">
        {loading ? returnPlaceHolder() : ""}
        {console.log("nfts are------------------>...>>>", nfts, nfts.length)}
        {filteredNFTs && filteredNFTs.length >= 1 ? (
          filteredNFTs.map((nft, index) => (
            <>
              {nft.isBlocked === true ? (
                ""
              ) : (
                <div
                  key={index}
                  className="d-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 collection_item" style={{marginTop: "-2px"}}
                >
                  <div
                    className="nft__item "
                    style={{
                      width: "240px",
                      height: "330px",
                      marginBottom: "10px",
                      padding: "15px",
                    }}
                  >
                    {nft.deadline && (
                      <div className="de_countdown">
                        <Clock deadline={nft.auction_end_date} />
                      </div>
                    )}
                    <div className="author_list_pp">
                      <span
                        className="cursor-pointer"
                        onClick={() => (window.location.href = nft.authorLink)}
                      >
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

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div
                        className="nft__item_wrap_carausel"
                        style={{ height: `${height}px` }}
                      >
                        <Outer>
                          <span
                            onClick={() => navigate(`/itemDetail/${nft.id}`)}
                          >
                            {nft.imageType === "mp4" ? (
                              <video
                                className="lazy nft__item_preview  slider-img-preview "
                                controls
                              >
                                <source src={nft.previewImg} type="video/mp4" />
                              </video>
                            ) : (
                              <img
                                onLoad={onImgLoad}
                                src={nft.previewImg}
                                className="lazy nft__item_preview  slider-img-preview"
                                alt=""
                                style={{ height: "200px" }}
                              />
                            )}
                          </span>
                        </Outer>
                      </div>
                      <div className="nft__item_info" style={{}}>
                        <span onClick={() => navigate(`/itemDetail/${nft.id}`)}>
                          <h4 className="nft_title_class" style={{}}>
                            {nft.title}
                          </h4>
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
                  </div>
                </div>
              )}
            </>
          ))
        ) : (
          <div className="col-md-12">
            <h4 className="no_data_text text-muted">No NFTs Available</h4>
          </div>
        )}
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
    token: state.token,
    profileData: state.profileData,
  };
};
<style>
  {`
  .custom-accordion-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .custom-accordion-button::after {
    margin-left: auto;
    margin-right: 10px;
  }
  .custom-accordion-button:hover {
          background-color: #f0f0f0; /* Example hover effect */
          color: #333; 
        }
`}
</style>;
export default connect(mapStateToProps)(CollectionsNfts);
