// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LayoutGroup } from "framer-motion";

import Header from "./components/Header/Header";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import StudentRegister from "./pages/StudentRegister";
// import SiteSettings from "./components/SiteSettings/siteSettings";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader/Loader";

import useLocoScroll from "./hooks/useLocoScroll";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  /* fake pre-loader -------------------------------------------------- */
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);
  /* ----------------------------------------------------------------- */

  const scrollRef = useLocoScroll(loading);

  return (
    <LayoutGroup>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* pick the correct header */}
          {isAdminRoute ? <AdminHeader /> : <Header />}

          {/* Locomotive wrapper */}
          <div data-scroll-container ref={scrollRef}>
            <div data-scroll-section className="pt-header">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/student/register" element={<StudentRegister />} />

                {/* admin routes */}
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

          {/* <SiteSettings /> */}
        </>
      )}
    </LayoutGroup>
  );
}

export default App;
