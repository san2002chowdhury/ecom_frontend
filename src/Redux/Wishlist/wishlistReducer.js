/* eslint-disable no-undef */
// import { toast } from "react-toastify";
import toast from "react-hot-toast";

import {
  FETCH_ADD_TO_WISHLIST_REQUEST,
  FETCH_ADD_TO_WISHLIST_SUCCESS,
  FETCH_REMOVE_FROM_WISHLIST_REQUEST,
  // FETCH_REMOVE_FROM_WISHLIST_SUCCESS,
  FETCH_WISHLIST_DETAILS_REQUEST,
  FETCH_WISHLIST_DETAILS_SUCCESS,
} from "../action";

const initialState = {
  wishlist_data: [],
  wishlist_details: [],
  user_id_for_add: "",
  user_id_for_details: "",
  product_id_for_add: "",

  remove_wishlist_id: "",
  error: null,
};
const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADD_TO_WISHLIST_REQUEST:
      // console.log(
      //   `user_id_for_add-------->${action.user_id_for_add}<--------product_id_for_add--------->${action.product_id_for_add}`
      // );

      return {
        ...state,
        user_id_for_add: action.user_id_for_add,
        product_id_for_add: action.product_id_for_add,
      };
    case FETCH_ADD_TO_WISHLIST_SUCCESS:
      console.log("Payload--->for add to wishlist--------->", action);
      // if (Object.keys(action.payload).length === 2)
      if (action.payload.status === "fail") {
        toast.error(action.payload.message);
      } else {
        toast.success(`product added on wishlist`);
      }

      return {
        ...state,
        wishlist_data: action.payload,
      };
    case FETCH_WISHLIST_DETAILS_REQUEST:
      // console.log(`user_id_for_details-------->${action.user_id_for_details}`);
      return {
        ...state,
        user_id_for_details: action.user_id_for_details,
      };
    case FETCH_WISHLIST_DETAILS_SUCCESS: {
      // console.log(
      //   `Payload--->for details of wishlist--------->${action.payload1}`
      // );
      return {
        ...state,
        wishlist_details: action.payload1,
      };
    }
    case FETCH_REMOVE_FROM_WISHLIST_REQUEST:
      return {
        ...state,
        remove_wishlist_id: action.remove_wishlist_id,
      };
    // case FETCH_REMOVE_FROM_WISHLIST_SUCCESS:
    //   return {
    //     ...state,
    //     wishlist_details: wishlist_details.filter(
    //       (item) => item.id !== item.remove_wishlist_id
    //     ),
    //   };
    default:
      return { ...state };
  }
};
export default wishlistReducer;
