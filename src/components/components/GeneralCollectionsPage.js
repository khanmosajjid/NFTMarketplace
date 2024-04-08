import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { getCollections, isEmpty,getAllCollectionsList} from "../../helpers/getterFunctions";
import { Pagination } from "@material-ui/lab";
import Placeholder from "./placeholder";
import { perPageCount } from "../../helpers/constants";
import { useNavigate } from "react-router-dom";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

const CollectionsList = (props) => {
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isAllCollections, setIsAllCollections] = useState("");
  let navigate = useNavigate()
  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  useEffect(() => {
    setIsAllCollections(props.isAllCollections);
    console.log('hiii')
  }, []);

  useEffect(() => {
    // window.scrollTo(0, 0);
    async function fetchData() {
      setLoading(true);
      let _collections = [];
      if (props.isAllCollections) {
        _collections = await getAllCollectionsList(
          currPage,
          perPageCount,
          null,
          true,
          props.isERC721,
          props.searchedData
        );
         console.log("collections  are-------------->",_collections)
        if (_collections && _collections.length > 0) {
          setTotalPages(Math.ceil(_collections[0].count / perPageCount));
        }
        setCollections(_collections);
        setLoading(false);
      } else if (props && props.userId) {
        _collections = await getCollections(
          currPage,
          perPageCount,
          props.userId,
          false
        );
        if (_collections && _collections.length > 0) {
          setTotalPages(Math.ceil(_collections[0]?.count / perPageCount));
        }
        setCollections(_collections);
        setLoading(false);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage, props.isAllCollections, props.isERC721, props.searchedData]);

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

  return loading ? (
    returnPlaceHolder()
  ) : (
    <div className="row">
      {console.log("collections are --------->",collections)}
      {collections?.length >= 1
        ? collections.map((collection, index) => (
            <div
              key={index}
              className="d-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4"
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <span className="cursor-pointer"
                    onClick={() =>
                      navigate(`/author/${collection.authorId}`)
                    }
                  >
                    <img
                      title={
                        collection.authorAddress
                          ? collection.authorAddress.slice(0, 3) +
                            "..." +
                            collection.authorAddress.slice(39, 42)
                          : ""
                      }
                      className="lazy profile_img"
                      src={collection.authorImage}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </span>
                </div>
                <div
                  className="nft__item_wrap_carausel"
                  // style={{ height: `${height}px` }}
                >
                  <Outer className="w-100">
                    <div
                      onClick={() =>
                        navigate(`/collection/?addr=${collection.collectionAddress}`)
                      }
                      className="w-100 h-100"
                    >
                      <img
                        onLoad={onImgLoad}
                        src={collection.collectionImage}
                        className="lazy nft__item_preview slider-img-preview"
                        alt=""
                      />
                    </div>
                  </Outer>
                </div>
                <div className="nft__item_info col_info">
                  <span
                    onClick={() =>
                      navigate(`/collection/?addr=${collection.collectionAddress}`)
                    }
                  >
                    <h4 className="nft_title_class">
                      {collection.collectionName
                        ? collection.collectionName.length > 15
                          ? collection.collectionName.slice(0, 15) + "..."
                          : collection.collectionName
                        : ""}
                    </h4>
                    {/* <h4>{collection.sContractAddress}</h4> */}
                  </span>

                  {/* <p>{collection.collectionType}</p> */}
                </div>
              </div>
            </div>
          ))
        : <div className="noBids">
        <h4>No Collection Available</h4>
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

export default CollectionsList;
