// src/components/AdminPanel/SetPaper/CreateQuestions.jsx
import React, { useState } from "react";
import { createQuestion } from "../../../api/questionApi";
import Loader from "../../Loader/DataLoader";           // optional spinner

const empty = { question: "", optioncount: 4, marks: 1 };

const CreateQuestions = () => {
  const [form, setForm]   = useState(empty);
  const [saving, setSaving] = useState(false);

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    // ---- quick client-side guard ------------------------------
    const payload = {
      question:    form.question.trim(),
      optioncount: parseInt(form.optioncount, 10),
      marks:       parseInt(form.marks, 10),
    };
    if (!payload.question) return alert("Question text required");
    if (payload.optioncount < 2) return alert("At least 2 options");
    if (payload.marks <= 0)      return alert("Marks must be > 0");

    // ---- API call ---------------------------------------------
    try {
      setSaving(true);
      await createQuestion(payload);          // POST → /examsetup/createquestions/
      alert("Question created!");
      setForm(empty);
    } catch (err) {
      console.error(err);
      alert("Could not create question.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="sp-form" onSubmit={submit}>
      <h2>Create Question</h2>

      <label>
        Question
        <textarea
          name="question"
          value={form.question}
          onChange={update}
          required
        />
      </label>

      <label>
        Option Count
        <input
          type="number"
          name="optioncount"
          value={form.optioncount}
          onChange={update}
          min={2}
          max={10}
          required
        />
      </label>

      <label>
        Marks
        <input
          type="number"
          name="marks"
          value={form.marks}
          onChange={update}
          min={1}
          required
        />
      </label>

      <button className="btn-primary" disabled={saving}>
        {saving ? <Loader size={20} /> : "Save"}
      </button>
    </form>
  );
};

export default CreateQuestions;
