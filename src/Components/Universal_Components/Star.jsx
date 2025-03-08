import React from "react";

const Star = ({ filled }) => (
  <span style={{ color: filled ? "greenyellow" : "gray" }}>
    <i className="bi bi-star-fill"></i>
  </span>
);

export default Star;
