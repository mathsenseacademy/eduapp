import React from 'react';
import './TestimonialSection.css';

const testimonials = [
  {
    name: 'Sarah M.',
    feedback: "My son used to struggle with math, but now he looks forward to every session. The tutors are fantastic!",
  },
  {
    name: 'Rajiv K.',
    feedback: "The personalized attention and fun format really helped my daughter improve her math skills. Highly recommend!",
  },
  {
    name: 'Anna T.',
    feedback: "We’ve tried other programs, but this one actually got my child excited about learning. A+ experience!",
  },
];

const TestimonialSection = () => {
  return (
    <section className="testimonials">
      <h2>What Parents Are Saying</h2>
      <div className="testimonial-grid">
        {testimonials.map((t, index) => (
          <div className="testimonial-card" key={index}>
            <p className="feedback">“{t.feedback}”</p>
            <p className="author">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
