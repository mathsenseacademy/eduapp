import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPublicCourseDetails } from "../../../api/courseApi";
import logo from "../../../assets/logoWithName.png";
import "./CourseDetails.css";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getPublicCourseDetails(id)
      .then((res) => setCourse(res.data))
      .catch(console.error);
  }, [id]);

  if (!course) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="course-details-container my-5">
      <div className="row align-items-center gx-0">
        {/* Left bubbles */}
        <div className="col-12 col-md-6 position-relative mb-4 mb-md-0">
          {/* Purple bubble */}
          <div className="bubble bubble--purple">
            <h1 className="bubble__title">{course.course_name}</h1>
          </div>

          {/* Green bubble */}
          <div className="bubble bubble--green">
            <p className="bubble__text">
              {course.course_subtitle ||
                "Engaging, expert-led online math programs for kids from Grade"}
            </p>
            <button className="bubble__btn">Enroll Now</button>
          </div>

          {/* Circular arrow button */}
          <button
            className="circle-arrow"
            onClick={() => {
              /* e.g. navigate to next slide */
            }}
          >
            {/* ▶ */}
            ...
          </button>
        </div>

        {/* Right side: logo + students */}
        <div className="col-12 col-md-6 text-center">
          <div className="logo-wrapper mb-4">
            <img src={logo} alt="MathSense Academy" className="logo-img" />
          </div>

          <div className="students-wrapper d-flex justify-content-center gap-3">
            <img
              src={ course.course_image_path}
              alt="Student 1"
              className="student-img"
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}
