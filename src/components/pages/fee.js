import { createGlobalStyle } from "styled-components";
import Footer from '../components/footer'

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

const Fee = () => {
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
                <h1 className="font_64 text-center NunitoBold text-light">Fee</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <h3>What fees do I pay on Kunstify?</h3>
        <p>
          While it doesn't cost anything to create an account with Kunstify and start
          browsing, there are a couple of fees you may pay when buying and selling
          NFTs using Kunstify.
          </p>
          <h3>Kunstify Fee</h3>
          <p>
          Typically, Kunstify receives a 2.5% fee on all secondary sales and a 2.5% fee
          on mints from primary drops. The seller is responsible for bearing the fee.
          The buyer is responsible for paying the item price, a portion of which is
          received by Kunstify as its fee. All transactions and payments occur on the
          blockchain, at the direction of the buyer and seller, and Kunstify is not
          involved in payment processing. Fees are set at the time a listing or an offer
          is created. If a secondary sale listing or an offer was created using Kunstify, a
          2.5% fee will apply.
          </p>
          <h3>Creator Earnings</h3>
          <p>
          Creator earnings refer to a portion of the NFT sale price paid to the original
          creator of the NFT when the item moves from wallet to wallet after a
          purchase. On Kunstify, creator earnings are enforced. If you’re a seller, you
          may be responsible for paying creator earnings of 5%. If you sell an item
          from a collection with enforced creator earnings, you will be required to pay
          creator earnings. If you’re a buyer, you are responsible for paying the item
          price for the NFT. If the seller includes creator earnings in the sale, a portion
          of the item price you paid will go to the creator of the NFT.
          </p>
          <h3>Gas Fees</h3>
          <p>
          Gas fees are transaction fees paid to validators on the blockchain for
          processing your transaction. Gas is not paid to Kunstify, and Kunstify does
          not control gas prices. If you’re a seller, you’ll pay gas when listing an item
          on the blockchain for the first time or accepting an offer. Buyers will pay gas
          when purchasing or transferring items using Kunstify.
          </p>
      </section>

      <Footer/>
    </>
  )
}

export default Fee;