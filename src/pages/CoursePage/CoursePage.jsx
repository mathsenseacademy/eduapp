// src/pages/CoursePage/CoursePage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPublicCourseDetails } from "../../api/courseApi";
import CourseDetails from "../../components/AdminPanel/Courses/CourseDetails";
import Curriculum    from "../../components/Curriculum/Curriculum";
import Testimonial   from "../../components/TestimonialSection/TestimonialSection";
import StudentOfWeek from "../../components/StudentOfWeek/StudentOfWeek";
import MeetTheTeacher from "../../components/MeetTheTeacher/MeetTheTeacher";
import ClassroomEssentials from "../../components/ClassroomEssentials/ClassroomEssentials";
import useLocoScroll from "../../hooks/useLocoScroll";

export default function CoursePage() {
  const { id } = useParams();
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const { loco }              = useLocoScroll(false);

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

  const { 
    course_name,
    course_subtitle,
    course_image_path,
    description,
    student_of_the_week,      
    classroom_essentials = [] 
  } = data;

  return (
    <div>
      <CourseDetails
        courseName={course_name}
        subtitle={course_subtitle}
        imagePath={course_image_path}
        description={description}
      />

      <Curriculum />

      {/*
        Pass your API array straight into the component.
        We're calling the prop `items`, but you can name it whatever you like.
      */}
      <ClassroomEssentials items={classroom_essentials} />

      <StudentOfWeek
        name={student_of_the_week || "—"}
        photo={course_image_path}
        text={`In math class this week, ${student_of_the_week ||
          "our student"} achieved remarkable success with outstanding precision and creativity.`}
      />
      {/* Meet The teacher */}
      <MeetTheTeacher
        
       />
      <Testimonial />
    </div>
  );
}
