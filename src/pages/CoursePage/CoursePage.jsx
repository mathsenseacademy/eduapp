// src/pages/CoursePage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPublicCourseDetails } from "../../api/courseApi";
import CourseDetails from "../../components/AdminPanel/Courses/CourseDetails";
import Curriculum from "../../components/Curriculum/Curriculum";
import "./CoursePage.css";

const CoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    getPublicCourseDetails(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="course-page-spinner text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div className="course-page-error text-center my-5">Course not found.</div>;
  }

  return (
    <div className="course-page-container container">
      {/* show details and curriculum together */}
      <CourseDetails
        courseName={data.course_name}
        subtitle={data.course_subtitle}
        imagePath={data.course_image_path}
        description={data.description}
      />
      <Curriculum curriculums={data.curriculums || []} />
    </div>
  );
};

export default CoursePage;
