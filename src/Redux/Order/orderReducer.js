import {
  GET_ONLINE_PAYMENT_FAILED_REQUEST,
  GET_ONLINE_PAYMENT_FAILED_SUCCESS,
  GET_ONLINE_PAYMENT_SUCCESS_REQUEST,
  GET_ONLINE_PAYMENT_SUCCESS_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_RESET_PAYMENT_GATEWAY_SUCCESS,
  SET_COUPON_USE_STATUS_SUCCESS,
  SET_ONLINE_PAYMENT_ORDER_REQUEST,
  SET_ONLINE_PAYMENT_ORDER_SUCCESS,
  SET_ORDER_REQUEST,
  SET_ORDER_SUCCESS,
} from "../action";
const pageLocal = localStorage.getItem("orderPage");
const initialState = {
  user_id: "",
  order: [],
  currentOrder: [],
  order_data: [],
  cart_data: [],
  order_status: "",
  totalOrderValue: "",
  payment_mode: "",
  order_quantity: 0,
  page: pageLocal || 1,
  searchValue: "All",
  filterOrder: "All Orders",
  order_list: 0,
  key_id: "",
  razorpay_payment_id: "",
  razorpay_order_id: "",
  razorpay_signature: "",
  isAuthentic: false,
  order_id: "",
  couponUsed: false,
  couponName: "",
  coupon_id: "",
  error: null,
};
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_REQUEST: {
      console.log("Reducer-->", action);

      return {
        ...state,
        user_id: action.user_id,
        cart_data: action.cart_data,
        totalOrderValue: action.totalOrderValue,
        payment_mode: action.payment_mode,
        order_status: action.order_status,
        coupon_id: action.coupon_id,
      };
    }

    case SET_ONLINE_PAYMENT_ORDER_REQUEST: {
      return {
        ...state,
        user_id: action.user_id,
        cart_data: action.cart_data,
        totalOrderValue: action.totalOrderValue,
        payment_mode: action.payment_mode,
        order_status: action.order_status,
        coupon_id: action.coupon_id,
      };
    }
    case GET_ONLINE_PAYMENT_SUCCESS_REQUEST: {
      return {
        ...state,
        currentOrder: action.currentOrder,
        razorpay_payment_id: action.razorpay_payment_id,
        razorpay_order_id: action.razorpay_order_id,
        razorpay_signature: action.razorpay_signature,
      };
    }

    case GET_ONLINE_PAYMENT_SUCCESS_SUCCESS: {
      return {
        ...state,
        isAuthentic: action.isAuthentic,
        razorpay_payment_id: "",
        razorpay_order_id: "",
        razorpay_signature: "",
        key_id: "",
      };
    }

    case SET_ORDER_SUCCESS: {
      return {
        ...state,
        cart_data: action.cart_data,
        order_quantity: action.order_quantity,
        order_data: action.order_data,
        couponUsed: action.couponUsed,
        couponName: action.couponName,
      };
    }

    case SET_ONLINE_PAYMENT_ORDER_SUCCESS: {
      return {
        ...state,
        cart_data: action.cart_data,
        order_quantity: action.order_quantity,
        order_data: action.order_data,
        order: action.order,
        currentOrder: action.currentOrder,
        key_id: action.key_id,
        couponUsed: action.couponUsed,
        couponName: action.couponName,
      };
    }

    case GET_ORDER_DETAILS_REQUEST: {
      const pageLocal = localStorage.getItem("orderPage");
      return {
        ...state,
        user_id: action.user_id,
        page: action.page || pageLocal,
        searchValue: action.searchValue || "All",
        filterOrder: action.filterOrder || "All Orders",
      };
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        order_data: action.order_data,
        order_list: action.order_list,
      };
    }
    case GET_ORDER_DETAILS_FAILURE:
      console.error("Error in fetching order details: ", action.payload);
      return {
        ...state,
        error: action.payload, // Storing error message in state
      };
    case GET_RESET_PAYMENT_GATEWAY_SUCCESS:
      return {
        ...state,
        isAuthentic: false,
      };
    case GET_ONLINE_PAYMENT_FAILED_REQUEST:
      return {
        ...state,
        order_id: action.order_id,
        user_id: action.user_id,
      };
    case GET_ONLINE_PAYMENT_FAILED_SUCCESS:
      return {
        ...state,
        order_quantity: 0,
        order_data: action.allOrders,
        currentOrder: action.currentOrder,
        isAuthentic: action.isAuthentic,
        razorpay_payment_id: action.razorpay_payment_id,
        razorpay_order_id: action.razorpay_order_id,
        razorpay_signature: action.razorpay_signature,
        key_id: action.key_id,
        order: action.order,
      };
    case SET_COUPON_USE_STATUS_SUCCESS:
      return {
        ...state,
        couponUsed: false,
        couponName: "",
        coupon_id: "",
      };
    default:
      return { ...state };
  }
};
export default orderReducer;
