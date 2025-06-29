// src/components/AdminPanel/StudentEdit.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Loader from "../Loader/DataLoader";
import "./StudentEdit.css";

export default function StudentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Student data + loading/saving state
  const [student, setStudent] = useState(null);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [saving, setSaving] = useState(false);

  // Courses dropdown data + loading flag
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // 1) Fetch student details on mount
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.post("student/student_detail_by_id/", {
          student_id: parseInt(id, 10),
        });
        setStudent(data);
      } catch (err) {
        console.error("Error loading student:", err);
      } finally {
        setLoadingStudent(false);
      }
    })();
  }, [id]);

  // 2) Fetch all courses for the Class dropdown
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

  // 3) Handle any form field change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 4) Submit updated student
   // 4) Submit updated student using the new endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Build the exact payload shape you showed
      const payload = {
        student_id: parseInt(id, 10),
        first_name: student.first_name,
        middle_name: student.middle_name,
        last_name: student.last_name,
        email: student.email,
        contact_number_1: student.contact_number_1,
        contact_number_2: student.contact_number_2,
        student_class: student.student_class,          // string like "Class 10"
        school_or_college_name: student.school_or_college_name,
        board_or_university_name: student.board_or_university_name,
        address: student.address,
        city: student.city,
        district: student.district,
        state: student.state,
        pin: student.pin,
        notes: student.notes,
        is_verified: student.is_verified,
        is_activate: student.is_active,                // note field name `is_activate`
        date_of_birth: student.date_of_birth,
        student_photo_path: student.student_photo_path,
      };

      await api.post(
        "student/update_student_detail/",
        payload
      );
      navigate(-1);
    } catch (err) {
      console.error("Error saving student:", err);
    } finally {
      setSaving(false);
    }
  };


  // Only show global loader while student data is loading
  if (loadingStudent) return <Loader size={56} />;
  if (!student) return <p>Student not found</p>;

  return (
    <div className="student-edit-container">
    <h2 className="student-edit-title">
        Edit Student:{" "}
        {[student.first_name, student.middle_name, student.last_name]
          .filter(Boolean)
          .join(" ")}
      </h2>
      {/* Photo preview */}
      {student.student_photo_path && (
        <div className="student-photo-preview">
          <img
            src={student.student_photo_path}
            alt="Student"
            className="student-photo-img"
          />
        </div>
      )}

      {/* <h2 className="student-edit-title">
        Edit Student:{" "}
        {[student.first_name, student.middle_name, student.last_name]
          .filter(Boolean)
          .join(" ")}
      </h2> */}

      <form onSubmit={handleSubmit} className="student-edit-form">
        {/* First Name */}
        <label>
          First Name
          <input
            name="first_name"
            value={student.first_name || ""}
            onChange={handleChange}
            required
          />
        </label>

        {/* Middle Name */}
        <label>
          Middle Name
          <input
            name="middle_name"
            value={student.middle_name || ""}
            onChange={handleChange}
          />
        </label>

        {/* Last Name */}
        <label>
          Last Name
          <input
            name="last_name"
            value={student.last_name || ""}
            onChange={handleChange}
          />
        </label>

        {/* Email */}
        <label>
          Email
          <input
            type="email"
            name="email"
            value={student.email || ""}
            onChange={handleChange}
          />
        </label>

        {/* Contact #1 */}
        <label>
          Contact #1
          <input
            type="tel"
            name="contact_number_1"
            value={student.contact_number_1 || ""}
            onChange={handleChange}
          />
        </label>

        {/* Contact #2 */}
        <label>
          Contact #2
          <input
            type="tel"
            name="contact_number_2"
            value={student.contact_number_2 || ""}
            onChange={handleChange}
          />
        </label>

        {/* Class dropdown */}
        <label>
          Class
          {loadingCourses ? (
            <select disabled>
              <option>Loading classes…</option>
            </select>
          ) : (
            <select
              name="student_class"
              value={student.student_class || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select a class</option>
              {courses.map((c) => (
                <option key={c.ID} value={c.ID}>
                  {`${c.msa_class_level} (${c.course_name})`}
                </option>
              ))}
            </select>
          )}
        </label>

        {/* School / College */}
        <label>
          School / College
          <input
            name="school_or_college_name"
            value={student.school_or_college_name || ""}
            onChange={handleChange}
          />
        </label>

        {/* Board / University */}
        <label>
          Board / University
          <input
            name="board_or_university_name"
            value={student.board_or_university_name || ""}
            onChange={handleChange}
          />
        </label>

        {/* Address */}
        <label>
          Address
          <textarea
            name="address"
            value={student.address || ""}
            onChange={handleChange}
            rows={2}
          />
        </label>

        {/* City */}
        <label>
          City
          <input
            name="city"
            value={student.city || ""}
            onChange={handleChange}
          />
        </label>

        {/* District */}
        <label>
          District
          <input
            name="district"
            value={student.district || ""}
            onChange={handleChange}
          />
        </label>

        {/* State */}
        <label>
          State
          <input
            name="state"
            value={student.state || ""}
            onChange={handleChange}
          />
        </label>

        {/* PIN */}
        <label>
          PIN
          <input
            type="number"
            name="pin"
            value={student.pin || ""}
            onChange={handleChange}
          />
        </label>

        {/* Notes */}
        <label>
          Notes
          <textarea
            name="notes"
            value={student.notes || ""}
            onChange={handleChange}
            rows={3}
          />
        </label>

        {/* Date of Birth */}
        <label>
          Date of Birth
          <input
            type="date"
            name="date_of_birth"
            value={student.date_of_birth || ""}
            onChange={handleChange}
          />
        </label>

        {/* Active? */}
        <label>
          Active?
          <input
            type="checkbox"
            name="is_active"
            checked={!!student.is_active}
            onChange={handleChange}
          />
        </label>

        {/* Verified? */}
        <label>
          Verified?
          <input
            type="checkbox"
            name="is_verified"
            checked={!!student.is_verified}
            onChange={handleChange}
          />
        </label>

        {/* Form buttons */}
        <div className="form-buttons">
          <button type="submit" disabled={saving}>
            {saving ? "Saving…" : "update"}
          </button>
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
