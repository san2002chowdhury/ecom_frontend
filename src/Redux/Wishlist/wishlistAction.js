import {
  FETCH_ADD_TO_WISHLIST_REQUEST,
  FETCH_ADD_TO_WISHLIST_SUCCESS,
  FETCH_REMOVE_ALL_FROM_WISHLIST_REQUEST,
  FETCH_REMOVE_FROM_WISHLIST_REQUEST,
  FETCH_WISHLIST_DETAILS_REQUEST,
  FETCH_WISHLIST_DETAILS_SUCCESS,
} from "../action";

export const getAddToWishlistRequest = (user_id, product_id) => {
  return {
    type: FETCH_ADD_TO_WISHLIST_REQUEST,
    user_id: user_id,
    product_id: product_id,
  };
};
export const getAddToWishlistSuccess = (action) => {
  return {
    type: FETCH_ADD_TO_WISHLIST_SUCCESS,
    wishlist_data: action.payload,
  };
};
export const getWishlistDataRequest = (user_id) => {
  return {
    type: FETCH_WISHLIST_DETAILS_REQUEST,
    user_id: user_id,
  };
};
export const getWishlistDataSuccess = (action) => {
  return {
    type: FETCH_WISHLIST_DETAILS_SUCCESS,
    wishlist_data: action.payload,
  };
};
export const getRemoveFromWishlist = (wishlist_id) => {
  return {
    type: FETCH_REMOVE_FROM_WISHLIST_REQUEST,
    wishlist_id: wishlist_id,
  };
};

export const getRemoveAllFromWishlist = (user_id) => {
  console.log("wishlistAction--->user-->id-->", user_id);
  return {
    type: FETCH_REMOVE_ALL_FROM_WISHLIST_REQUEST,
    user_id: user_id,
  };
};
