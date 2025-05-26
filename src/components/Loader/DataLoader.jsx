import React from "react";
import "./DataLoader.css";

const Loader = ({ size = 48, color = "#0d6efd" }) => (
  <span
    className="spinner"
    style={{
      width: size,
      height: size,
      borderTopColor: color,
    }}
  />
);

export default Loader;
