// src/App.js
import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LayoutGroup } from "framer-motion";

import TopInfoBar      from "./components/TopInfoBar/TopInfoBar";
import Header          from "./components/Header/Header";
import AdminHeader     from "./components/AdminHeader/AdminHeader";
import StudentHeader   from "./components/StudentHeader/StudentHeader";
import Footer          from "./components/Footer/Footer";

import Home            from "./pages/Home";
import Register        from "./pages/Register";
import StudentRegister from "./pages/StudentRegister";
import Login           from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import CoursePage      from "./pages/CoursePage/CoursePage";
import AdminPanel      from "./components/AdminPanel/AdminPanel";
import ProtectedRoute  from "./components/ProtectedRoute";
import Loader          from "./components/Loader/Loader";

import useLocoScroll   from "./hooks/useLocoScroll";

function App() {
  // 1. Loading state
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  // 2. Hooks for layout & scroll
  const { scrollRef }   = useLocoScroll(!loading);
  const sentinelRef     = useRef(null);
  const location        = useLocation();
  const path            = location.pathname;

  // 3. Route flags
  const isAdminRoute    = path.startsWith("/admin");
  const isStudentRoute  = path.startsWith("/student/");
  const isRoot          = path === "/";
  const isCoursePage    = path.startsWith("/courses/");
  // const isLogin    = path.startsWith("/login/");
  const userType        = localStorage.getItem("userType");

  // 4. While loading, show the loader
  if (loading) return <Loader />;

  // 5. Decide if TopInfoBar shows:
  //    - home (with or without hash)
  //    - any /courses/:id
  //    - but never under /student/* or /admin/*
  const showTopInfoBar = (isRoot || isCoursePage) && !isStudentRoute && !isAdminRoute;
  // const showTopInfoBar = (isRoot || isCoursePage||isLogin) && !isStudentRoute && !isAdminRoute;

  // 6. Choose header based on route
  let HeaderComponent;
  if (isAdminRoute) {
    HeaderComponent = <AdminHeader />;
  } else if (isStudentRoute) {
    HeaderComponent = <StudentHeader />;
  } else {
    // public pages (including "/"), always show the standard Header
    HeaderComponent = (
      <Header
        showDashboardBtn={isRoot && !!userType}
        dashboardTarget={userType === "admin" ? "/admin" : "/student/dashboard"}
      />
    );
  }

  return (
    <LayoutGroup>
      {showTopInfoBar && <TopInfoBar sentinelRef={sentinelRef} />}

      {HeaderComponent}

      <div data-scroll-container ref={scrollRef}>
        <div data-scroll-section className="pt-header">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={<Home sentinelRef={sentinelRef} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/student/register" element={<StudentRegister />} />

            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute studentOnly>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/courses/:id" element={<CoursePage />} />

            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>

          {!isAdminRoute && <Footer />}
        </div>
      </div>
    </LayoutGroup>
  );
}

export default App;
