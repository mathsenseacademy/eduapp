// src/components/AdminPanel/Courses/CreateCourse.jsx
import React, { useState } from "react";
import { createCourse } from "../../../api/courseApi";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/DataLoader";

export default function CreateCourse() {
  const [f, setF] = useState({
    course_name: "",
    class_level: "",
    category:    "",
    focus_area:  "",
  });
  const [saving, setSaving] = useState(false);
  const nav = useNavigate();

  const update = (e) => setF({ ...f, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createCourse(f);
      alert("Course created!");
      nav("/admin/courses/all");
    } catch {
      alert("Failed to create course");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto" style={{ maxWidth: 600 }}>
      <h2>Create Course</h2>
      {["course_name","class_level","category","focus_area"].map((field) => (
        <div className="mb-3" key={field}>
          <label className="form-label">
            {field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </label>
          {field === "focus_area" ? (
            <textarea
              className="form-control"
              name={field}
              value={f[field]}
              onChange={update}
              rows={3}
              required
            />
          ) : (
            <input
              type="text"
              className="form-control"
              name={field}
              value={f[field]}
              onChange={update}
              required
            />
          )}
        </div>
      ))}
      <button className="btn btn-primary" disabled={saving}>
        {saving ? <Loader size={20} /> : "Create"}
      </button>
    </form>
  );
}
