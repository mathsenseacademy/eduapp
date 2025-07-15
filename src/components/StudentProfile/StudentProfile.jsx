import React, { useState, useEffect } from 'react';
import api from '../../api/api';          // your axios/fetch wrapper
import './StudentProfile.css';

export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        // assume you stored the OTP-login tokens in localStorage
        const token = localStorage.getItem('access');
        const res = await api.post(
          'student/verify_student_login_otp/',
          { otp: ''},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setStudent(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) return <div className="profile-loading">Loading…</div>;
  if (error)   return <div className="profile-error">{error}</div>;

  const {
    first_name,
    middle_name,
    last_name,
    student_photo_path,
    date_of_birth,
    contact_number_1,
    contact_number_2,
    student_class,
    school_or_college_name,
    board_or_university_name,
    address,
    city,
    district,
    state,
    pin,
    email,
    student_type
  } = student;

  return (
    <div className="student-profile">
      <div className="profile-card">
        <div className="photo-wrapper">
          <img
            src={student_photo_path}
            alt={`${first_name} ${last_name}`}
            className="student-photo"
          />
        </div>
        <div className="info">
          <h2>{`${first_name} ${middle_name} ${last_name}`.replace(/\s+/g,' ')}</h2>
          <p><strong>Date of Birth:</strong> {new Date(date_of_birth).toLocaleDateString()}</p>
          <p><strong>Class:</strong> {student_class}</p>
          <p><strong>Type:</strong> {student_type}</p>
          <p><strong>Contact:</strong> {contact_number_1}{contact_number_2 ? `, ${contact_number_2}` : ''}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>School/College:</strong> {school_or_college_name}</p>
          <p><strong>Board/University:</strong> {board_or_university_name}</p>
          <p><strong>Address:</strong> {`${address}, ${city}, ${district}, ${state} - ${pin}`}</p>
        </div>
      </div>
    </div>
  );
}
