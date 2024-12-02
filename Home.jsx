import React from 'react';
import './Home.css';


const Home = () => {
  return (
    <div className="home-container">
      
      <div className="text-section">
        <h1>FRESH GROCERIES AT YOUR DOORSTEPS</h1>
      </div>

      <div className="image-section">
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/hungryroot-1658507018.png"
          alt="Fresh Groceries"
          className="groceries-image"
        />
      </div>
    </div>
  );
};

export default Home;
