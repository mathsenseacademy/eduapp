// src/components/AdminPanel/Courses/Essentials.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllCourses,
  getEssentialsById,
  addClassroomEssential,
  editClassroomEssential
} from "../../../../api/courseApi";
import './Essentials.css';

export default function EditEssentials() {
  const { essentialsId } = useParams(); 
  const isEdit = Boolean(essentialsId);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [items, setItems] = useState([{ name: "", description: "", ID: null, is_activate: 1 }]);
  const [error, setError] = useState(null);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // load all courses
  useEffect(() => {
    getAllCourses()
      .then(res => setCourses(res.data.map(c => ({ id: c.ID, name: c.course_name }))))
      .catch(() => setError('Failed to load courses.'))
      .finally(() => setLoadingCourses(false));
  }, []);

  // load existing essentials for this ID
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const res = await getEssentialsById({ essentials_id: Number(essentialsId) });
        const data = res.data;
        const rows = Array.isArray(data)
          ? data.map(e => ({
              name: e.classroom_essentials_name,
              description: e.classroom_essentials_description,
              ID: e.ID,
              is_activate: e.is_activate,
              course_id: e.course_id
            }))
          : [{
              name: data.classroom_essentials_name,
              description: data.classroom_essentials_description,
              ID: data.ID,
              is_activate: data.is_activate,
              course_id: data.course_id
            }];
        setItems(rows);
        setSelectedCourse(String(rows[0].course_id));
      } catch {
        setError('Failed to load essentials.');
      }
    })();
  }, [essentialsId, isEdit]);

  const handleCourseChange = e => setSelectedCourse(e.target.value);
  const handleItemChange = (idx, field, value) => {
    const next = [...items];
    next[idx] = { ...next[idx], [field]: value };
    setItems(next);
  };
  const addItem = () => setItems([...items, { name: "", description: "", ID: null, is_activate: 1 }]);
  const removeItem = idx => items.length > 1 && setItems(items.filter((_, i) => i !== idx));

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    if (!selectedCourse) {
      return setError('Please select a course.');
    }
    try {
      await Promise.all(
        items.map(item => {
          const payload = {
            classroom_essentials_name:         item.name.trim(),
            classroom_essentials_description:  item.description.trim(),
            course_id:                        Number(selectedCourse)
          };
          if (isEdit && item.ID) {
            return editClassroomEssential({
              essentials_id: item.ID,
              ...payload,
              is_activate: item.is_activate ? 1 : 0
            });
          }
          return addClassroomEssential(payload);
        })
      );
      navigate('/admin/courses/essentials');
    } catch {
      setError('Failed to save essentials.');
    }
  };

  // show loader while courses load
  if (loadingCourses) {
    return (
      <div className="loader-container">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="essentials-container">
      <h2>{isEdit ? 'Edit' : 'Add'} Classroom Essentials</h2>
      <form onSubmit={handleSubmit} className="essentials-form">
        <label>
          Select Course
          <select value={selectedCourse} onChange={handleCourseChange} required>
            <option value="" disabled>-- pick a course --</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        {items.map((item, idx) => (
          <div className="essentials-row" key={idx}>
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                value={item.name}
                onChange={e => handleItemChange(idx, 'name', e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>Description</label>
              <textarea
                value={item.description}
                onChange={e => handleItemChange(idx, 'description', e.target.value)}
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
                    onChange={e => handleItemChange(idx, 'is_activate', e.target.checked ? 1 : 0)}
                  />
                </label>
              </div>
            )}
            {items.length > 1 && (
              <button type="button" className="remove-btn" onClick={() => removeItem(idx)}>&times;</button>
            )}
          </div>
        ))}

        <button type="button" className="add-btn" onClick={addItem}>+ Add Another Essential</button>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="submit-btn">
          {isEdit ? 'Update Essentials' : 'Save Essentials'}
        </button>
      </form>
    </div>
  );
}
