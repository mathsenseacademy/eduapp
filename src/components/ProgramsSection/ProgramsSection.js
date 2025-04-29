import React from 'react';
import './ProgramsSection.css';

const programs = [
  {
    title: 'Grade 1–3 Math',
    description: 'Foundations in addition, subtraction, and number sense.',
    image: 'https://via.placeholder.com/300x200', // replace with real images
  },
  {
    title: 'Grade 4–6 Math',
    description: 'Multi-digit multiplication, division, and early algebra.',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    title: 'Grade 7–8 Math',
    description: 'Pre-Algebra and Geometry essentials.',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    title: 'High School Math',
    description: 'Algebra, Geometry, and SAT/ACT prep.',
    image: 'https://via.placeholder.com/300x200',
  },
];

const ProgramsSection = () => {
  return (
    <section className="programs" id="programs">
      <h2>Explore Our Programs</h2>
      <div className="programs-grid">
        {programs.map((program, index) => (
          <div className="program-card" key={index}>
            <img src={program.image} alt={program.title} />
            <div className="program-info">
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <a href="#contact" className="enroll-btn">Enroll Now</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramsSection;
