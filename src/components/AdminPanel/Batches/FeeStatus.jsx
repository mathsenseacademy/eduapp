// src/components/AdminPanel/Batches/FeeStatus.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentFeeStatus } from "../../../api/batchApi";

export default function FeeStatus() {
  const { id } = useParams();
  const [status, setStatus] = useState([]);

  useEffect(() => {
    getStudentFeeStatus(id).then(res => setStatus(res.data));
  }, [id]);

  return (
    <div>
      <h2>Student Fee Status for Batch #{id}</h2>
      {/* render a table of students and their fee-paid / due info */}
    </div>
  );
}
