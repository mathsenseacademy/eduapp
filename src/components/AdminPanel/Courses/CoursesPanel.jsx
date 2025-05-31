// src/components/AdminPanel/Courses/CoursesPanel.jsx
import React, { useState } from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { FaList, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

import AllCourses   from "./AllCourses";
import CreateCourse from "./CreateCourse";
import EditCourse   from "./EditCourse";
import "./CoursesPanel.css";

export default function CoursesPanel() {
  const [open, setOpen] = useState(false);

  const tabs = [
    { to: "all",    icon: <FaList />, label: "All Courses" },
    { to: "create", icon: <FaPlus />, label: "Create Course" },
  ];

  return (
    <section className="cp-wrapper">
      {/* Toggle button for mobile */}
      <button className="cp-toggle" onClick={() => setOpen(!open)}>
        {open ? "✕ Close" : "☰ Menu"}
      </button>

      {/* Animated sidebar navigation */}
      <motion.nav
        initial={false}
        animate={open ? { x: 0 } : { x: -200 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="cp-nav"
      >
        {tabs.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `cp-link ${isActive ? "active" : ""}`
            }
            onClick={() => setOpen(false)}
          >
            {icon}
            <motion.span
              className="ms-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: open ? 1 : 0 }}
              transition={{ delay: open ? 0.2 : 0 }}
            >
              {label}
            </motion.span>
          </NavLink>
        ))}
      </motion.nav>

      {/* Animated main content to shift when sidebar opens */}
      <motion.div
        className="cp-content"
        onClick={() => setOpen(false)}
        initial={false}
        animate={open ? { marginLeft: 200 } : { marginLeft: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Routes>
          <Route index element={<Navigate to="all" replace />} />
          <Route path="all" element={<AllCourses />} />
          <Route path="create" element={<CreateCourse />} />
          <Route path="edit/:id" element={<EditCourse />} />
          <Route path="*" element={<Navigate to="all" replace />} />
        </Routes>
      </motion.div>
    </section>
  );
}
