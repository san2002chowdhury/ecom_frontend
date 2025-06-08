import { SET_COUPON_EMPTY_SUCCESS, SET_COUPON_REQUEST } from "../action";

export const applyCouponRequest = (user_id, cart_data, code) => {
  return {
    type: SET_COUPON_REQUEST,
    user_id: user_id,
    cart_data: cart_data,
    code: code,
  };
};
export const removeCouponRequest = () => {
  return {
    type: SET_COUPON_EMPTY_SUCCESS,
  };
};
