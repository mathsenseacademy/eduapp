// src/components/AdminPanel/Courses/Curriculum/EditCurriculum.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllCourses,
  getCurriculumById,
  editCurriculum,
} from "../../../../api/courseApi";
import "./EditCurriculum.css";

export default function EditCurriculum() {
  const { id } = useParams(); // route: /admin/courses/curriculums/edit/:id
  const [curriculumName, setCurriculumName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch courses on mount
  useEffect(() => {
    getAllCourses().then((res) =>
      setCourses(res.data.map((c) => ({ id: c.ID, name: c.course_name })))
    );
  }, []);

  // Fetch curriculum details
  useEffect(() => {
    (async () => {
      try {
        const res = await getCurriculumById({ curriculum_id: Number(id) });
        const data = res.data;
        console.log("got curriculum:", data);

        // name and active flag map directly
        setCurriculumName(data.curriculum_name);
        setIsActive(data.is_activate === 1);

        // if your API really returns course_id, use it…
        // otherwise fall back to ID
        const incomingCourseId = data.course_id ?? data.ID;
        setCourseId(String(incomingCourseId));
      } catch (err) {
        setError("Failed to load curriculum details.");
      }
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!courseId) {
      setError("Please select a course.");
      return;
    }
    if (!curriculumName.trim()) {
      setError("Curriculum name cannot be empty.");
      return;
    }

    try {
      await editCurriculum({
        curriculum_id: Number(id),
        curriculum_name: curriculumName.trim(),
        course_id: Number(courseId),
        is_activate: isActive ? 1 : 0,
      });
      navigate("/admin/courses/curriculums");
    } catch (err) {
      setError(err.response?.data || "Update failed.");
    }
  };

  return (
    <div className="edit-curriculum-container">
      <h2>Edit Curriculum</h2>
      <form onSubmit={handleSubmit} className="edit-curriculum-form">
        <label>
          Select Course
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          >
            <option value="" disabled>
              -- pick a course --
            </option>
            {/* {courses.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))} */}
            {courses.map((c) => (
              <option
                key={c.id}
                value={c.id}
                style={{
                  fontWeight: c.id === Number(courseId) ? "bold" : "normal",
                }}
              >
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Curriculum Name
          <input
            type="text"
            value={curriculumName}
            onChange={(e) => setCurriculumName(e.target.value)}
            required
          />
        </label>

        <label className="activate-toggle">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active
        </label>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}
