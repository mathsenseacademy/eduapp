import React from 'react';
import './AboutSection.css';
import aboutImg from '../../assets/aboutUs.png'; // Replace with actual image

const AboutSection = () => {
  return (
    <section className="about">
      <div className="about-image">
        <img src={aboutImg} alt="About Math Senseacademy" />
      </div>
      <div className="about-content">
        <h2>About Math Senseacademy</h2>
        <p>
          Math Senseacademy for Kids is dedicated to transforming the way children learn math. Our interactive programs are
          designed to boost confidence, sharpen problem-solving skills, and spark curiosity in young minds.
        </p>
        <p>
          We offer personalized learning paths, experienced educators, and an engaging online platform that makes math
          fun and accessible for students from Grade 1 through Grade 10.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
