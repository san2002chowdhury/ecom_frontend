import React from "react";

import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, maxRating = 5 }) => {
  const ratingStar = [...Array(maxRating)].map((_, index) => {
    let number = index + 0.5;
    return (
      <div key={index}>
        {rating >= index + 1 ? (
          <FaStar
            className="fas fa-star text-primary"
            style={{ fontSize: "20px" }}
          />
        ) : rating >= number ? (
          <FaStarHalfAlt
            className="fas fa-star text-primary"
            style={{ fontSize: "20px" }}
          />
        ) : (
          <AiOutlineStar
            className="fas fa-star "
            style={{ fontSize: "20px" }}
          />
        )}
      </div>
    );
  });
  return <>{ratingStar}</>;
};

export default Rating;
