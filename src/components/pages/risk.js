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
  // header#myHeader.navbar .search #quick_search{
  //   color: #fff;
  //   background: rgba(255, 255, 255, .1);
  // }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  // header#myHeader .dropdown-toggle::after{
  //   color: rgba(255, 255, 255, .5);;
  // }
  // header#myHeader .logo .d-block{
  //   display: none !important;
  // }
  // header#myHeader .logo .d-none{
  //   display: block !important;
  // }
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

const Risk = () => {
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
                                <h1 className="font_64 text-center NunitoBold text-light">Risk Notifications</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container">
                <h3>
                    Risk Notifications.
                </h3>
                <p>
                    Trading in digital assets (Tokens, cryptocurrencies and NFTs) and
                    participating in relevant transactions entails significant risks of
                    financial losses.
                    You should not risk your funds to trade or use digital assets that you
                    are not prepared to lose.
                    Market prices for Digital Assets can be volatile and unpredictable.
                    Whether the future market prices of the Digital Asset will rise or fall
                    is unknown.
                    You should not trade digital assets if you do not understand the
                    risks involved. This Statement, “Risk Notices” discloses some of the
                    main risks of digital asset trading and transactions, but all risks
                    cannot be described. When trading, it is especially important that
                    there are clear rules for risk management; you need to watch out for
                    excessive greed. Consider the amount you are willing to risk and be
                    100% willing to lose it. Define clear levels for closing positions and
                    taking profits.

                </p>
                <section>
                    <h3>The risks of trading Digital Assets include, but are not limited to, the following rules:</h3>
                    <ol>
                        <li>
                            <h3>Market risk of digital assets.</h3>
                            <p>Market prices for digital assets can be volatile and unpredictable. Whether the future market price of a Digital Asset will rise or fall, or even support the market value - speculation - is unknown.</p>
                            <p>Kurstify makes no guarantees as to whether the NFTs and other Tokens will always be traded on the market.</p>
                        </li>
                        <li>
                            <h3>Liquidity risk.</h3>
                            <p>Markets for digital assets can sometimes become so-called "liquid," which means there may be a shortage of people willing to trade at any moment. Illiquid markets have a potentially heightened risk of loss as they can experience high price volatility and in some markets market participants close their positions at very unfavorable prices. There is no guarantee that the markets for any digital asset will be active and liquid.</p>
                        </li>
                        <li>
                            <h3>Legal risk.</h3>
                            <p>The legality, trading or use of digital assets may be unclear and may vary according to the laws of various jurisdictions around the world. You are responsible for knowing and understanding how the laws that apply to you or your property, activities or assets limit, regulate, and tax the digital assets you hold.</p>
                        </li>
                        <li>
                            <h3>Risk of freezing personal account.</h3>
                            <p>Kurstify may freeze a personal account (based on the AML Policy) in the event that a user is seen engaging in suspicious money laundering activity or violating any of the Terms of Service. If the personal account is frozen, the user will not be able to trade or make transfers until all the circumstances are clarified. It can lead to the closure of your open orders.</p>
                        </li>
                        <li>
                            <h3>Risks associated with financial activities.</h3>
                            <p>When a user makes a purchase or sale of Digital Assets, there is a risk that the could lose his funds. Because Kurstify is not a counterparty for any transactions and does not bear financial responsibility or obligations in the event that market participants fail to fulfill their financial obligations. When a user makes a financial decision to open or close an order, he assumes the risk of a possible loss of funds (for example, if the market price of the purchased Digital Asset falls, or there is no buyer for the asset). Participants must know all the terms of any contracts they enter into and how their strategies, other market factors, risk factors can affect their financial performance.</p>
                        </li>
                    </ol>
                </section>
            </section>

            <Footer />
        </>
    )
}

export default Risk;