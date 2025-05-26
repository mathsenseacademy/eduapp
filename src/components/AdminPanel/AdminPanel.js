import React, { useEffect, useState } from "react";
import api from "../../api/api";
import Loader from "../Loader/DataLoader";

const AdminPanel = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
     setLoading(true);   
      try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get("administrator/students/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }finally {
      setLoading(false);                          
    }
    };

    fetchStudents();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Student List</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Class</th>
            <th>Contact</th>
          </tr>
        </thead>
       <tbody>
          {loading ? (
            // one centered row while loading
            <tr>
              <td colSpan="5" className="text-center py-4">
                <Loader size={56} />
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{`${student.first_name} ${student.middle_name || ""} ${student.last_name}`.trim()}</td>
                <td>{student.date_of_birth}</td>
                <td>{student.student_class}</td>
                <td>{student.contact_number_1}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
