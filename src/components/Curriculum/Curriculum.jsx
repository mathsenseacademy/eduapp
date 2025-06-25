// src/components/Curriculum/Curriculum.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPublicCourseDetails } from "../../api/courseApi";
import curriculumIcon from "../../assets/bookIcon.png";
import logoVideo from "../../assets/logo.mp4";    // your local fallback
import StudentRegister from "../../pages/StudentRegister";
import "./Curriculum.css";

export default function Curriculum() {
  const { id } = useParams();
  const [curriculums, setCurriculums] = useState([]);
  const [mediaSrc, setMediaSrc]       = useState("");
  const [loading, setLoading]         = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    getPublicCourseDetails(id)
      .then((res) => {
        setCurriculums(res.data.curriculums || []);

        const vid = res.data.course_video_path;
        const isYouTube =
          typeof vid === "string" && vid.includes("youtube.com");
        const isMathsense =
          isYouTube &&
          (vid.includes("@Mathsenseacademy") || vid.includes("/shorts/"));
        setMediaSrc(isMathsense ? vid : logoVideo);
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

  // Build a YouTube embed URL with controls always on,
  // modest branding, and only same-channel recommendations
  const getYouTubeEmbedUrl = (url) => {
    // Shorts: /shorts/VIDEO_ID
    let match = url.match(/youtube\.com\/shorts\/([^?]+)/);
    if (match) {
      const id = match[1];
      return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&controls=1`;
    }
    // Normal watch?v=VIDEO_ID
    match = url.match(/v=([^&]+)/);
    const id = match ? match[1] : "";
    return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&controls=1`;
  };

  const renderMedia = () => {
    if (mediaSrc.includes("youtube.com")) {
      const embedUrl = getYouTubeEmbedUrl(mediaSrc);
      return (
        <iframe
          className="media-frame"
          src={embedUrl}
          title="Course video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    // Local fallback .mp4 with native HTML5 controls (which include volume)
    return (
      <video
        controls
        src={mediaSrc}
        className="media-frame"
        poster=""
      />
    );
  };

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
          {/* Media */}
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <div className="media-wrapper">
              {renderMedia()}
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
                    backgroundColor: [
                      "#5DD3F3",
                      "#FB923C",
                      "#F9A8D4",
                      "#C4B5FD",
                      "#34D399",
                    ][idx % 5],
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
            className="detailed-btn"
            onClick={() => setShowRegisterModal(true)}
          >
            DETAILED CURRICULUM
          </button>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <StudentRegister onClose={() => setShowRegisterModal(false)} />
      )}
    </div>
  );
}
