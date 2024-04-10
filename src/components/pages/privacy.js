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
//   header#myHeader.navbar .search #quick_search{
//     color: #fff;
//     background: rgba(255, 255, 255, .1);
//   }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
//   header#myHeader .dropdown-toggle::after{
//     color: rgba(255, 255, 255, .5);;
//   }
//   header#myHeader .logo .d-block{
//     display: none !important;
//   }
//   header#myHeader .logo .d-none{
//     display: block !important;
//   }
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

const Privacy = () => {
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
                                <h1 className="font_64 text-center NunitoBold text-light">Privacy</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container">
                <>
                    <p>
                        <strong>PAIBLOCK PRIVACY POLICY</strong>
                    </p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p>Effective date: January 15, 2024</p>
                    <p>&nbsp;</p>
                    <p>
                        Paiblock A/S operates the{" "}
                        <a href="https://kunstify.markets">https://kunstify.markets</a> website,
                        which strives to be your one stop place for all family and friend activities
                        where your day starts on this private digital platform. We respect the
                        privacy of every person who visits the{" "}
                        <a href="https://kunstify.markets">https://kunstify.markets</a> website
                        and/or uses the Services made available by us and we are committed to
                        ensuring a safe online experience.
                    </p>
                    <p>
                        This Paiblock A/S Privacy Policy (“<strong>Policy</strong>” accessed at
                        http://www.kunstify.markets/privacy<strong>) </strong>describes how Paiblock
                        A/S (“<strong>PAIBLOCK”</strong>, “<strong>we</strong>,” “
                        <strong>us</strong>,” “<strong>our</strong>”) collect, use and otherwise
                        process the personal information we collect about our customers,
                        purchasers,&nbsp;and/or users (“<strong>User</strong>”, “
                        <strong>you</strong>”, or “<strong>your</strong>”) of our websites,
                        software, apps and other services (collectively, our “
                        <strong>Services</strong>“).
                    </p>
                    <p>
                        It is important that you carefully read and understand the terms and
                        conditions of this Policy. By accessing our Services, you are providing your
                        consent to our collection, use and disclosure of information about you as
                        described in this Policy. Additionally, our Terms of Use are incorporated by
                        reference into this Policy. If you do not agree to these terms and
                        conditions of the Policy, you are not authorized to use the Services or
                        communicate with us via the Services.&nbsp;
                    </p>
                    <p>
                        Please note that this Policy contains disclaimers of warranties and
                        limitations on liability that may be applicable to you.
                    </p>
                    <ol>
                        <li>
                            <u>Personal Information</u>. In this Policy, our use of the term “personal
                            information” includes other similar terms under applicable privacy law
                            such as “personal data” and “personally identifiable information.” In
                            general, personal information includes any information that identifies,
                            relates to, describes, or is reasonably capable of being associated, or
                            reasonably linked or linkable with a particular individual.
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ol start={2}>
                        <li>
                            <u>Collection and Use of Information</u>. PAIBLOCK collects information
                            that you provide us directly or automatically when you use our Services.
                            This information may include data collected about your name, email
                            address, phone number, time zone, images uploaded by you, videos uploaded
                            by you other website/application information provided by you and Services
                            usage. We may use the information for purposes such as to improve the
                            quality of our Services, personalize your experience, display relevant
                            advertising, evaluate the success of our advertising, provide customer
                            support, message you (in ways described by this privacy policy and managed
                            by you in your account settings), enhance the security of our Services,
                            fulfill transactions authorized by you, and comply with legal obligations.
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ol start={3}>
                        <li>
                            <u>Legal Bases for Processing Your Data</u>. Pursuant to the EU General
                            Data Protection Regulation (GDPR), the UK Data Protection Act 2018, the
                            California Consumer Privacy Act (CCPA), California Privacy Rights Act
                            (CPRA), the Virginia Consumer Data Protection Act (VCDPA), the Colorado
                            Privacy Act (CPA), the Utah Consumer Privacy Act (UCPA), the Canadian
                            Personal Information Protection and Electronic Documents Act (PIPEDA), the
                            Brazil General Data Protection Law (LGPD), and other privacy laws and
                            regulations, in general, we process your personal information for the
                            following legal bases:
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ul>
                        <li>Performance of our contract with you.</li>
                        <li>To comply with a legal obligation to which PAIBLOCK is subject.</li>
                        <li>For our legitimate business interests.</li>
                        <li>With your consent.</li>
                    </ul>
                    <p>&nbsp;</p>
                    <ol start={4}>
                        <li>
                            <u>Purposes of Use and Processing</u>. While the purposes for which we may
                            process personal information will vary depending upon the circumstances,
                            in general, we use personal information for the business and commercial
                            purposes set forth below:
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ul>
                        <li>Providing our Services and related support.</li>
                        <li>Protecting the integrity of the Services.</li>
                        <li>Analyzing and improving the Services and our business.</li>
                        <li>Personalizing the Services.</li>
                        <li>Advertising, marketing, and promotional purposes.</li>
                        <li>Securing and protecting our business.</li>
                        <li>Defending our legal rights.</li>
                        <li>Auditing, reporting, corporate governance.</li>
                        <li>Complying with legal obligations.</li>
                    </ul>
                    <p>&nbsp;</p>
                    <ol start={5}>
                        <li>
                            <u>Investigations</u>. PAIBLOCK may investigate and disclose information
                            from or about you, as permitted by applicable law, if we have a good faith
                            belief that such investigation or disclosure is (a) reasonably necessary
                            to comply with legal process and law enforcement instructions and orders,
                            such as a search warrant, subpoena, statute, judicial proceeding, or other
                            legal process served on us; (b) helpful to prevent, investigate, or
                            identify possible wrongdoing in connection with the Services; or (c)
                            helpful to protect our rights, reputation, property, or that of our users,
                            subsidiaries, or the public.
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ol start={6}>
                        <li>
                            <u>Vendors and Service Providers.</u> We may engage vendors, agents,
                            service providers, and affiliated entities to provide services to us or to
                            Users on our behalf, such as support for the internal operations of our
                            Services, online stores (including payment processors), products and
                            services (e.g., forum operations, and technical support processing), as
                            well as related offline product support services, data storage and other
                            services. In providing their services, they may access, receive, maintain,
                            or otherwise process personal information on our behalf. Our contracts
                            with these service providers do not permit the use of your personal
                            information for their own marketing and other purposes. These disclosures
                            are generally made under terms comparable to this Policy, and the
                            recipients are limited to using the information for the purpose for which
                            it was provided. We may disclose automatically collected and other
                            aggregate non-personally identifiable information with interested third
                            parties, to assist such parties in understanding the usage, viewing, and
                            demographic patterns for certain programs, content, services,
                            advertisements, promotions, and/or functionality on our Service.
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ol start={7}>
                        <li>
                            <u>Business Transfers</u>. If PAIBLOCK is acquired by or merged with
                            another entity, if substantially all our assets are transferred to another
                            company, or as part of a bankruptcy proceeding, PAIBLOCK may transfer the
                            information we have collected about you to the other company.
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ol start={8}>
                        <li>
                            <u>Log Data</u>. Whenever you use our Service, PAIBLOCK collects
                            information that your browser sends to us that is called Log Data. This
                            Log Data may include information such as your computer’s Internet Protocol
                            (“<strong>IP</strong>”) address, browser version, pages of our Services
                            that you visit, the time and date of your visit, the time spent on those
                            pages, and other statistics.
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ol start={9}>
                        <li>
                            <u>Cookies and Other Tracking Technologies.</u> PAIBLOCK, and third
                            parties we interact with use cookies, web beacons, local shared objects
                            (sometimes called flash cookies), and similar technology in connection
                            with your use of our Services and third-party websites (collectively
                            referred to in this policy as “<strong>Cookies</strong>”). Cookies are
                            small data files that may have unique identifiers, and reside, among other
                            places, on your computer or mobile device, in emails we send to you, and
                            on our Service. We may use Cookies to transmit information about you and
                            your use of our Service, such as your operating system, language
                            preferences, referring URLs, device name, country, and location. When we
                            use Cookies, we do so to further Services features and processes,
                            facilitate relevant advertising, and help learn more about how users
                            engage with our Service. Cookies may be persistent or stored only during
                            an individual session.
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ol start={10}>
                        <li>
                            <u>Information Security and Accuracy</u>. PAIBLOCK intend to protect your
                            personal information and to maintain its accuracy. We implement reasonable
                            physical, administrative, and technical safeguards to help us protect your
                            personal information from unauthorized access, use and disclosure. For
                            example, we encrypt certain sensitive personal information such as credit
                            card information when we transmit such information over the Internet. We
                            also require that our suppliers protect such information from unauthorized
                            access, use and disclosure.
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ol start={11}>
                        <li>
                            <u>Retention Period</u>. PAIBLOCK will not retain personal information
                            longer than necessary to fulfill the purposes for which it is processed,
                            including the security of our processing complying with legal and
                            regulatory obligations (e.g. audit, accounting, and statutory retention
                            terms), handling disputes, and for the establishment, exercise or defense
                            of legal claims in the countries where we do business. If you wish to
                            cancel your account or request that we no longer use your personal
                            information to provide the Services to you, please contact us as set forth
                            below, in Section 16, Contact Details. However, if you withdraw consent or
                            otherwise object to our collection, use and disclosure of your personal
                            information, you may not be able to use the Services. Further, to the
                            extent permitted by applicable law, we will retain and use your personal
                            information as necessary to comply with our legal obligations, resolve
                            disputes, maintain appropriate business records, and enforce our
                            agreements.&nbsp;
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ol start={12}>
                        <li>
                            <u>Links to Other Sites</u>. Our Services contain links to other sites
                            that are not controlled by PAIBLOCK. Please be aware that we are not
                            responsible for the privacy practices of such other sites. We encourage
                            you to be aware when you leave our Services and read the privacy policies
                            of each site you visit. This privacy policy applies only to information
                            collected by our Services.
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ol start={13}>
                        <li>
                            <u>Notice</u>. By use of our Service, you consent to receive electronic
                            communications from PAIBLOCK. You also agree that any such communications
                            satisfy any legal requirement to make such communications in writing under
                            this Policy or under any applicable laws or regulations. Specifically, we
                            may provide notice to you by sending an email to the address that you
                            provided as part of your registration for our Services. Any notice to
                            PAIBLOCK will be provided by both (a) send via an email to{" "}
                            <a href="mailto:privacy@evig.world">privacy@paiblock.app</a> and (b)
                            providing a copy by certified mail, return receipt requested to: Paiblock
                            A/S., Engager 2 - 4 2605 Brondby, Denmark, ATTN: Legal.
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ol start={14}>
                        <li>
                            Governing Law &amp; Venue. This Agreement shall be governed in all
                            respects by the laws of Glostrup shall be the exclusive forum for any
                            mediation, arbitration, litigation, or dispute resolution.
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ol start={15}>
                        <li>
                            Contact Details. If you have any questions, complaints or comments
                            regarding our Policy or practices, please submit a request by emailing{" "}
                            <a href="mailto:privacy@evig.world">privacy@paiblock.app</a> or by postal
                            mail at Paiblock A/S., Engager 2 - 4 2605 Brondby, Denmark, Attention:
                            Privacy.&nbsp;&nbsp;
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ol start={16}>
                        <li>
                            Right to Change Terms. We reserve the right at any time, with or without
                            cause, to (a) change the terms and conditions of this Policy; (b) change
                            our Services, including eliminating or discontinuing any feature of our
                            Service; or (c) deny or terminate your use of and/or access to our
                            Service. Any changes we make will be effective immediately upon our making
                            such changes available on our Service, with or without additional notice
                            to you. You agree that your continued use of our Services after such
                            changes constitutes your acceptance of such changes. You hereby
                            acknowledge that you have carefully read all the terms and conditions of
                            our Privacy Policy (which can be accessed at{" "}
                            <a href="https://kunstify.markets">https://kunstify.markets</a> and agree
                            to all such terms and conditions. Be sure to return to this page
                            periodically to ensure familiarity with the most current version of this
                            Agreement. If we make a material change to our Privacy Statement, we will
                            post a notice at the top of this page for 30 days. BY CONTINUING TO USE
                            OUR SERVICES AFTER SUCH REVISION TAKES EFFECT, WE CONSIDER THAT YOU HAVE
                            READ, UNDERSTOOD THE CHANGES AND AGREE TO BE BOUND BY THE MODIFIED PRIVACY
                            POLICY.
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ol start={17}>
                        <li>
                            California Residents. This section applies only to California consumers.
                            It describes how we collect, use, and share California consumers’ Personal
                            Information in our role as a business, and the rights applicable to such
                            residents. If you are unable to access this Privacy Policy due to a
                            disability or any physical or mental impairment, please contact us and we
                            will arrange to supply you with the information you need in an alternative
                            format that you can access. For purposes of this section “Personal
                            Information” has the meaning given in the California Consumer Privacy Act
                            (“CCPA”). We might collect the following statutory categories of Personal
                            Information:
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ul>
                        <li>
                            Personal Information: Your personal information includes all the data you
                            provide us with when you sign up for an account or enroll in our services,
                            including your name, email address, telephone number. If you make a
                            payment for services, your card information is not held by us, it is
                            collected by our third-party payment processors, who specialize in the
                            secure online capture and processing of card transactions.
                        </li>
                        <li>
                            Geolocation data, such as IP address. We collect this information from
                            your device.
                        </li>
                        <li />
                        <li>
                            Other personal information, for instance when you interact with us online,
                            by phone or mail in the context of receiving help through our help desks
                            or other support channels; participation in customer surveys or contests;
                            or in providing the Service.
                        </li>
                    </ul>
                    <p>&nbsp;</p>
                    <p>
                        As a California Resident, you have certain rights regarding the Personal
                        Information we collect or maintain about you. Please note these rights are
                        not absolute, and there may be cases when we decline your request as
                        permitted by law.
                    </p>
                    <p>&nbsp;</p>
                    <ul>
                        <li>
                            The right of access means that you have the right to request that we
                            disclose what Personal Information we have collected used and disclosed
                            about you in the past 12 months.
                        </li>
                        <li>
                            The right of deletion means that you have the right to request that we
                            delete Personal Information collected or maintained by us, subject to
                            certain exceptions.
                        </li>
                        <li>
                            The right to non-discrimination means that you will not receive any
                            discriminatory treatment when you exercise one of your privacy rights.
                        </li>
                    </ul>
                    <p>&nbsp;</p>
                    <p>
                        As a California Resident, you can exercise your rights yourself or you can
                        alternatively designate an authorized agent to exercise these rights on your
                        behalf. Please note that to protect your Personal Information, we will
                        verify your identity by a method appropriate to the type of request you are
                        making. We may also request that your authorized agent have written
                        permission from you to make requests on your behalf, and we may also need to
                        verify your authorized agent’s identity to protect your Personal
                        Information. Please use the contact details above if you would like to:
                    </p>
                    <p>&nbsp;</p>
                    <ul>
                        <li>Access this policy in an alternative format,</li>
                        <li>Exercise your rights,</li>
                        <li>Learn more about your rights or our privacy practices, or</li>
                        <li>Designate an authorized agent to make a request on your behalf.</li>
                    </ul>
                    <p>&nbsp;</p>
                    <ol start={18}>
                        <li>
                            European Union, UK, and similar jurisdictions. Subject to the conditions
                            set out in the applicable law, Users in in the European Union/European
                            Economic Area, and the United Kingdom (as well as in other jurisdictions
                            where similar rights apply) have the following rights regards our
                            processing of their personal information:
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ul>
                        <li>
                            Right of access: If you ask us, we will confirm whether we are processing
                            your personal information and, if necessary, provide you with a copy of
                            that personal information (along with certain other details).
                        </li>
                        <li>
                            Right to correction (rectification): If the personal information we hold
                            about you is inaccurate or incomplete, you are entitled to request to have
                            it corrected. If you are entitled to have information corrected and if we
                            have shared your personal information with others, we will let them know
                            about the rectification where possible.
                        </li>
                        <li>
                            Right to erasure: You can ask us to delete your personal information in
                            some circumstances, such as where we no longer need it or if you withdraw
                            your consent (where applicable). If you request that we delete your
                            personal information, we may do so by deleting your account(s) with us.
                        </li>
                        <li>
                            Right to restrict (block) processing: You can ask us to restrict the
                            processing of your personal information in certain circumstances, such as
                            where you contest the accuracy of that personal information, or you object
                            to our use or stated legal basis.
                        </li>
                        <li>
                            Right to data portability: You have the right, in certain circumstances,
                            to receive a copy of personal information we have obtained from you in a
                            structured, commonly used, and machine-readable format, and to reuse it
                            elsewhere or to ask us to transfer this to a third party of your choice.
                        </li>
                        <li>
                            Right to object: Where our processing is based on our legitimate
                            interests, we must stop such processing unless we have compelling
                            legitimate grounds that override your interest or where we need to process
                            it for the establishment, exercise, or defense of legal claims. Where we
                            are relying on our legitimate interests, we believe that we have a
                            compelling interest in such processing, but we will individually review
                            each request and related circumstances.
                        </li>
                        <li>
                            Right to object to marketing: You can ask us to stop processing your
                            personal information to the extent we do so based on our legitimate
                            interests for marketing purposes. If you do so, we will stop such
                            processing for our marketing purposes.
                        </li>
                        <li>
                            Right not to be subject to automated decision-making: You have the right
                            not to be subject to a decision when it is based on automatic processing
                            if it produces a legal effect or similarly significantly affects you
                            unless it is necessary for entering into or performing a contract between
                            us. PAIBLOCK does not engage in automated decision-making.
                        </li>
                        <li>
                            Right to withdraw your consent: In the event your personal information is
                            processed based on your consent, you have the right to withdraw consent at
                            any time, without affecting the lawfulness of processing based on consent
                            before its withdrawal.
                        </li>
                        <li>
                            Right to lodge a complaint: You also have the right to lodge a complaint
                            with a supervisory authority if you consider that our processing of your
                            personal information infringes the law.
                        </li>
                    </ul>
                    <p>&nbsp;</p>
                    <p>
                        Please note that some of these rights may be limited, such as where we have
                        an overriding interest or legal obligation to continue to process the data.
                        Please contact us using the information set out above, in Section 15.
                        Contact Details, if you wish to exercise any of your rights or if you have
                        any enquiries or complaints regarding the processing of your personal
                        information by us.
                    </p>
                    <p>&nbsp;</p>
                    <ol start={19}>
                        <li>
                            If any provision of this Policy is found to be unlawful, void, or for any
                            reason unenforceable, then that provision shall be deemed severable from
                            this Policy and shall not affect the validity and enforceability of any
                            remaining provisions.
                        </li>
                    </ol>
                    <p>&nbsp;</p>
                    <ol start={20}>
                        <li>
                            Entire Agreement. This Policy, along with the Terms of Use, constitute the
                            entire terms with respect to the relationship between PAIBLOCK and you and
                            supersedes all prior agreements, whether written or oral, concerning such
                            relationship. This Policy may not be changed, waived, or modified except
                            by PAIBLOCK as provided herein or otherwise by written instrument signed
                            by PAIBLOCK.
                        </li>
                    </ol>
                </>

            </section>

            <Footer />
        </>
    )
}

export default Privacy;