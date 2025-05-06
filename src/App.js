// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import ComingSoon from './components/ComingSoon/ComingSoon';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home'
import Register from './pages/Register';
import StudentRegister from './pages/StudentRegister';
import SiteSettings from './components/SiteSettings/siteSettings';
// import './App.css' 

function App() {
  return (
    <>
    <Header /> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student/register" element={<StudentRegister />} />
    </Routes>
    <Footer /> 
    <SiteSettings />
  </>
  );
  // return (
  //   <div className="App" >
  //    {/* <ComingSoon/> */}
  //      <Home   /> 
  //      <SiteSettings />
  //   </div>
  // );
}

export default App;
