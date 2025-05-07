import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import StudentRegister from './pages/StudentRegister';
import SiteSettings from './components/SiteSettings/siteSettings';
import AdminPanel from './components/AdminPanel/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute'; // ✅ Import it

function App() {
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
    </>
  );
}

export default App;
