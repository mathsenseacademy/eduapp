// src/api/api.js
import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.99.47:8000/',
  // baseURL: 'http://127.0.0.1:7000/',
  baseURL:'http://3.108.119.201:7000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
