import {
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  SET_REVIEW_REQUEST,
  SET_REVIEW_SUCCESS,
} from "../action";

const initialState = {
  reviewData: [],
  description: "",
  rating: 0,
  product_id: "",
  user_id: "",
  error: null,
};
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEW_REQUEST:
      return { ...state, product_id: action.product_id };
    case GET_REVIEW_SUCCESS:
      return { ...state, reviewData: action.reviewData };
    case SET_REVIEW_REQUEST:
      return {
        ...state,
        product_id: action.product_id,
        user_id: action.user_id,
        description: action.description,
        rating: action.rating,
      };
    case SET_REVIEW_SUCCESS:
      return { ...state, reviewData: action.reviewData };
    default:
      return { ...state };
  }
};
export default reviewReducer;
