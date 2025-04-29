import React from 'react';
import './ContactCTA.css';
import { Link } from 'react-router-dom';

const ContactCTA = () => {
  return (
    <section className="contact-cta">
      <h2>Ready to Empower Your Child's Math Journey?</h2>
      <p>Contact us today or explore our programs to get started.</p>
      <div className="cta-buttons">
        <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        <Link to="/courses" className="btn btn-outline">View Programs</Link>
      </div>
    </section>
  );
};

export default ContactCTA;
