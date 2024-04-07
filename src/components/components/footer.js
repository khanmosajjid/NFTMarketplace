import React from 'react';
import { Link } from '@reach/router';
import logo1 from "./../../assets/images/logo1.png";
const footer= () => (
  <footer className="footer-light">
            <div className="container">
                <div className="row">
                    <div className='col-md-8'>
                        <div className='row'>
                            <div className="col-md-4 col-sm-6 col-xs-1">
                                <div className="widget">
                                    <h5 className='font_24 text-dark NunitoBold'>Marketplace</h5>
                                    <ul>
                                        <li><a href="/explore">All NFTs</a></li>
                                        {/* <li><Link to="">Art</Link></li> */}
                                        {/* <li><Link to="">Music</Link></li> */}
                                        {/* <li><Link to="">Domain Names</Link></li> */}
                                        {/* <li><Link to="">Virtual World</Link></li> */}
                                        <li><a href="/exploreCollections">Collectibles</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-1">
                                <div className="widget">
                                    <h5 className='font_24 text-dark NunitoBold'>Resources</h5>
                                    <ul>
                                        {/* <li><Link to="">About Us</Link></li> */}
                                        {/* <li><Link to="">Privacy Policy</Link></li> */}
                                        <li><Link to="">Suggestions</Link></li>
                                        {/* <li><Link to="">Terms & Conditions</Link></li> */}
                                        <li><Link to="">Docs</Link></li>
                                        <li><Link to="">Newsletter</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-1">
                                <div className="widget">
                                    <h5 className='font_24 text-dark NunitoBold'>Kunstify</h5>
                                    <ul>
                                        <li><a href="/about-us">About us</a></li>
                                        <li><a href="/fee">Fees</a></li>
                                        <li><a href="/terms">Terms</a></li>
                                        <li><a href="/privacy">Privacy Policy</a></li>
                                        <li><a href="/risk">Risk Notification</a></li>
                                        {/* <li><Link to="">Mailing List</Link></li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5 className='font_24 text-dark NunitoBold'>Newsletter</h5>
                            <p className='font_24 text-dark NunitoLight'>Signup for our newsletter to get the latest news in your inbox.</p>
                            <form action="#" className="row form-dark" id="form_subscribe" method="post" name="form_subscribe">
                                <div className="col text-center">
                                    <input className="form-control" id="txt_subscribe" name="txt_subscribe" placeholder="Enter your email" type="text" /> 
                                    <button type="button" id="btn-subscribe">
                                      <i className="arrow_right bg-color-secondary"></i>
                                    </button>
                                    <div className="clearfix"></div>
                                </div>
                            </form>
                            {/* <div className="spacer-10"></div> */}
                            <p className='font_24 text-dark NunitoLight mt-5'>Your email is safe with us. We don't spam.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="subfooter">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="de-flex">
                                <div className="de-flex-col">
                                    <span onClick={()=> window.open("", "_self")}>
                                        <img alt="" className="f-logo d-1" style={{width:"80px",height:"60px"}} src={logo1} />
                                        <img alt="" className="f-logo d-3" src={logo1} />
                                        <span className="copy">&copy; Copyright 2024 - Kunstify NFT Marketplace</span>
                                    </span>
                                </div>
                                <div className="de-flex-col">
                                    <div className="social-icons">
                                        <span onClick={()=> window.open("https://www.facebook.com/paiblock/", "_self")}><i className="fa fa-facebook fa-lg"></i></span>
                                        <span onClick={()=> window.open("https://www.instagram.com/paiblockapp/", "_self")}><i className="fa fa-instagram fa-lg"></i></span>
                                        <span onClick={()=> window.open("https://www.linkedin.com/company/paiblock", "_self")}><i className="fa fa-linkedin fa-lg"></i></span>
                                        <span onClick={()=> window.open("https://www.pinterest.com/paiblock/", "_self")}><i className="fa fa-pinterest fa-lg"></i></span>
                                        <span onClick={()=> window.open("https://www.youtube.com/channel/UCEd4VIc8MOL4VdZy8U70hFQ", "_self")}><i className="fa fa-youtube fa-lg"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
);
export default footer;