// src/components/ClassroomEssentials/ClassroomEssentials.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import classessentials from "../../assets/bookIcon.png";
import "./ClassroomEssentials.css";

export default function ClassroomEssentials({ items }) {
  const [openKey, setOpenKey] = useState(null);
  const toggle = (key) =>
    setOpenKey((current) => (current === key ? null : key));

  if (!items || items.length === 0) {
    return (
      <section className="ce-container">
        <h2 className="ce-title">Classroom essentials</h2>
        <div className="ce-subtitle">
        A 360° approach for excellence in school & beyond
      </div>
        <p className="ce-empty">No essentials available yet.</p>
      </section>
    );
  }

  return (
    <section className="ce-container">
      <h2 className="ce-title">Classroom essentials</h2>
      

      <div className="ce-panels">
        {items.map((item, i) => {
          const key      = item.classroom_essential_id ?? i;
          const isOpen   = openKey === key;
          const svgIndex = i % 3;

          return (
            <div key={key} className={`ce-panel ce-panel--${svgIndex}`}>
              <div className="ce-header" onClick={() => toggle(key)}>
                <span>{item.classroom_essentials_name}</span>
                {isOpen ? (
                  <AiOutlineUp className="ce-icon" />
                ) : (
                  <AiOutlineDown className="ce-icon" />
                )}
              </div>
              {isOpen && (
                <div className="ce-body">
                  <p>{item.classroom_essentials_description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

ClassroomEssentials.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id:          PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title:       PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};
