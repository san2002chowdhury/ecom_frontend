import {
  FETCH_ADD_TO_CART_REQUEST,
  FETCH_ADD_TO_CART_SUCCESS,
  FETCH_ADD_TO_CART_UPDATE_REQUEST,
  FETCH_ADD_TO_CART_UPDATE_SUCCESS,
  FETCH_CART_DETAILS_REQUEST,
  FETCH_CART_DETAILS_SUCCESS,
  FETCH_REMOVE_FROM_CART_REQUEST,
} from "../action";

export const getAddToCartRequest = (user_id, product_id, quantity) => {
  return {
    type: FETCH_ADD_TO_CART_REQUEST,

    user_id: user_id,
    product_id: product_id,
    quantity: quantity,
  };
};

export const getAddToCartSuccess = (action) => {
  return {
    type: FETCH_ADD_TO_CART_SUCCESS,
    cart_data: action.payload.data,
    count_cart: action.payload.cart_count,
  };
};

export const getUpdateCartDataRequest = (
  flag,
  cart_id,
  user_id,
  product_id
) => {
  return {
    type: FETCH_ADD_TO_CART_UPDATE_REQUEST,
    flag: flag,
    cart_id: cart_id,
    user_id: user_id,
    product_id: product_id,
  };
};

export const getUpdateCartDataSuccess = (action) => {
  return {
    type: FETCH_ADD_TO_CART_UPDATE_SUCCESS,
    cart_data: action.payload.data.currentCart,
  };
};

export const getCartDetailsRequest = (user_id) => {
  return {
    type: FETCH_CART_DETAILS_REQUEST,
    user_id: user_id,
  };
};
export const getCartDetailsSuccess = (action) => {
  return {
    type: FETCH_CART_DETAILS_SUCCESS,
    cart_data: action.payload.data,
    count_cart: action.payload.cart_count,
  };
};

export const getRemoveFromCart = (cart_id) => {
  return {
    type: FETCH_REMOVE_FROM_CART_REQUEST,
    cart_id: cart_id,
  };
};
