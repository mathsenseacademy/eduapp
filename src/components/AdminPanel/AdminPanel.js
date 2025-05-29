// src/components/AdminPanel/AdminPanel.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import StudentList from "./StudentList";         
import SetPaper    from "./setQuestion/SetPaper";    

const AdminPanel = () => (
  <Routes>
    {/* default landing → students */}
    <Route path="student"  element={<StudentList />} />  
    <Route path="students"     element={<StudentList />} />

    {/* set-paper with its own nested routes */}
    <Route path="set-paper/*"  element={<SetPaper />} />

    {/* any unknown path inside /admin → redirect to student list */}
    <Route path="" element={<Navigate to="students" replace />} />
  </Routes>
);

export default AdminPanel;
