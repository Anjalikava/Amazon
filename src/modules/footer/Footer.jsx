import React from 'react';
import amazonLogo from '../../../public/images/amazonLogo.png';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <div>
                    <h3 className="footer-title">Get to Know Us</h3>
                    <ul className="footer-list">
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Press Releases</li>
                        <li>Amazon Science</li>
                    </ul>
                </div>
                <div>
                    <h3 className="footer-title">Connect with Us</h3>
                    <ul className="footer-list">
                        <li>Instagram</li>
                        <li>Twitter</li>
                        <li>Facebook</li>
                    </ul>
                </div>
                <div>
                    <h3 className="footer-title">Make Money with Us</h3>
                    <ul className="footer-list">
                        <li>Sell on Amazon</li>
                        <li>Affiliate Program</li>
                        <li>Advertise Your Products</li>
                        <li>Amazon Pay</li>
                    </ul>
                </div>
                <div>
                    <h3 className="footer-title">Let Us Help You</h3>
                    <ul className="footer-list">
                        <li>COVID-19 and Amazon</li>
                        <li>Your Account</li>
                        <li>Returns Centre</li>
                        <li>Help</li>
                    </ul>
                </div>
            </div>
            <div className="footer-logo">
                <img src={amazonLogo} alt="Amazon Logo" className="logo-image" />
            </div>
        </div>
    );
};

export default Footer;
