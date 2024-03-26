import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Clock from "./Clock";
import { getUsersNFTs } from "../../helpers/getterFunctions";
import { LikeNft, getProfile } from "../../apiServices";
import { useCookies } from "react-cookie";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

const OnSaleItems = (props) => {
  const [nfts, setNfts] = useState([]);
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [cookies] = useCookies(["selected_account", "Authorization"]);

  useEffect(() => {
    if (cookies.selected_account) setCurrentUser(cookies.selected_account);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.selected_account]);

  useEffect(() => {
    const fetch = async () => {
      if (currentUser) {
        let _profile = await getProfile();
        setProfile(_profile);
      }
    };
    fetch();
  }, [currentUser]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      if (props.paramType && profile) {
        
        let data = await getUsersNFTs(
          props.paramType ? props.paramType.paramType : 0,
          profile ? profile.sWalletAddress : "",
          profile ? profile._id : ""
        );
        setLoading(false);
        setNfts(data);
      }
    };
    fetch();
  }, [props.paramType, profile]);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  return (
    <div className="row">
      {nfts.map((nft, index) => (
        <div
          key={index}
          className="d-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12"
        >
          <div className="nft__item">
            {nft.deadline && (
              <div className="de_countdown">
                <Clock deadline={nft.deadline} />
              </div>
            )}
            <div className="author_list_pp">
              <span
                onClick={
                  (() => (window.location.href = nft.authorLink), "_self")
                }
              >
                <img className="lazy" src={nft.authorImg} alt="" />
                <i className="fa fa-check"></i>
              </span>
            </div>
            <div className="nft__item_wrap" style={{ height: `${height}px` }}>
              <Outer>
                <span>
                  <img
                    onLoad={onImgLoad}
                    src={nft.previewImg}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </span>
              </Outer>
            </div>
            <div className="nft__item_info">
              <span
                onClick={() => (window.location.href = "/itemDetail/" + nft.id)}
              >
                <h4>{nft.title}</h4>
              </span>
              <div className="nft__item_price">
                {nft.price ? nft.price : ""}
                <span>{nft.bid}</span>
              </div>
              <div className="nft__item_action">
                <span
                  onClick={() =>
                    (window.location.href = "/itemDetail/" + nft.id)
                  }
                >
                  Buy Now
                </span>
              </div>
              <div className="nft__item_like">
                <i
                  className="fa fa-heart"
                  onClick={() => {
                    LikeNft({ id: nft.id });
                  }}
                ></i>
                <span>{nft.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    paramType: state.paramType,
  };
};

export default connect(mapStateToProps)(OnSaleItems);
