// src/App.js
import React from 'react';
import ComingSoon from './components/ComingSoon/ComingSoon';
// import Home from './pages/Home'
import SiteSettings from './components/SiteSettings/siteSettings';
// import './App.css' 

function App() {
  return (
    <div className="App" >
     <ComingSoon/>
       {/* <Home   />  */}
       <SiteSettings />
    </div>
  );
}

export default App;
