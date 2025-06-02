import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import api from "../../api/api";
import { getActiveCourses } from "../../api/courseApi";
import logo from "../../assets/logo.png";
import "./Header.css";

const Header = () => {
  /* ───────── state ───────── */
  const [showLogin, setShowLogin]         = useState(false);
  const [dropdownOpen, setDropdownOpen]   = useState(false);
  const [courses, setCourses]             = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [username, setUsername]           = useState("");
  const [password, setPassword]           = useState("");
  const [loginError, setLoginError]       = useState(null);
  const [adminUser, setAdminUser]         = useState(null);
  const [showStickyRegister, setShowStickyRegister] = useState(false);

  const { t, i18n }  = useTranslation();
  const navigate      = useNavigate();
  const loginBoxRef   = useRef(null);

  /* ── load active courses ── */
  useEffect(() => {
    setCoursesLoading(true);
    getActiveCourses()
      .then(res => setCourses(res.data))
      .catch(err => {
        console.error("Could not load courses:", err);
        setCourses([]);
      })
      .finally(() => setCoursesLoading(false));
  }, []);

  /* ── decode token ── */
  useEffect(() => {
    const tok = localStorage.getItem("accessToken");
    if (!tok) return;
    try { setAdminUser(jwtDecode(tok)); } catch { console.error("Invalid token"); }
  }, []);

  /* ── add shadow after small scroll ── */
  useEffect(() => {
    const nav = document.querySelector(".navbar");
    const onScroll = () => nav.classList.toggle("sticky-shadow", window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── show sticky register when HERO leaves ── */
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

  /* ── close login on outside click ── */
  useEffect(() => {
    if (!showLogin) return;
    function handleClick(e) {
      if (
        loginBoxRef.current &&
        !loginBoxRef.current.contains(e.target) &&
        !e.target.closest(".login-toggle-btn")
      ) {
        setShowLogin(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showLogin]);

  /* ── handlers ── */
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleLogin    = () => setShowLogin(!showLogin);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("administrator/login/", { username, password });
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("userType", "admin");
      setAdminUser(jwtDecode(data.access));
      setShowLogin(false);
      setLoginError(null);
      navigate("/admin");
    } catch {
      setLoginError("Login failed. Check your credentials.");
    }
  };

  const languages = [
    { code: "en", label: "EN" },
    { code: "hi", label: "हिंदी" },
    { code: "bn", label: "বাংলা" },
  ];

  /* ───────── render ───────── */
  return (
    <nav className="navbar navbar-expand-lg fixed-top px-3">
      <div className="container-fluid justify-content-between d-flex">

        {/* ── left section ── */}
        <div className="d-flex align-items-center gap-4">
          <motion.div
            layoutId="shared-logo"
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
          >
            <img src={logo} alt="Math Sense Academy" className="logo-img" />
          </motion.div>

          {/* courses dropdown */}
          <div className="nav-item dropdown">
            <button
              className="btn btn-outline-danger dropdown-toggle"
              onClick={toggleDropdown}
            >
              {t("courses")}
            </button>

            <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
              {coursesLoading ? (
                <li><span className="dropdown-item text-muted">Loading…</span></li>
              ) : courses.length ? (
                courses.map(c => (
                  <li key={c.id}>
                    <Link
                      to={`/courses/${c.id}`}
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {c.course_name}
                    </Link>
                  </li>
                ))
              ) : (
                <li><span className="dropdown-item text-muted">No courses available</span></li>
              )}
            </ul>
          </div>

          {/* sticky register button inside header */}
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

        {/* ── burger ── */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* ── right nav ── */}
        <div id="mainNav" className="collapse navbar-collapse justify-content-end mt-3 mt-lg-0">
          <ul className="navbar-nav align-items-center gap-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <select
                className="form-select form-select-sm language-select"
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                {languages.map(l => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
            </li>
            {[
              { to: "/",        label: t("home")     },
              { to: "/about",   label: t("about")    },
              { to: "/experts", label: t("experts")  },
              { to: "/blog",    label: t("blog")     },
              { to: "/contact", label: t("contact")  },
            ].map(link => (
              <li key={link.to} className="nav-item">
                <Link to={link.to} className="nav-link">{link.label}</Link>
              </li>
            ))}
          </ul>

          {/* ── auth box ── */}
          <div className="position-relative mt-2 mt-lg-0">
            {adminUser ? (
              <button
                className="btn btn-outline-success"
                onClick={() => navigate("/admin")}
              >
                Go to Admin Section
              </button>
            ) : (
              <>
                <button
                  className="btn btn-outline-primary login-toggle-btn"
                  onClick={toggleLogin}
                >
                  {t("login")}
                </button>

                {showLogin && (
                  <form
                    ref={loginBoxRef}
                    onSubmit={handleLogin}
                    className="login-form p-3 border bg-white shadow rounded position-absolute end-0 mt-2"
                  >
                    <input
                      className="form-control mb-2"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                    />
                    <input
                      className="form-control mb-2"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn btn-primary w-100">Login</button>
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
