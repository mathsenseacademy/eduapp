// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token    = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userType"); // ⭐ new

  /* 1 – must be logged in */
  if (!token) return <Navigate to="/register" replace />;

  /* 2 – token must be unexpired */
  try {
    const { exp } = jwtDecode(token);
    if (exp * 1000 < Date.now()) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userType");
      return <Navigate to="/register" replace state={{ expired: true }} />;
    }
  } catch {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userType");
    return <Navigate to="/register" replace />;
  }

  /* 3 – must be admin */
  if (userType !== "admin") return <Navigate to="/" replace />;

  /* 4 – all good */
  return children;
};

export default ProtectedRoute;
