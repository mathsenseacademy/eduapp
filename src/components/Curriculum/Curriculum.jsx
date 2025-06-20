// src/components/Curriculum.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPublicCourseDetails } from "../../api/courseApi";
import curriculumIcon from "../../assets/bookIcon.png";
import sampleImage from "../../assets/bookIcon.png";
import "./Curriculum.css";

const itemColors = [
  "#5DD3F3", // blue
  "#FB923C", // orange
  "#F9A8D4", // pink
  "#C4B5FD", // purple
  "#34D399", // green
  "#5DD3F3",
  "#FB923C",
  "#F9A8D4",
];

const Curriculum = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curriculums, setCurriculums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicCourseDetails(id)
      .then(res => setCurriculums(res.data.curriculums || []))
      .catch(err => {
        console.error(err);
        setCurriculums([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="curriculum-page">
      {/* <div className="curriculum-header d-flex align-items-center justify-content-center mb-4">
        <div className="icon-wrapper me-2">
          <img src={curriculumIcon} alt="Curriculum Icon" />
        </div>
        <h2 className="m-0">CURRICULUM</h2>
      </div> */}

      <div className="container-fluid curriculum-content">
        <div className="row align-items-center">
          {/* left image/video placeholder */}
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <div className="image-wrapper">
              <img
                src={sampleImage}
                alt="Curriculum visual"
                className="img-fluid rounded"
              />
            </div>
          </div>

          {/* dynamic curriculum list */}
          <div className="col-12 col-md-6">
            <ul className="curriculum-list list-unstyled p-0">
              {curriculums.map((item, idx) => (
                <li
                  key={item.curriculum_id}
                  className="curriculum-item mb-2 p-2 text-center"
                  style={{ backgroundColor: itemColors[idx % itemColors.length] }}
                >
                  {item.curriculum_name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-outline-dark detailed-btn"
            onClick={() => navigate("/student/register")}
          >
            DETAILED CURRICULUM
          </button>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
