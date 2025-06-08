import toast from "react-hot-toast";
import {
  FETCH_ADD_TO_CART_REQUEST,
  FETCH_ADD_TO_CART_SUCCESS,
  FETCH_ADD_TO_CART_UPDATE_REQUEST,
  FETCH_ADD_TO_CART_UPDATE_SUCCESS,
  FETCH_CART_DETAILS_REQUEST,
  FETCH_CART_DETAILS_SUCCESS,
  FETCH_REMOVE_ALL_FROM_CART_REQUEST,
  FETCH_REMOVE_ALL_FROM_CART_SUCCESS,
  FETCH_REMOVE_FROM_CART_REQUEST,
  SET_TOTAL_CART_VALUE_SUCCESS,
} from "../action";

const initialState = {
  cart_data: [],
  cart_id: "",
  total_Cart_Value: 0,
  discountedCartValue: 0,
  flag: "",
  quantity: "",
  user_id: "",
  product_id: "",
  count_cart: 0,
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
        total_Cart_Value: parseInt(action.payload.total),
      };
    }
    case FETCH_REMOVE_FROM_CART_REQUEST:
      return {
        ...state,
        cart_id: action.cart_id,
      };
    case FETCH_REMOVE_ALL_FROM_CART_REQUEST:
      return {
        ...state,
        user_id: action.user_id,
      };
    case FETCH_REMOVE_ALL_FROM_CART_SUCCESS:
      return {
        ...state,
        cart_data: [],
        total_Cart_Value: 0,
        count_cart: 0,
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
      return {
        ...state,
        cart_data: action.payload.data.currentCart,
        total_Cart_Value: parseInt(action.payload.data.total),
      };
    case SET_TOTAL_CART_VALUE_SUCCESS:
      return {
        ...state,
        // total_Cart_Value: parseInt(action.payload),
        discountedCartValue: parseInt(action.payload),
      };
    default:
      return { ...state };
  }
};
export default cartReducer;
