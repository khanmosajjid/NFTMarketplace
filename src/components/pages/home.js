import React, { useState, useEffect } from "react";
import SliderMain from "../components/SliderMain";
import FeatureBox from "../components/FeatureBox";
import SliderCarousel from "../components/SliderCarousel";
import CarouselCollection from "../components/CarouselCollection";
import CarouselNew from "../components/CarouselNew";
import AuthorList from "../components/authorList";
// import Catgor from "../components/Catgor";
import Footer from "../components/footer";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { KeyboardArrowRight } from "@material-ui/icons";
import { getBanner } from "../../apiServices";
import { useNavigate } from "react-router-dom";

var bgImgStyle = {
  backgroundImage: "url(./img/bg-shape-decrypt.png)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "auto",
  backgroundPositionX: "100%",
  backgroundPositionY: "70vh",
};

var bgImgStyle2 = {
  backgroundImage: "url(./img/bg-img-2.png)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "auto",
  backgroundPositionX: "left",
  backgroundPositionY: "center",
};

const Home = () => {
  const [newItemFilter, setNewItemFilter] = useState("Buy Now");
  const [isDropDown, setIsDropDown] = useState(false);
  let navigate = useNavigate()
  const [banner1, setbanner1] = useState();
  const [banner2, setbanner2] = useState();
  const [banner3, setbanner3] = useState();
  const [banner4, setbanner4] = useState();
  const [banner5, setbanner5] = useState();
  const [banner6, setbanner6] = useState();
  const [banner7, setbanner7] = useState();
  const [banner8, setbanner8] = useState();
  const [banner9, setbanner9] = useState();
  const [banner10, setbanner10] = useState();
  const [banner11, setbanner11] = useState();
  const [banner12, setbanner12] = useState();
  const [banner13, setbanner13] = useState();
  const [banners, setbanners] = useState([{}]);
  //const [banners, setbanners] = useState([{}]);
  //const [banners, setbanners] = useState([{}]);
  //const [banners, setbanners] = useState([{}]);
  //const [banners, setbanners] = useState([{}]);
  
  const [mainBanner, setMainBanner] = useState({});


  useEffect(() => {
    const handleScroll = () => {
      setIsDropDown(false);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener when component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },[]);
  useEffect(async () => {
    async function allBanner() {
      let banner = await getBanner();

      return banner;
    }
    let banres=Object.values(await allBanner());
    console.log("banners are",banres)
    for(let i=0;i<banres.length;i++){
      //console.log("loop...",i)
      if(banres[i].order===1){
        //console.log("main banner",banres[i].bDesktopFileHash)
        setMainBanner({fileHash : banres[i].bDesktopFileHash, 
          url: banres[i].bannerURL,collectionName:banres[i].collection_Name,nftName:banres[i].nft_Name})
      }
      if(banres[i].order===2){
        console.log("in banner 2")
        setbanner2({fileHash : banres[i].bDesktopFileHash, url: banres[i].bannerURL,collectionName:banres[i].collection_Name,nftName:banres[i].nft_Name})
      }
      if(banres[i].order===3){
        console.log("in banner 3")
        setbanner3({fileHash : banres[i].bDesktopFileHash, url: banres[i].bannerURL,collectionName:banres[i].collection_Name,nftName:banres[i].nft_Name})
      }
      if(banres[i].order===4){
        setbanner4({fileHash : banres[i].bDesktopFileHash, url: banres[i].bannerURL,collectionName:banres[i].collection_Name,nftName:banres[i].nft_Name})
      }
      if(banres[i].order===5){
        setbanner5({fileHash : banres[i].bDesktopFileHash, url: banres[i].bannerURL,collectionName:banres[i].collection_Name,nftName:banres[i].nft_Name})
      }
      if(banres[i].order===6){
        setbanner6({fileHash : banres[i].bDesktopFileHash, url: banres[i].bannerURL,collectionName:banres[i].collection_Name,nftName:banres[i].nft_Name})
      }
      if(banres[i].order===7){
        setbanner7({fileHash : banres[i].bDesktopFileHash, url: banres[i].bannerURL,collectionName:banres[i].collection_Name,nftName:banres[i].nft_Name})
      }
      if(banres[i].order===8){
        setbanner8({fileHash : banres[i].bDesktopFileHash, url: banres[i].bannerURL,collectionName:banres[i].collection_Name,nftName:banres[i].nft_Name})
      }
      if(banres[i].order===9){
        setbanner9({fileHash : banres[i].bDesktopFileHash, url: banres[i].bannerURL,collectionName:banres[i].collection_Name,nftName:banres[i].nft_Name})
      }
      if(banres[i].order===10){
        setbanner10({fileHash : banres[i].bDesktopFileHash, url: banres[i].bannerURL,collectionName:banres[i].collection_Name,nftName:banres[i].nft_Name})
      }
      if(banres[i].order===11){
        setbanner11({fileHash : banres[i].bDesktopFileHash, url: banres[i].bannerURL,collectionName:banres[i].collection_Name,nftName:banres[i].nft_Name})
      }
      if(banres[i].order===12){
        setbanner12({fileHash : banres[i].bDesktopFileHash, url: banres[i].bannerURL,collectionName:banres[i].collection_Name,nftName:banres[i].nft_Name})
      }
      if(banres[i].order===13){
        setbanner13({fileHash : banres[i].bDesktopFileHash, url: banres[i].bannerURL,collectionName:banres[i].collection_Name,nftName:banres[i].nft_Name})
      }
      
    }
   

  }, [])

  return (
    <div className="container-fluid" style={bgImgStyle}>
      <section className="jumbotron no-bg no-bottom container-fluid">
        <div className="container-fluid">
          <div className="row">
          {console.log("small banners are------->",banners)}
          <SliderCarousel mainBanner={mainBanner} banner2={banner2}
          banner3={banner3}
          banner4={banner4}
          banner5={banner5}
          banner6={banner6}
          banner7={banner7}
          banner8={banner8}
          banner9={banner9}
          banner10={banner10}
          banner11={banner11}
          banner12={banner12}
          banner13={banner13} />
           
          </div>
        </div>
      </section>
      {/* <section className="jumbotron breadcumb no-bg h-vh">
      <SliderMain />
    </section> */}

      <section className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="font_48 text-center NunitoBold color_4B position-relative">How it works</h2>
              <div className="small-border"></div>
            </div>
            <div className="col-lg-12">
              <FeatureBox />
            </div>
          </div>
        </div>
      </section>

      <div style={bgImgStyle2}>
        <section className="container no-bottom">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="font_48 text-center NunitoBold color_4B position-relative">New Collections</h2>
              <div className="small-border"></div>
            </div>
            <div className="col-lg-12">
              <CarouselCollection navigate={navigate} />
            </div>
          </div>
        </section>

        <section className="container no-bottom">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="font_48 text-center NunitoBold color_4B position-relative">
                New Items
                <div className="selectItem-dropdown">
                  <div
                    className="dropdown-box"
                    onClick={() => setIsDropDown(!isDropDown)}
                  >
                    <span>Sale Type</span>
                    {newItemFilter}{" "}
                    {!isDropDown ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowUpIcon />
                    )}
                  </div>
                  <ul
                    className={!isDropDown ? "hidden" : "dropdown-list shadow-lg"}
                  >
                    <li
                      onClick={() => {
                        setNewItemFilter("Buy Now");
                        setIsDropDown(!isDropDown);
                      }}
                    >
                      Buy Now
                    </li>
                    <li
                      onClick={() => {
                        setNewItemFilter("On Auction");
                        setIsDropDown(!isDropDown);
                      }}
                    >
                      On Auction
                    </li>
                  </ul>
                </div>
              </h2>
              <div className="small-border"></div>

            </div>
            <div className="col-lg-12">

              <CarouselNew newItemFilter={newItemFilter} navigate={navigate} />
            </div>
          </div>
        </section>

        <section className="container no-bottom1 author_section">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="font_48 text-center NunitoBold color_4B">New Authors</h2>
              <div className="small-border"></div>
            </div>
          </div>
          <AuthorList navigate={navigate} />
          <div className="row mt-4">
            <div className="col-lg-12 text-center">
              <span className="view-all font_18 NunitoBold" onClick={() => navigate("/exploreAuthors")}>
                View All <KeyboardArrowRight />
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* <section className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Browse by category</h2>
            <div className="small-border"></div>
          </div>
        </div>
      </div>
      <Catgor />
    </section> */}

      <Footer />
    </div>
  );
};
export default Home;
