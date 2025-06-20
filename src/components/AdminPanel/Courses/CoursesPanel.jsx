// src/components/AdminPanel/Courses/CoursesPanel.jsx
import React, { useState } from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { FaList, FaPlus, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";

import AllCourses   from "./AllCourses";
import CreateCourse from "./CreateCourse";
import EditCourse   from "./EditCourse";
import "./CoursesPanel.css";

export default function CoursesPanel() {
  const [open, setOpen] = useState(false);

const base = "/admin/courses";

const tabs = [
  { to: `${base}/all`,    icon: <FaList />,  label: "Show All Courses" },
  { to: `${base}/create`, icon: <FaPlus />,  label: "Add Course"        },
  { to: `${base}/edit`,   icon: <FaEdit />,  label: "Edit Course"       },
];


  return (
    <section className="cp-wrapper">
      {/* Toggle button for mobile and desktop */}
      <button className="cp-toggle btn btn-outline-primary" onClick={() => setOpen(!open)}>
        {open ? "✕ Close" : "☰ Courses Menu"}
      </button>

      {/* Animated sidebar navigation */}
      <motion.nav
        initial={false}
        animate={open ? { x: 0 } : { x: -440 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="cp-nav bg-light border-end"
      >
        {tabs.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) => `cp-link ${isActive ? "active" : ""}`}
            onClick={() => setOpen(false)}
          >
            <span className="me-2">{icon}</span>
            <span className="link-label">{label}</span>
          </NavLink>
        ))}
      </motion.nav>

      {/* Main content shifts when sidebar opens */}
      <motion.div
        className="cp-content"
        initial={false}
        animate={open ? { marginLeft: 240 } : { marginLeft: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={() => setOpen(false)}
      >
        <Routes>
          <Route index element={<Navigate to="all" replace />} />
          <Route path="all"    element={<AllCourses />} />
          <Route path="create" element={<CreateCourse />} />
          <Route path="edit/:id"   element={<CreateCourse />} />
          <Route path="*"      element={<Navigate  replace />} />
        </Routes>
      </motion.div>
    </section>
  );
}
