// src/api/batchApi.js
import api from "./api"; // your axios instance

// ========================================
// BATCH MANAGEMENT FUNCTIONS
// ========================================

export const createBatch = (payload) =>
  api.post("batchmanegment/create_batch/", payload);

export const getAllCourse = () =>
  api.get("coursemanegment/showallcourse/");

// Updated with pagination support
export const getAllBatches = (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page);
  if (params.page_size) queryParams.append('page_size', params.page_size);
  if (params.search) queryParams.append('search', params.search);
  
  const queryString = queryParams.toString();
  return api.get(`batchmanegment/all_batches_with_schedule/${queryString ? `?${queryString}` : ''}`);
};

export const getBatchById = (batchId) =>
  api.post("batchmanegment/batch_detail_by_id/", {
    batch_id: batchId
  });

export const updateBatch = (payload) =>
  api.post("batchmanegment/update_batch/", payload);

// NEW: Toggle batch activation
export const toggleBatchActivation = (batchId) =>
  api.get(`batchmanegment/batch_activation_toggle/${batchId}/`);

// ========================================
// FEE MANAGEMENT FUNCTIONS
// ========================================

export const addBatchFee = ({
  batch_id,
  fee_title,
  amount,
  due_date,
  fee_type = 'one-time'
}) =>
  api.post("batchmanegment/add_batch_fee/", {
    batch_id,
    fee_title,
    amount,
    due_date,
    fee_type,
  });

// Updated with pagination and filtering support
export const getAllBatchFees = (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page);
  if (params.page_size) queryParams.append('page_size', params.page_size);
  if (params.batch_id) queryParams.append('batch_id', params.batch_id);
  if (params.fee_type) queryParams.append('fee_type', params.fee_type);
  
  const queryString = queryParams.toString();
  return api.get(`batchmanegment/all_batch_fee/${queryString ? `?${queryString}` : ''}`);
};

export const getBatchFeeById = (batchFeeId) =>
  api.post("batchmanegment/update_fee_by_id/", {
    batch_fee_id: batchFeeId
  });

export const updateBatchFee = ({
  batch_fee_id,
  fee_title,
  amount,
  due_date,
  fee_type,
  original_amount // For validation on backend
}) =>
  api.put("batchmanegment/update_fee_by_id/", {
    batch_fee_id,
    fee_title,
    amount,
    due_date,
    fee_type,
    original_amount
  });

// Fixed endpoint URL to match backend
export const deleteBatchFee = (batchFeeId) =>
  api.delete(`batchmanegment/delete_batch_fee/${batchFeeId}/`);

// Fixed endpoint URL to match backend
export const getFeePayments = (batchFeeId, params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page);
  if (params.page_size) queryParams.append('page_size', params.page_size);
  if (params.payment_status) queryParams.append('payment_status', params.payment_status);
  
  const queryString = queryParams.toString();
  return api.get(`batchmanegment/get_fee_payments/${batchFeeId}/${queryString ? `?${queryString}` : ''}`);
};

// ========================================
// PAYMENT MANAGEMENT FUNCTIONS
// ========================================

export const recordPayment = (paymentData) =>
  api.post("batchmanegment/add_student_fee_payment/", paymentData);

export const updatePaymentStatus = ({
  payment_id,
  payment_status,
  payment_date,
  transaction_id,
  notes
}) =>
  api.put("batchmanegment/update_payment_status/", {
    payment_id,
    payment_status,
    payment_date,
    transaction_id,
    notes
  });

export const bulkRecordPayments = (paymentsData) =>
  api.post("batchmanegment/bulk_record_payments/", {
    payments: paymentsData // Backend expects 'payments' key
  });

export const addStudentFeeStatus = (statusData) =>
  api.post("batchmanegment/add_student_fee_status/", statusData);

// ========================================
// REPORTING FUNCTIONS
// ========================================

export const getStudentFeeStatus = (batchId) =>
  api.post("batchmanegment/student_fee_status_by_batch/", {
    batch_id: batchId
  });

export const getMonthlyFeeStatus = (year = new Date().getFullYear()) =>
  api.get(`batchmanegment/month_wise_batch_fee_status/?year=${year}`);

export const getMonthlyFeeStatusByInput = ({
  month,
  year,
  batch_id
}) =>
  api.post("batchmanegment/month_wise_batch_fee_status_by_input/", {
    month: String(month).padStart(2, '0'),
    year: String(year),
    batch_id: Number(batch_id)
  });

export const generateFeeReport = ({
  batch_id,
  start_date,
  end_date,
  fee_status = 'all',
  fee_type,
  student_id,
  format = 'json'
}) =>
  api.post("batchmanegment/generate_fee_report/", {
    batch_id,
    start_date,
    end_date,
    fee_status,
    fee_type,
    student_id,
    format
  });

// NEW: Get dashboard statistics
export const getFeesDashboardStats = () =>
  api.get("batchmanegment/fee_dashboard_stats/");

// ========================================
// ENHANCED ERROR HANDLING
// ========================================

export const handleApiError = (error) => {
  console.error('API Error Details:', error);
  
  if (error.response) {
    // Server responded with error status
    const statusCode = error.response.status;
    const errorData = error.response.data;
    
    // Handle different status codes
    switch (statusCode) {
      case 400:
        return errorData.error || 'Invalid request data';
      case 401:
        return 'Authentication required. Please login again.';
      case 403:
        return 'You do not have permission to perform this action';
      case 404:
        return errorData.error || 'Resource not found';
      case 409:
        return errorData.error || 'Conflict - resource already exists';
      case 500:
        return 'Server error occurred. Please try again later.';
      default:
        return errorData.error || `Server error (${statusCode})`;
    }
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error - please check your connection';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};

// ========================================
// SAFE API CALLS WITH ERROR HANDLING
// ========================================

export const safeApiCall = async (apiFunction, ...args) => {
  try {
    const response = await apiFunction(...args);
    return { 
      success: true, 
      data: response.data,
      pagination: response.data.pagination // For paginated responses
    };
  } catch (error) {
    return { 
      success: false, 
      error: handleApiError(error),
      data: null
    };
  }
};

// Specific safe functions for common operations
export const safeGetStudentFeeStatus = async (batchId) =>
  safeApiCall(getStudentFeeStatus, batchId);

export const safeRecordPayment = async (paymentData) =>
  safeApiCall(recordPayment, paymentData);

export const safeAddBatchFee = async (feeData) =>
  safeApiCall(addBatchFee, feeData);

export const safeGetAllBatches = async (params) =>
  safeApiCall(getAllBatches, params);

export const safeGetAllBatchFees = async (params) =>
  safeApiCall(getAllBatchFees, params);

export const safeBulkRecordPayments = async (paymentsData) =>
  safeApiCall(bulkRecordPayments, paymentsData);

export const safeGenerateFeeReport = async (reportParams) =>
  safeApiCall(generateFeeReport, reportParams);

export const safeGetFeesDashboard = async () =>
  safeApiCall(getFeesDashboardStats);

// ========================================
// ENHANCED VALIDATION FUNCTIONS
// ========================================

export const validatePaymentData = (paymentData) => {
  const errors = [];
  const warnings = [];
  
  // Required field validation
  if (!paymentData.student_id) {
    errors.push('Student ID is required');
  }
  
  if (!paymentData.batch_fee_id) {
    errors.push('Batch Fee ID is required');
  }
  
  if (!paymentData.payment_date) {
    errors.push('Payment date is required');
  }
  
  // Conditional validation
  if (paymentData.payment_status === 'paid' && !paymentData.transaction_id) {
    errors.push('Transaction ID is required for paid status');
  }
  
  // Data format validation
  if (paymentData.amount && isNaN(parseFloat(paymentData.amount))) {
    errors.push('Amount must be a valid number');
  }
  
  if (paymentData.amount && parseFloat(paymentData.amount) < 0) {
    errors.push('Amount cannot be negative');
  }
  
  // Date validation
  if (paymentData.payment_date) {
    const paymentDate = new Date(paymentData.payment_date);
    const today = new Date();
    
    if (paymentDate > today) {
      errors.push('Payment date cannot be in the future');
    }
    
    // Warning for old payments
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    if (paymentDate < thirtyDaysAgo) {
      warnings.push('Payment date is more than 30 days old');
    }
  }
  
  // Transaction ID format validation
  if (paymentData.transaction_id && paymentData.transaction_id.length < 3) {
    warnings.push('Transaction ID seems too short');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    hasWarnings: warnings.length > 0
  };
};

export const validateFeeData = (feeData) => {
  const errors = [];
  const warnings = [];
  
  // Required field validation
  if (!feeData.batch_id) {
    errors.push('Batch ID is required');
  }
  
  if (!feeData.fee_title?.trim()) {
    errors.push('Fee title is required');
  }
  
  if (!feeData.amount || isNaN(parseFloat(feeData.amount))) {
    errors.push('Valid amount is required');
  }
  
  // Amount validation
  if (parseFloat(feeData.amount) <= 0) {
    errors.push('Amount must be greater than zero');
  }
  
  if (parseFloat(feeData.amount) > 1000000) {
    warnings.push('Amount seems unusually high');
  }
  
  // Date validation
  if (feeData.due_date) {
    const dueDate = new Date(feeData.due_date);
    const today = new Date();
    
    if (dueDate < today) {
      warnings.push('Due date is in the past');
    }
  }
  
  // Fee type validation
  const validFeeTypes = ['one-time', 'monthly', 'yearly', 'semester'];
  if (feeData.fee_type && !validFeeTypes.includes(feeData.fee_type)) {
    errors.push(`Fee type must be one of: ${validFeeTypes.join(', ')}`);
  }
  
  // Title validation
  if (feeData.fee_title && feeData.fee_title.length > 100) {
    warnings.push('Fee title is very long');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    hasWarnings: warnings.length > 0
  };
};

export const validateBulkPaymentData = (paymentsArray) => {
  if (!Array.isArray(paymentsArray)) {
    return {
      isValid: false,
      errors: ['Payments data must be an array'],
      warnings: [],
      itemValidations: []
    };
  }
  
  if (paymentsArray.length === 0) {
    return {
      isValid: false,
      errors: ['At least one payment is required'],
      warnings: [],
      itemValidations: []
    };
  }
  
  if (paymentsArray.length > 100) {
    return {
      isValid: false,
      errors: ['Maximum 100 payments allowed in bulk operation'],
      warnings: [],
      itemValidations: []
    };
  }
  
  const itemValidations = paymentsArray.map((payment, index) => ({
    index,
    ...validatePaymentData(payment)
  }));
  
  const hasErrors = itemValidations.some(v => !v.isValid);
  const allErrors = itemValidations.filter(v => !v.isValid).map(v => 
    `Item ${v.index + 1}: ${v.errors.join(', ')}`
  );
  
  return {
    isValid: !hasErrors,
    errors: allErrors,
    warnings: [],
    itemValidations
  };
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

export const formatCurrency = (amount, currency = '₹') => {
  const num = parseFloat(amount || 0);
  return `${currency}${num.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
};

export const formatDate = (dateString, format = 'short') => {
  if (!dateString) return 'Not set';
  
  const date = new Date(dateString);
  
  switch (format) {
    case 'short':
      return date.toLocaleDateString('en-IN');
    case 'long':
      return date.toLocaleDateString('en-IN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    case 'datetime':
      return date.toLocaleString('en-IN');
    default:
      return date.toLocaleDateString('en-IN');
  }
};

export const generateCSVFromData = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) return;
  
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => 
    Object.values(row).map(value => 
      typeof value === 'string' && value.includes(',') ? `"${value}"` : value
    ).join(',')
  );
  
  const csvContent = [headers, ...rows].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
