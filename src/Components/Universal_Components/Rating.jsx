import React from "react";
import Star from "./Star";

const Rating = ({ rating, maxRating = 5 }) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    stars.push(<Star key={i} filled={i <= rating} />);
  }

  return <div>{stars}</div>;
};

export default Rating;
