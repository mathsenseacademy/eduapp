// src/pages/Login.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode }    from "jwt-decode";
import api              from "../api/api";
import "./Login.css"; // create styles for your login page

export default function Login() {
  const [username, setUsername]     = useState("");
  const [password, setPassword]     = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(true);
  const [error, setError]           = useState(null);
  const navigate                    = useNavigate();
  const formRef                     = useRef(null);

  // close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (formRef.current && !formRef.current.contains(e.target)) {
        // optional: navigate back if clicked outside
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isAdminLogin
      ? "administrator/login/"
      : "student/login/";
    const redirectTo = isAdminLogin
      ? "/admin"
      : "/student/dashboard";

    try {
      const { data } = await api.post(endpoint, { username, password });
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("userType", isAdminLogin ? "admin" : "student");
      if (isAdminLogin) jwtDecode(data.access); // populate context if needed
      navigate(redirectTo);
    } catch {
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="login-page">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="login-form"
      >
        <h2>Login</h2>

        <input
          type="text"
          className="form-control  mb-3"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        {/* only show password when “Login as Teacher” is checked */}
      {isAdminLogin && (
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      )}

        <div className="form-check mb-3">
          <input
            id="adminCheck"
            className="form-check-input"
            type="checkbox"
            checked={isAdminLogin}
            onChange={e => setIsAdminLogin(e.target.checked)}
          />
          <label htmlFor="adminCheck" className="form-check-label">
            Login as Teacher
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Sign in
        </button>

        {error && <p className="text-danger mt-2">{error}</p>}

        <p className="mt-3 text-center">
          Don’t have an account?{" "}
          <span
            className="link-like"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
