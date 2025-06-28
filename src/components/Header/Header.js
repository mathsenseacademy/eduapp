// src/components/Header/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate }       from "react-router-dom";
import { useTranslation }           from "react-i18next";
import { jwtDecode }                from "jwt-decode";
import { motion, AnimatePresence }  from "framer-motion";
import api                          from "../../api/api";
import { getActiveCourses }         from "../../api/courseApi";
import logo                         from "../../assets/logoWith_Name.svg";
import StudentRegister              from "../../pages/StudentRegister";

import "./Header.css";

const Header = () => {
  const [showLogin, setShowLogin]           = useState(false);
  const [coursesOpen, setCoursesOpen]       = useState(false);
  const [courses, setCourses]               = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [username, setUsername]             = useState("");
  const [password, setPassword]             = useState("");
  const [loginError, setLoginError]         = useState(null);
  const [adminUser, setAdminUser]           = useState(null);
  const [isAdminLogin, setIsAdminLogin]     = useState(true);
  const [showStickyRegister, setShowStickyRegister] = useState(false);
  const [showRegisterModal, setShowRegisterModal]   = useState(false);

  const { t }      = useTranslation();
  const navigate   = useNavigate();
  const loginBoxRef = useRef(null);

  /* ── load active courses ── */
  useEffect(() => {
    setCoursesLoading(true);
    getActiveCourses()
      .then(res => setCourses(res))
      .catch(() => setCourses([]))
      .finally(() => setCoursesLoading(false));
  }, []);

  /* ── decode token ── */
  useEffect(() => {
    const tok = localStorage.getItem("accessToken");
    if (!tok) return;
    try {
      setAdminUser(jwtDecode(tok));
    } catch {
      /* ignore invalid token */
    }
  }, []);

  /* ── header shadow on scroll ── */
  useEffect(() => {
    const navEl = document.querySelector(".navbar");
    const onScroll = () =>
      navEl.classList.toggle("sticky-shadow", window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── sticky register button ── */
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

  /* ── close login popup on outside click ── */
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

  /* ── login handler ── */
  const handleLogin = async (e) => {
    e.preventDefault();
    const endpoint   = isAdminLogin ? "administrator/login/" : "student/login/";
    const redirectTo = isAdminLogin ? "/admin"              : "/student/dashboard";
    const userType   = isAdminLogin ? "admin"               : "student";

    try {
      const { data } = await api.post(endpoint, { username, password });
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("userType", userType);
      setAdminUser(isAdminLogin ? jwtDecode(data.access) : null);
      setShowLogin(false);
      setLoginError(null);
      navigate(redirectTo);
    } catch {
      setLoginError("Login failed. Check your credentials.");
    }
  };

  /* ── nav items ── */
  const navItems = [
    // Home: still a <Link> to “/” but we add an onClick to scroll to top
    { type: "link",   to: "/",        label: t("home") },
    { type: "anchor", to: "programs",     label: t("OurProgram") },
    { type: "anchor", to: "testimonials", label: t("Testimonials") },
    { type: "anchor", to: "about",        label: t("about") },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top px-3 d-sm-flex flex-sm-column flex-lg-row">
        <div className="container-fluid justify-content-between d-flex">
          {/* ── Left: Logo & Courses ── */}
          <div className="d-flex align-items-center gap-4 d-sm-flex flex-sm-column flex-lg-row">
            <motion.div
              layoutId="shared-logo"
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
            >
              <img
                src={logo}
                alt="Math Sense Academy"
                className="logo-img"
                onClick={() => {
                  navigate("/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{ cursor: "pointer" }}
              />
            </motion.div>

            <div
              className="nav-item courses-wrapper"
              
            >
              <button className="btn btn-outline-danger dropdown-toggle"
              onMouseEnter={() => setCoursesOpen(true)}
                // onMouseLeave={() => setCoursesOpen(false)}
              >
                {t("courses")}
                
              </button>
              <AnimatePresence>
                {coursesOpen && (
                  <motion.ul
                    key="course-popup"
                    className="courses-popup"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {coursesLoading ? (
                      <li className="px-3 py-2 text-muted">Loading…</li>
                    ) : courses.length ? (
                      courses.map((c) => (
                        <li key={c.id}>
                          <Link
                            to={`/courses/${c.id}`}
                            className="course-link"
                            onClick={() => setCoursesOpen(false)}
                          >
                            {c.course_name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="px-3 py-2 text-muted">
                        No courses available
                      </li>
                    )}
                  </motion.ul>
                )}
              </AnimatePresence>

              {showStickyRegister && (
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="sticky-register-btn"
                  onClick={() => setShowRegisterModal(true)}
                >
                  {t("hero.registerButton")}
                </motion.button>
              )}
            </div>
          </div>

          {/* ── Hamburger (mobile) ── */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* ── Right nav items ── */}
          <div
            id="mainNav"
            className="collapse navbar-collapse justify-content-end mt-3 mt-lg-0 mb-5 mb-lg-0"
          >
            <ul className="navbar-nav align-items-center gap-3 mb-2 mb-lg-0">
              {navItems.map((item) => (
                <li key={item.label} className="nav-item">
                  {item.type === "link" ? (
                    <Link
                      to={item.to}
                      className="nav-link"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={`#${item.to}`}
                      className="nav-link"
                      onClick={() => {
                        const bsCollapse = document.getElementById("mainNav");
                        if (bsCollapse.classList.contains("show")) {
                          window.bootstrap
                            .Collapse
                            .getInstance(bsCollapse)
                            .hide();
                        }
                      }}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* ── Auth button / form ── */}
            <div className="position-relative mt-2 mt-lg-0  mb-2 mb-lg-0">
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
                    className="login-toggle-btn btn btn-outline-primary"
                    onClick={() => setShowLogin(!showLogin)}
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
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <input
                        className="form-control mb-2"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="adminCheck"
                          checked={isAdminLogin}
                          onChange={(e) => setIsAdminLogin(e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="adminCheck"
                        >
                          Login as Teacher
                        </label>
                      </div>
                      <button type="submit" className="btn btn-primary w-100">
                        Login
                      </button>
                      {loginError && (
                        <p className="text-danger mt-2">{loginError}</p>
                      )}
                      <p className="register-link mt-2 text-center">
                        Don’t have an account?{" "}
                        <span onClick={() => navigate("/register")}>
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

      {/* ── Student Register modal ── */}
      {showRegisterModal && (
        <StudentRegister onClose={() => setShowRegisterModal(false)} />
      )}
    </>
  );
};

export default Header;
