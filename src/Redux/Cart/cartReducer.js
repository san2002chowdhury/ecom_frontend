import toast from "react-hot-toast";
import {
  FETCH_ADD_TO_CART_REQUEST,
  FETCH_ADD_TO_CART_SUCCESS,
  FETCH_ADD_TO_CART_UPDATE_REQUEST,
  FETCH_ADD_TO_CART_UPDATE_SUCCESS,
  FETCH_CART_DETAILS_REQUEST,
  FETCH_CART_DETAILS_SUCCESS,
  FETCH_REMOVE_FROM_CART_REQUEST,
} from "../action";

const initialState = {
  flag: "",
  quantity: "",
  user_id: "",
  product_id: "",
  cart_id: "",
  cart_data: [],
  count_cart: 0,
  total_Cart_Value: 0,
  error: null,
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADD_TO_CART_REQUEST: {
      return {
        ...state,
        user_id: action.user_id,
        product_id: action.product_id,
        quantity: action.quantity,
      };
    }

    case FETCH_ADD_TO_CART_SUCCESS: {
      if (action.payload.status === "fail") {
        toast.error("Some error occured!");
      } else {
        toast.success("Product added on cart!");
      }
      return {
        ...state,
        cart_data: action.payload.data,
        count_cart: action.payload.cart_count,
      };
    }
    case FETCH_CART_DETAILS_REQUEST: {
      return { ...state, user_id: action.user_id };
    }
    case FETCH_CART_DETAILS_SUCCESS: {
      return {
        ...state,
        cart_data: action.payload.data,
        count_cart: action.payload.cart_count,
      };
    }
    case FETCH_REMOVE_FROM_CART_REQUEST:
      return {
        ...state,
        cart_id: action.cart_id,
      };
    case FETCH_ADD_TO_CART_UPDATE_REQUEST:
      return {
        ...state,
        flag: action.flag,
        cart_id: action.cart_id,
        user_id: action.user_id,
        product_id: action.product_id,
      };
    case FETCH_ADD_TO_CART_UPDATE_SUCCESS:
      return { ...state, cart_data: action.payload.data.currentCart };
    default:
      return { ...state };
  }
};
export default cartReducer;
