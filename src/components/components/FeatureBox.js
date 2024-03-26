import React from "react";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import CollectionImage from "./../../assets/images/collection.svg";
import CollectionBottomImg from "./../../assets/images/collectionBottomimg.svg";
import Wallet from '../SVG/Wallet';
import WalletGradient from '../SVG/WalletGradient';
import NftsGradient from '../SVG/NftsGradient';
import Nfts from '../SVG/Nfts';
import SalesGradient from '../SVG/SalesGradient';
import Sales from '../SVG/Sales';
import CollectionGradient from '../SVG/CollectionGradient';
import Collection from '../SVG/Collection';


// import Slider from "./slick-loader/slider";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const FeatureBox = () => {


  // var settings = {
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   initialSlide: 0,
  //   arrows:true,
  //   responsive: [
  //     {
  //       breakpoint: 2040,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 1,
  //         infinite: false,
  //       },
  //     },
  //     {
  //       breakpoint: 1920,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 1,
  //         infinite: false,
  //       },
  //     },
  //     {
  //       breakpoint: 1600,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 1,
  //         infinite: false,
  //       },
  //     },
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 1,
  //         infinite: false,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 320,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: false,
  //         dots: true,
  //       },
  //     },
  //   ],
  // };

  return (
    <div className="howItWork row">
      {/* <Slider {...settings}> */}
        <div
          // onClick={() => (window.location.href = "/wallet")}
          className="col-md-3 col-sm-6 mb-3"
        >
          <div className="feature-box f-boxed style-3 howitwork">
            <div className="icon_feature mb-3">
              <span className="wallet_normal">
                <WalletGradient />
              </span>
              <span className="wallet_hover">
                <Wallet />
              </span>
            </div>
            <div className="text">
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={100}
                duration={600}
                triggerOnce
              >
                <h4 className="nft_title_class font_23 NunitoExtraBold text-dark mb-3">Set up your wallet</h4>
              </Reveal>
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={200}
                duration={600}
                triggerOnce
              >
                <p className="color_A0 font_20 NunitoBold">
                  Once you’ve set up your wallet of choice, connect it to NFT
                  marketplace.
                </p>
              </Reveal>
            </div>
            <i className="wm icon_wallet"></i>
          </div>
        </div>

        <div
          // onClick={() => (window.location.href = "/wallet")}
          className="col-md-3 col-sm-6 mb-3"
        >
          <div className="feature-box f-boxed style-3 howitwork">
            <div className="icon_feature mb-3">
              <span className="wallet_normal">
                <CollectionGradient />
              </span>
              <span className="wallet_hover">
                <Collection />
              </span>
            </div>
            <div className="text">
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={100}
                duration={600}
                triggerOnce
              >
                <h4 className="nft_title_class font_23 NunitoExtraBold text-dark mb-3">Create Your Collection</h4>
              </Reveal>
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={200}
                duration={600}
                triggerOnce
              >
                <p className="color_A0 font_20 NunitoBold">
                  Click Create and set up your collection. Add social links, a
                  description, profile & banner images, and set a secondary sales
                  fee.
                </p>
              </Reveal>
            </div>
            <i className="wm collection_icon mb-2"><img src={CollectionBottomImg}></img></i>
          </div>
        </div>

        <div
          // onClick={() => (window.location.href = "/createOptions")}
          className="col-md-3 col-sm-6 mb-3"
        >
          <div className="feature-box f-boxed style-3 howitwork">
            <div className="icon_feature mb-3">
              <span className="wallet_normal">
                <NftsGradient />
              </span>
              <span className="wallet_hover">
                <Nfts />
              </span>
            </div>
            <div className="text">
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={100}
                duration={600}
                triggerOnce
              >
                <h4 className="nft_title_class font_23 NunitoExtraBold text-dark mb-3">Create your NFTs</h4>
              </Reveal>
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={200}
                duration={600}
                triggerOnce
              >
                <p className="color_A0 font_20 NunitoBold">
                  Upload your work, add a title and description, and customize your
                  NFTs with properties, stats, and unlockable content.
                </p>
              </Reveal>
            </div>
            <i className="wm icon_cloud-upload_alt"></i>
          </div>
        </div>

        <div
          // onClick={() => (window.location.href = "/Author")}
          className="col-md-3 col-sm-6 mb-3"
        >
          <div className="feature-box f-boxed style-3 howitwork">
            <div className="icon_feature mb-3">
              <span className="wallet_normal">
                <SalesGradient />
              </span>
              <span className="wallet_hover">
                <Sales />
              </span>
            </div>
            <div className="text">
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={100}
                duration={600}
                triggerOnce
              >
                <h4 className="nft_title_class font_23 NunitoExtraBold text-dark mb-3">List them to sale</h4>
              </Reveal>
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={200}
                duration={600}
                triggerOnce
              >
                <p className="color_A0 font_20 NunitoBold">
                  Choose between auctions, fixed-price listings, and declining-price
                  listings. You choose how you want to sell your NFTs, and we help
                  you sell them!
                </p>
              </Reveal>
            </div>
            <i className="wm icon_tags_alt"></i>
          </div>
        </div>
      {/* </Slider> */}
    </div>
  )
};
export default FeatureBox;
