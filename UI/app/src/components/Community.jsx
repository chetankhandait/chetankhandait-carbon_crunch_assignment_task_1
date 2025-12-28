
import React from 'react';
import './Community.css';

const Community = () => {
  return (
    <section id="community" className="community section">
      <div className="container community-container">
        <div className="community-image">
           <div className="wave-placeholder"></div>
        </div>
        <div className="community-content">
          <h2>Join The Community <br /> And Get The Best <br/> NFT Collection</h2>
          <p>Meet the company team, artists, and collectors for platform updates, announcements, and more...</p>
          <button className="btn btn-primary">JOIN COMMUNITY</button>
        </div>
      </div>
    </section>
  );
};

export default Community;
