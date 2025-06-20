// src/api/courseApi.js
import api from "./api";

// anyone can fetch the active list for the header dropdown
// export const getActiveCourses = () =>
//   api.get("/coursemanegment/showallactivatecourse/", {});

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
// src/api/courseApi.js
export const getActiveCourses = () =>
  api
    .get(`/coursemanegment/all_courses_show_public/`)
    .then((res) =>
      res.data.map((c) => ({
        id: c.ID,
        course_name: c.course_name,
      }))
    );
    // public: fetch details for one course by ID
export const getPublicCourseDetails = (id) =>
  api.post("/coursemanegment/courses_detail_show_public/", { ID: id });

// fetch list of verified students
export const getVerifiedStudents = () =>
  api.get("/student/verified_student_list/");

// public: fetch all class levels
export const getAllClassLevels = () =>
  api.get("/coursemanegment/show_all_class_levels/");

// public: fetch all category levels
export const getAllCategoryLevels = () =>
  api.get("/coursemanegment/show_all_category_levels/");


// admin-only: list every course (active + inactive)
// export const getAllCourses = () =>
//   api.get("/coursemanegment/showallcourse/");

// // admin-only: create a new course
// export const createCourse = (payload) =>
//   api.post("/coursemanegment/create_course/", payload);

// // admin-only: fetch one course by its ID
// export const getCourseById = (id) =>
//   api.post("/coursemanegment/showcourseid/", { id });

// // admin-only: update an existing course
// export const editCourse = (payload) =>
//   api.post("/coursemanegment/edit_course/", payload);