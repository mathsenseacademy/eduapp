// src/components/Curriculum/Curriculum.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPublicCourseDetails } from "../../api/courseApi";
import curriculumIcon from "../../assets/bookIcon.png";
import "./Curriculum.css";

export default function Curriculum() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [curriculums, setCurriculums] = useState([]);
  const [mediaSrc, setMediaSrc]     = useState("");
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    getPublicCourseDetails(id)
      .then((res) => {
        setCurriculums(res.data.curriculums || []);
        setMediaSrc(res.data.course_video_path || res.data.course_image_path || "");
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="curriculum-page">
      {/* Header */}
      <div className="curriculum-header-wrapper">
        <div className="curriculum-header">
          <div className="icon-wrapper">
            <img src={curriculumIcon} alt="Curriculum Icon" />
          </div>
          <h2>CURRICULUM</h2>
        </div>
      </div>

      {/* Content */}
      <div className="curriculum-content container-fluid">
        <div className="row align-items-center">
          {/* Hexagon Media */}
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <div className="media-wrapper">
              {mediaSrc.endsWith(".mp4") ? (
                <video
                  controls
                  src={mediaSrc}
                  className="media-frame"
                  poster="" /* optional poster */
                />
              ) : (
                <img src={mediaSrc} alt="" className="media-frame" />
              )}
              <div className="play-overlay">
                ▶︎
              </div>
            </div>
          </div>

          {/* List */}
          <div className="col-12 col-md-6">
            <ul className="curriculum-list">
              {curriculums.map((item, idx) => (
                <li
                  key={item.curriculum_id}
                  className="curriculum-item"
                  style={{
                    backgroundColor:
                      ["#5DD3F3", "#FB923C", "#F9A8D4", "#C4B5FD", "#34D399"][
                        idx % 5
                      ],
                  }}
                >
                  {item.curriculum_name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Button */}
        <div className="text-center mt-4">
          <button
            className=" detailed-btn"
            onClick={() => navigate("/student/register")}
          >
            DETAILED CURRICULUM
          </button>
        </div>
      </div>
    </div>
  );
}
