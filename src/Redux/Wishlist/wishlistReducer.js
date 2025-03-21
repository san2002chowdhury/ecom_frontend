import toast from "react-hot-toast";

import {
  FETCH_ADD_TO_WISHLIST_REQUEST,
  FETCH_ADD_TO_WISHLIST_SUCCESS,
  FETCH_REMOVE_FROM_WISHLIST_REQUEST,
  FETCH_WISHLIST_DETAILS_REQUEST,
  FETCH_WISHLIST_DETAILS_SUCCESS,
} from "../action";

const initialState = {
  wishlist_data: [],
  user_id: "",
  product_id: "",
  count_wishlist: 0,
  wishlist_id: "",
  error: null,
};
const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADD_TO_WISHLIST_REQUEST:
      return {
        ...state,
        user_id: action.user_id,
        product_id: action.product_id,
      };
    case FETCH_ADD_TO_WISHLIST_SUCCESS:
      if (action.payload.status === "fail") {
        toast.error(action.payload.message);
      } else {
        toast.success(`Product added on wishlist!`);
      }
      console.log("WISHLIST REDUCER-->", action.payload);

      return {
        ...state,
        wishlist_data: action.payload.data,
        count_wishlist: action.payload.wishlistCount,
      };
    case FETCH_WISHLIST_DETAILS_REQUEST:
      return {
        ...state,
        user_id: action.user_id,
      };
    case FETCH_WISHLIST_DETAILS_SUCCESS: {
      return {
        ...state,
        wishlist_data: action.payload.data,
        count_wishlist: action.payload.wishlistCount,
      };
    }
    case FETCH_REMOVE_FROM_WISHLIST_REQUEST:
      return {
        ...state,
        wishlist_id: action.wishlist_id,
      };

    default:
      return { ...state };
  }
};
export default wishlistReducer;
