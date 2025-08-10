// src/components/ProgramsSection/ProgramsSection.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";         // ← import
import "./ProgramsSection.css";
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
      {/* <h2 className="section-heading">
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
          {programs.slice(0, 2).map((p, i) => (
            <div
              key={p.ID}
              className="program-card mb-3 clickable"
              onClick={() => navigate(`/courses/${p.ID}`)}
            >
              <div className="card-image">
                <img src={p.course_image_path} alt={p.course_name} />
              </div>
              <div className="card-text">
                <h3 className="card-title">{p.course_name}</h3>
                <hr></hr>
                <p className="focus-area">{p.course_subtitle}</p>
                <h6 className="description">{p.msa_class_level}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="row">
        {programs.slice(2).map((p) => (
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
                <h6 className="description"> {p.msa_class_level}</h6>
              </div>
            </div>
          </div>
        ))}
      </div> */}



      <div className="programs-section">
          <div className="ps-container">
              <div className="psc-top">
                  <div className="psct-heading">
                      <span>Our Featured Programs</span>
                  </div>
                  <div className="psct-about">
                      <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.</span>
                  </div>
              </div>
              <div className="psc-bottom">
                  <div className="pscb-list">
                    {programs.slice(2).map((p) => {
                      return(
                        <div className="pscbl-item">
                            <div className="pscblic-image">
                                <img src={p.course_image_path} alt={p.course_name} />
                            </div>
                            <div className="pscblic-data">
                                <div className="pscblicd-inner">
                                    <div className="pscblicdi-name">
                                        <span>{p.course_name}</span>
                                    </div>
                                    <div className="pscblicdi-detail">
                                        <span>{p.course_subtitle}</span>
                                        <span>{p.msa_class_level}</span>
                                    </div>
                                    <div className="pscblicdi-view">
                                        <button className="button" type="button" onClick={() => navigate(`/courses/${p.ID}`)}>
                                            <span>See More</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                      )
                      })
                    }
                  </div>
              </div>
          </div>
      </div>
    </section>
  );
}
