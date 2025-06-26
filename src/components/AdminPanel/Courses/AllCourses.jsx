// src/components/AdminPanel/Courses/AllCourses.jsx
import React, { useEffect, useState } from "react";
import { getAllCourses } from "../../../api/courseApi";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/DataLoader";
import './AllCourses.css';

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCourses()
      .then(res => setCourses(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="loader-container">
      <Loader size={56} />
    </div>
  );

  return (
    <div className="all-courses-wrapper">
      {courses.length ? (
        courses.map(c => (
          <div
            key={c.id}
            className="course-card"
            onClick={() => navigate(`/admin/courses/edit/${c.ID}`)}
          >
            <div className="card-body">
              <h5 className="card-title">{c.course_name}</h5>
              <div className="course-card-body">
  <p>
    <strong>Class:</strong> {c.class_level}
  </p>
</div>
            </div>
            <div className="card-footer">
              {c.is_active
                ? <span className="badge inactive">Inactive</span>
                : <span className="badge active">Active</span>
              }
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No courses found.</p>
      )}
    </div>
  );
}
