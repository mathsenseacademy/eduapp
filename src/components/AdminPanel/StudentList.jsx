// src/components/AdminPanel/StudentList.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import Loader from "../Loader/DataLoader";
import "./StudentList.css";
import { useNavigate } from "react-router-dom";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const navigate = useNavigate();

  // Fetch students
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get("student/student_list/");
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Fetch courses for class lookup
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(
          "coursemanegment/all_courses_show_public/"
        );
        setCourses(data);
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        setLoadingCourses(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="student-list-loading">
        <Loader size={56} />
      </div>
    );
  }

  return (
    <div className="student-list-container">
      <h2 className="student-list-title">Student Directory</h2>
      <div className="table-wrap">
        <table className="student-table">
          <thead>
            <tr>
              <th className="avatar-col">Photo</th>
              <th>Student ID</th>
              <th>Name</th>
              {/* <th>Date of Birth</th> */}
              <th>Class</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Active?</th>
              <th>Verified?</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => {
              const fullName = [s.first_name, s.middle_name, s.last_name]
                .filter(Boolean)
                .join(" ");

              // find matching course
              const course = courses.find((c) => c.ID === s.student_class);
              const classLabel = loadingCourses
                ? "Loading..."
                : course
                ? `${course.msa_class_level} (${course.course_name})`
                : s.student_class;

              return (
                <tr
                  key={s.ID}
                  className="clickable-row"
                  onClick={() => navigate(`/admin/students/edit/${s.ID}`)}
                >
                  <td className="avatar-col">
                    <img
                      className="student-avatar"
                      src={s.student_photo_path || "/placeholder.jpg"}
                      alt={fullName}
                    />
                  </td>
                  <td>{s.student_id}</td>
                  <td>{fullName}</td>
                  {/* <td>{s.date_of_birth}</td> */}
                  <td>{classLabel}</td>
                  <td>{s.contact_number_1}</td>
                  <td>{s.email}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={!!s.is_active}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={!!s.is_verified}
                      disabled
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
