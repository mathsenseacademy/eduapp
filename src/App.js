import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LayoutGroup } from "framer-motion";

import TopInfoBar from "./components/TopInfoBar/TopInfoBar";
import Header from "./components/Header/Header";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import StudentRegister from "./pages/StudentRegister";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader/Loader";
import CourseDetails from "./components/AdminPanel/Courses/CourseDetails";
import CoursePage from "./pages/CoursePage/CoursePage";
import useLocoScroll from "./hooks/useLocoScroll";

function App() {
  /* splash loader */
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  /* routing helpers */
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  /* refs for hero + sentinel */
  const heroRef = useRef(null);
  const sentinelRef = useRef(null);

  /* locomotive wrapper */
  const scrollRef = useLocoScroll(loading);

  return (
    <LayoutGroup>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* top info bar only on public pages */}
          {!isAdminRoute && <TopInfoBar sentinelRef={sentinelRef} />}

          {/* main header selection */}
          {isAdminRoute ? <AdminHeader /> : <Header />}

          {/* Locomotive container */}
          <div data-scroll-container ref={scrollRef}>
            <div data-scroll-section className="pt-header">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home heroRef={heroRef} sentinelRef={sentinelRef} />
                  }
                />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/student/register"
                  element={<StudentRegister />}
                />


                {/* course details route */}
                <Route
                  path="/courses/:id"
                  // element={<CourseDetails />}
                  element={<CoursePage />}
                />

                {/* admin */}
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />
              </Routes>

              <Footer />
            </div>
          </div>
        </>
      )}
    </LayoutGroup>
  );
}

export default App;
