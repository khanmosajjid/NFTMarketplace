import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";


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
                                <h1 className="font_64 text-center NunitoBold text-light">About Us</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container">
                <h3>Kunstify is an online marketplace platform for non-fungible token (NFT). Kunstify is operated by
                    Paiblock A/S based in Denmark. The company aims to provide customers with more secure NFT
                    trading solutions among other things. that is the content of About us</h3>
            </section>
            <Footer/>
        </>
    )
}

export default AboutUs;