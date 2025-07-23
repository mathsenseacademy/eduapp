// src/api/batchApi.js
<<<<<<< HEAD
import api from "./api"; // your axios instance
=======
import api from "./api";  // your axios instance
>>>>>>> 937e57e59ea28d74ed2a5eff2da053073c13c819

export const createBatch = (payload) =>
  api.post("batchmanegment/create_batch/", payload);

<<<<<<< HEAD
export const getAllCourse = () =>
  api.get("coursemanegment/showallcourse/");

=======
>>>>>>> 937e57e59ea28d74ed2a5eff2da053073c13c819
export const getAllBatches = () =>
  api.get("batchmanegment/all_batches_with_schedule/");

export const getBatchById = (batchId) =>
<<<<<<< HEAD
  api.post("batchmanegment/batch_detail_by_id/", {
    batch_id: batchId
  });
=======
  api.post("batchmanegment/batch_detail_by_id/", { batch_id: batchId });
>>>>>>> 937e57e59ea28d74ed2a5eff2da053073c13c819

export const updateBatch = (payload) =>
  api.post("batchmanegment/update_batch/", payload);

<<<<<<< HEAD
export const addBatchFee = ({
    batch_id,
    fee_title,
    amount,
    due_date,
    fee_type
  }) =>
=======
export const addBatchFee = ({ batch_id, fee_title, amount, due_date, fee_type }) =>
>>>>>>> 937e57e59ea28d74ed2a5eff2da053073c13c819
  api.post("batchmanegment/add_batch_fee/", {
    batch_id,
    fee_title,
    amount,
    due_date,
    fee_type,
  });

<<<<<<< HEAD
export const updateBatchFee = ({
    batch_fee_id,
    fee_title,
    amount,
    due_date,
    fee_type
  }) =>
  api.put("batchmanegment/batch_fee_by_id/", {
    batch_fee_id,
    fee_title,
    amount,
    due_date,
    fee_type,
  });

export const getStudentFeeStatus = (batchId) =>
  api.post("batchmanegment/student_fee_status_by_batch/", {
    batch_id: batchId
  });
=======
export const getStudentFeeStatus = (batchId) =>
  api.post("batchmanegment/student_fee_status_by_batch/", { batch_id: batchId });
>>>>>>> 937e57e59ea28d74ed2a5eff2da053073c13c819
