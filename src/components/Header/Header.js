import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 👈 NEW
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const { t } = useTranslation(); // 👈 NEW

  return (
    <header className="header">
      <div className="logo">Math Senseacademy</div>

      <nav className={`nav ${isOpen ? 'open' : ''}`}>

        <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <button className="dropbtn">{t('courses')} ▾</button>
          <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
            <Link to="/courses/analytical-maths">{t('analytical')}</Link>
            <Link to="/courses/ml-python">{t('ml')}</Link>
            <Link to="/courses/olympiad">{t('olympiad')}</Link>
            <Link to="/courses/stats">{t('stats')}</Link>
            <Link to="/courses/algorithms">{t('algorithms')}</Link>
            <Link to="/courses/vedic-math">{t('vedic')}</Link>
            <Link to="/courses/3d-animation">{t('animation')}</Link>
          </div>
        </div>

        <Link to="/" onClick={() => setIsOpen(false)}>{t('home')}</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>{t('about')}</Link>
        <Link to="/experts" onClick={() => setIsOpen(false)}>{t('experts')}</Link>
        <Link to="/blog" onClick={() => setIsOpen(false)}>{t('blog')}</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>{t('contact')}</Link>
      </nav>

      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
};

export default Header;
