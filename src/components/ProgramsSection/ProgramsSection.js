// src/components/ProgramsSection/ProgramsSection.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";         // ← import
import "./ProgramsSection.css";
import heroImage from "../../assets/our-programs-hero.png";
import api from "../../api/api";

export default function ProgramsSection() {
  const [programs, setPrograms] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const navigate = useNavigate();                        // ← hook

  useEffect(() => {
    api
      .get("/coursemanegment/all_courses_show_public/")
      .then(res => setPrograms(res.data))
      .catch(err => {
        console.error(err);
        setError("Failed to load programs.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="programs-section">Loading programs…</div>;
  if (error)   return <div className="programs-section">{error}</div>;

  // split roughly in half for layout
  const half = Math.ceil(programs.length / 2);

  return (
    <section className="programs-section">
      <h2 className="section-heading">
        <span className="star-badge spin">★</span> Our Programs
      </h2>

      <div className="row top-2-cards">
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src={heroImage}
            alt="Our Program Hero"
            className="img-fluid programs-hero-img"
          />
        </div>

        <div className="col-md-6 d-flex flex-column">
          {programs.slice(0, half).map((p, i) => (
            <div
              key={p.ID}
              className="program-card mb-3 clickable" // ← make it clear in CSS
              onClick={() => navigate(`/courses/${p.ID}`)} // ← navigate on click
            >
              <div className="card-image">
                <img src={p.course_image_path} alt={p.course_name} />
              </div>
              <div className="card-text">
                <h3 className="card-title">{p.course_name}</h3>
                <hr></hr>
                <p className="focus-area">{p.course_subtitle}</p>
                <p className="description">{p.msa_class_level}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="row">
        {programs.slice(half).map((p) => (
          <div className="col-md-6 mb-3 section-two" key={p.ID}>
            <div
              className="program-card clickable"
              onClick={() => navigate(`/courses/${p.ID}`)}
            >
              <div className="card-image">
                <img src={p.course_image_path} alt={p.course_name} />
              </div>
              <div className="card-text">
                <h3 className="card-title">{p.course_name}</h3>
                <hr></hr>
                <p className="focus-area">{p.course_subtitle}</p>
                <p className="description"> {p.msa_class_level}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="text-center mt-4">
        <button className="more-btn">More Courses Here</button>
      </div> */}
    </section>
  );
}
