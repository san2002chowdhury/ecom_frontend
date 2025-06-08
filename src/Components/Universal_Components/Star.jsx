import React from "react";

const Star = ({ filled }) => {
  <span style={{ color: filled ? "greenyellow" : "gray" }}>
    <i
      className="bi bi-star-fill"
      style={{ fontSize: "15px", marginRight: "4px" }}
    ></i>
  </span>;
};

export default Star;
