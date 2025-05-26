// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import './Register.css';
import Loader from "../components/Loader/DataLoader";

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true);   
    try {
      await api.post('administrator/register/', formData);
      navigate('/'); // Redirect to home or login after successful registration
    } catch (err) {
      setError('Registration failed. Try again.');
      console.error(err);
    }
    finally {
      setLoading(false);                          
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      {loading ? (                               
        <Loader size={56} />
      ) : (
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
       )}
    </div>
  );
};

export default Register;
