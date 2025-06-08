import {
  SET_COUPON_EMPTY_SUCCESS,
  SET_COUPON_FAILURE,
  SET_COUPON_REQUEST,
  SET_COUPON_SUCCESS,
} from "../action";

const initialState = {
  user_id: "",
  cart_data: [],
  code: "",
  applied: false,
  _id: "",
  minCartValue: 0,
  error: null,
};
const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUPON_REQUEST: {
      return {
        ...state,
        user_id: action.user_id,
        cart_data: action.cart_data,
        code: action.code,
      };
    }
    case SET_COUPON_SUCCESS: {
      console.log("Reducer--->", action.cart_data);
      return {
        ...state,
        cart_data: action.cart_data,
        code: action.code,
        applied: action.applied,
        _id: action._id,
        minCartValue: action.minCartValue,
      };
    }
    case SET_COUPON_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case SET_COUPON_EMPTY_SUCCESS: {
      return {
        ...state,
        user_id: "",
        cart_data: [],
        code: "",
        applied: false,
        _id: "",
        minCartValue: 0,
      };
    }
    default:
      return { ...state };
  }
};
export default couponReducer;
