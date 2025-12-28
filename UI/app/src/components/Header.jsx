
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <div className="logo-icon"></div>
          <span>NFTme</span>
        </div>
        <nav className="nav-menu">
          <a href="#explore" className="nav-link">Explore</a>
          <a href="#marketplace" className="nav-link">Marketplace</a>
          <a href="#artist" className="nav-link">Artist</a>
          <a href="#community" className="nav-link">Community</a>
        </nav>
        <button className="btn btn-connect">Connect Wallet</button>
      </div>
    </header>
  );
};

export default Header;
