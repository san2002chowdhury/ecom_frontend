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
  // console.log(
  //   "Step 1---->ADD TO CART DATA REQUEST--------->",

  //   user_id,
  //   product_id,
  //   quantity
  // );
  return {
    type: FETCH_ADD_TO_CART_REQUEST,

    user_id: user_id,
    product_id: product_id,
    quantity: quantity,
  };
};

export const getAddToCartSuccess = (action) => {
  // console.log("Step-2 ADD TO CART DATA SUCCESS--------->", action.payload);
  return { type: FETCH_ADD_TO_CART_SUCCESS, cart_data: action.payload };
};

export const getUpdateCartDataRequest = (flag, _id, user_id, product_id) => {
  console.log(
    "step 2------->Update Cart Data--->",
    flag,
    _id,
    user_id,
    product_id
  );
  return {
    type: FETCH_ADD_TO_CART_UPDATE_REQUEST,
    flag: flag,
    _id: _id,
    user_id: user_id,
    product_id: product_id,
  };
};

export const getUpdateCartDataSuccess = (action) => {
  return { type: FETCH_ADD_TO_CART_UPDATE_SUCCESS };
};

export const getCartDetailsRequest = (user_id_for_details) => {
  return {
    type: FETCH_CART_DETAILS_REQUEST,
    user_id_for_details: user_id_for_details,
  };
};
export const getCartDetailsSuccess = (action) => {
  return { type: FETCH_CART_DETAILS_SUCCESS, cart_details: action.payload1 };
};

export const getRemoveFromCart = (remove_cart_id) => {
  console.log(`step 1-------->${remove_cart_id}`);
  return {
    type: FETCH_REMOVE_FROM_CART_REQUEST,
    remove_cart_id: remove_cart_id,
  };
};
