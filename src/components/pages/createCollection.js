import React, { useState } from "react";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import { connect } from "react-redux";
import { createCollection, exportInstance } from "../../apiServices";
import contracts from "../../config/contracts";
import degnrABI from "./../../config/abis/dgnr8.json";
import { ethers } from "ethers";
import Loader from "../components/loader";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { MAX_FILE_SIZE } from "../../helpers/constants";

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

const CreateCollection = (props) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [symbol, setSymbol] = useState();
  const [description, setDescription] = useState();
  const [royalty, setRoyalty] = useState();
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     const fetch = async () => {
  //       let creator = await exportInstance(contracts.CREATOR_PROXY, degnrABI);
  //     };
  //     fetch();
  //   }, []);

  const onChange = (e) => {
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    document.getElementById("file_name").style.display = "none";
    setFiles([...files, ...filesArr]);
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const readReceipt = async (hash) => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const receipt = await provider.getTransactionReceipt(hash.hash);
    let contractAddress = receipt.logs[0].address;
    return contractAddress;
  };

  const handleCollectionCreation = async () => {
    let creator = await exportInstance(contracts.CREATOR_PROXY, degnrABI);
    let res1;
    try {
      setLoading(true);
      props.isSingle
        ? (res1 = await creator.deployExtendedERC721(
            title,
            symbol,
            image,
            royalty,
            contracts.USDT
          ))
        : (res1 = await creator.deployExtendedERC115(image, royalty,contracts.USDT));
    } catch (e) {
      console.log(e);
    }
    let hash = res1;
    res1 = await res1.wait();
    if (res1.status === 1) {
      let contractAddress = await readReceipt(hash);
      var fd = new FormData();

      fd.append("sName", title);
      fd.append("sDescription", description);
      fd.append("nftFile", image);
      fd.append("sContractAddress", contractAddress);
      fd.append("erc721", JSON.stringify(true));
    }
    setLoading(true);
    await createCollection(fd);
    setLoading(false);
    NotificationManager.success("Collection Created Successfully");
  };

  return loading ? (
    <Loader />
  ) : (
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
                <h1 className="text-center">Create Collection</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 offset-lg-1 mb-5 m-auto">
            <div id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <h5>Upload Collection Cover</h5>

                <div className="d-create-file">
                  <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max {MAX_FILE_SIZE}mb.</p>
                  {files
                    ? files.map((x) => (
                        <p key="{index}">
                          PNG, JPG, GIF, WEBP or MP4. Max {MAX_FILE_SIZE}mb.{x.name}
                        </p>
                      ))
                    : ""}
                  <div className="browse">
                    <input
                      type="button"
                      id="get_file"
                      className="btn-main"
                      value="Browse"
                    />
                    <input
                      id="upload_file"
                      type="file"
                      multiple
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>

                <div className="spacer-20"></div>

                <h5>Title</h5>
                <input
                  type="text"
                  name="item_title"
                  value={title}
                  id="item_title"
                  className="form-control"
                  placeholder="e.g. 'Crypto Funk"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />

                <div className="spacer-20"></div>

                <h5>Symbol</h5>
                <input
                  type="text"
                  name="item_title"
                  value={symbol}
                  id="item_title"
                  className="form-control"
                  placeholder="e.g. 'Crypto Funk"
                  onChange={(e) => {
                    setSymbol(e.target.value);
                  }}
                />

                <div className="spacer-10"></div>

                <h5>Description</h5>
                <textarea
                  data-autoresize
                  name="item_desc"
                  id="item_desc"
                  value={description}
                  className="form-control"
                  placeholder="e.g. 'This is very limited item'"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>

                <div className="spacer-10"></div>

                <h5>Royalties</h5>
                <input
                  type="text"
                  name="item_royalties"
                  value={royalty}
                  id="item_royalties"
                  className="form-control"
                  placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%"
                  onChange={(e) => {
                    setRoyalty(e.target.value);
                  }}
                />

                <div className="spacer-10"></div>

                <button
                  id="submit"
                  className="btn-main"
                  onClick={() => {
                    handleCollectionCreation();
                  }}
                >
                  Create Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    token: state.token,
  };
};

export default connect(mapStateToProps)(CreateCollection);
