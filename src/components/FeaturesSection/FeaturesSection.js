import React from 'react';
import './FeaturesSection.css';

const features = [
  {
    title: 'Expert Tutors',
    description: 'All our instructors are math experts with years of experience.',
    icon: '🎓',
  },
  {
    title: 'Interactive Classes',
    description: 'Fun, engaging sessions that keep kids excited about learning.',
    icon: '📚',
  },
  {
    title: 'Flexible Scheduling',
    description: 'Weekend and evening classes available to fit your schedule.',
    icon: '🕒',
  },
  {
    title: 'Personalized Learning',
    description: 'Courses designed to meet each student’s unique needs.',
    icon: '📈',
  },
];

const FeaturesSection = () => {
  return (
    <section className="features">
      <h2>Why Choose Math Senseacademy?</h2>
      <div className="features-grid">
        {features.map((feature, idx) => (
          <div key={idx} className="feature-card">
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
