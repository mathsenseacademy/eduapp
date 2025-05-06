import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import './StudentRegister.css';


const StudentRegister = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    date_of_birth: '',
    contact_number_1: '',
    contact_number_2: '',
    student_class: '',
    school_or_college_name: '',
    board_or_university_name: '',
    address: '',
    city: '',
    district: '',
    state: '',
    pin: '',
    notes: ''
  });

//   const [error, setError] = useState(null);
// const [success, setSuccess] = useState(null);
const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('student/register/', formData);
      setToast({ show: true, message: 'Registration successful!', type: 'success' });
      setTimeout(() => {
        setToast({ ...toast, show: false });
        navigate('/');
      }, 2500);
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: 'Registration failed. Please check all fields.', type: 'danger' });
      setTimeout(() => setToast({ ...toast, show: false }), 3000);
    }
  };
  
  

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Student Registration</h2>
      <form onSubmit={handleSubmit}>
      {/* {success && (
  <div className="alert alert-success alert-dismissible fade show" role="alert">
    {success}
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
)}
{error && (
  <div className="alert alert-danger alert-dismissible fade show" role="alert">
    {error}
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
)} */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <input name="first_name" placeholder="First Name" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-md-4 mb-3">
            <input name="middle_name" placeholder="Middle Name" className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-3">
            <input name="last_name" placeholder="Last Name" className="form-control" onChange={handleChange} required />
          </div>
        </div>

        <div className="mb-3">
          <label>Date of Birth</label>
          <input type="date" name="date_of_birth" className="form-control" onChange={handleChange} required />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <input name="contact_number_1" placeholder="Primary Contact" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <input name="contact_number_2" placeholder="Alternate Contact" className="form-control" onChange={handleChange} />
          </div>
        </div>

        <input name="student_class" placeholder="Class" className="form-control mb-3" onChange={handleChange} required />
        <input name="school_or_college_name" placeholder="School/College Name" className="form-control mb-3" onChange={handleChange} required />
        <input name="board_or_university_name" placeholder="Board/University" className="form-control mb-3" onChange={handleChange} required />
        <textarea name="address" placeholder="Address" className="form-control mb-3" onChange={handleChange} required />
        
        <div className="row">
          <div className="col-md-4 mb-3">
            <input name="city" placeholder="City" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-md-4 mb-3">
            <input name="district" placeholder="District" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-md-4 mb-3">
            <input name="state" placeholder="State" className="form-control" onChange={handleChange} required />
          </div>
        </div>

        <input name="pin" placeholder="PIN Code" className="form-control mb-3" onChange={handleChange} required />
        <textarea name="notes" placeholder="Notes (optional)" className="form-control mb-3" onChange={handleChange} />

        <button className="btn btn-success w-100" type="submit">Submit Registration</button>
        {/* {error && <p className="text-danger mt-3">{error}</p>} */}
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
  <div className={`toast align-items-center text-bg-${toast.type} border-0 ${toast.show ? 'show' : 'hide'}`} role="alert">
    <div className="d-flex">
      <div className="toast-body">{toast.message}</div>
      <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToast({ ...toast, show: false })}></button>
    </div>
  </div>
</div>

      </form>
    </div>
  );
};

export default StudentRegister;
