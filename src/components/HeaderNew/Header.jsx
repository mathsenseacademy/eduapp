
import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [showStickyRegister, setShowStickyRegister] = useState(false);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");

    const handleScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add("sticky-shadow");
      } else {
        navbar.classList.remove("sticky-shadow");
      }

      setShowStickyRegister(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar fixed-top px-3">
      <div className="container-fluid">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <h1>Sticky Header</h1>
      </div>
      {showStickyRegister && (
        <button className="sticky-register-btn">Register Now</button>
      )}
    </nav>
  );
};

export default Header;
