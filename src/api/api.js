// // src/api/api.js
// import axios from 'axios';

// const api = axios.create({
//   // baseURL: 'http://192.168.99.47:8000/',
//   // baseURL: 'http://127.0.0.1:7000/',
//   baseURL:'http://3.108.119.201:7000/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default api;


import axios from "axios";

/* ------------------------------------------------
   AXIOS INSTANCE
   ------------------------------------------------ */
const api = axios.create({
  // baseURL: "http://3.108.119.201:7000/", 
  baseURL: "http://mathsenseacademy.com:7000/",  // ✔ your live server
  headers: { "Content-Type": "application/json" },
});

/* ---- request: attach JWT ---------------------------------------- */
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("accessToken");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

/* ---- response: auto-logout on 401 -------------------------------- */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      /* token invalid / expired on the server side */
      localStorage.removeItem("accessToken");
      window.location.href = "/register?expired=1";
    }
    return Promise.reject(err);
  }
);

export default api;
