// src/components/AdminPanel/Batches/AddBatchFee.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addBatchFee } from "../../../api/batchApi";

export default function AddBatchFee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fee, setFee] = useState({ fee_title: "", amount: "", due_date: "", fee_type: "recurring" });

  const handleChange = e => setFee({ ...fee, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    addBatchFee({ batch_id: +id, ...fee }).then(() => navigate("/admin/batches/all"));
  };

  return (
    <div>
      <h2>Add Fee to Batch #{id}</h2>
      <form onSubmit={handleSubmit}>
        {/* inputs for fee_title, amount, due_date, fee_type */}
        <button type="submit" className="btn btn-success">Save Fee</button>
      </form>
    </div>
  );
}
