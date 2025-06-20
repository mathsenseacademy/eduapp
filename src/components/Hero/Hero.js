import React from "react";
import "./Hero.css";
import heroImage from "../../assets/hero-1.png"; 
import logo from "../../assets/logoWithName.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="custom-hero">
      <div className="hero-container">
        {/* Left content */}
        <div className="hero-left">
          <img src={logo} alt="Mathsense Logo" className="hero-logo" />
          <h1>Unlock Your Child's Math Potential</h1>
          <p>Engaging, expert-led online math programs for kids from Grade</p>
          <button onClick={() => navigate("/student/register")}>
            REGISTER STUDENT
          </button>
        </div>

        {/* Right image */}
       <div className="hero-right">
  <div className="hero-image-wrapper">
    <img src={heroImage} alt="Hero kids" className="hero-main-img" />
  </div>
</div>
      </div>
    </section>
  );
};

export default Hero;
