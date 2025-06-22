import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../../api/api';
import './AllCurriculums.css';

export default function AllCurriculums() {
  const [curricula, setCurricula] = useState([]);
  const [error, setError]         = useState(null);

  useEffect(() => {
    api.get('/coursemanegment/show_all_curriculums/')
      .then(res => setCurricula(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to load curricula.');
      });
  }, []);

  if (error) {
    return <div className="ac-error">{error}</div>;
  }

  return (
    <div className="ac-container">
      <h2>All Curriculums</h2>

      <table className="ac-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Curriculum Name</th>
            <th>Course ID</th>
            <th>Active?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {curricula.map(item => (
            <tr key={item.curriculum_id}>
              <td>{item.curriculum_id}</td>
              <td>{item.curriculum_name}</td>
              <td>{item.ID}</td>
              <td>{item.is_activate ? 'Yes' : 'No'}</td>
              <td className="ac-actions">
                <Link
                  to={`/admin/courses/curriculums/edit/${item.curriculum_id}`}
                  className="btn edit"
                >
                  Edit
                </Link>
                <button
                  className="btn delete"
                  onClick={() => {
                    if (window.confirm('Delete this curriculum?')) {
                      api
                        .delete(
                          `/coursemanegment/delete_curriculum/${item.curriculum_id}/`
                        )
                        .then(() =>
                          setCurricula(curricula.filter(c => c.curriculum_id !== item.curriculum_id))
                        )
                        .catch(() => alert('Delete failed.'));
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
