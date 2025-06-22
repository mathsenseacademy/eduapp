import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllClassroomEssentials,
  deleteClassroomEssential
} from "../../../../api/courseApi";

import "./AllClassroomEssentials.css";

export default function AllClassroomEssentials() {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const navigate = useNavigate();

  // load list
  const fetchList = () => {
    setLoading(true);
    getAllClassroomEssentials()
      .then((res) => setItems(res.data))
      .catch(() => setError("Failed to load classroom essentials."))
      .finally(() => setLoading(false));
  };

  useEffect(fetchList, []);

  // call delete API then refresh
  const handleDelete = (ID) => {
    if (!window.confirm("Delete this essential?")) return;
    deleteClassroomEssential(ID)
      .then(() => fetchList())
      .catch(() => alert("Delete failed"));
  };

  if (loading) return <div>Loading essentials…</div>;
  if (error)   return <div className="ace-error">{error}</div>;

  return (
    <div className="ace-wrapper">
      <h2>All Classroom Essentials</h2>
      <table className="ace-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Active?</th>
            <th>Actions</th>               {/* ← new column */}
          </tr>
        </thead>
        <tbody>
          {items.map((e) => (
            <tr key={e.ID}>
              <td>{e.ID}</td>
              <td>{e.classroom_essentials_name}</td>
              <td>{e.classroom_essentials_description}</td>
              <td>{e.is_activate ? "Yes" : "No"}</td>
              <td>
                {/* Navigate to your edit form, e.g. /admin/courses/essentials/edit/1 */}
                <button
                  className="ace-btn ace-btn--edit"
                  onClick={() =>
                    navigate(`/admin/courses/essentials/edit/${e.ID}`)
                  }
                >
                  Edit
                </button>
                <button
                  className="ace-btn ace-btn--delete"
                  onClick={() => handleDelete(e.ID)}
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
