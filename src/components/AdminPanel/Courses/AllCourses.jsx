// src/components/AdminPanel/Courses/AllCourses.jsx
import React, { useEffect, useState } from "react";
import { getAllCourses } from "../../../api/courseApi";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/DataLoader";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // renamed for clarity

  useEffect(() => {
    getAllCourses()
      .then((res) => setCourses(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader size={56} />;

  return (
    <div className="row g-4">
      {courses.length ? (
        courses.map((c) => (
          <div key={c.id} className="col-sm-6 col-lg-4">
            <div
              className="card h-100 shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/admin/courses/edit/${c.ID}`)}  
            >
              <div className="card-body">
                <h5 className="card-title">{c.course_name}</h5>
                <p className="card-text">
                  <strong>Class:</strong> {c.class_level}
                  <br />
                  {/* <strong>Category:</strong> {c.category} */}
                </p>
              </div>
              <div className="card-footer">
                {c.is_active ? (
                  <span className="badge bg-secondary">Inactive</span>
                ) : (
                  <span className="badge bg-secondary bg-success"> Active</span>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No courses found.</p>
      )}
    </div>
  );
}
