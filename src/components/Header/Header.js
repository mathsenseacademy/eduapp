import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import api from "../../api/api";
import logo from "../../assets/logo.png";
import "./Header.css";

const Header = () => {
  /* ───────── state ───────── */
  const [showLogin, setShowLogin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [showStickyRegister, setShowStickyRegister] = useState(false);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const loginBoxRef = useRef(null); // <- popup ref

  /* ── auth token once ── */
  useEffect(() => {
    const tok = localStorage.getItem("accessToken");
    if (tok)
      try {
        setAdminUser(jwtDecode(tok));
      } catch {
        console.error("Invalid token");
      }
  }, []);

  /* ── sticky shadow ── */
  useEffect(() => {
    const nav = document.querySelector(".navbar");
    const onScroll = () =>
      nav.classList.toggle("sticky-shadow", window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── show register when hero leaves view ── */
  useEffect(() => {
    const hero = document.querySelector("#hero");
    if (!hero) return;
    const ob = new IntersectionObserver(
      ([e]) => setShowStickyRegister(!e.isIntersecting),
      { threshold: 0.1 }
    );
    ob.observe(hero);
    return () => ob.disconnect();
  }, []);

  /* ── outside-click to close login ── */
  useEffect(() => {
    if (!showLogin) return;

    const handleClick = (e) => {
      if (
        loginBoxRef.current &&
        !loginBoxRef.current.contains(e.target) &&           // click outside form
        !e.target.closest(".login-toggle-btn")               // and not on toggle
      ) {
        setShowLogin(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showLogin]);

  /* ── handlers ── */
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleLogin    = () => setShowLogin(!showLogin);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("administrator/login/", {
        username,
        password,
      });
      localStorage.setItem("accessToken", data.access);
      /* ⭐ …and an unmistakable “this came from the admin login” flag */
   localStorage.setItem("userType", "admin");
      setAdminUser(jwtDecode(data.access));
      setShowLogin(false);
      setLoginError(null);
      navigate("/admin");
    } catch {
      setLoginError("Login failed. Check your credentials.");
    }
  };

  /* ── language list ── */
  const languages = [
    { code: "en", label: "EN" },
    { code: "hi", label: "हिंदी" },
    { code: "bn", label: "বাংলা" },
  ];

  /* ───────── render ───────── */
  return (
    <nav className="navbar navbar-expand-lg fixed-top px-3">
      <div className="container-fluid justify-content-between d-flex">
        {/* left */}
        <div className="d-flex align-items-center gap-4">
          <motion.div layoutId="shared-logo" transition={{ type: "spring", stiffness: 60, damping: 15 }}>
            <img src={logo} alt="Math Senseacademy" className="logo-img" />
          </motion.div>

          {/* courses dropdown */}
          <div className="nav-item dropdown">
            <button className="btn btn-outline-danger dropdown-toggle" onClick={toggleDropdown}>
              {t("courses")}
            </button>
            <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
              {/* …course links… */}
              <li><Link to="/courses/analytical-maths" className="dropdown-item">{t("analytical")}</Link></li>
              <li><Link to="/courses/ml-python" className="dropdown-item">{t("ml")}</Link></li>
              <li><Link to="/courses/olympiad" className="dropdown-item">{t("olympiad")}</Link></li>
              <li><Link to="/courses/stats" className="dropdown-item">{t("stats")}</Link></li>
              <li><Link to="/courses/algorithms" className="dropdown-item">{t("algorithms")}</Link></li>
              <li><Link to="/courses/vedic-math" className="dropdown-item">{t("vedic")}</Link></li>
              <li><Link to="/courses/3d-animation" className="dropdown-item">{t("animation")}</Link></li>
              <li><Link to="/courses/class-10" className="dropdown-item">{t("course10")}</Link></li>
              <li><Link to="/courses/class-11" className="dropdown-item">{t("course11")}</Link></li>
              <li><Link to="/courses/class-12" className="dropdown-item">{t("course12")}</Link></li>
            </ul>
          </div>

          {/* sticky register */}
          {showStickyRegister && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="sticky-register-btn"
              onClick={() => navigate("/student/register")}
            >
              {t("hero.registerButton")}
            </motion.button>
          )}
        </div>

        {/* burger */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* right */}
        <div className="collapse navbar-collapse justify-content-end mt-3 mt-lg-0" id="mainNav">
          <ul className="navbar-nav align-items-center gap-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <select
                className="form-select form-select-sm language-select"
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
            </li>

            <li className="nav-item"><Link to="/" className="nav-link">{t("home")}</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link">{t("about")}</Link></li>
            <li className="nav-item"><Link to="/experts" className="nav-link">{t("experts")}</Link></li>
            <li className="nav-item"><Link to="/blog" className="nav-link">{t("blog")}</Link></li>
            <li className="nav-item"><Link to="/contact" className="nav-link">{t("contact")}</Link></li>
          </ul>

          {/* auth */}
          <div className="position-relative mt-2 mt-lg-0">
            {adminUser ? (
              <button className="btn btn-outline-success" onClick={() => navigate("/admin")}>
                Go to Admin Section
              </button>
            ) : (
              <>
                <button className="btn btn-outline-primary login-toggle-btn" onClick={toggleLogin}>
                  {t("login")}
                </button>

                {showLogin && (
                  <form
                    ref={loginBoxRef}
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
                    {loginError && <p className="text-danger mt-2">{loginError}</p>}
                    <p className="register-link mt-2 text-center">
                      {`Don't have an account? `}
                      <span onClick={() => navigate("/register")}>Register</span>
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
