// src/components/AdminPanel/Courses/Essentials.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../api/api"; // your axios instance
import "./Essentials.css";

export default function Essentials() {
  const { courseId } = useParams();           // -> undefined or "1" etc.
  const isEdit      = Boolean(courseId);
  const navigate    = useNavigate();

  // all courses for the dropdown
  const [courses, setCourses] = useState([]);
  // which course we're managing
  const [selectedCourse, setSelectedCourse] = useState("");
  // dynamic name/description rows
  const [items, setItems] = useState([{ name: "", description: "" }]);
  const [error, setError] = useState(null);

  // 1️⃣ fetch the list of all courses
  useEffect(() => {
    api.get("/coursemanegment/all_courses_show_public/")
      .then(res => setCourses(res.data))
      .catch(() => setError("Failed to load courses"));
  }, []);

  // 2️⃣ if editing, fetch the existing essentials for this course
  useEffect(() => {
    if (!isEdit) return;

    // pre-select the course in the dropdown
    setSelectedCourse(courseId);

    api.post("/coursemanegment/show_classroom_essentials_by_id/", { id: Number(courseId) })
      .then(res => {
        // res.data is an array of { ID, classroom_essentials_name, classroom_essentials_description, is_activate }
        const rows = res.data.map(e => ({
          name: e.classroom_essentials_name,
          description: e.classroom_essentials_description,
          ID: e.ID,
          is_activate: e.is_activate
        }));
        setItems(rows.length ? rows : [{ name: "", description: "" }]);
      })
      .catch(() => {
        setError("Failed to load existing essentials");
      });
  }, [courseId, isEdit]);

  // handle changing the course selector
  const handleCourseChange = e => setSelectedCourse(e.target.value);

  // 3️⃣ dynamic row handlers
  const handleItemChange = (idx, field, value) => {
    const next = [...items];
    next[idx][field] = value;
    setItems(next);
  };
  const addItem = () =>
    setItems([...items, { name: "", description: "" }]);
  const removeItem = idx => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== idx));
  };

  // 4️⃣ submit—either create new or update existing
  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    if (!selectedCourse) {
      setError("Please select a course first.");
      return;
    }

    try {
      await Promise.all(
        items.map(item => {
          const payload = {
            classroom_essentials_name:         item.name.trim(),
            classroom_essentials_description: item.description.trim(),
            course_id:                        Number(selectedCourse)
          };
          if (isEdit && item.ID) {
            // editing an existing row
            return api.post("/coursemanegment/edit_classroom_essentials/", {
              essentials_id:                    item.ID,
              ...payload,
              is_activate:                      item.is_activate ? 1 : 0
            });
          } else {
            // creating a brand-new row
            return api.post("/coursemanegment/add_classroom_essentials/", payload);
          }
        })
      );

      // after save, go back to the list
      navigate("/admin/courses/essentials");
    } catch (err) {
      console.error(err);
      setError("Failed to save essentials.");
    }
  };

  return (
    <div className="essentials-container">
      <h2>{isEdit ? "Edit" : "Manage"} Classroom Essentials</h2>

      <form onSubmit={handleSubmit} className="essentials-form">
        {/* Course selector */}
        <label>
          Select Course
          <select value={selectedCourse} onChange={handleCourseChange} required>
            <option value="" disabled>-- pick a course --</option>
            {Array.isArray(courses) &&
              courses.map(c => (
                <option key={c.ID || c.id} value={c.ID || c.id}>
                  {c.course_name || c.title}
                </option>
              ))}
          </select>
        </label>

        {/* Dynamic rows */}
        {items.map((item, idx) => (
          <div className="essentials-row" key={idx}>
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                value={item.name}
                onChange={e => handleItemChange(idx, "name", e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>Description</label>
              <textarea
                value={item.description}
                onChange={e => handleItemChange(idx, "description", e.target.value)}
                required
              />
            </div>
            {isEdit && item.ID != null && (
              <div className="field">
                <label>
                  Active
                  <input
                    type="checkbox"
                    checked={item.is_activate === 1}
                    onChange={e =>
                      handleItemChange(idx, "is_activate", e.target.checked ? 1 : 0)
                    }
                  />
                </label>
              </div>
            )}
            {items.length > 1 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeItem(idx)}
              >
                &times;
              </button>
            )}
          </div>
        ))}

        <button type="button" className="add-btn" onClick={addItem}>
          + Add Another Essential
        </button>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="submit-btn">
          {isEdit ? "Update Essentials" : "Save Essentials"}
        </button>
      </form>
    </div>
  );
}
