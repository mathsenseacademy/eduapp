// src/api/courseApi.js
import api from "./api";

// anyone can fetch the active list for the header dropdown
export const getActiveCourses = () =>
  api.get("/coursemanegment/showallactivatecourse/", {});

// admin-only: list every course (active + inactive)
export const getAllCourses = () =>
  api.get("/coursemanegment/showallcourse/");

// admin-only: create a new course
export const createCourse = (payload) =>
  api.post("/coursemanegment/create_course/", payload);

// admin-only: fetch one course by its ID
export const getCourseById = (id) =>
  api.post("/coursemanegment/showcourseid/", { id });

// admin-only: update an existing course
export const editCourse = (payload) =>
  api.post("/coursemanegment/edit_course/", payload);
