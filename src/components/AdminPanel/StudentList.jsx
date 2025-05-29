// src/components/AdminPanel/StudentList.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import Loader from "../Loader/DataLoader";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get("administrator/students/");
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Student List</h2>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date&nbsp;of&nbsp;Birth</th>
            <th>Class</th>
            <th>Contact</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                <Loader size={56} />
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{`${s.first_name} ${s.middle_name || ""} ${s.last_name}`.trim()}</td>
                <td>{s.date_of_birth}</td>
                <td>{s.student_class}</td>
                <td>{s.contact_number_1}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
