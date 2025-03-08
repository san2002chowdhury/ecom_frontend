import { call, put, takeEvery } from "redux-saga/effects";
import toast from "react-hot-toast";

import {
  FETCH_ADD_TO_CART_FAILURE,
  FETCH_ADD_TO_CART_REQUEST,
  FETCH_ADD_TO_CART_SUCCESS,
  FETCH_ADD_TO_CART_UPDATE_FAILURE,
  FETCH_ADD_TO_CART_UPDATE_REQUEST,
  FETCH_ADD_TO_CART_UPDATE_SUCCESS,
  FETCH_ADD_TO_WISHLIST_FAILURE,
  FETCH_ADD_TO_WISHLIST_REQUEST,
  FETCH_ADD_TO_WISHLIST_SUCCESS,
  FETCH_ALL_CATEGORY_REQUEST,
  FETCH_ALL_CATEGORY_SUCCESS,
  FETCH_CART_DETAILS_FAILURE,
  FETCH_CART_DETAILS_REQUEST,
  FETCH_CART_DETAILS_SUCCESS,
  FETCH_CATEGORY_FAILURE,
  FETCH_FORGOT_USER_PASSWORD_FAILURE,
  FETCH_FORGOT_USER_PASSWORD_REQUEST,
  FETCH_FORGOT_USER_PASSWORD_SUCCESS,
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_PRODUCT_DETAILS_FAILURE,
  FETCH_PRODUCT_DETAILS_REQUEST,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_REMOVE_FROM_CART_FAILURE,
  FETCH_REMOVE_FROM_CART_REQUEST,
  FETCH_REMOVE_FROM_CART_SUCCESS,
  FETCH_REMOVE_FROM_WISHLIST_FAILURE,
  FETCH_REMOVE_FROM_WISHLIST_REQUEST,
  FETCH_REMOVE_FROM_WISHLIST_SUCCESS,
  FETCH_RESET_USER_PASSWORD_FAILURE,
  FETCH_RESET_USER_PASSWORD_REQUEST,
  FETCH_RESET_USER_PASSWORD_SUCCESS,
  FETCH_SET_USER_DATA_FAILURE,
  FETCH_SET_USER_DATA_REQUEST,
  FETCH_SET_USER_DATA_SUCCESS,
  FETCH_SIGNUP_FAILURE,
  FETCH_SIGNUP_REQUEST,
  FETCH_SIGNUP_SUCCESS,
  FETCH_TOP_CATEGORY_FAILURE,
  FETCH_TOP_CATEGORY_REQUEST,
  FETCH_TOP_CATEGORY_SUCCESS,
  FETCH_TOPTEN_PRODUCTS_FAILURE,
  FETCH_TOPTEN_PRODUCTS_REQUEST,
  FETCH_TOPTEN_PRODUCTS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  FETCH_USER_DETAILS_REQUEST,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_VERIFY_TOKEN_FAILURE,
  FETCH_VERIFY_TOKEN_REQUEST,
  FETCH_VERIFY_TOKEN_SUCCESS,
  FETCH_WISHLIST_DETAILS_FAILURE,
  FETCH_WISHLIST_DETAILS_REQUEST,
  FETCH_WISHLIST_DETAILS_SUCCESS,
  SET_LOADING,
} from "./action";
import * as api from "./api";

function* fetchAllCategoriesSaga() {
  try {
    const res = yield call(api.getAllCategory);
    yield put({
      type: FETCH_ALL_CATEGORY_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    yield put({ type: FETCH_CATEGORY_FAILURE, payload: error.message });
  }
}
function* fetchTopCategoriesSaga() {
  try {
    const res = yield call(api.getTopCategory);
    yield put({
      type: FETCH_TOP_CATEGORY_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    yield put({ type: FETCH_TOP_CATEGORY_FAILURE, payload: error.message });
  }
}

function* fetchAllProductsSaga(action) {
  try {
    const res = yield call(api.getAllProduct, action);
    yield put({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: res.data.data,
      length: res.data.length,
    });
  } catch (error) {
    yield put({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
}

function* fetchTopTenProductsSaga() {
  try {
    const res = yield call(api.getTopTenProduct);
    yield put({
      type: FETCH_TOPTEN_PRODUCTS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    yield put({ type: FETCH_TOPTEN_PRODUCTS_FAILURE, payload: error.message });
  }
}
function* fetchProductDetails(action) {
  try {
    const res = yield call(api.getProductDetails, { slug: action.slug });
    yield put({
      type: FETCH_PRODUCT_DETAILS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    yield put({ type: FETCH_PRODUCT_DETAILS_FAILURE, payload: error.message });
  }
}
function* fetchAddToCart(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.getaddToCart, {
      user_id: action.user_id,
      product_id: action.product_id,
      quantity: action.quantity,
    });
    if (res && res.status === 200) {
      yield put({
        type: FETCH_ADD_TO_CART_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    yield put({ type: FETCH_ADD_TO_CART_FAILURE, payload: error.message });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
}
function* fetchCartDetails(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.getCartData, {
      user_id: action.user_id_for_details,
    });
    if (res && res.status === 200) {
      yield put({ type: FETCH_CART_DETAILS_SUCCESS, payload1: res.data.data });
    }
  } catch (error) {
    yield put({
      type: FETCH_CART_DETAILS_FAILURE,
      payload1: error.message,
    });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
}
function* fetchRemoveCartData(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.getremoveCartData, {
      _id: action.remove_cart_id,
    });
    if (res && res.status === 200) {
      yield put({ type: FETCH_REMOVE_FROM_CART_SUCCESS });
    } else {
      yield put({
        type: FETCH_REMOVE_FROM_CART_FAILURE,
        payload: "Something went wrong",
      });
    }
  } catch (error) {
    yield put({ type: FETCH_REMOVE_FROM_CART_FAILURE, payload: error });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
}
function* fetchUpdateCart(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.getUpdateCartData, {
      flag: action.flag,
      _id: action._id,
      user_id: action.user_id,
      product_id: action.product_id,
    });
    if (res) {
      yield put({ type: FETCH_ADD_TO_CART_UPDATE_SUCCESS });
      yield put({ type: SET_LOADING, payload: false });
    }
  } catch (error) {
    yield put({ type: FETCH_ADD_TO_CART_UPDATE_FAILURE, payload: error });
  }
}
function* fetchAddToWihslist(action) {
  try {
    console.log(
      `WE ARE IN SAGA FILE action--->${action}-------->user_id_for_add-------->${action.user_id_for_add}<--------product_id_for_add--------->${action.product_id_for_add}`
    );
    const res = yield call(api.getaddToWishlist, {
      user_id: action.user_id_for_add,
      product_id: action.product_id_for_add,
    });
    console.log(res.data);

    yield put({ type: FETCH_ADD_TO_WISHLIST_SUCCESS, payload: res.data });
  } catch (error) {
    yield put({ type: FETCH_ADD_TO_WISHLIST_FAILURE, payload: error.message });
  }
}
function* fetchWihslistDetails(action) {
  try {
    console.log(
      "action.payload1 details user_id_for_details------>",
      action.user_id_for_details
    );
    // yield put(setLoading(true));
    const res = yield call(api.getWishlistData, {
      user_id: action.user_id_for_details,
    });
    console.log(res.data.data);
    yield put({
      type: FETCH_WISHLIST_DETAILS_SUCCESS,
      payload1: res.data.data,
    });
    // yield put(setLoading(false));
  } catch (error) {
    yield put({
      type: FETCH_WISHLIST_DETAILS_FAILURE,
      payload1: error.message,
    });
  }
}
function* fetchRemoveWishlistData(action) {
  try {
    console.log(`step 2-------->${action.remove_wishlist_id}`);
    yield call(api.getremoveWishlistData, {
      _id: action.remove_wishlist_id,
    });
    yield put({ type: FETCH_REMOVE_FROM_WISHLIST_SUCCESS });
  } catch (error) {
    yield put({ type: FETCH_REMOVE_FROM_WISHLIST_FAILURE, payload: error });
  }
}

function* fetchLoginData(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.getLogin, action.payload);
    if (res && res.status === 200) {
      yield put({
        type: FETCH_LOGIN_SUCCESS,
        payload: res,
      });
    }
  } catch (error) {
    yield put({ type: FETCH_LOGIN_FAILURE, payload: error });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
}

function* fetchSignupData(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.getSignUp, action.payload);
    if (res && res.status === 200) {
      yield put({
        type: FETCH_SIGNUP_SUCCESS,
        payload: res,
      });
    }
  } catch (error) {
    yield put({ type: FETCH_SIGNUP_FAILURE, payload: error });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
}

function* fetchUserData(action) {
  try {
    console.log(action);

    console.log("initial--->stage--->", action.user_id);
    const res = yield call(api.getUserData, action.user_id);
    console.log(res.data);

    yield put({
      type: FETCH_USER_DETAILS_SUCCESS,
      payload: res,
    });
  } catch (error) {
    yield put({ type: FETCH_USER_DETAILS_FAILURE, payload: error });
  }
}
function* fetchAddionalUserData(action) {
  try {
    console.log("saga--->", action);
    const res = yield call(api.getAdditionalData, action);
    console.log("saga res---->", res);
    yield put({ type: FETCH_SET_USER_DATA_SUCCESS, payload: res });
  } catch (error) {
    console.log("catch--->", error);
    yield put({ type: FETCH_SET_USER_DATA_FAILURE, payload: error });
  }
}

function* fetchResetPassword(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });

    const res = yield call(api.getSetNewPassword, action);
    if (res) {
      yield put({
        type: FETCH_RESET_USER_PASSWORD_SUCCESS,
        payload: res,
      });
    }
  } catch (error) {
    yield put({ type: FETCH_RESET_USER_PASSWORD_FAILURE, payload: error });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
}

function* fetchForgotPassword(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.getNewPassword, action);
    toast.success(
      res.data.status === true ? res.data.message : "Something went wrong!"
    );

    if (res && res.status === 200) {
      yield put({
        type: FETCH_FORGOT_USER_PASSWORD_SUCCESS,
        payload: res,
      });
    }
  } catch (error) {
    yield put({ type: FETCH_FORGOT_USER_PASSWORD_FAILURE, payload: error });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
}

function* fetchVerifyToken(action) {
  try {
    const res = yield call(api.getVerifyToken, action.payload);

    yield put({
      type: FETCH_VERIFY_TOKEN_SUCCESS,
      payload: res,
    });
  } catch (error) {
    yield put({
      type: FETCH_VERIFY_TOKEN_FAILURE,
      payload: error,
    });
  }
}

export function* rootSaga() {
  console.log("we are in root saga");
  yield takeEvery(FETCH_ALL_CATEGORY_REQUEST, fetchAllCategoriesSaga);
  yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchAllProductsSaga);
  yield takeEvery(FETCH_TOP_CATEGORY_REQUEST, fetchTopCategoriesSaga);
  yield takeEvery(FETCH_TOPTEN_PRODUCTS_REQUEST, fetchTopTenProductsSaga);
  yield takeEvery(FETCH_PRODUCT_DETAILS_REQUEST, fetchProductDetails);
  yield takeEvery(FETCH_ADD_TO_CART_REQUEST, fetchAddToCart);
  yield takeEvery(FETCH_CART_DETAILS_REQUEST, fetchCartDetails);
  yield takeEvery(FETCH_REMOVE_FROM_CART_REQUEST, fetchRemoveCartData);
  yield takeEvery(FETCH_ADD_TO_WISHLIST_REQUEST, fetchAddToWihslist);
  yield takeEvery(FETCH_WISHLIST_DETAILS_REQUEST, fetchWihslistDetails);
  yield takeEvery(FETCH_REMOVE_FROM_WISHLIST_REQUEST, fetchRemoveWishlistData);
  yield takeEvery(FETCH_LOGIN_REQUEST, fetchLoginData);
  yield takeEvery(FETCH_SIGNUP_REQUEST, fetchSignupData);
  yield takeEvery(FETCH_USER_DETAILS_REQUEST, fetchUserData);
  yield takeEvery(FETCH_SET_USER_DATA_REQUEST, fetchAddionalUserData);
  yield takeEvery(FETCH_ADD_TO_CART_UPDATE_REQUEST, fetchUpdateCart);
  yield takeEvery(FETCH_RESET_USER_PASSWORD_REQUEST, fetchResetPassword);
  yield takeEvery(FETCH_FORGOT_USER_PASSWORD_REQUEST, fetchForgotPassword);
  yield takeEvery(FETCH_VERIFY_TOKEN_REQUEST, fetchVerifyToken);
}
