import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/api";
import { getActiveCourses } from "../../api/courseApi";
import logo from "../../assets/logoWith_Name.svg";
import StudentRegister from "../../pages/StudentRegister";

import "./Header.css";

const Header = () => {
  /* ───────── state ───────── */
  const [showLogin, setShowLogin] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [isAdminLogin, setIsAdminLogin] = useState(true);
  const [showStickyRegister, setShowStickyRegister] = useState(false);

  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const loginBoxRef = useRef(null);

  /* ── load active courses ── */
  // useEffect(() => {
  //   setCoursesLoading(true);
  //   getActiveCourses()
  //     .then(res => setCourses(res.data))
  //     .catch(() => setCourses([]))
  //     .finally(() => setCoursesLoading(false));
  // }, []);

  useEffect(() => {
    setCoursesLoading(true);
    getActiveCourses()
      .then((courses) => setCourses(courses))
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
      /* ignore */
    }
  }, []);

  /* ── header shadow after small scroll ── */
  useEffect(() => {
    const nav = document.querySelector(".navbar");
    const handle = () =>
      nav.classList.toggle("sticky-shadow", window.scrollY > 60);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  /* ── sticky register when HERO leaves view ── */
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

  /* ── handlers ── */
  const handleLogin = async (e) => {
    e.preventDefault();

    // pick endpoint & post-login route based on checkbox
    const endpoint = isAdminLogin ? "administrator/login/" : "student/login/"; 
    const redirectTo = isAdminLogin ? "/admin" : "/student/dashboard";
    const userType = isAdminLogin ? "admin" : "student";

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

  const languages = [
    { code: "en", label: "EN" },
    { code: "hi", label: "हिंदी" },
    { code: "bn", label: "বাংলা" },
  ];

  /* ───────── render ───────── */
  return (
     <>
    <nav className="navbar navbar-expand-lg fixed-top px-3">
      <div className="container-fluid justify-content-between d-flex">
        {/* ── left section ── */}
        <div className="d-flex align-items-center gap-4">
          <motion.div
            layoutId="shared-logo"
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
          >
            <img src={logo} alt="Math Sense Academy" className="logo-img" onClick={() => navigate("/")}/>
          </motion.div>

          {/* ─────── Courses pop-up dropdown ─────── */}
          <div
            className="nav-item courses-wrapper"
            onMouseEnter={() => setCoursesOpen(true)}
            onMouseLeave={() => setCoursesOpen(false)}
          >
            <button className="btn btn-outline-danger dropdown-toggle">
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
          </div>

          {/* sticky register inside header */}
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
        <div
          id="mainNav"
          className="collapse navbar-collapse justify-content-end mt-3 mt-lg-0"
        >
          <ul className="navbar-nav align-items-center gap-3 mb-2 mb-lg-0">
            {/* language switcher */}
             {/* <li className="nav-item">
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
            </li>*/}

            {/* main links */}
            {[
              { to: "/", label: t("home") },
              {  label: t("OurProgram") },
              {  label: t("about") },
              {  label: t("Testimonials") },
              
              // { to: "/about", label: t("about") },
              // { to: "/experts", label: t("experts") },
              // { to: "/blog", label: t("blog") },
              // { to: "/contact", label: t("contact") },
            ].map((link) => (
              <li key={link.to} className="nav-item">
                <Link to={link.to} className="nav-link">
                  {link.label}
                </Link>
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
              {/* btn btn-outline-primary */}
                <button
                  className=" login-toggle-btn"
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
                     {/* ── admin/student toggle ── */}
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="adminCheck"
                        checked={isAdminLogin}
                        onChange={(e) => setIsAdminLogin(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="adminCheck">
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
    {showRegisterModal && (
        <StudentRegister onClose={() => setShowRegisterModal(false)} />
      )}
       </>
  );
};

export default Header;
