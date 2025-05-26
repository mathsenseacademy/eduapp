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
    notes: '',
    email: ''
  });

  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const showToast = (message, type = 'success', duration = 3000) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), duration);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      showToast('Email is required.', 'danger');
      return;
    }

    try {
      await api.post('student/register/', formData);
      showToast('Registered successfully. Please enter OTP.', 'success');
      setShowOtpModal(true);
    } catch (err) {
      console.error(err);
      let message = 'Registration failed.';
      if (err.message.includes('Network Error')) {
        message = 'Connection refused. Please try again later.';
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      }
      showToast(message, 'danger');
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp.trim()) {
      showToast('OTP is required.', 'danger');
      return;
    }

    try {
      await api.post('student/otpverify/', { email: formData.email, otp });
      showToast('OTP Verified! 🎉', 'success');
      setShowOtpModal(false);
      navigate('/');
    } catch (err) {
      console.error(err);
      let message = 'OTP verification failed.';
      if (err.message.includes('Network Error')) {
        message = 'Connection refused. Please try again later.';
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      }
      showToast(message, 'danger');
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Student Registration</h2>
      <form onSubmit={handleRegisterSubmit}>
        <div className="row">
          <div className="col-md-4 mb-3">
            <input name="first_name" placeholder="First Name" className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-3">
            <input name="middle_name" placeholder="Middle Name" className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-3">
            <input name="last_name" placeholder="Last Name" className="form-control" onChange={handleChange} />
          </div>
        </div>

        <div className="mb-3">
          <label>Date of Birth</label>
          <input type="date" name="date_of_birth" className="form-control" onChange={handleChange} />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <input name="contact_number_1" placeholder="Primary Contact" className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <input name="contact_number_2" placeholder="Alternate Contact" className="form-control" onChange={handleChange} />
          </div>
        </div>

        <input name="student_class" placeholder="Class" className="form-control mb-3" onChange={handleChange} />
        <input name="school_or_college_name" placeholder="School/College Name" className="form-control mb-3" onChange={handleChange} />
        <input name="board_or_university_name" placeholder="Board/University" className="form-control mb-3" onChange={handleChange} />
        <textarea name="address" placeholder="Address" className="form-control mb-3" onChange={handleChange} />

        <div className="row">
          <div className="col-md-4 mb-3">
            <input name="city" placeholder="City" className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-3">
            <input name="district" placeholder="District" className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-3">
            <input name="state" placeholder="State" className="form-control" onChange={handleChange} />
          </div>
        </div>

        <input name="pin" placeholder="PIN Code" className="form-control mb-3" onChange={handleChange} />
        <textarea name="notes" placeholder="Notes (optional)" className="form-control mb-3" onChange={handleChange} />

        <input type="email" name="email" placeholder="Email *" className="form-control mb-3" onChange={handleChange} required />

        <button className="btn btn-success w-100" type="submit">Submit Registration</button>
      </form>

      {/* Toast Notification */}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
        <div className={`toast align-items-center text-bg-${toast.type} border-0 ${toast.show ? 'show' : 'hide'}`} role="alert">
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToast({ ...toast, show: false })}></button>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Enter OTP</h5>
                <button type="button" className="btn-close" onClick={() => setShowOtpModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP sent to your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowOtpModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleOtpSubmit}>Verify OTP</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRegister;
