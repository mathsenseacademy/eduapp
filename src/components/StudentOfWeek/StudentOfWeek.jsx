import React from "react";
import "./StudentOfWeek.css";
import bulbIcon from "../../assets/ideaIcon.png";  

export default function StudentOfWeek({
  name ,
  photo ,
  text 
}) {
    const [before, after] = text.split(name);
  return (
    <section className="sow-wrapper my-5">
      {/* Header */}
      <div className="sow-header-wrapper">
        <div className="sow-header">
          <div className="sow-badge">
            <img src={bulbIcon} alt="" />
          </div>
          <h2 className="sow-title">Student of the Week</h2>
        </div>
      </div>

      {/* Content */}
        <div className="sow-container">
      {/* Circular photo */}
      <div className="sow-photo-wrapper">
        <img src={photo} alt={name} className="sow-photo" />
      </div>

      {/* Bubble */}
      <div className="sow-bubble-wrapper">
        <div className="sow-bubble">
          <p className="sow-text">
            {before}
            <span className="sow-highlight">{name}</span>
            {after}
          </p>
        </div>
      </div>
    </div>
    </section>
  );
}
