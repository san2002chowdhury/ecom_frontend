import {
  FETCH_ADD_TO_CART_REQUEST,
  FETCH_ADD_TO_CART_SUCCESS,
  FETCH_ADD_TO_CART_UPDATE_REQUEST,
  FETCH_CART_DETAILS_REQUEST,
  FETCH_CART_DETAILS_SUCCESS,
  FETCH_REMOVE_FROM_CART_REQUEST,
} from "../action";

const initialState = {
  _id: "",
  flag: "",
  token: "",
  quantity: "",
  user_id: "",
  user_id_for_details: "",
  product_id: "",
  remove_cart_id: "",
  cart_data: [],
  cart_details: [],
  cartLength: 0,
  total_Cart_Value: 0,

  error: null,
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADD_TO_CART_REQUEST: {
      // console.log("Step-1------>WE ARE IN ADD TO CART REQUEST", action);
      return {
        ...state,
        // token: action.token,
        user_id: action.user_id,
        product_id: action.product_id,
        quantity: action.quantity,
      };
    }

    case FETCH_ADD_TO_CART_SUCCESS: {
      // console.log(
      //   "REDUCER------>WE ARE IN ADD TO CART SUCCESS",
      //   action.payload,
      //   "-----cart_data-----",
      //   state.cart_data
      // );

      let arr = [...state.cart_data];
      arr.push(action.payload);

      console.log(arr);

      return { ...state, cart_data: arr };
    }
    case FETCH_CART_DETAILS_REQUEST: {
      // console.log(
      //   "REDUCER------>WE ARE IN ADD TO CART-DETAILS REQUEST",
      //   action.user_id
      // );
      return { ...state, user_id_for_details: action.user_id_for_details };
    }
    case FETCH_CART_DETAILS_SUCCESS: {
      console.log(
        "REDUCER------>WE ARE IN ADD TO CART-DETAILS SUCCESS",
        action.payload1
      );

      return { ...state, cart_details: action.payload1 };
      // return { ...state, cart_data: action.payload1 };
    }
    case FETCH_REMOVE_FROM_CART_REQUEST:
      console.log(`step-3_id_for_remove-------->${action.remove_cart_id}`);
      return {
        ...state,
        remove_cart_id: action.remove_cart_id,
      };
    case FETCH_ADD_TO_CART_UPDATE_REQUEST:
      console.log(`step-3 for update------`, action);
      return {
        ...state,
        flag: action.flag,
        _id: action._id,
        user_id: action.user_id,
        product_id: action.product_id,
      };

    default:
      return { ...state };
  }
};
export default cartReducer;
