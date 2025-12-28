
import React from 'react';
import './FeaturedArt.css';

const FeaturedArt = () => {
  return (
    <section className="featured section">
      <div className="container featured-container">
        <div className="featured-card-wrapper">
           <div className="featured-card">
              <div className="featured-image-placeholder"></div>
           </div>
        </div>
        <div className="featured-info">
          <h2>Bitcoin <br/> Art Work</h2>
          <p className="creator">Created by <span className="highlight-text">Jonathan Doe</span></p>
          
          <div className="bid-stats">
            <div className="current-bid">
              <p className="label">Current Bid</p>
              <h3>0.38 ETH</h3>
              <p className="usd-val">$1,452.22</p>
            </div>
            <div className="auction-end">
               <p className="label">Auction Ends In</p>
               <div className="timer">
                  <div className="time-box">
                    <span>18</span>
                    <small>Hrs</small>
                  </div>
                  <div className="time-box">
                    <span>37</span>
                    <small>Min</small>
                  </div>
                  <div className="time-box">
                    <span>14</span>
                    <small>Sec</small>
                  </div>
               </div>
            </div>
          </div>
          
          <button className="btn btn-primary">PLACE A BID</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArt;
