
import React from 'react';
import './Gallery.css';

const Gallery = () => {
  const items = [
    { id: 1, title: 'Abstract 3D', price: '3.2 ETH', color: '#fbbf24', creator: ' @jessica' },
    { id: 2, title: 'Javier Miranda', price: '2.4 ETH', color: '#a855f7', creator: ' @javier' },
    { id: 3, title: 'Milad Fakurian', price: '2.2 ETH', color: '#ec4899', creator: ' @milad' },
    { id: 4, title: 'Space Head', price: '1.8 ETH', color: '#60a5fa', creator: ' @space' },
  ];

  return (
    <section id="marketplace" className="gallery section">
      <div className="container">
        <div className="gallery-header">
           <div>
             <h2>Trending This Week</h2>
             <p className="subtitle">Various kinds of Art that is trending the trend will be reset every week.</p>
           </div>
           
           <div className="filter-tabs">
             <button className="tab active">Art</button>
             <button className="tab">Music</button>
             <button className="tab">Collectibles</button>
             <button className="tab">Utility</button>
           </div>
        </div>
        <div className="gallery-grid">
          {items.map((item, index) => (
            <div key={item.id} className={`gallery-item item-${index + 1}`}>
              <div className="gallery-image-placeholder" style={{ backgroundColor: item.color }}></div>
              <div className="gallery-info">
                <div>
                   <h4>{item.title}</h4>
                   <p className="item-creator">{item.creator}</p>
                </div>
                <div className="price-tag">
                   <p>{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="load-more-container">
           <button className="btn btn-outline-sm">Load More</button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
