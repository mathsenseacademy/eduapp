// src/components/StudentHeader/StudentHeader.jsx
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './StudentHeader.css';
import logo from '../../assets/logoWith_Name.svg';

export default function StudentHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('studentProfile');
    navigate('/login');
  };

  return (
    <header className="studentDashboardMain">
      {/* <div className="student-header__container">
        <Link to="/" className="student-header__logo">
          <img src={logo} alt="App Logo" />
        </Link>
        <nav className="student-header__nav">
          <Link to="/student/dashboard" className="student-header__link">Dashboard</Link>
          <Link to="/student/courses" className="student-header__link">My Courses</Link>
          <Link to="/student/profile" className="student-header__link">Profile</Link>
          <button onClick={handleLogout} className="student-header__logout">Logout</button>
        </nav>
      </div> */}

      <div className="logo" title="University Management System">
        <img src={logo} alt="" />
        <h2>U<span className="danger">M</span>S</h2>
      </div>
      <div className="sd_navbar">
        <NavLink to={'/student/dashboard'} className={({ isActive }) => isActive ? "active" : ""}>
          <span className="material-icons-sharp">dashboard</span>
          <h3>Home</h3>
        </NavLink>
        <NavLink to={'/student/time-table'} className={({ isActive }) => isActive ? "active" : ""}>
          <span className="material-icons-sharp">today</span>
          <h3>Time Table</h3>
        </NavLink>
        <NavLink to={'/student/examination'} className={({ isActive }) => isActive ? "active" : ""}>
          <span className="material-icons-sharp">grid_view</span>
          <h3>Examination</h3>
        </NavLink>
        <NavLink to={'/student/change-password'} className={({ isActive }) => isActive ? "active" : ""}>
          <span className="material-icons-sharp">password</span>
          <h3>Change Password</h3>
        </NavLink>

        {/* <a href="timetable.html" onclick="timeTableAll()">
          <span className="material-icons-sharp">today</span>
          <h3>Time Table</h3>
        </a> */}
        {/* <a href="#">
          <span className="material-icons-sharp" onclick="">logout</span>
          <h3>Logout</h3>
        </a> */}
      </div>
      <div id="profile-btn">
        <span className="material-icons-sharp">person</span>
      </div>
      <div className="theme-toggler">
        <span className="material-icons-sharp active">light_mode</span>
        <span className="material-icons-sharp">dark_mode</span>
      </div>
    </header>
  )
}
