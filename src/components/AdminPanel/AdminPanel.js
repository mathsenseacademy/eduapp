import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://192.168.99.47:8000/administrator/students/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
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
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{`${student.first_name} ${student.middle_name || ''} ${student.last_name}`.trim()}</td>
              <td>{student.date_of_birth}</td>
              <td>{student.student_class}</td>
              <td>{student.contact_number_1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
