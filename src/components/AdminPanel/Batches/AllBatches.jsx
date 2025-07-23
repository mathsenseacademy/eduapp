// src/components/AdminPanel/Batches/AllBatches.jsx
import React, { useEffect, useState } from "react";
import { getAllBatches } from "../../../api/batchApi";
import { Link } from "react-router-dom";

export default function AllBatches() {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    getAllBatches()
      .then(res => setBatches(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>All Batches</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th><th>Course</th><th>Schedules</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {batches.map(b => (
<<<<<<< HEAD
            <tr key={b.batch_id}>
=======
            <tr key={b.id}>
>>>>>>> 937e57e59ea28d74ed2a5eff2da053073c13c819
              <td>{b.batch_name}</td>
              <td>{b.course_name}</td>
              <td>
                {b.schedules.map(s => (
                  <div key={s.weekday}>
                    {s.weekday} {s.start_time}-{s.end_time}
                  </div>
                ))}
              </td>
              <td>
<<<<<<< HEAD
                <Link to={`../edit/${b.batch_id}`} className="btn btn-sm btn-primary">Edit</Link>{" "}
                <Link to={`../fee/${b.batch_id}`}  className="btn btn-sm btn-success">Set Fee</Link>{" "}
                <Link to={`../status/${b.batch_id}`} className="btn btn-sm btn-info">Fee Status</Link>
=======
                <Link to={`../edit/${b.id}`} className="btn btn-sm btn-primary">Edit</Link>{" "}
                <Link to={`../fee/${b.id}`}  className="btn btn-sm btn-success">Add Fee</Link>{" "}
                <Link to={`../status/${b.id}`} className="btn btn-sm btn-info">Fee Status</Link>
>>>>>>> 937e57e59ea28d74ed2a5eff2da053073c13c819
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
