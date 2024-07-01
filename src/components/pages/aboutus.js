import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #8155E5;
    border-bottom: 1px solid #8155E5;
  }
  header#myHeader.sticky .btn-main {
    background: #fff;
    color: #8155E5 !important;
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a {
    color: #fff;
  }
  @media only screen and (max-width: 1199px) {
    .navbar {
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2 {
      background: #fff;
    }
    .item-dropdown .dropdown a {
      color: #fff !important;
    }
  }
  .about-us-text {
    font-size: 16px;
    line-height: 1.5;
    color: #333; /* You can change the color as needed */
    text-align: center; /* Centering the text */
  }
`;

const AboutUs = () => {
  return (
    <>
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
                <h1 className="font_64 text-center NunitoBold text-light">
                  About Us
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="container"
        style={{ fontWeight: "bold", display: "flex", flexDirection: "column" }}
      >
        <p className="about-us-text" style={{ textAlign: "left" }}>
          Kunstify is an online marketplace platform for non-fungible token
          (NFT).
        </p>
        <p className="about-us-text" style={{ textAlign: "left" }}>
          Kunstify is operated by Paiblock A/S based in Denmark.
        </p>
        <p className="about-us-text" style={{ textAlign: "left" }}>
          The company aims to provide customers with more secure NFT trading
          solutions among other things.
        </p>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
