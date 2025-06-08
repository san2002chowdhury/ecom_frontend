import { GET_REVIEW_REQUEST, SET_REVIEW_REQUEST } from "../action";

export const getUserReviewRequest = (product_id) => {
  return {
    type: GET_REVIEW_REQUEST,
    product_id: product_id,
  };
};

export const giveReviewRequest = (product_id, user_id, description, rating) => {
  return {
    type: SET_REVIEW_REQUEST,
    product_id: product_id,
    user_id: user_id,
    description: description,
    rating: rating,
  };
};
