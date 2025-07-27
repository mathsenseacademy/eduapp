import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './StudentHeader.css';
import logo from '../../assets/logoWith_Name.svg';

export default function StudentHeader() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('studentProfile');
    navigate('/login');
  };

  return (
    <header className="studentDashboardMain student-header" style={{ zIndex: 2000 }}>
      {/* Logo */}
      <div className="logo" title="University Management System">
        <Link to="/" className="student-header__logo">
          <img src={logo} alt="App Logo" />
        </Link>
      </div>

      {/* Navigation */}
      <div className="sd_navbar">
        <NavLink to="/student/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
          <span className="material-icons-sharp">dashboard</span>
          <h3>Home</h3>
        </NavLink>
        <NavLink to="/student/time-table" className={({ isActive }) => isActive ? "active" : ""}>
          <span className="material-icons-sharp">today</span>
          <h3>Time Table</h3>
        </NavLink>
        <NavLink to="/student/examination" className={({ isActive }) => isActive ? "active" : ""}>
          <span className="material-icons-sharp">grid_view</span>
          <h3>Examination</h3>
        </NavLink>
        <NavLink to="/student/change-password" className={({ isActive }) => isActive ? "active" : ""}>
          <span className="material-icons-sharp">password</span>
          <h3>Change Password</h3>
        </NavLink>
      </div>

      {/* Right Side Controls */}
      <div className="header-right">
        {/* Profile Button */}
        <button id="profile-btn" title="Profile">
          <span className="material-icons-sharp">person</span>
        </button>

        {/* Theme Toggle */}
        <div className="theme-toggler" onClick={toggleTheme}>
          <span className={`material-icons-sharp ${!darkMode ? "active" : ""}`}>light_mode</span>
          <span className={`material-icons-sharp ${darkMode ? "active" : ""}`}>dark_mode</span>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-btn" title="Logout">
          <span className="material-icons-sharp">logout</span>
        </button>
      </div>
    </header>
  );
}
