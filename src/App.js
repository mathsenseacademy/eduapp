// src/App.js
import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LayoutGroup } from "framer-motion";

import TopInfoBar    from "./components/TopInfoBar/TopInfoBar";
import Header        from "./components/Header/Header";
import AdminHeader   from "./components/AdminHeader/AdminHeader";
import Footer        from "./components/Footer/Footer";
import Home          from "./pages/Home";
import Register      from "./pages/Register";
import StudentRegister from "./pages/StudentRegister";
import AdminPanel    from "./components/AdminPanel/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader        from "./components/Loader/Loader";
import CoursePage    from "./pages/CoursePage/CoursePage";
import useLocoScroll from "./hooks/useLocoScroll";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const { scrollRef } = useLocoScroll(!loading);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const heroRef     = useRef(null);
  const sentinelRef = useRef(null);

  return (
    <LayoutGroup>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!isAdminRoute && <TopInfoBar sentinelRef={sentinelRef} />}
          {isAdminRoute ? <AdminHeader /> : <Header />}

          <div data-scroll-container ref={scrollRef}>
            <div data-scroll-section className="pt-header">
              <Routes>
                <Route path="/" element={<Home heroRef={heroRef} sentinelRef={sentinelRef} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/student/register" element={<StudentRegister />} />
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
               {isAdminRoute ? "":<Footer />}
              
            </div>
          </div>
        </>
      )}
    </LayoutGroup>
  );
}

export default App;
