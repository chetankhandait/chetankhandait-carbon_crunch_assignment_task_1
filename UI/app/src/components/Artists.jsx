
import React from 'react';
import './Artists.css';

const Artists = () => {
  const artists = [
    { name: 'Osvaldo', handle: '@osvaldo', img: 'https://i.pravatar.cc/150?u=a' },
    { name: 'Sebastian', handle: '@sebastian', img: 'https://i.pravatar.cc/150?u=b' },
    { name: 'Abraham', handle: '@abraham', img: 'https://i.pravatar.cc/150?u=c' },
    { name: 'Cristio', handle: '@cristio', img: 'https://i.pravatar.cc/150?u=d' },
  ];

  return (
    <section id="artist" className="artists section">
      <div className="container">
        <div className="section-header">
           <h2>Popular Artists</h2>
           <button className="btn btn-outline-sm">Explore All ↗</button>
        </div>
        <div className="artists-grid">
           {artists.map((artist, i) => (
             <div className="artist-card" key={i}>
                <div className="artist-img-wrapper">
                    <img src={artist.img} alt={artist.name} />
                    <div className="verified-badge">✓</div>
                </div>
                <h4>{artist.name}</h4>
                <p>{artist.handle}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Artists;
