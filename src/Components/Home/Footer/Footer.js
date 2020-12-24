import React from 'react';
import './Footer.css';
import footerLogo from '../../../hot-onion-restaurent-resources/logo.png';
import Subscribe from './Subscribe/Subscribe';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer_top_part container'>
                <div className="col-md-5 col-lg-6 col-sm-12">
                   <div className='d-flex justify-content-start'>
                        <img className='footerLogo' src={footerLogo} alt=""/>
                   </div>
                    <Subscribe/>
                </div>
                <div className="col-md-7 col-lg-6">
                    <div className='footer_nav_link_container'>
                        <div className='col-md-6 col-lg-6 col-sm-12'>
                            <ul className='footer_top_link'>
                                <li><a href="#">About online food</a></li>
                                <li><a href="#">Read our Blog</a></li>
                                <li><a href="#">Sign up to deliver</a></li>
                                <li><a href="#">Add your restaurant</a></li>
                            </ul>
                        </div>
                        <div className='col-md-6 col-lg-6 col-sm-12'>
                            <ul className='footer_top_link'>
                                <li><a href="#">Get help</a></li>
                                <li><a href="#">Read FAQs</a></li>
                                <li><a href="#">View all cities</a></li>
                                <li><a href="#">Restaurant near me</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer_bottom_part container'>
                <div className='copyright'>
                    <p>Copyright © 2020 Red Onion</p>
                </div>
                <div className='footer_bottom_link'>
                    <a href="#">Privacy policy</a>
                    <a href="#">Terms of use</a>
                    <a href="#">Pricing</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;