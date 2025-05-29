// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/api";
import "./Register.css";
import Loader from "../components/Loader/DataLoader";

const Register = () => {
  /* ---------- detect “session expired” --------------------------- */
  const { state, search } = useLocation();
  const expiredViaState  = state?.expired;
  const expiredViaQuery  = new URLSearchParams(search).get("expired") === "1";
  const expired          = expiredViaState || expiredViaQuery;

  /* ---------- form state ---------------------------------------- */
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error,   setError]   = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ---------- handlers ------------------------------------------ */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("administrator/register/", formData);
      navigate("/"); // or '/login' if that’s where you want to land next
    } catch (err) {
      setError("Registration failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- JSX ------------------------------------------------ */
  return (
    <div className="register-page">
      {/* ✱ Banner shown only when token has expired */}
      {expired && (
        <div className="session-expired-alert">
          <p>Your session has expired.</p>
          <button onClick={() => window.location.reload()}>
            Log in again
          </button>
        </div>
      )}

      <h2>Register</h2>

      {loading ? (
        <Loader size={56} />
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>

          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Register;
