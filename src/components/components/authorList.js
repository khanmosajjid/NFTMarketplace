import React, { useEffect, useState } from "react";
import { GetAllUserDetails } from "../../apiServices";
import Avatar from "./../../assets/images/avatar5.jpg";

const AuthorList = (props) => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let searchData = {
        page: 1,
        limit: 12,
        sTextsearch: "",
      };
      let authorsList = await GetAllUserDetails(searchData);
      if (authorsList?.results?.length > 0) setAuthors(authorsList?.results[0]);
    }
    fetchData();
  }, []);
  return (
      <div className="author_list_section row">
        {authors
          ? authors.map((author, key) => {
              return (
                <div key={key} className="author_box_home col-md-4 col-sm-6 mb-4">
                  <div
                    onClick={() =>
                      props.navigate(`/author/${author._id}`)
                    }
                    className="author_list_box d-flex align-items-center flex-wrap"
                  >
                    <div className="author_list_profile">
                        <img
                          className="lazy profile_img"
                          src={
                            author.sProfilePicUrl
                              ? author.sProfilePicUrl
                              : Avatar
                          }
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                    </div>
                    
                    <h4 className="author_list_info_box NunitoBold font_18 my-0">
                        {
                          author.sUserName
                          ? author.sUserName
                          : author.oName && author.oName.sFirstname
                          ? author.oName.sFirstname
                          : author.sWalletAddress
                          ?author.sWalletAddress?.slice(0, 8) + "..." + author.sWalletAddress?.slice(34, 42)
                          // author.sWalletAddress.slice(-5)
                          : "0X0..."
                        }
                        
                         {/* // : author.sWalletAddress.slice(0, 5) + "..." */}
                     
                      {/* <span className="bot">3.2 ETH</span> */}
                    </h4>
                  </div>
                </div>
              );
            })
          : ""}
        {/* <li className="author_box_home col-md-4 col-sm-6 viewAllAuthor">
          <div className="author_list_box">
            <div className="author_list_profile">
              <span className="btn-viewAll" onClick={() => (window.location.href = "/exploreAuthors")}>View All</span>
            </div>
          </div>
        </li> */}
      </div>
  );
};
export default AuthorList;
