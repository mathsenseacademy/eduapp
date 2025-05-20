import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="math-loader-wrapper">
      <div className="math-loader">
        <span>π</span>
        <span>√</span>
        <span>Σ</span>
        <span>∞</span>
      </div>
      <p className="loader-text">Loading Math Senseacademy...</p>
    </div>
  );
};

export default Loader;
