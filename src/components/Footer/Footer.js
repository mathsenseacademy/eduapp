import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Column 1: Logo/Title */}
        <div className="footer-section">
          <h3>Math Senseacademy</h3>
          <p>Inspiring young minds to love and master math through expert-led online programs.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/experts">Our Experts</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@mathsenseacademy.com</p>
          <p>Phone: +91 9062428472 </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Math Senseacademy for Kids. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
