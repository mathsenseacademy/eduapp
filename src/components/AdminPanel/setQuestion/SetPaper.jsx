// src/components/AdminPanel/SetPaper/SetPaper.jsx
import React, { useState } from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { FaPlus, FaList, FaSearch } from "react-icons/fa";

import CreateQuestions from "./CreateQuestions";
import GetQuestionById from "./GetQuestionById";
import AllQuestions    from "./AllQuestions";
import EditQuestions   from "./EditQuestions";
import "./SetPaper.css";

const SetPaper = () => {
  const [open, setOpen] = useState(false);
  const base = "/admin/set-paper";

  /* Edit removed from the nav */
  const tabs = [
    { to: `${base}/create`,   icon: <FaPlus />,   label: "Create" },
    { to: `${base}/get-one`,  icon: <FaSearch />, label: "Get by ID" },
    { to: `${base}/all`,      icon: <FaList />,   label: "All" },
  ];

  return (
    <section className="sp-wrapper">
      <button className="sp-toggle" onClick={() => setOpen(!open)}>≡</button>

      <nav className={`sp-nav ${open ? "open" : ""}`}>
        {tabs.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className="sp-link"
            onClick={() => setOpen(false)}
          >
            {icon} <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sp-content">
        <Routes>
          <Route index            element={<Navigate to="create" replace />} />
          <Route path="create"    element={<CreateQuestions />} />
          <Route path="get-one"   element={<GetQuestionById />} />
          <Route path="all"       element={<AllQuestions />} />
          {/* hidden edit route reached by row-click */}
          <Route path="edit/:qid" element={<EditQuestions />} />
        </Routes>
      </div>
    </section>
  );
};

export default SetPaper;
