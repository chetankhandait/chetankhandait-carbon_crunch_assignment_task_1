
import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Rare Collections Of <span className="highlight">Art & NFT's</span>
          </h1>
          <p className="hero-subtitle">
            Digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, Sell, and discover exclusive digital assets.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <h3>22k+</h3>
              <p>Artworks</p>
            </div>
            <div className="stat-item">
              <h3>20k+</h3>
              <p>Auctions</p>
            </div>
            <div className="stat-item">
              <h3>10k+</h3>
              <p>Artists</p>
            </div>
          </div>
          <button className="btn btn-primary">EXPLORE</button>
        </div>
        <div className="hero-image">
          {/* Placeholder for floating cards */}
          <div className="card card-1">
             <div className="card-image-placeholder gradient-bg-1"></div>
             <div className="card-info">
                <h4>Abstract 3D</h4>
                <p>0.85 ETH</p>
             </div>
          </div>
          <div className="card card-2">
            <div className="card-image-placeholder gradient-bg-2"></div>
            <div className="card-info">
                <h4>Geometric</h4>
                <p>1.20 ETH</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
