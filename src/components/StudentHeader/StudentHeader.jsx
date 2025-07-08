// src/components/StudentHeader/StudentHeader.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <header className="student-header">
      <div className="student-header__container">
        <Link to="/" className="student-header__logo">
          <img src={logo} alt="App Logo" />
        </Link>
        <nav className="student-header__nav">
          <Link to="/student/dashboard" className="student-header__link">Dashboard</Link>
          <Link to="/student/courses" className="student-header__link">My Courses</Link>
          <Link to="/student/profile" className="student-header__link">Profile</Link>
          <button onClick={handleLogout} className="student-header__logout">Logout</button>
        </nav>
      </div>
    </header>)
}
