import React from 'react';
import './ExpertSection.css';

const experts = [
  {
    name: 'Ms. Olivia James',
    qualification: 'M.Sc. in Mathematics, 10+ Years Teaching',
    image: 'https://via.placeholder.com/200x200?text=Olivia',
  },
  {
    name: 'Mr. Ravi Patel',
    qualification: 'B.Ed, Math Olympiad Coach',
    image: 'https://via.placeholder.com/200x200?text=Ravi',
  },
  {
    name: 'Dr. Lisa Chen',
    qualification: 'Ph.D. in Math Education',
    image: 'https://via.placeholder.com/200x200?text=Lisa',
  },
];

const ExpertSection = () => {
  return (
    <section className="experts">
      <h2>Meet Our Experts</h2>
      <div className="expert-grid">
        {experts.map((expert, idx) => (
          <div className="expert-card" key={idx}>
            <img src={expert.image} alt={expert.name} className="expert-img" />
            <h3>{expert.name}</h3>
            <p>{expert.qualification}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpertSection;
