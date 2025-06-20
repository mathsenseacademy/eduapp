import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import brand1 from "../../assets/bookIcon.png";
import brand2 from "../../assets/bookIcon.png";
import brand3 from "../../assets/bookIcon.png";
import brand4 from "../../assets/bookIcon.png";
import logo from "../../assets/logoWithName.png"

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* 1. Brand Collabs */}
      <div className="brand-collabs">
        {[brand1, brand2, brand3, brand4].map((src, i) => (
          <img key={i} src={src} alt={`Brand ${i+1}`} />
        ))}
      </div>

<div class="container">
  


      {/* 2. Main Footer Content */}
      <div className="footer-main">
        {/* Newsletter */}
        <div className="newsletter">
          <img
            src={logo }
            alt="Math Senseacademy"
            className="footer-logo"
          />
          <p>Stay in the loop and sign up for the Wardiere newsletter:</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">→</button>
          </form>
        </div>

        {/* Links Columns */}
        <div className="footer-links">
          <div className="link-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/solutions">Solutions</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/team">Team</Link></li>
              <li><Link to="/career">Career</Link></li>
            </ul>
          </div>
          <div className="link-col">
            <h4>Documentation</h4>
            <ul>
              <li><Link to="/help">Help Centre</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="link-col">
            <h4>Social</h4>
            <ul>
              <li><a href="https://facebook.com">Facebook</a></li>
              <li><a href="https://instagram.com">Instagram</a></li>
              <li><a href="https://youtube.com">YouTube</a></li>
              <li><a href="https://twitter.com">Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
<hr/>
      {/* 3. Footer Bottom */}
      <div className="footer-bottom">
        <span>© Math Senseacadem. All Rights Reserved {new Date().getFullYear()}</span>
        <Link to="/terms">Terms &amp; Conditions</Link>
      </div>
      </div>
    </footer>
  );
}
