import React from 'react';
import './Hero.css';
import heroImg from '../../assets/img1.png'; // Replace with actual image

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Unlock Your Child's Math Potential</h1>
        <p>Engaging, expert-led online math programs for kids from Grade 1 to Grade 10.</p>
        <a href="#programs" className="hero-btn">Explore Programs</a>
      </div>
      <div className="hero-image">
        <img src={heroImg} alt="Happy kid learning math" />
      </div>
    </section>
  );
};

export default Hero;
