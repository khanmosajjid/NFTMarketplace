import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import { updateProfile, getProfile } from "../../apiServices";
import { NotificationManager } from "react-notifications";
import Loader from "../components/loader";
import ItemNotFound from "./ItemNotFound";
import { useCookies } from "react-cookie";

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

const UpdateProfile = (props) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [uname, setUname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [cookies] = useCookies(["selected_account"]);
  const [profile, setProfile] = useState();
  const [restrictSpace] = useState([" "])

  useEffect(() => {
    if (cookies.selected_account) setCurrentUser(cookies.selected_account);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.selected_account]);

  useEffect(() => {
    const fetch = async () => {
      if (currentUser) {
        let _profile = await getProfile();
        setProfile(_profile.data);
      }
    };
    fetch();
  }, [currentUser]);



  useEffect(() => {
    if (profile) {
      let firstname = profile?.oName?.sFirstname;
      let username = profile?.sUserName;
      let lastname = profile?.oName?.sLastname;
      setFname(firstname === "" || firstname === undefined || firstname === "undefined" ? "" : firstname?.trim());
      setUname(username?.trim());
      setLname(lastname === "" || lastname === undefined || lastname === "undefined" ? "" : lastname?.trim());

      setWebsite(
        profile.sWebsite &&
          profile.sWebsite !== undefined &&
          profile.sWebsite !== "undefined"
          ? profile.sWebsite
          : ""
      );
      setBio(
        profile.sBio &&
          profile.sBio !== undefined &&
          profile.sBio !== "undefined"
          ? profile.sBio
          : ""
      );
      setPhone(
        profile.sPhone &&
          profile.sPhone !== undefined &&
          profile.sPhone !== "undefined"
          ? profile.sPhone
          : ""
      );
      setEmail(
        profile.sEmail &&
          profile.sEmail !== undefined &&
          profile.sEmail !== "undefined"
          ? profile.sEmail
          : ""
      );
    }
  }, [profile]);

  const isValidEmail = async (email) => {
    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    if (
      atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= email.length
    ) {
      NotificationManager.error("Please Enter a Valid E-Mail", "", 800);
      return;
    }
    return true;
  };

  const handleUpdateProfile = async () => {
    let data = {
      uname: uname,
      fname: fname,
      lname: lname,
      bio: bio,
      website: website,
      phone: phone,
      profilePic: profilePic,
      email: email,
    };
    if (fname === "" || fname === undefined) {
      NotificationManager.error("Please Enter a Valid Firstname", "", 800);
      return;
    }
    else {
      if (fname.trim().length === 0) {
        NotificationManager.error("Space not allowed", "", 800);
        return;
      }
    }


    if (lname === "" || lname === undefined) {
      NotificationManager.error("Please Enter a Valid Lastname", "", 800);
      return;
    } else {
      if (lname.trim().length === 0) {
        NotificationManager.error("Space not allowed", "", 800);
        return;
      }
    }

    if (uname === "" || uname === undefined) {
      NotificationManager.error("Please choose valid username", "", 800);
      return;
    } else {
      if (uname.trim().length === 0) {
        NotificationManager.error("Space not allowed", "", 800);
        return;
      }
    }

    if (email) {
      let res = await isValidEmail(email);
      if (!res) {
        return;
      }
    }



    if (currentUser) {
      setLoading(true);
      try {
        let res = await updateProfile(currentUser, data);
        if (res === "User Details Updated successfully") {
          NotificationManager.success(res);
          setTimeout(() => {
            window.location.href = "/profile";
          }, 200);
        } else {
          NotificationManager.error(res);
        }
      } catch (e) {
        console.log("error", e);
        NotificationManager.error("Something Went Wrong");
      }

      setLoading(false);
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setProfilePic(img);
    }
  };

  return !currentUser ? (
    <ItemNotFound />
  ) : (
    <div>
      <GlobalStyles />
      {loading ? <Loader /> : ""}
      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"/img/background/Rectangle11.png"})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="explore-heading">Update Profile</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="spacer-10"></div>

            <div
              name="contactForm"
              id="contact_form"
              className="form-border"
              action="#"
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="field-set ">
                    <label className="required">First Name:</label>
                    <input
                      type="text"
                      name="fname"
                      id="fname"
                      maxLength={15}
                      onChange={(r) => {
                        setFname(r.target.value);
                      }}
                      className="form-control"
                      value={fname}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label className="required">Last Name:</label>
                    <input
                      type="text"
                      name="lname"
                      id="lname"
                      maxLength={15}
                      onChange={(r) => {
                        setLname(r.target.value);
                      }}
                      className="form-control"
                      value={lname}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Email Address:</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      onChange={(r) => {
                        setEmail(r.target.value);
                      }}
                      className="form-control"
                      value={email}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label className="required">Username:</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      maxLength={20}
                      onChange={(r) => {
                        setUname(r.target.value);
                      }}
                      className="form-control"
                      value={uname}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      onChange={(r) => {
                        setPhone(r.target.value.replace(/\D/g, ''));
                      }}
                      className="form-control"
                      minLength={10}
                      maxLength={10}
                      value={phone}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Bio:</label>
                    <input
                      type="text"
                      name="bio"
                      id="bio"
                      onChange={(r) => {
                        setBio(r.target.value);
                      }}
                      value={bio}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Website:</label>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      onChange={(r) => {
                        setWebsite(r.target.value);
                      }}
                      className="form-control"
                      value={website}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="field-set">
                    <label>Upload Profile Pic:</label>
                    {profilePic ? (
                      <img
                        className="upload-profile "
                        src={URL.createObjectURL(profilePic)}
                        alt="profile-pic"
                        onError={() => {
                          console.log("error")
                          setProfilePic("")
                          document.getElementById("inputFile").value = ""
                          NotificationManager.error("File is not an Image file")
                        }}
                      />
                    ) : (
                      ""
                    )}
                    <input
                      type="file"
                      id="inputFile"
                      accept=".png,.jpg,.jpeg,.gif"
                      name="myImage"
                      onChange={(e) => onImageChange(e)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-12 mt-2">
                  <div id="submit" className="">
                    <button
                      type="submit"
                      id="send_message"
                      className="round-btn mr-3"
                      onClick={() => {
                        handleUpdateProfile();
                      }}
                    >
                      Update Profile
                    </button>
                  </div>

                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};



export default UpdateProfile;
