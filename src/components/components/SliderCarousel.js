import React, { Component,useEffect } from "react";
import Slider from "react-slick";
import { Link } from "@reach/router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getBanner} from "../../apiServices"


class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return <div {...props}></div>;
  }
}

export default class Responsive extends Component {
  constructor(props) {
    super(props);
    
   
    
    
  }
  
 componentDidMount(){
  
 }
  
  
  
 

 
  render() {
   
    var settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      adaptiveHeight: 300,
      responsive: [
        {
          breakpoint: 1900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
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
      ],
    };

  
    return (
      <div className="nft-big">
        <Slider {...settings}>
          <CustomSlide className="itm" index={1}>
            <div className="nft_pic">
              <a className="nft_pic_first_a" href={`${this.props.mainBanner?.url && this.props.mainBanner?.url !== "undefined" ? this.props.mainBanner?.url : ""}`} target="_blank">
                  <span className="nft_pic_info">
                    {console.log("collection name--",this.props.mainBanner?.collectionName,typeof this.props.mainBanner?.collectionName )}
                  <span className="nft_pic_title">{this.props.mainBanner?.collectionName!==undefined && this.props.mainBanner?.collectionName!=="undefined"?this.props.mainBanner.collectionName:""}</span>
                 <span className="nft_pic_by">{this.props.mainBanner?.nftName!==undefined && this.props.mainBanner?.nftName!=="undefined"?this.props.mainBanner.nftName:""}</span>
                  </span>
            
              <div className="nft_pic_wrap">
              
              {this.props.mainBanner?.fileHash!==undefined? <img
                src={this.props.mainBanner?.fileHash}
                className="lazy img-fluid"
                alt=""
                onError={(e) => {
                  console.log("image error is--->", e);
                  e.target.src = "./img/carousel/crs-2.jpg";
                }}
                
              />: <img
                src={require('../../assets/images/lmslogo.png').default}
                className="lazy img-fluid"
                alt=""
              />}
                
                
                
              </div>
              </a>
            </div>
          </CustomSlide>

          <CustomSlide className="itm" index={2}>
            <div className="nft_pic nft_multi">
              {console.log("banner 1 isd;jg----->",this.props.banner2)}
              <a className="nft_pic_a" href={`${this.props.banner2?.url && this.props.banner2?.url !== "undefined" ? this.props.banner2?.url : ""}`} target="_blank" >
                <div className="nft_pic_title">
                <span className="nft_pic_by">{this.props.banner2?.collectionName!==undefined && this.props.banner2?.collectionName!=="undefined"?this.props.banner2.collectionName:""}</span>
                <span className="nft_pic_by">{this.props.banner2?.nftName!==undefined && this.props.banner2?.nftName!=="undefined"?this.props.banner2.nftName:""}</span>
                </div>
               
                {this.props.banner2?.fileHash!==undefined ? <img
                   src={this.props.banner2?.fileHash}
                  className="lazy img-fluid"
                  alt=""
                  onError={(e) => {
                    console.log("image error is--->", e);
                    e.target.src = "./img/carousel/crs-4.jpg";
                  }}
                />: <img
                src={require('../../assets/images/4592.png').default}
                className="lazy img-fluid"
                alt=""
              />}
              </a>
              <a className="nft_pic_a" href={`${this.props.banner3?.url && this.props.banne3?.url !== "undefined" ? this.props.banner3?.url : ""}`} target="_blank" >
                <div className="nft_pic_title">
                <span className="nft_pic_by">{this.props.banner3?.collectionName!==undefined && this.props.banner3?.collectionName!=="undefined"?this.props.banner3.collectionName:""}</span>
                    <span className="nft_pic_by">{this.props.banner3?.nftName!==undefined && this.props.banner3?.nftName!=="undefined"?this.props.banner3.nftName:""}</span>
                </div>
               
                {this.props.banner3?.fileHash!==undefined ? <img
                   src={this.props.banner3?.fileHash}
                  className="lazy img-fluid"
                  alt=""
                  onError={(e) => {
                    console.log("image error is--->", e);
                    e.target.src = "./img/carousel/crs-4.jpg";
                  }}
                />: <img
                src={require('../../assets/images/4593.png').default}
                className="lazy img-fluid"
                alt=""
              />}
              </a>
              <a className="nft_pic_a" href={`${this.props.banner4?.url && this.props.banner4?.url !== "undefined" ? this.props.banner4?.url : ""}`} target="_blank" >
                <div className="nft_pic_title">
                <span className="nft_pic_by">{this.props.banner4?.collectionName!==undefined && this.props.banner4?.collectionName!=="undefined"?this.props.banner4.collectionName:""}</span>
                    <span className="nft_pic_by">{this.props.banner4?.nftName!==undefined && this.props.banner4?.nftName!=="undefined"?this.props.banner4.nftName:""}</span>
                </div>
               
                {this.props.banner4?.fileHash!==undefined ? <img
                   src={this.props.banner4?.fileHash}
                  className="lazy img-fluid"
                  alt=""
                  onError={(e) => {
                    console.log("image error is--->", e);
                    e.target.src = "./img/carousel/crs-4.jpg";
                  }}
                />: <img
                src={require('../../assets/images/4594.png').default}
                className="lazy img-fluid"
                alt=""
              />}
              </a>
              <a className="nft_pic_a" href={`${this.props.banner5?.url && this.props.banner5?.url !== "undefined" ? this.props.banner5?.url : ""}`} target="_blank" >
                <div className="nft_pic_title">
                <span className="nft_pic_by">{this.props.banner5?.collectionName!==undefined && this.props.banner5?.collectionName!=="undefined"?this.props.banner5.collectionName:""}</span>
                    <span className="nft_pic_by">{this.props.banner5?.nftName!==undefined && this.props.banner5?.nftName!=="undefined"?this.props.banner5.nftName:""}</span>
                </div>
               
                {this.props.banner5?.fileHash!==undefined ? <img
                   src={this.props.banner5?.fileHash}
                  className="lazy img-fluid"
                  alt=""
                  onError={(e) => {
                    console.log("image error is--->", e);
                    e.target.src = "./img/carousel/crs-4.jpg";
                  }}
                />: <img
                src={require('../../assets/images/4595.png').default}
                className="lazy img-fluid"
                alt=""
              />}
              </a>
            </div>
          </CustomSlide>

          <CustomSlide className="itm" index={2}>
            <div className="nft_pic nft_multi">
              {console.log("banner 1 isd;jg----->",this.props.banner2)}
              <a className="nft_pic_a" href={`${this.props.banner6?.url && this.props.banner6?.url !== "undefined" ? this.props.banner6?.url : ""}`} target="_blank" >
                <div className="nft_pic_title">
                <span className="nft_pic_by">{this.props.banner6?.collectionName!==undefined && this.props.banner6?.collectionName!=="undefined"?this.props.banner6.collectionName:""}</span>
                    <span className="nft_pic_by">{this.props.banner6?.nftName!==undefined && this.props.banner6?.nftName!=="undefined"?this.props.banner6.nftName:""}</span>
                </div>
               
                {this.props.banner6?.fileHash!==undefined ? <img
                   src={this.props.banner6?.fileHash}
                  className="lazy img-fluid"
                  alt=""
                  onError={(e) => {
                    console.log("image error is--->", e);
                    e.target.src = "./img/carousel/crs-4.jpg";
                  }}
                />: <img
                src={require('../../assets/images/4596.png').default}
                className="lazy img-fluid"
                alt=""
              />}
              </a>
              <a className="nft_pic_a" href={`${this.props.banner7?.url && this.props.banner7?.url !== "undefined" ? this.props.banner7?.url : ""}`} target="_blank" >
                <div className="nft_pic_title">
                <span className="nft_pic_by">{this.props.banner7?.collectionName!==undefined && this.props.banner7?.collectionName!=="undefined"?this.props.banner7.collectionName:""}</span>
                    <span className="nft_pic_by">{this.props.banner7?.nftName!==undefined && this.props.banner7?.nftName!=="undefined"?this.props.banner7.nftName:""}</span>
                </div>
               
                {this.props.banner7?.fileHash!==undefined ? <img
                   src={this.props.banner7?.fileHash}
                  className="lazy img-fluid"
                  alt=""
                  onError={(e) => {
                    console.log("image error is--->", e);
                    e.target.src = "./img/carousel/crs-4.jpg";
                  }}
                />: <img
                src={require('../../assets/images/4597.png').default}
                className="lazy img-fluid"
                alt=""
              />}
              </a>
              <a className="nft_pic_a" href={`${this.props.banner8?.url && this.props.banner8?.url !== "undefined" ? this.props.banner8?.url : ""}`} target="_blank" >
                <div className="nft_pic_title">
                <span className="nft_pic_by">{this.props.banner8?.collectionName!==undefined && this.props.banner8?.collectionName!=="undefined"?this.props.banner8.collectionName:""}</span>
                    <span className="nft_pic_by">{this.props.banner8?.nftName!==undefined && this.props.banner8?.nftName!=="undefined"?this.props.banner8.nftName:""}</span>
                </div>
               
                {this.props.banner8?.fileHash!==undefined ? <img
                   src={this.props.banner8?.fileHash}
                  className="lazy img-fluid"
                  alt=""
                  onError={(e) => {
                    console.log("image error is--->", e);
                    e.target.src = "./img/carousel/crs-4.jpg";
                  }}
                />: <img
                src={require('../../assets/images/4598.png').default}
                className="lazy img-fluid"
                alt=""
              />}
              </a>
              <a className="nft_pic_a" href={`${this.props.banner9?.url && this.props.banner9?.url !== "undefined" ? this.props.banner9?.url : ""}`} target="_blank" >
                <div className="nft_pic_title">
                <span className="nft_pic_by">{this.props.banner9?.collectionName!==undefined && this.props.banner9?.collectionName!=="undefined"?this.props.banner9.collectionName:""}</span>
                    <span className="nft_pic_by">{this.props.banner9?.nftName!==undefined && this.props.banner9?.nftName!=="undefined"?this.props.banner9.nftName:""}</span>
                </div>
               
                {this.props.banner9?.fileHash!==undefined ? <img
                   src={this.props.banner9?.fileHash}
                  className="lazy img-fluid"
                  alt=""
                  onError={(e) => {
                    console.log("image error is--->", e);
                    e.target.src = "./img/carousel/crs-4.jpg";
                  }}
                />: <img
                src={require('../../assets/images/4599.png').default}
                className="lazy img-fluid"
                alt=""
              />}
              </a>
            </div>
          </CustomSlide>

          <CustomSlide className="itm" index={2}>
            <div className="nft_pic nft_multi">
              {console.log("banner 1 isd;jg----->",this.props.banner2)}
              <a className="nft_pic_a" href={`${this.props.banner10?.url && this.props.banner10?.url !== "undefined" ? this.props.banner10?.url : ""}`} target="_blank" >
                <div className="nft_pic_title">
                <span className="nft_pic_by">{this.props.banner10?.collectionName!==undefined && this.props.banner10?.collectionName!=="undefined"?this.props.banner10.collectionName:""}</span>
                    <span className="nft_pic_by">{this.props.banner10?.nftName!==undefined && this.props.banner10?.nftName!=="undefined"?this.props.banner10.nftName:""}</span>
                </div>
               
                {this.props.banner10?.fileHash!==undefined ? <img
                   src={this.props.banner10?.fileHash}
                  className="lazy img-fluid"
                  alt=""
                  onError={(e) => {
                    console.log("image error is--->", e);
                    e.target.src = "./img/carousel/crs-4.jpg";
                  }}
                />: <img
                src={require('../../assets/images/4600.png').default}
                className="lazy img-fluid"
                alt=""
              />}
              </a>
              <a className="nft_pic_a" href={`${this.props.banner11?.url && this.props.banner11?.url !== "undefined" ? this.props.banner11?.url : ""}`} target="_blank" >
                <div className="nft_pic_title">
                <span className="nft_pic_by">{this.props.banner11?.collectionName!==undefined && this.props.banner11?.collectionName!=="undefined"?this.props.banner11.collectionName:""}</span>
                    <span className="nft_pic_by">{this.props.banner11?.nftName!==undefined && this.props.banner11?.nftName!=="undefined"?this.props.banner11.nftName:""}</span>
                </div>
               
                {this.props.banner11?.fileHash!==undefined ? <img
                   src={this.props.banner11?.fileHash}
                  className="lazy img-fluid"
                  alt=""
                  onError={(e) => {
                    console.log("image error is--->", e);
                    e.target.src = "./img/carousel/crs-4.jpg";
                  }}
                />: <img
                src={require('../../assets/images/4601.png').default}
                className="lazy img-fluid"
                alt=""
              />}
              </a>
              <a className="nft_pic_a" href={`${this.props.banner12?.url && this.props.banner12?.url !== "undefined" ? this.props.banner12?.url : ""}`} target="_blank" >
                <div className="nft_pic_title">
                <span className="nft_pic_by">{this.props.banner12?.collectionName!==undefined && this.props.banner12?.collectionName!=="undefined"?this.props.banner12.collectionName:""}</span>
                    <span className="nft_pic_by">{this.props.banner12?.nftName!==undefined && this.props.banner12?.nftName!=="undefined"?this.props.banner12.nftName:""}</span>
                </div>
               
                {this.props.banner12?.fileHash!==undefined ? <img
                   src={this.props.banner12?.fileHash}
                  className="lazy img-fluid"
                  alt=""
                  onError={(e) => {
                    console.log("image error is--->", e);
                    e.target.src = "./img/carousel/crs-4.jpg";
                  }}
                />: <img
                src={require('../../assets/images/4602.png').default}
                className="lazy img-fluid"
                alt=""
              />}
              </a>
              <a className="nft_pic_a" href={`${this.props.banner13?.url && this.props.banner13?.url !== "undefined" ? this.props.banner13?.url : ""}`} target="_blank" >
                <div className="nft_pic_title">
                <span className="nft_pic_by">{this.props.banner13?.collectionName!==undefined && this.props.banner13?.collectionName!=="undefined"?this.props.banner13.collectionName:""}</span>
                    <span className="nft_pic_by">{this.props.banner13?.nftName!==undefined && this.props.banner13?.nftName!=="undefined"?this.props.banner13.nftName:""}</span>
                </div>
               
                {this.props.banner13?.fileHash!==undefined ? <img
                   src={this.props.banner13?.fileHash}
                  className="lazy img-fluid"
                  alt=""
                  onError={(e) => {
                    console.log("image error is--->", e);
                    e.target.src = "./img/carousel/crs-4.jpg";
                  }}
                />: <img
                src={require('../../assets/images/4591.png').default}
                className="lazy img-fluid"
                alt=""
              />}
              </a>
            </div>
          </CustomSlide>
          
        </Slider>
      </div>
    );
  }
}
