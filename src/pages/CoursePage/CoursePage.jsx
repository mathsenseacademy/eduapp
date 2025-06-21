// src/pages/CoursePage/CoursePage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPublicCourseDetails } from "../../api/courseApi";
import CourseDetails from "../../components/AdminPanel/Courses/CourseDetails";
import Curriculum    from "../../components/Curriculum/Curriculum";
import Testimonial    from "../../components/TestimonialSection/TestimonialSection";
import StudentOfWeek from '../../components/StudentOfWeek/StudentOfWeek'
import "./CoursePage.css";
import useLocoScroll from "../../hooks/useLocoScroll";

export default function CoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // grab loco so we can update once data is in place
  const { loco } = useLocoScroll(false);

  useEffect(() => {
    getPublicCourseDetails(id)
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        // now that CourseDetails + Curriculum + Footer are rendered:
        loco?.update();
      });
  }, [id, loco]);

  if (loading) {
    return (
      <div className="course-page-spinner text-center my-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }
  if (!data) {
    return <div className="text-center my-5">Course not found.</div>;
  }

  return (
    <div className=" ">
      <CourseDetails
        courseName={data.course_name}
        subtitle={data.course_subtitle}
        imagePath={data.course_image_path}
        description={data.description}
      />
      <Curriculum />
      <StudentOfWeek/>
      <Testimonial/>
    </div>
  );
}
