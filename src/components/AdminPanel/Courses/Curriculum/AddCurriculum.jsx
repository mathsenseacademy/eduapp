// src/components/AdminPanel/Courses/AddCurriculum.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/api';
import './AddCurriculum.css';

export default function AddCurriculum() {
  const [curriculumNames, setCurriculumNames] = useState(['']);
  const [courseId, setCourseId]           = useState('');
  const [courses, setCourses]             = useState([]);
  const [error, setError]                 = useState(null);
  const navigate = useNavigate();

  // 1️⃣ Fetch courses on mount
  useEffect(() => {
    api.get('coursemanegment/all_courses_show_public/')  
      .then(res => {
        // map your API’s { ID, course_name } → { id, name }
        const normalized = res.data.map(c => ({
          id:   c.ID,
          name: c.course_name
        }));
        setCourses(normalized);
      })
      .catch(err => setError('Failed to load courses.'));
  }, []);

  // 2️⃣ Handlers for dynamic curriculum name fields
  const handleNameChange = (idx, value) => {
    const names = [...curriculumNames];
    names[idx]    = value;
    setCurriculumNames(names);
  };

  const addField    = () => setCurriculumNames([...curriculumNames, '']);
  const removeField = idx => {
    if (curriculumNames.length === 1) return;
    setCurriculumNames(curriculumNames.filter((_, i) => i !== idx));
  };

  // 3️⃣ Submit all names
  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    if (!courseId) {
      setError('Please select a course.');
      return;
    }

    try {
      // send one POST per curriculum name
          console.log("printID:",courseId);

      await Promise.all(
        curriculumNames.map(name =>          
          api.post('/coursemanegment/add_course_curriculum/', {
            curriculum_name: name.trim(),
            course_id: Number(courseId),
            // course_id:3,
          })
        )
      );
      navigate('/admin/courses/curriculums');
    } catch (err) {
      setError(err.response?.data || 'Something went wrong.');
    }
  };

  return (
    <div className="add-curriculum-container">
      <h2>Add New Curriculum</h2>
      <form onSubmit={handleSubmit} className="add-curriculum-form">
        {/* Course selector */}
        <label>
          Select Course
          <select
            value={courseId}
            onChange={e => setCourseId(e.target.value)}
            // required
          >
            <option value="" disabled>-- pick a course --</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.name }
              </option>
            ))}
          </select>
        </label>

        {/* Dynamic curriculum name inputs */}
        {curriculumNames.map((name, idx) => (
          <div key={idx} className="name-field">
            <label>
              Curriculum Name {idx + 1}
              <input
                type="text"
                value={name}
                onChange={e => handleNameChange(idx, e.target.value)}
                required
              />
            </label>
            {curriculumNames.length > 1 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeField(idx)}
              >
                &times;
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="add-btn"
          onClick={addField}
        >
          + Add Another Curriculum
        </button>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="submit-btn">
          Create Curriculum{curriculumNames.length > 1 ? 's' : ''}
        </button>
      </form>
    </div>
  );
}
