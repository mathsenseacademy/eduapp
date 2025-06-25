// src/pages/CoursePage/CoursePage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPublicCourseDetails } from "../../api/courseApi";
import CourseDetails from "../../components/AdminPanel/Courses/CourseDetails";
import Curriculum from "../../components/Curriculum/Curriculum";
import ClassroomEssentials from "../../components/ClassroomEssentials/ClassroomEssentials";
import StudentOfWeek from "../../components/StudentOfWeek/StudentOfWeek";
import MeetTheTeacher from "../../components/MeetTheTeacher/MeetTheTeacher";
import Testimonial from "../../components/TestimonialSection/TestimonialSection";
import useLocoScroll from "../../hooks/useLocoScroll";

export default function CoursePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { loco } = useLocoScroll(false);

  useEffect(() => {
    getPublicCourseDetails(id)
      .then(res => setData(res.data))
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        loco?.update();
      });
  }, [id, loco]);

  if (loading) return <div>Loading…</div>;
  if (!data)    return <div>Course not found.</div>;

  // Destructure and rename raw student_of_the_week
  const {
    course_name,
    course_subtitle,
    course_image_path,
    description,
    student_of_the_week: sowRaw,
    classroom_essentials = [],
  } = data;

  // Guarantee sow is always an object
  const sow = sowRaw || {};

  return (
    <div>
      <CourseDetails
        courseName={course_name}
        subtitle={course_subtitle}
        imagePath={course_image_path}
        description={description}
      />

      <Curriculum />

      <ClassroomEssentials items={classroom_essentials} />

      {sowRaw && (
        <StudentOfWeek
          name={sow.first_name ?? "—"}
          photo={sow.student_photo_path }
          text={
            sow.text ||
            `In math class this week, ${sow.first_name || "our student"} achieved remarkable success.`
          }
          header="Student of the Week"
        />
      )}

      <MeetTheTeacher />

      <Testimonial />
    </div>
  );
}
