import {
  FETCH_ADD_TO_WISHLIST_REQUEST,
  FETCH_ADD_TO_WISHLIST_SUCCESS,
  FETCH_REMOVE_FROM_WISHLIST_REQUEST,
  FETCH_WISHLIST_DETAILS_REQUEST,
  FETCH_WISHLIST_DETAILS_SUCCESS,
} from "../action";

export const getAddToWishlistRequest = (
  user_id_for_add,
  product_id_for_add
) => {
  // console.log(
  //   `Step-1-> getAddToWishlistRequest------WISHLIST-ACTION---->user_id_for_add-------->${user_id_for_add}<--------product_id_for_add--------->${product_id_for_add}`
  // );
  return {
    type: FETCH_ADD_TO_WISHLIST_REQUEST,
    user_id_for_add: user_id_for_add,
    product_id_for_add: product_id_for_add,
  };
};
export const getAddToWishlistSuccess = (action) => {
  // console.log(
  //   `getAddToWishlistSuccess-------WISHLIST-ACTION-------->${action.payload}`
  // );
  return {
    type: FETCH_ADD_TO_WISHLIST_SUCCESS,
    wishlist_data: action.payload,
  };
};
export const getWishlistDataRequest = (user_id_for_details) => {
  // console.log(
  //   `Step-2--->getWishlistDataRequest------WISHLIST-ACTION---->user_id_for_details-------->${user_id_for_details}`
  // );
  return {
    type: FETCH_WISHLIST_DETAILS_REQUEST,
    user_id_for_details: user_id_for_details,
  };
};
export const getWishlistDataSuccess = (action) => {
  // console.log(
  //   `getWishlistDataSuccess-------WISHLIST-ACTION-------->${action.payload1}`
  // );
  return {
    type: FETCH_WISHLIST_DETAILS_SUCCESS,
    wishlist_details: action.payload1,
  };
};
export const getRemoveFromWishlist = (remove_wishlist_id) => {
  // console.log(`step 1-------->${remove_wishlist_id}`);
  return {
    type: FETCH_REMOVE_FROM_WISHLIST_REQUEST,
    remove_wishlist_id: remove_wishlist_id,
  };
};
