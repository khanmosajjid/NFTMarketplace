// eslint-disable array-callback-return

import React, { useEffect, useState } from "react";
import Select from "react-select";
import ExploreItems from "../components/exploreItems";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import { connect } from "react-redux";
import { exploreSaleTypeUpdated } from "../../redux/actions";
import eventEmitter from "../../events/events";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    // background: #403f83;
    // border-bottom: solid 1px #403f83;
    background: #8155E5;
    border-bottom: 1px solid #8155E5;
  }
  header#myHeader.sticky .btn-main {
    background: #fff;
    color: #8155E5 !important;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);;
  }
  header#myHeader .logo .d-block{
    display: none !important;
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

const customStyles = {
  option: (base, state) => ({
    ...base,
    background: "#fff",
    color: "#333",
    borderRadius: state.isFocused ? "0" : 0,
    "&:hover": {
      background: "#eee",
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  control: (base, state) => ({
    ...base,
    padding: 2,
  }),
};

// const options = [
//   { value: "All categories", label: "All categories" },
//   { value: "Art", label: "Art" },
//   { value: "Music", label: "Music" },
//   { value: "Domain Names", label: "Domain Names" },
// ];

const options1 = [
  { value: "All Sale Type", label: "All Sale Type" },
  { value: "Buy Now", label: "Buy Now" },
  { value: "On Auction", label: "On Auction" },
  // { value: "Floor Price Bid", label: "Floor Price Bid" },
];

const options2 = [
  { value: "All Items", label: "All Items" },
  { value: "Single Items", label: "Single Items" },
  { value: "Multiple Items", label: "Multiple Items" },
];

const Explore = (props) => {
  const [saleType, setSaleType] = useState(-1);
  const [nftType, setNftType] = useState(-1);
  const [searchedData, setSearchedData] = useState("");
  const [searchBtnClick, setSearchBtnClick] = useState(false);

  useEffect(() => {
    props.dispatch(
      exploreSaleTypeUpdated({
        exploreSaleType: saleType,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saleType]);

  const handleSaleTypeChange = (e) => {

    eventEmitter.emit("refreshState")
    if (e.value === "All Sale Type") {
      setSaleType(-1);
      props.dispatch(
        exploreSaleTypeUpdated({
          exploreSaleType: -1,
        })
      );
    } else if (e.value === "Buy Now") {
      setSaleType(0);
      props.dispatch(
        exploreSaleTypeUpdated({
          exploreSaleType: 0,
        })
      );
    } else if (e.value === "On Auction") {
      setSaleType(1);
      props.dispatch(
        exploreSaleTypeUpdated({
          exploreSaleType: 1,
        })
      );
    } else if (e.value === "Floor Price Bid") {
      setSaleType(2);
      props.dispatch(
        exploreSaleTypeUpdated({
          exploreSaleType: 2,
        })
      );
    }
  };

  const handleNftTypeChange = (e) => {
    eventEmitter.emit("refreshState")
    if (e.value === "All Items") {
      setNftType(-1);
    } else if (e.value === "Single Items") {
      setNftType(1);
    } else if (e.value === "Multiple Items") {
      setNftType(2);
    }
  };

  const handleSearch = (e) => {
    eventEmitter.emit("refreshState")
    setSearchedData(e.target.value);
  };

  return (
    <div>
      <GlobalStyles />

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
                <h1 className="font_64 text-center NunitoBold text-light">Explore</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="items_filter row mb-5">
          <div className="form-dark col-lg-3 col-md-6 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-3 mb-3"
            id="form_quick_search"
            name="form_quick_search"
          >
            <input
              className="form-control"
              id="name_1"
              name="name_1"
              placeholder="Search Item Here..."
              type="text"
              autocomplete="off"
              value={searchedData}
              onChange={(e) => {
                handleSearch(e);
              }}
            />{" "}
            <button
              id="btn-submit"
              onClick={() => {
                setSearchBtnClick(!searchBtnClick);
              }}
            >
              <i className="fa fa-search bg-color-secondary"></i>
            </button>
            <div className="clearfix"></div>
          </div>
          {/* <div className="dropdownSelect one">
                <Select
                  styles={customStyles}
                  menuContainerStyle={{ zIndex: 999 }}
                  defaultValue={options[0]}
                  options={options}
                />
              </div> */}
          <div className="col-lg-2 col-md-3 dropdownSelect two mb-xl-0 mb-lg-0 mb-md-0 mb-sm-3 mb-3">
            <Select
              id="saleType"
              styles={customStyles}
              isSearchable={false}
              defaultValue={options1[0]}
              options={options1}
              onChange={(e) => handleSaleTypeChange(e)}
              className="pointer"
            />
          </div>
          <div className="col-lg-2 col-md-3 dropdownSelect three mb-xl-0 mb-lg-0 mb-md-0 mb-sm-3 mb-3">
            <Select
              styles={customStyles}
              isSearchable={false}
              defaultValue={options2[0]}
              options={options2}
              onChange={(e) => handleNftTypeChange(e)}
              className="pointer"
            />
          </div>
        </div>
        <ExploreItems
          saleType={saleType}
          nftType={nftType}
          searchedData={searchedData}
          searchBtnClick={searchBtnClick}
        />
      </section>

      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    token: state.token,
    exploreSaleType: state.exploreSaleType,
  };
};

export default connect(mapStateToProps)(Explore);
