// src/components/AdminPanel/Batches/FeeStatus.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  getStudentFeeStatus, 
  recordPayment, 
  validatePaymentData 
} from "../../../api/batchApi";

export default function FeeStatus() {
  const { id } = useParams();
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentModal, setPaymentModal] = useState({
    show: false,
    studentId: null,
    studentName: '',
    feeTitle: '',
    amount: '',
    batchFeeId: null
  });

  useEffect(() => {
    loadFeeStatus();
  }, [id]);

  const loadFeeStatus = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getStudentFeeStatus(id);
      setStatus(res.data || []);
    } catch (error) {
      console.error('Error loading fee status:', error);
      setError('Failed to load fee status. Please try again.');
    }
    setLoading(false);
  };

  const handleMarkAsPaid = (studentId, studentName, fee) => {
    setPaymentModal({
      show: true,
      studentId,
      studentName,
      feeTitle: fee.fee_title,
      amount: fee.amount,
      batchFeeId: fee.batch_fee_id || null
    });
  };

  const handlePaymentSubmit = async (paymentData) => {
    try {
      setLoading(true);
      setError('');
      
      const paymentPayload = {
        student_id: paymentModal.studentId,
        batch_fee_id: paymentModal.batchFeeId,
        payment_status: 'paid',
        payment_date: paymentData.paymentDate,
        transaction_id: paymentData.transactionId
      };

      // Validate payment data
      const validation = validatePaymentData(paymentPayload);
      if (!validation.isValid) {
        alert(`Validation errors:\n${validation.errors.join('\n')}`);
        return;
      }

      await recordPayment(paymentPayload);
      
      // Reload the data to show updated status
      await loadFeeStatus();
      setPaymentModal({ 
        show: false, 
        studentId: null, 
        studentName: '', 
        feeTitle: '', 
        amount: '', 
        batchFeeId: null 
      });
      
      // Show success message
      alert('Payment recorded successfully!');
    } catch (error) {
      console.error('Error recording payment:', error);
      setError('Error recording payment. Please try again.');
      alert('Error recording payment. Please try again.');
    }
    setLoading(false);
  };

  const getStatusBadgeClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'paid': return 'badge bg-success';
      case 'unpaid': return 'badge bg-danger';
      case 'partial': return 'badge bg-warning';
      default: return 'badge bg-secondary';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not paid';
    return new Date(dateString).toLocaleDateString();
  };

  const calculateTotalStats = () => {
    let totalStudents = status.length;
    let totalFees = 0;
    let totalPaid = 0;
    let totalUnpaid = 0;
    let totalPendingStudents = 0;

    status.forEach(student => {
      let hasUnpaidFees = false;
      student.fees.forEach(fee => {
        totalFees += parseFloat(fee.amount || 0);
        if (fee.payment_status === 'paid') {
          totalPaid += parseFloat(fee.amount || 0);
        } else {
          totalUnpaid += parseFloat(fee.amount || 0);
          hasUnpaidFees = true;
        }
      });
      if (hasUnpaidFees) {
        totalPendingStudents++;
      }
    });

    return { 
      totalStudents, 
      totalFees, 
      totalPaid, 
      totalUnpaid, 
      totalPendingStudents,
      collectionRate: totalFees > 0 ? ((totalPaid / totalFees) * 100).toFixed(1) : 0
    };
  };

  const stats = calculateTotalStats();

  if (loading && status.length === 0) {
    return (
      <div className="d-flex justify-content-center p-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-12">
        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError('')}
            ></button>
          </div>
        )}

        {/* Enhanced Summary Cards */}
        <div className="row mb-4">
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card bg-primary text-white h-100">
              <div className="card-body">
                <h6 className="card-title">Total Students</h6>
                <h3 className="mb-0">{stats.totalStudents}</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card bg-info text-white h-100">
              <div className="card-body">
                <h6 className="card-title">Total Fees</h6>
                <h3 className="mb-0">₹{stats.totalFees.toLocaleString()}</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card bg-success text-white h-100">
              <div className="card-body">
                <h6 className="card-title">Total Paid</h6>
                <h3 className="mb-0">₹{stats.totalPaid.toLocaleString()}</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card bg-danger text-white h-100">
              <div className="card-body">
                <h6 className="card-title">Total Unpaid</h6>
                <h3 className="mb-0">₹{stats.totalUnpaid.toLocaleString()}</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card bg-warning text-white h-100">
              <div className="card-body">
                <h6 className="card-title">Pending Students</h6>
                <h3 className="mb-0">{stats.totalPendingStudents}</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
            <div className="card bg-dark text-white h-100">
              <div className="card-body">
                <h6 className="card-title">Collection Rate</h6>
                <h3 className="mb-0">{stats.collectionRate}%</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-info-subtle d-flex justify-content-between align-items-center">
            <h2>Student Fee Status for Batch</h2>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-primary btn-sm" 
                onClick={() => {/* Add export functionality */}}
                disabled={loading || status.length === 0}
              >
                Export Report
              </button>
              <button 
                className="btn btn-primary" 
                onClick={loadFeeStatus}
                disabled={loading}
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
          <div className="card-body">
            {status.length === 0 ? (
              <div className="text-center p-4">
                <p className="text-muted">No students found in this batch.</p>
              </div>
            ) : (
              <div className="row">
                {status?.map((student, studentIndex) => {
                  const studentTotal = student.fees.reduce((sum, fee) => sum + parseFloat(fee.amount || 0), 0);
                  const studentPaid = student.fees.reduce((sum, fee) => 
                    sum + (fee.payment_status === 'paid' ? parseFloat(fee.amount || 0) : 0), 0);
                  const studentPending = studentTotal - studentPaid;

                  return (
                    <div key={studentIndex} className="col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                      <div className="card">
                        <div className="card-header bg-success-subtle d-flex justify-content-between align-items-start">
                          <div>
                            <span className="fw-bold">{student.name}</span>
                            <small className="d-block text-muted">ID: {student.student_id}</small>
                          </div>
                          <div className="text-end">
                            <small className="d-block">
                              Total: ₹{studentTotal.toLocaleString()}
                            </small>
                            <small className="d-block text-success">
                              Paid: ₹{studentPaid.toLocaleString()}
                            </small>
                            {studentPending > 0 && (
                              <small className="d-block text-danger">
                                Pending: ₹{studentPending.toLocaleString()}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="card-body p-0">
                          <div className="table-responsive">
                            <table className="table table-bordered mb-0">
                              <thead className="table-light">
                                <tr>
                                  <th>Fee Title</th>
                                  <th>Amount</th>
                                  <th>Status</th>
                                  <th>Payment Date</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {student?.fees?.length === 0 ? (
                                  <tr>
                                    <td colSpan="5" className="text-center text-muted">
                                      No fees assigned
                                    </td>
                                  </tr>
                                ) : (
                                  student?.fees?.map((fee, feeIndex) => {
                                    return (
                                      <tr key={feeIndex}>
                                        <td>
                                          <strong>{fee.fee_title}</strong>
                                          {fee.transaction_id && (
                                            <small className="d-block text-muted">
                                              TXN: {fee.transaction_id}
                                            </small>
                                          )}
                                        </td>
                                        <td>
                                          <strong>₹{parseFloat(fee.amount || 0).toLocaleString()}</strong>
                                        </td>
                                        <td>
                                          <span className={getStatusBadgeClass(fee.payment_status)}>
                                            {fee.payment_status || 'unpaid'}
                                          </span>
                                        </td>
                                        <td>
                                          <small>{formatDate(fee.payment_date)}</small>
                                        </td>
                                        <td>
                                          {fee.payment_status !== 'paid' && (
                                            <button
                                              className="btn btn-sm btn-outline-success"
                                              onClick={() => handleMarkAsPaid(student.student_id, student.name, fee)}
                                              disabled={loading}
                                            >
                                              Mark Paid
                                            </button>
                                          )}
                                          {fee.payment_status === 'paid' && (
                                            <small className="text-success">
                                              ✓ Paid
                                            </small>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Payment Modal */}
      {paymentModal.show && (
        <PaymentModal
          studentName={paymentModal.studentName}
          feeTitle={paymentModal.feeTitle}
          amount={paymentModal.amount}
          onSubmit={handlePaymentSubmit}
          onClose={() => setPaymentModal({ 
            show: false, 
            studentId: null, 
            studentName: '', 
            feeTitle: '', 
            amount: '', 
            batchFeeId: null 
          })}
        />
      )}
    </div>
  );
}

// Enhanced Payment Modal Component
function PaymentModal({ studentName, feeTitle, amount, onSubmit, onClose }) {
  const [paymentData, setPaymentData] = useState({
    paymentDate: new Date().toISOString().split('T')[0],
    transactionId: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentData.transactionId.trim()) {
      alert('Transaction ID is required');
      return;
    }
    
    setSubmitting(true);
    try {
      await onSubmit(paymentData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Record Payment</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              disabled={submitting}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label"><strong>Student:</strong></label>
                <p className="mb-1">{studentName}</p>
              </div>
              <div className="mb-3">
                <label className="form-label"><strong>Fee:</strong></label>
                <p className="mb-1">{feeTitle} - <span className="fw-bold text-primary">₹{parseFloat(amount || 0).toLocaleString()}</span></p>
              </div>
              <div className="mb-3">
                <label htmlFor="paymentDate" className="form-label">
                  Payment Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="paymentDate"
                  value={paymentData.paymentDate}
                  onChange={(e) => setPaymentData({ ...paymentData, paymentDate: e.target.value })}
                  max={new Date().toISOString().split('T')[0]} // Prevent future dates
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="transactionId" className="form-label">
                  Transaction ID <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="transactionId"
                  value={paymentData.transactionId}
                  onChange={(e) => setPaymentData({ ...paymentData, transactionId: e.target.value })}
                  placeholder="Enter transaction ID or reference number"
                  required
                />
                <small className="form-text text-muted">
                  Bank reference number, UPI ID, or cash receipt number
                </small>
              </div>
              <div className="mb-3">
                <label htmlFor="notes" className="form-label">Notes (Optional)</label>
                <textarea
                  className="form-control"
                  id="notes"
                  rows="3"
                  value={paymentData.notes}
                  onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
                  placeholder="Payment method, additional details..."
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onClose}
                disabled={submitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-success"
                disabled={submitting || !paymentData.transactionId.trim()}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Recording...
                  </>
                ) : (
                  'Record Payment'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}