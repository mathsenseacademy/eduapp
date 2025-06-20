import React from "react";
import "./ContactCTA.css";
import { Link } from "react-router-dom";

const ContactCTA = () => (
  <section className="contact-cta">
    <h2 className="cta-headline">Ready to Empower Your Child’s Math Journey?</h2>
    <p className="cta-sub">Contact us today or explore our programs to get started.</p>

    <div className="cta-buttons">
      <Link to="/contact"  className="btn btn-fill wobble">Contact Us</Link>
      <Link to="/courses"  className="btn btn-outline wobble">View Programs</Link>
    </div>
  </section>
);

export default ContactCTA;
