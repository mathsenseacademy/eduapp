// src/component/CourseDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPublicCourseDetails } from "../../../api/courseApi";
import "./CourseDetails.css";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getPublicCourseDetails(id)
      .then(res => setCourse(res.data))
      .catch(console.error);
  }, [id]);

  if (!course) return <div className="text-center my-5">Loading…</div>;

  return (
    <div className="container my-5 course-details">
      <div className="row g-4">
        {/* Image / media */}
        <div className="col-12 col-md-6">
          <img
            src={course.course_image_path || "/placeholder.png"}
            alt={course.course_name}
            className="img-fluid rounded"
          />
        </div>
        {/* Textual details */}
        <div className="col-12 col-md-6">
          <h1 className="mb-3">{course.course_name}</h1>
          <h5 className="text-muted mb-4">{course.course_subtitle}</h5>
          <p>
            {course.description ||
              "No detailed description is available for this course."}
          </p>
          {/* example action button */}
          <button className="btn btn-primary mt-3">
            Enroll now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
