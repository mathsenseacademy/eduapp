import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import api from "../../api/api";
import logo from "../../assets/logo.png";
import "./Header.css";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [showStickyRegister, setShowStickyRegister] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAdminUser(decoded);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
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

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLoginToggle = () => setShowLogin(!showLogin);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("administrator/login/", {
        username,
        password,
      });
      const { access } = response.data;
      localStorage.setItem("accessToken", access);
      const decoded = jwtDecode(access);
      setAdminUser(decoded);
      setShowLogin(false);
      setLoginError(null);
      navigate("/admin");
    } catch (error) {
      setLoginError("Login failed. Check your credentials.");
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAdminUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-white shadow-sm px-3">
      <div className="container-fluid justify-content-between align-items-center d-flex">
        <div className="d-flex align-items-center gap-4">
          <motion.div
            layoutId="shared-logo"
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
          >
            <img src={logo} alt="Math Senseacademy" className="logo-img" />
          </motion.div>

          <div className="nav-item dropdown">
            <button
              className="btn btn-outline-danger dropdown-toggle"
              onClick={toggleDropdown}
            >
              {t("courses")}
            </button>
            <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
              <li>
                <Link to="/courses/analytical-maths" className="dropdown-item">
                  {t("analytical")}
                </Link>
              </li>
              <li>
                <Link to="/courses/ml-python" className="dropdown-item">
                  {t("ml")}
                </Link>
              </li>
              <li>
                <Link to="/courses/olympiad" className="dropdown-item">
                  {t("olympiad")}
                </Link>
              </li>
              <li>
                <Link to="/courses/stats" className="dropdown-item">
                  {t("stats")}
                </Link>
              </li>
              <li>
                <Link to="/courses/algorithms" className="dropdown-item">
                  {t("algorithms")}
                </Link>
              </li>
              <li>
                <Link to="/courses/vedic-math" className="dropdown-item">
                  {t("vedic")}
                </Link>
              </li>
              <li>
                <Link to="/courses/3d-animation" className="dropdown-item">
                  {t("animation")}
                </Link>
              </li>
              <li>
                <Link to="/courses/class-10" className="dropdown-item">
                  {t("course10")}
                </Link>
              </li>
              <li>
                <Link to="/courses/class-11" className="dropdown-item">
                  {t("course11")}
                </Link>
              </li>
              <li>
                <Link to="/courses/class-12" className="dropdown-item">
                  {t("course12")}
                </Link>
              </li>
            </ul>
          </div>

          {showStickyRegister && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="btn sticky-register-btn"
              onClick={() => navigate("/student/register")}
            >
              {t("hero.registerButton")}
            </motion.button>
          )}
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end mt-3 mt-lg-0"
          id="mainNav"
        >
          <ul className="navbar-nav align-items-center gap-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                {t("home")}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                {t("about")}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/experts" className="nav-link">
                {t("experts")}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link">
                {t("blog")}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                {t("contact")}
              </Link>
            </li>
          </ul>

          <div className="position-relative mt-2 mt-lg-0">
            {adminUser ? (
              <div className="d-flex align-items-center gap-2">
                <span className="text-success fw-semibold">
                  Admin ID: {adminUser.admin_id}
                </span>
                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleLoginToggle}
                >
                  {t("login")}
                </button>
                {showLogin && (
                  <form
                    onSubmit={handleLogin}
                    className="login-form p-3 border bg-white shadow rounded position-absolute end-0 mt-2"
                  >
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
                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                    {loginError && (
                      <p className="text-danger mt-2">{loginError}</p>
                    )}
                    <p className="register-link mt-2 text-center">
                      Don't have an account?{" "}
                      <span
                        onClick={() => navigate("/register")}
                        className="text-primary"
                        style={{ cursor: "pointer" }}
                      >
                        Register
                      </span>
                    </p>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
