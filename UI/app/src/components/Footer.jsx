
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-logo">
           <h3>NFTme</h3>
        </div>
        <div className="footer-links">
           <a href="#explore">Explore</a>
           <a href="#marketplace">Marketplace</a>
           <a href="#artist">Artist</a>
           <a href="#contact">Contact</a>
        </div>
        <div className="footer-social">
           <div className="social-icon"></div>
           <div className="social-icon"></div>
           <div className="social-icon"></div>
        </div>
      </div>
      <div className="footer-bottom container">
         <p>Privacy Policy | Copyright @ 2023 NFTme. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
