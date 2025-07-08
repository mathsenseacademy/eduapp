// src/pages/Login.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api/api";
import "./Login.css";

export default function Login() {
  // Admin credentials
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  // Student credentials
  const [studentEmail, setStudentEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [isAdminLogin, setIsAdminLogin] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (formRef.current && !formRef.current.contains(e.target)) {
        // optional: click outside
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isAdminLogin) {
      // Admin login with username & password
      try {
        const { data } = await api.post("administrator/login/", {
          username: adminUsername,
          password: adminPassword,
        });
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("userType", "admin");
        jwtDecode(data.access);
        navigate("/admin");
      } catch {
        setError("Admin login failed. Check your credentials.");
      } finally {
        setLoading(false);
      }
    } else {
      // Student OTP flow
      if (!isOtpSent) {
        try {
          await api.post("student/request_student_login_otp/", {
            email: studentEmail,
          });
          setIsOtpSent(true);
        } catch {
          setError("Unable to send OTP. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const { data } = await api.post(
            "student/verify_student_login_otp/",
            { email: studentEmail, otp }
          );

          // tokens
          localStorage.setItem("accessToken", data.access);
          localStorage.setItem("refreshToken", data.refresh);
          localStorage.setItem("userType", "student");

          // store student profile
          const {
            student_id,
            first_name,
            middle_name,
            last_name,
            date_of_birth,
            contact_number_1,
            student_class,
            school_or_college_name,
            email: studentEmailResponse,
          } = data;
          const profile = {
            student_id,
            first_name,
            middle_name,
            last_name,
            date_of_birth,
            contact_number_1,
            student_class,
            school_or_college_name,
            email: studentEmailResponse,
          };
          localStorage.setItem("studentProfile", JSON.stringify(profile));

          navigate("/student/dashboard");
        } catch {
          setError("OTP verification failed. Please check and try again.");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="login-page">
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>

      <form ref={formRef} onSubmit={handleSubmit} className="login-form">
        <h2>{isAdminLogin ? "Teacher Login" : "Student Login"}</h2>

        {isAdminLogin ? (
          // Admin inputs
          <>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Username"
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
            />
          </>
        ) : (
          // Student inputs
          <>
            {!isOtpSent && (
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                required
              />
            )}
            {isOtpSent && (
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            )}
          </>
        )}

        {/* Mode toggle before OTP */}
        {(isAdminLogin || !isOtpSent) && (
          <div className="form-check mb-3">
            <input
              id="adminCheck"
              className="form-check-input"
              type="checkbox"
              checked={isAdminLogin}
              onChange={(e) => {
                setIsAdminLogin(e.target.checked);
                setIsOtpSent(false);
                setOtp("");
                setError(null);
              }}
            />
            <label htmlFor="adminCheck" className="form-check-label">
              Login as Teacher
            </label>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : isAdminLogin
            ? "Sign in"
            : isOtpSent
            ? "Verify OTP"
            : "Send OTP"}
        </button>

        {error && <p className="text-danger mt-2">{error}</p>}

        {isAdminLogin && (
          <p className="mt-3 text-center">
            Don’t have an account?{' '}
            <span
              className="link-like"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        )}
      </form>
    </div>
  );
}
