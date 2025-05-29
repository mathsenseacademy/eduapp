import api from "./api";

/* ----------------------------------------
   1. CREATE a new question
      POST /examsetup/createquestions/
   ---------------------------------------- */
export const createQuestion = (payload) =>
  api.post("/examsetup/createquestions/", payload);

/* ----------------------------------------
   2. GET ONE by ID
      POST /getquestionbyid/   { id }
   ---------------------------------------- */
export const getQuestionById = (id) =>
  api.post("/getquestionbyid/", { id });

/* ----------------------------------------
   3. EDIT an existing question
      POST /examsetup/editquestions/
      payload must include "id"
   ---------------------------------------- */
export const editQuestion = (payload) =>
  api.post("/examsetup/editquestions/", payload);

/* ----------------------------------------
   4. GET ALL questions
      GET /examsetup/getallquestions/
   ---------------------------------------- */
export const getAllQuestions = () =>
  api.get("/examsetup/getallquestions/");
