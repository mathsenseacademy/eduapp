import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import StudentRegister from './pages/StudentRegister';
import SiteSettings from './components/SiteSettings/siteSettings';
import AdminPanel from './components/AdminPanel/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute'; 
import Loader from './components/Loader/Loader';
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return (
    <>
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
      {/* ABC */}
    </>
  );
}

export default App;
