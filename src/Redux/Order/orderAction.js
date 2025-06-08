import {
  GET_ONLINE_PAYMENT_FAILED_REQUEST,
  GET_ONLINE_PAYMENT_SUCCESS_REQUEST,
  GET_ORDER_DETAILS_REQUEST,
  GET_RESET_PAYMENT_GATEWAY_SUCCESS,
  SET_COUPON_USE_STATUS_SUCCESS,
  SET_ONLINE_PAYMENT_ORDER_REQUEST,
  SET_ORDER_REQUEST,
  SET_ORDER_SUCCESS,
} from "../action";

export const placeOrderRequest = (
  user_id,
  cart_data,
  totalOrderValue,
  payment_mode,
  order_status,
  coupon_id
) => {
  console.log(
    "Order Place-->",
    user_id,
    cart_data,
    totalOrderValue,
    payment_mode,
    order_status,
    coupon_id
  );

  return {
    type: SET_ORDER_REQUEST,
    user_id: user_id,
    cart_data: cart_data,
    totalOrderValue: totalOrderValue,
    payment_mode: payment_mode,
    order_status: order_status,
    coupon_id: coupon_id,
  };
};
export const placeOnlinePaymentOrderRequest = (
  user_id,
  cart_data,
  totalOrderValue,
  payment_mode,
  order_status,
  coupon_id
) => {
  return {
    type: SET_ONLINE_PAYMENT_ORDER_REQUEST,
    user_id: user_id,
    cart_data: cart_data,
    totalOrderValue: totalOrderValue,
    payment_mode: payment_mode,
    order_status: order_status,
    coupon_id: coupon_id,
  };
};
export const onlinePaymentSuccessRequest = ({
  currentOrder,
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
}) => {
  return {
    type: GET_ONLINE_PAYMENT_SUCCESS_REQUEST,
    currentOrder: currentOrder,
    razorpay_payment_id: razorpay_payment_id,
    razorpay_order_id: razorpay_order_id,
    razorpay_signature: razorpay_signature,
  };
};
export const placeOrderSuccess = (action) => {
  return {
    type: SET_ORDER_SUCCESS,
    cart_data: action.payload.data,
    order_quantity: action.quantity,
  };
};

export const getAllOrderDetails = (user_id, page, searchValue, filterOrder) => {
  const pageLocal = localStorage.getItem("orderPage");
  return {
    type: GET_ORDER_DETAILS_REQUEST,
    user_id: user_id,
    page: page || pageLocal,
    searchValue: searchValue || "All",
    filterOrder: filterOrder || "All Orders",
  };
};
export const getResetPaymentGateway = () => {
  return {
    type: GET_RESET_PAYMENT_GATEWAY_SUCCESS,
    isAuthentic: false,
  };
};
export const getOnlinePaymentFailedRequest = (order_id, user_id) => {
  return {
    type: GET_ONLINE_PAYMENT_FAILED_REQUEST,
    order_id: order_id,
    user_id: user_id,
  };
};
export const setCouponUseStatusDefault = () => {
  return { type: SET_COUPON_USE_STATUS_SUCCESS };
};
