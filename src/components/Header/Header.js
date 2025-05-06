import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../api/api';
import './Header.css';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLoginToggle = () => setShowLogin(!showLogin);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('administrator/login/', {
        username,
        password,
      });
      console.log('Login success:', response.data);
      setShowLogin(false);
      setLoginError(null);
    } catch (error) {
      setLoginError('Login failed. Check your credentials.');
      console.error(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top px-3">
      <div className="container-fluid">

        {/* Left: Logo + Courses */}
        <div className="d-flex align-items-center gap-3">
          <span className="navbar-brand fw-bold logo mb-0">Math Senseacademy</span>
          <div className="nav-item dropdown">
            <button className="btn btn-outline-danger dropdown-toggle" onClick={toggleDropdown}>
              {t('courses')}
            </button>
            <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
              <li><Link to="/courses/analytical-maths" className="dropdown-item">{t('analytical')}</Link></li>
              <li><Link to="/courses/ml-python" className="dropdown-item">{t('ml')}</Link></li>
              <li><Link to="/courses/olympiad" className="dropdown-item">{t('olympiad')}</Link></li>
              <li><Link to="/courses/stats" className="dropdown-item">{t('stats')}</Link></li>
              <li><Link to="/courses/algorithms" className="dropdown-item">{t('algorithms')}</Link></li>
              <li><Link to="/courses/vedic-math" className="dropdown-item">{t('vedic')}</Link></li>
              <li><Link to="/courses/3d-animation" className="dropdown-item">{t('animation')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Hamburger toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Center + Right: Nav links + Login in collapsible area */}
        <div className="collapse navbar-collapse justify-content-end mt-3 mt-lg-0" id="mainNav">
          <ul className="navbar-nav align-items-center gap-3 mb-2 mb-lg-0">
            <li className="nav-item"><Link to="/" className="nav-link">{t('home')}</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link">{t('about')}</Link></li>
            <li className="nav-item"><Link to="/experts" className="nav-link">{t('experts')}</Link></li>
            <li className="nav-item"><Link to="/blog" className="nav-link">{t('blog')}</Link></li>
            <li className="nav-item"><Link to="/contact" className="nav-link">{t('contact')}</Link></li>
          </ul>

          <div className="position-relative mt-2 mt-lg-0">
            <button className="btn btn-outline-primary" onClick={handleLoginToggle}>{t('login')}</button>
            {showLogin && (
              <form onSubmit={handleLogin} className="login-form p-3 border bg-white shadow rounded position-absolute end-0 mt-2">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary w-100">Login</button>
                {loginError && <p className="text-danger mt-2">{loginError}</p>}
                <p className="register-link mt-2 text-center">
                  Don't have an account?{' '}
                  <span onClick={() => navigate('/register')} className="text-primary" style={{ cursor: 'pointer' }}>
                    Register
                  </span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
