import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LayoutGroup } from 'framer-motion';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import StudentRegister from './pages/StudentRegister';
import SiteSettings from './components/SiteSettings/siteSettings';
import AdminPanel from './components/AdminPanel/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader/Loader';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

function App() {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && scrollRef.current) {
      const scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
      });
      return () => scroll.destroy();
    }
  }, [loading]);

  return (
    <LayoutGroup>
      {loading ? (
        <Loader />
      ) : (
        <div data-scroll-container ref={scrollRef}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/student/register" element={<StudentRegister />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <SiteSettings />
        </div>
      )}
    </LayoutGroup>
  );
}

export default App;
