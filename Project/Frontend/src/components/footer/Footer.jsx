import React from 'react';
import './footer.css';

const Footer = () => {

    return (
        <div className="FooterContainer">
            <div className="footerLeft">
                <h2>Property Rental</h2>
                <p>This application is all about properties and rental management</p>
            </div>
            <div className="footerCenter">
                <h4>Nav Links</h4>
                <ul>
                    <li>Services</li>
                    <li>About</li>
                </ul>
            </div>
            <div className="footerRight">
                <h4>Contact</h4>
                <ul>
                    <li>Email: kalyan@test.com</li>
                    <li>Address:</li>
                    <li>Kansas city, United States of America</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;