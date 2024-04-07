
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

const Terms = () => {
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
                                <h1 className="font_64 text-center NunitoBold text-light">Terms</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container">
                <div>
                    <div style={{ clear: "both" }}>
                        <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>&nbsp;</p>
                    </div>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt", textAlign: "center" }}>
                        <strong>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                PAIBLOCK TERMS OF USE
                            </span>
                        </strong>
                    </p>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>
                        <span style={{ fontFamily: "Helvetica" }}>&nbsp;</span>
                    </p>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt", textAlign: "justify" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            Effective date: January 15, 2024
                        </span>
                    </p>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <p style={{ marginTop: "0pt", marginBottom: "10pt", textAlign: "justify" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            This Terms of Use (
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }} dir="rtl">
                            “
                        </span>
                        <strong>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                <span dir="ltr" />
                            </span>
                        </strong>
                        Agreement
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            ”) constitutes a legally binding contract between{" "}
                        </span>
                        <strong>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                Paiblock A/S
                            </span>
                        </strong>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            . with a mailing address of
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            Paiblock A/S., Engager 2 - 4 2605 Brondby, Denmark
                        </span>
                        <strong>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}> </span>
                        </strong>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>(</span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }} dir="rtl">
                            <span dir="rtl" />“
                        </span>
                        <strong>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                <span dir="ltr" />
                            </span>
                        </strong>
                        PAIBLOCK
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>”, </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }} dir="rtl">
                            <span dir="rtl" />“
                        </span>
                        <strong>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                <span dir="ltr" />
                            </span>
                        </strong>
                        we<span style={{ fontFamily: "Helvetica", color: "#797979" }}>,” “</span>
                        <strong>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>us</span>
                        </strong>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>,” “</span>
                        <strong>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>our</span>
                        </strong>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            ”) and you, as a User (
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }} dir="rtl">
                            <span dir="rtl" />“
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            <span dir="ltr" />
                            User
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>”, </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }} dir="rtl">
                            <span dir="rtl" />“
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            <span dir="ltr" />
                            Users
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>”, </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }} dir="rtl">
                            <span dir="rtl" />“
                        </span>
                        <strong>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                <span dir="ltr" />
                            </span>
                        </strong>
                        you<span style={{ fontFamily: "Helvetica", color: "#797979" }}>” or </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }} dir="rtl">
                            <span dir="rtl" />“
                        </span>
                        <strong>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                <span dir="ltr" />
                            </span>
                        </strong>
                        your
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            ”) with respect to the PAIBLOCK Services located{" "}
                        </span>
                        <a href="https://www.kunstify.markets" style={{ textDecoration: "none" }}>
                            <u>
                                <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                    https://www.kunstify.markets
                                </span>
                            </u>
                        </a>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            . If you become a licensed user of any PAIBLOCK websites, software, apps,
                            and other services (collectively, our{" "}
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }} dir="rtl">
                            <span dir="rtl" />“
                        </span>
                        <strong>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                <span dir="ltr" />
                            </span>
                        </strong>
                        Services
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }} dir="rtl">
                            <span dir="rtl" />“
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            <span dir="ltr" />
                            ), the terms of your relationship with PAIBLOCK will be governed according
                            to this Terms of Use and any specific End User License Agreement (
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }} dir="rtl">
                            <span dir="rtl" />“
                        </span>
                        <strong>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                <span dir="ltr" />
                            </span>
                        </strong>
                        EULA
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            ”) applicable to that Product.
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <p style={{ marginTop: "0pt", marginBottom: "10pt", textAlign: "justify" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            It is important that you carefully read and understand the terms and
                            conditions of this Agreement. By accessing and using our Services, you are
                            providing your consent to abide by this Agreement. If you do not agree to
                            these terms and conditions of the Agreement, you are not authorized to use
                            the Services and we ask that you cease any use of our Services.
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <p style={{ marginTop: "0pt", marginBottom: "10pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            Please note that this Agreement contains disclaimers of warranties and
                            limitations on liability that may be applicable to you.
                        </span>
                    </p>
                    <ol type={1} style={{ margin: "0pt", paddingLeft: "0pt" }}>
                        <li
                            style={{
                                marginLeft: "26.01pt",
                                textAlign: "justify",
                                paddingLeft: "9.99pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            Intended Users. PAIBLOCK Services are intended to be used by users from
                            all over the world. While using the Service, your use of the Service must
                            not violate any applicable laws, including copyright or trademark laws,
                            export control or sanctions laws, or other laws in your or our
                            jurisdiction. You are responsible for making sure that your use of the
                            Service is in compliance with laws and any applicable regulations. We also
                            prohibit convicted sex offenders from using our services.&nbsp;
                        </li>
                    </ol>
                    <p
                        style={{
                            marginTop: "0pt",
                            marginLeft: "18pt",
                            marginBottom: "0pt",
                            textIndent: "-18pt",
                            textAlign: "justify"
                        }}
                    >
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <ol start={2} type={1} style={{ margin: "0pt", paddingLeft: "0pt" }}>
                        <li
                            style={{
                                marginLeft: "26.01pt",
                                textAlign: "justify",
                                paddingLeft: "9.99pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Permitted Uses</u>&nbsp;&nbsp;
                        </li>
                    </ol>
                    <p
                        style={{
                            marginTop: "0pt",
                            marginLeft: "36pt",
                            marginBottom: "0pt",
                            textIndent: "-25pt",
                            textAlign: "justify"
                        }}
                    >
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>•</span>
                        <span
                            style={{
                                width: "20.8pt",
                                font: '7pt "Times New Roman"',
                                display: "inline-block"
                            }}
                        >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        </span>
                        <u>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>License</span>
                        </u>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            . Subject to full compliance with this Agreement, PAIBLOCK grants you a
                            nonexclusive, nontransferable, non-sublicensable, terminable license to
                            access and use our Services for your use.
                        </span>
                    </p>
                    <p
                        style={{
                            marginTop: "0pt",
                            marginLeft: "36pt",
                            marginBottom: "0pt",
                            textIndent: "-25pt",
                            textAlign: "justify"
                        }}
                    >
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>•</span>
                        <span
                            style={{
                                width: "20.8pt",
                                font: '7pt "Times New Roman"',
                                display: "inline-block"
                            }}
                        >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        </span>
                        <u>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                Private Use
                            </span>
                        </u>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            . The services made available on, by or through our Services, as well as
                            any information provided on, by or through our Services, including but not
                            limited to data, text, graphics, designs, logos, images, audio/visual
                            materials, links, and references (collectively, the{" "}
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }} dir="rtl">
                            “
                        </span>
                        <strong>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                <span dir="ltr" />
                            </span>
                        </strong>
                        Information
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            ”), are provided for use only and not for any for-profit or commercial
                            activities or purpose or for resale, except as expressly permitted herein.
                        </span>
                    </p>
                    <p
                        style={{
                            marginTop: "0pt",
                            marginLeft: "36pt",
                            marginBottom: "0pt",
                            textIndent: "-25pt",
                            textAlign: "justify"
                        }}
                    >
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>•</span>
                        <span
                            style={{
                                width: "20.8pt",
                                font: '7pt "Times New Roman"',
                                display: "inline-block"
                            }}
                        >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        </span>
                        <u>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                Reproduction
                            </span>
                        </u>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            . Without the express written consent of PAIBLOCK, no Information or any
                            other PAIBLOCK materials or property may be copied, reproduced, displayed,
                            republished, downloaded, posted, digitized, translated, modified,
                            transmitted, distributed, or commercially exploited in any way, except as
                            expressly permitted in this Agreement.
                        </span>
                    </p>
                    <p
                        style={{
                            marginTop: "0pt",
                            marginLeft: "36pt",
                            marginBottom: "0pt",
                            textIndent: "-25pt",
                            textAlign: "justify"
                        }}
                    >
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>•</span>
                        <span
                            style={{
                                width: "20.8pt",
                                font: '7pt "Times New Roman"',
                                display: "inline-block"
                            }}
                        >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        </span>
                        <u>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                Unauthorized Use
                            </span>
                        </u>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            . You understand and agree that you may not authorize any Information to
                            be reproduced, modified, displayed, performed, transferred, distributed,
                            or otherwise used by any third party, and you agree that you will take all
                            reasonable steps to prevent any unauthorized reproduction and/or other use
                            of the Information. You agree to advise PAIBLOCK promptly of any such
                            unauthorized use of which you are aware. Failure to abide by these
                            conditions will immediately terminate permission to use our Services and
                            may result in the infringement of the copyrights and/or trademarks and
                            other proprietary rights of PAIBLOCK or others.
                        </span>
                    </p>
                    <p
                        style={{
                            marginTop: "0pt",
                            marginLeft: "18pt",
                            marginBottom: "0pt",
                            textIndent: "-18pt",
                            textAlign: "justify"
                        }}
                    >
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <ol start={3} type={1} style={{ margin: "0pt", paddingLeft: "0pt" }}>
                        <li
                            style={{
                                marginLeft: "26.01pt",
                                textAlign: "justify",
                                paddingLeft: "9.99pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Ownership of Your Content</u>: When you share or upload content, like
                            photos or videos, on our Services, you still own the intellectual property
                            rights. Your rights to your own content are not taken away by these Terms.
                            To make our services work for you, we need your permission (also known as
                            a <span dir="rtl">“</span>
                            <span dir="ltr">license</span>”) to use the material you share. When you
                            share, post, or upload photos, videos or other material that have
                            copyrights or other rights on our platforms, you will be giving us a
                            special kind of permission to keep and use this material. You grant us a
                            worldwide, non-exclusive, transferable, sub-licensable, royalty-free
                            license. This will allow us to store, copy, and share your content on our
                            Services.&nbsp;
                        </li>
                    </ol>
                    <p
                        style={{
                            marginTop: "0pt",
                            marginLeft: "18pt",
                            marginBottom: "0pt",
                            textIndent: "-18pt",
                            textAlign: "justify"
                        }}
                    >
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <ol start={4} type={1} style={{ margin: "0pt", paddingLeft: "0pt" }}>
                        <li
                            style={{
                                marginLeft: "26.01pt",
                                textAlign: "justify",
                                paddingLeft: "9.99pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Third Party Links</u>. Our Services may contain links to other Services
                            for your convenience. The fact that we offer such links does not indicate
                            any approval or endorsement by us of any linked Services or any material
                            contained on any linked Services, and we disclaim any such approval or
                            endorsement. We do not control the linked Services, or the content
                            provided through such Services, and we have not reviewed, in their
                            entirety, such Services. Your use of linked Services is subject to the
                            privacy practices and terms of use established by the specific linked
                            Services, and we disclaim all liability for such use.&nbsp;
                        </li>
                    </ol>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt", textAlign: "justify" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <ol start={5} type={1} style={{ margin: "0pt", paddingLeft: "0pt" }}>
                        <li
                            style={{
                                marginLeft: "26.01pt",
                                textAlign: "justify",
                                paddingLeft: "9.99pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Information Collected</u>. Use of our Services includes the submission
                            of personal information through our online forms. You are agreeing to
                            submit personal information including your name, email address, phone
                            number.
                        </li>
                    </ol>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt", textAlign: "justify" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <ol start={6} type={1} style={{ margin: "0pt", paddingLeft: "0pt" }}>
                        <li
                            style={{
                                marginLeft: "26.01pt",
                                textAlign: "justify",
                                paddingLeft: "9.99pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            IP Ownership.&nbsp;
                        </li>
                    </ol>
                    <p
                        style={{
                            marginTop: "0pt",
                            marginLeft: "36pt",
                            marginBottom: "0pt",
                            textIndent: "-25pt",
                            textAlign: "justify"
                        }}
                    >
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>•</span>
                        <span
                            style={{
                                width: "20.8pt",
                                font: '7pt "Times New Roman"',
                                display: "inline-block"
                            }}
                        >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>PAIBLOCK </span>
                        <u>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                Copyright
                            </span>
                        </u>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            . Our Services are owned and operated by PAIBLOCK and its licensors, and
                            the Information (and any intellectual property and other rights relating
                            thereto) is and will remain the property of PAIBLOCK. The Information is
                            protected by U.S. and international copyright, trademark, and other laws,
                            and you acknowledge that these rights are valid and enforceable. Except as
                            set forth in this Agreement, you may not copy, reproduce, modify, adapt,
                            translate, republish, upload, post, transmit, distribute, sub-license,
                            sell, reverse engineer, decompile, or disassemble any part of our Services
                            or any Information without our prior written permission. Our Services and
                            Information may be used solely (a) to the extent permitted in this
                            Agreement or (b) as expressly authorized in writing by PAIBLOCK. Use of
                            our Services or any Information for any other purpose is strictly
                            prohibited. You acknowledge that you do not acquire any ownership rights
                            by using our Products and Services or any Information.
                        </span>
                    </p>
                    <p
                        style={{
                            marginTop: "0pt",
                            marginLeft: "36pt",
                            marginBottom: "0pt",
                            textIndent: "-25pt",
                            textAlign: "justify"
                        }}
                    >
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>•</span>
                        <span
                            style={{
                                width: "20.8pt",
                                font: '7pt "Times New Roman"',
                                display: "inline-block"
                            }}
                        >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>PAIBLOCK</span>
                        <u>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                {" "}
                                Trademarks
                            </span>
                        </u>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            . The trademarks and logos displayed on our Services (collectively, the{" "}
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }} dir="rtl">
                            “
                        </span>
                        <strong>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                <span dir="ltr" />
                            </span>
                        </strong>
                        Trademarks
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            ”) are the registered and unregistered trademarks of PAIBLOCK. Nothing
                            contained in this Agreement, or our Services should be construed as
                            granting, by implication, estoppel, or otherwise, any license or right to
                            use any Trademark(s) without the express written permission of PAIBLOCK,
                            except as set forth in this section. You acknowledge and agree that all
                            rights in and to the PAIBLOCK trademarks are our exclusive property, and
                            any goodwill generated by your use of any PAIBLOCK trademark will inure to
                            our exclusive benefit. You will not take any action that conflicts with
                            our rights in or ownership of any PAIBLOCK trademark.
                        </span>
                    </p>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <ol start={7} type={1} style={{ margin: "0pt", paddingLeft: "0pt" }}>
                        <li
                            style={{
                                marginLeft: "26.01pt",
                                textAlign: "justify",
                                paddingLeft: "9.99pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>DMCA Notices</u>.&nbsp;If you are a copyright owner or an agent thereof
                            and believe that any User Generated Content or other content on the site
                            infringes upon your copyrights, you may submit a notification pursuant to
                            the Digital Millennium Copyright Act (<span dir="rtl">“</span>
                            <strong>
                                <span dir="ltr" />
                            </strong>
                            DMCA”) by providing our Copyright Agent with the following information in
                            writing (see 17 U.S.C 512(c)(3) for further detail):A physical or
                            electronic signature of a person authorized to act on behalf of the owner
                            of an exclusive right that is allegedly infringed;
                        </li>
                    </ol>
                    <p
                        style={{
                            marginTop: "0pt",
                            marginLeft: "36pt",
                            marginBottom: "0pt",
                            textIndent: "-25pt",
                            textAlign: "justify"
                        }}
                    >
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>•</span>
                        <span
                            style={{
                                width: "20.8pt",
                                font: '7pt "Times New Roman"',
                                display: "inline-block"
                            }}
                        >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            Identification of the copyrighted work claimed to have been infringed, or,
                            if multiple copyrighted works at a single online site are covered by a
                            single notification, a representative list of such works at that site;
                        </span>
                    </p>
                    <p
                        style={{
                            marginTop: "0pt",
                            marginLeft: "36pt",
                            marginBottom: "0pt",
                            textIndent: "-25pt",
                            textAlign: "justify"
                        }}
                    >
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>•</span>
                        <span
                            style={{
                                width: "20.8pt",
                                font: '7pt "Times New Roman"',
                                display: "inline-block"
                            }}
                        >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            Identification of the material that is claimed to be infringing or to be
                            the subject of infringing activity and that is to be removed or access to
                            which is to be disabled and information reasonably sufficient to permit
                            the service provider to locate the material;
                        </span>
                    </p>
                    <p
                        style={{
                            marginTop: "0pt",
                            marginLeft: "36pt",
                            marginBottom: "0pt",
                            textIndent: "-25pt",
                            textAlign: "justify"
                        }}
                    >
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>•</span>
                        <span
                            style={{
                                width: "20.8pt",
                                font: '7pt "Times New Roman"',
                                display: "inline-block"
                            }}
                        >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            Information reasonably sufficient to permit the service provider to
                            contact you, such as an address, telephone number, and, if available, an
                            electronic mail;
                        </span>
                    </p>
                    <p
                        style={{
                            marginTop: "0pt",
                            marginLeft: "36pt",
                            marginBottom: "0pt",
                            textIndent: "-25pt",
                            textAlign: "justify"
                        }}
                    >
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>•</span>
                        <span
                            style={{
                                width: "20.8pt",
                                font: '7pt "Times New Roman"',
                                display: "inline-block"
                            }}
                        >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            A statement that you have a good faith belief that use of the material in
                            the manner complained of is not authorized by the copyright owner, its
                            agent, or the law; and a statement that the information in the
                            notification is accurate, and under penalty of perjury, that you are
                            authorized to act on behalf of the owner of an exclusive right that is
                            allegedly infringed.
                        </span>
                    </p>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt", textAlign: "justify" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            You can send your notice to dmca@kunstify.markets. A copy of your DMCA
                            Notification will be sent to the person who uploaded the material
                            addressed in the Notification. Please be advised that under Section 512(f)
                            of the Digital Millennium Copyright Act, you may be held liable for
                            damages and attorneys
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }} dir="rtl">
                            ’{" "}
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            <span dir="ltr" />
                            fees if you make material misrepresentations in a DMCA Notification.
                        </span>
                    </p>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <ol start={7} type={1} style={{ margin: "0pt", paddingLeft: "0pt" }}>
                        <li
                            style={{
                                marginLeft: "26.01pt",
                                textAlign: "justify",
                                paddingLeft: "9.99pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>No Use by Children under 13</u>. You hereby affirm that you are over
                            the age of 13, as these Services are not intended for children under 13.
                            If you are under 13 years of age, then you may not use our Services. You
                            further affirm that you are fully able and competent to enter into the
                            terms, conditions, obligations, affirmations, representations, and
                            warranties set forth in this Agreement, and to abide by and comply with
                            this Agreement.
                        </li>
                    </ol>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <ol start={8} type={1} style={{ margin: "0pt", paddingLeft: "0pt" }}>
                        <li
                            style={{
                                marginLeft: "26.01pt",
                                textAlign: "justify",
                                paddingLeft: "9.99pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Term &amp; Termination</u>. This Agreement is effective from the date
                            that you first access our Services and shall remain effective until
                            terminated in accordance with its terms. <strong>PAIBLOCK</strong> may
                            immediately terminate this Agreement, and/or your access to and use of our
                            Services, or any portion thereof, at any time and for any reason, with or
                            without cause, without prior notice. You understand that{" "}
                            <strong>PAIBLOCK</strong> may exercise this right in its sole discretion,
                            and this right shall be in addition to and not in substitution for any
                            other rights and remedies available to <strong>PAIBLOCK</strong>. This
                            Agreement will also terminate automatically if you fail to comply with any
                            term or provision of this Agreement. Upon termination of this Agreement by
                            either party, your right to use our Services shall immediately cease, and
                            you shall destroy all copies of information that you have obtained from
                            our Services, whether made under the terms of this Agreement or otherwise.
                            All disclaimers and all limitations of liability and all{" "}
                            <strong>PAIBLOCK</strong> rights of ownership shall survive any
                            termination.
                        </li>
                    </ol>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <ol start={9} type={1} style={{ margin: "0pt", paddingLeft: "0pt" }}>
                        <li
                            style={{
                                marginLeft: "26.01pt",
                                textAlign: "justify",
                                paddingLeft: "9.99pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Disclaimers</u>.&nbsp;OUR SERVICES ARE PROVIDED{" "}
                            <span dir="rtl">“</span>
                            <span dir="ltr">AS IS” AND </span>
                            <span dir="rtl">
                                <span dir="rtl" />“
                            </span>
                            <span dir="ltr">WITH ALL FAULTS</span>” AND WITHOUT WARRANTIES OF ANY
                            KIND, EITHER EXPRESS OR IMPLIED, AND ALL WARRANTIES, EXPRESS OR IMPLIED,
                            INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF TITLE,
                            NON-INFRINGEMENT, ACCURACY, COMPLETENESS, MERCHANTABILITY, FITNESS FOR A
                            PARTICULAR PURPOSE, ANY WARRANTIES THAT MAY ARISE FROM COURSE OF DEALING,
                            COURSE OF PERFORMANCE OR USAGE OF TRADE, AND ANY WARRANTIES THAT THE
                            INFORMATION AND SERVICES ARE CURRENT AND/OR UP-TO-DATE ARE HEREBY
                            EXPRESSLY DISCLAIMED TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE
                            LAW.
                        </li>
                    </ol>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <p
                        style={{
                            marginTop: "0pt",
                            marginLeft: "13.5pt",
                            marginBottom: "0pt",
                            textIndent: "-13.5pt",
                            textAlign: "justify"
                        }}
                    >
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            THERE IS NO WARRANTY, REPRESENTATION OR GUARANTEE THAT OUR SERVICES, OR
                            YOUR USE OF OUR SERVICES, WILL BE UNINTERRUPTED, COMPLETE, ACCURATE,
                            CURRENT, RELIABLE, ERROR-FREE, SECURE, OR THAT ANY PROBLEMS WILL BE
                            CORRECTED, OR THAT OUR SERVICES, OR ANY INFORMATION OR OTHER MATERIAL
                            ACCESSIBLE FROM OUR SERVICES, IS FREE OF VIRUSES OR OTHER HARMFUL
                            COMPONENTS. WE DO NOT WARRANT, GUARANTEE, OR MAKE ANY REPRESENTATION
                            REGARDING THE USE OF, OR THE RESULTS OF THE USE OF OUR SERVICES, AND YOU
                            ASSUME ALL RESPONSIBILITY AND RISK FOR YOUR USE OF OUR SERVICES AND
                            INFORMATION AND YOUR RELIANCE THEREON.
                        </span>
                    </p>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <ol start={10} type={1} style={{ margin: "0pt", paddingLeft: "0pt" }}>
                        <li
                            style={{
                                marginLeft: "32.68pt",
                                textAlign: "justify",
                                paddingLeft: "3.32pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Limitation of Liability</u>.&nbsp;NOTWITHSTANDING THE FAILURE OF
                            ESSENTIAL PURPOSE OF ANY LIMITED REMEDY OF ANY KIND, NEITHER PAIBLOCK NOR
                            ANY OF ITS AGENTS, SUCCESSORS, OR ASSIGNS, NOR PAIBLOCK MEMBERS, OFFICERS,
                            EMPLOYEES, CONSULTANTS, OR OTHER REPRESENTATIVES, ARE RESPONSIBLE OR
                            LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY,
                            PUNITIVE, OR OTHER DAMAGES (INCLUDING WITHOUT LIMITATION ANY LOSS OF
                            PROFITS, LOST SAVINGS, OR LOSS OF DATA) OR LIABILITIES UNDER ANY CONTRACT,
                            NEGLIGENCE, STRICT LIABILITY, OR OTHER THEORY ARISING OUT OF OR RELATING
                            IN ANY MANNER TO OUR SERVICES, INFORMATION, AND/OR ANY LINKED PRODUCTS AND
                            SERVICES, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH
                            DAMAGES OR LIABILITIES.{" "}
                            <strong>
                                YOUR SOLE REMEDY WITH RESPECT TO ANY CLAIMS RELATED TO THESE SERVICES,
                                THE INFORMATION, OR ANY LINKED PRODUCTS AND SERVICES IS TO STOP USING
                                OUR SERVICES, OR LINKED SERVICES, AS APPLICABLE AND A FULL REFUND OF THE
                                FEES PAID FOR THE SERVICES.
                            </strong>
                            <strong>&nbsp;</strong>
                        </li>
                    </ol>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt", textAlign: "justify" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>NEITHER </span>
                        <strong>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                PAIBLOCK
                            </span>
                        </strong>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            {" "}
                            NOR ANY OF ITS AGENTS, SUCCESSORS, OR ASSIGNS, NOR{" "}
                        </span>
                        <strong>
                            <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                                PAIBLOCK
                            </span>
                        </strong>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }} dir="rtl">
                            ’
                        </span>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>
                            <span dir="ltr" />S MEMBERS, OFFICERS, EMPLOYEES, CONSULTANTS, OR OTHER
                            REPRESENTATIVES WILL HAVE ANY LIABILITY TO YOU FOR ANY DAMAGES, EXPENSES
                            OR OTHER LIABILITY INCURRED BY YOU AS A RESULT OF ANY INACCURACY,
                            INCOMPLETENESS OR MISREPRESENTATION OF ANY INFORMATION, CONTENT, POSTINGS.
                        </span>
                    </p>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <ol start={11} type={1} style={{ margin: "0pt", paddingLeft: "0pt" }}>
                        <li
                            style={{
                                marginLeft: "32.68pt",
                                textAlign: "justify",
                                paddingLeft: "3.32pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Indemnification</u>. You agree to fully indemnify, defend, and hold
                            PAIBLOCK<span dir="rtl">’</span>
                            <span dir="ltr">s agents, successors, and assigns and PAIBLOCK</span>
                            <span dir="rtl">
                                <span dir="rtl" />’
                            </span>
                            <span dir="ltr">
                                s directors, officers, employees, consultants, and other
                                representatives, harmless from and against any and all claims, damages,
                                losses, costs (including reasonable attorneys
                            </span>
                            <span dir="rtl">
                                <span dir="rtl" />’{" "}
                            </span>
                            <span dir="ltr">
                                fees), and other expenses that arise directly or indirectly out of or
                                from: (a) your breach of this Agreement; (b) any allegation that any
                                materials you submit to us or transmit to our Services infringe or
                                otherwise violate the copyright, patent, trademark, trade secret, or
                                other intellectual property or other rights of any third party; (c) your
                                activities in connection with our Services or other Services to which
                                our Services are linked; and/or (d) your negligence or willful
                                misconduct.
                            </span>
                        </li>
                    </ol>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <ol start={12} type={1} style={{ margin: "0pt", paddingLeft: "0pt" }}>
                        <li
                            style={{
                                marginLeft: "32.68pt",
                                paddingLeft: "3.32pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Other Jurisdictions</u>. PAIBLOCK makes no representation that our
                            Services operate (or are legally permitted to operate) in all geographic
                            areas, or that our Services or Information are appropriate or available
                            for use in other locations. Accessing our Services from territories where
                            our Services or any content or functionality of our Services or portion
                            thereof is illegal is expressly prohibited. If you choose to access our
                            Services, you agree and acknowledge that you do so on your own initiative
                            and at your own risk, and that you are solely responsible for compliance
                            with all applicable laws.
                        </li>
                        <li
                            style={{
                                marginLeft: "32.68pt",
                                textAlign: "justify",
                                paddingLeft: "3.32pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Notice</u>. By use of our Services, you consent to receive electronic
                            communications from PAIBLOCK. You also agree that any such communications
                            satisfy any legal requirement to make such communications in writing under
                            this Agreement or under any applicable laws or regulations. Specifically,
                            we may provide notice to you by sending an email to the address that you
                            provided as part of your registration for our Products and Services. Any
                            notice to PAIBLOCK will be provided by both (a) sending an email to{" "}
                            <a href="mailto:legal@evig.world" style={{ textDecoration: "none" }}>
                                <u>
                                    <span style={{ color: "#0b4cb3" }}>legal@kunstify.markets</span>
                                </u>
                            </a>{" "}
                            and (b) providing a copy by certified mail, return receipt requested to:
                            Paiblock A/S., Engager 2 - 4 2605 Brondby, Denmark, ATTN: Legal. &nbsp;
                        </li>
                    </ol>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt", textAlign: "justify" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <ol start={14} type={1} style={{ margin: "0pt", paddingLeft: "0pt" }}>
                        <li
                            style={{
                                marginLeft: "32.68pt",
                                paddingLeft: "3.32pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>No Waiver</u>. No delay or omission by either party in exercising any
                            rights under this Agreement will operate as a waiver of that or any other
                            right. A waiver or consent given by either party on any one occasion is
                            effective only in that instance and will not be construed as a bar to or
                            waiver of any right on any other occasion.
                        </li>
                        <li
                            style={{
                                marginLeft: "32.68pt",
                                paddingLeft: "3.32pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Assignment</u>. Neither this Agreement nor any right, obligation, or
                            remedy hereunder is assignable, transferable, delegable, or sublicensable
                            by you except with PAIBLOCK<span dir="rtl">’ </span>
                            <span dir="ltr">
                                s prior written consent, and any attempted assignment, transfer,
                                delegation, or sublicense shall be null and void. PAIBLOCK may assign,
                                transfer, or delegate this Agreement or any right or obligation or
                                remedy hereunder in its sole discretion.
                            </span>
                        </li>
                        <li
                            style={{
                                marginLeft: "32.68pt",
                                paddingLeft: "3.32pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Right to Change Terms</u>. We reserve the right at any time, with or
                            without cause, to (a) change the terms and conditions of this Agreement;
                            (b) change our Services; or (c) deny or terminate your use of and/or
                            access to our Services. Any changes we make will be effective immediately
                            upon our making such changes to our Services, with or without additional
                            notice to you. You agree that your continued use of our Services after
                            such changes constitutes your acceptance of such changes. You hereby
                            acknowledge that you have carefully read all the terms and conditions of
                            our Privacy Policy (which can be accessed at{" "}
                            <a
                                href="http://www.evig.world/privacy"
                                style={{ textDecoration: "none" }}
                            >
                                <u>
                                    <span style={{ color: "#0b4cb3" }}>
                                        https://www.kunstify.markets/privacy
                                    </span>
                                </u>
                            </a>
                            ) and agree to all such terms and conditions. Be sure to return to this
                            page periodically to ensure familiarity with the most current version of
                            this Agreement. YOUR CONTINUED USE OF OUR SERVICES AFTER SUCH POSTING
                            MEANS YOU ACCEPT AND AGREE TO BE BOUND BY THE MODIFIED TERMS OF USE.
                        </li>
                        <li
                            style={{
                                marginLeft: "32.68pt",
                                textAlign: "justify",
                                paddingLeft: "3.32pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Mediation and Arbitration</u>. Any controversy between the Parties to
                            this Agreement involving the construction or application of any of the
                            terms, provisions, or conditions of this Agreement, shall on written
                            request of either party served on the other, be submitted first to
                            mediation and then if still unresolved to binding arbitration. Said
                            mediation or binding arbitration shall comply with and be governed by the
                            provisions of the American Arbitration Association for Commercial Disputes
                            unless the Parties stipulate otherwise. The attorneys
                            <span dir="rtl">’ </span>
                            <span dir="ltr">
                                fees and costs of arbitration shall be borne by the losing party unless
                                the Parties stipulate otherwise, or in such proportions, as the
                                arbitrator shall decide.
                            </span>
                        </li>
                    </ol>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <ol start={18} type={1} style={{ margin: "0pt", paddingLeft: "0pt" }}>
                        <li
                            style={{
                                marginLeft: "32.68pt",
                                textAlign: "justify",
                                paddingLeft: "3.32pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Governing Law &amp; Venue</u>. This Agreement shall be governed in all
                            respects by the laws of Denmark The Courts of Glostrup, shall be the
                            exclusive forum for any mediation, arbitration, litigation, or dispute
                            resolution.&nbsp;
                        </li>
                    </ol>
                    <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <ol start={19} type={1} style={{ margin: "0pt", paddingLeft: "0pt" }}>
                        <li
                            style={{
                                marginLeft: "32.68pt",
                                paddingLeft: "3.32pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Class Action Waiver</u>: To the maximum extent permitted by applicable
                            law, You and PAIBLOCK agree to only bring Disputes in an individual
                            capacity and shall not 1. seek to bring, join, or participate in any class
                            or representative action, collective or class-wide arbitration, or any
                            other action where another individual or entity acts in a representative
                            capacity (e.g., private attorney general actions); or 2. consolidate or
                            combine individual proceedings or permit an arbitrator to do so without
                            the express consent of all parties to this Agreement and all other actions
                            or arbitrations.
                        </li>
                        <li
                            style={{
                                marginLeft: "32.68pt",
                                paddingLeft: "3.32pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Enforceability</u>. If any provision of this Agreement is found to be
                            unlawful, void, or for any reason unenforceable, then that provision shall
                            be deemed severable from this Agreement and shall not affect the validity
                            and enforceability of any remaining provisions.&nbsp;
                        </li>
                        <li
                            style={{
                                marginLeft: "32.68pt",
                                textAlign: "justify",
                                paddingLeft: "3.32pt",
                                fontFamily: "Helvetica",
                                color: "#797979"
                            }}
                        >
                            <u>Entire Agreement</u>. This Agreement, along with the Privacy Policy,
                            constitute the entire agreement with respect to the relationship between
                            PAIBLOCK and you and supersedes all prior agreements, whether written or
                            oral, concerning such relationship. This Agreement may not be changed,
                            waived, or modified except by PAIBLOCK as provided herein or otherwise by
                            written instrument signed by PAIBLOCK.
                        </li>
                    </ol>
                    <p style={{ marginTop: "0pt", marginBottom: "8pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <p style={{ marginTop: "0pt", marginBottom: "8pt" }}>
                        <span style={{ fontFamily: "Helvetica", color: "#797979" }}>&nbsp;</span>
                    </p>
                    <div style={{ clear: "both" }}>
                        <p style={{ marginTop: "0pt", marginBottom: "0pt" }}>&nbsp;</p>
                    </div>
                </div>

            </section>

            <Footer />
        </>
    )
}

export default Terms;