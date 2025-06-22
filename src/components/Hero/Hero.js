// src/components/Hero/Hero.jsx
import React, { useState } from "react";
import StudentRegister from "../../pages/StudentRegister";
import "./Hero.css";
import heroImage from "../../assets/hero-1.png"; 
import logo from "../../assets/logoWith_Name.svg";

const Hero = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <section className="custom-hero">
      <div className="hero-container">
        {/* Left content */}
        <div className="hero-left">
          <img src={logo} alt="Mathsense Logo" className="hero-logo" />
          <h1>Unlock Your Child's Math Potential</h1>
          <p>Engaging, expert-led online math programs for kids from Grade</p>
          <button className="btn-register" onClick={() => setShowRegisterModal(true)}>
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

      {/* Student Registration Modal */}
      {showRegisterModal && (
        <StudentRegister onClose={() => setShowRegisterModal(false)} />
      )}
    </section>
  );
};

export default Hero;
