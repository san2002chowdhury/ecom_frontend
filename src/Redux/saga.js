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
  FETCH_LOGIN_EMPTY_REQUEST,
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_PRODUCT_DETAILS_FAILURE,
  FETCH_PRODUCT_DETAILS_REQUEST,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_REMOVE_ALL_FROM_CART_FAILURE,
  FETCH_REMOVE_ALL_FROM_CART_REQUEST,
  FETCH_REMOVE_ALL_FROM_CART_SUCCESS,
  FETCH_REMOVE_ALL_FROM_WISHLIST_REQUEST,
  FETCH_REMOVE_ALL_FROM_WISHLIST_SUCCESS,
  FETCH_REMOVE_FROM_CART_FAILURE,
  FETCH_REMOVE_FROM_CART_REQUEST,
  FETCH_REMOVE_FROM_CART_SUCCESS,
  FETCH_REMOVE_FROM_WISHLIST_FAILURE,
  FETCH_REMOVE_FROM_WISHLIST_REQUEST,
  FETCH_REMOVE_FROM_WISHLIST_SUCCESS,
  FETCH_RESET_USER_PASSWORD_FAILURE,
  FETCH_RESET_USER_PASSWORD_IsTrue_REQUEST,
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
  GET_ONLINE_PAYMENT_FAILED_REQUEST,
  GET_ONLINE_PAYMENT_FAILED_SUCCESS,
  GET_ONLINE_PAYMENT_SUCCESS_FAILURE,
  GET_ONLINE_PAYMENT_SUCCESS_REQUEST,
  GET_ONLINE_PAYMENT_SUCCESS_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  SET_COUPON_FAILURE,
  SET_COUPON_REQUEST,
  SET_COUPON_SUCCESS,
  SET_LOADING,
  SET_ONLINE_PAYMENT_ORDER_ERROR,
  SET_ONLINE_PAYMENT_ORDER_REQUEST,
  SET_ONLINE_PAYMENT_ORDER_SUCCESS,
  SET_ORDER_FAILURE,
  SET_ORDER_REQUEST,
  SET_ORDER_SUCCESS,
  SET_REVIEW_REQUEST,
  SET_REVIEW_SUCCESS,
  SET_TOTAL_CART_VALUE_SUCCESS,
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
    const res = yield call(api.getaddToCart, {
      user_id: action.user_id,
      product_id: action.product_id,
      quantity: action.quantity,
    });
    if (res) {
      yield put({
        type: FETCH_ADD_TO_CART_SUCCESS,
        payload: res.data,
      });
    }
  } catch (error) {
    yield put({ type: FETCH_ADD_TO_CART_FAILURE, payload: error.message });
  }
}
function* fetchCartDetails(action) {
  try {
    const res = yield call(api.getCartData, {
      user_id: action.user_id,
    });
    console.log("CART DETAILS-->", res);

    if (res) {
      yield put({ type: FETCH_CART_DETAILS_SUCCESS, payload: res.data });
    }
  } catch (error) {
    yield put({
      type: FETCH_CART_DETAILS_FAILURE,
      payload: error.message,
    });
  }
}
function* fetchRemoveCartData(action) {
  try {
    const res = yield call(api.getremoveCartData, {
      _id: action.cart_id,
    });
    if (res) {
      yield put({ type: FETCH_REMOVE_FROM_CART_SUCCESS });
    }
  } catch (error) {
    yield put({ type: FETCH_REMOVE_FROM_CART_FAILURE, payload: error });
  }
}
function* fetchRemoveAllFromCart(action) {
  try {
    const res = yield call(api.getRemoveAllFromCart, {
      user_id: action.user_id,
    });

    if (res.data.status) {
      yield put({
        type: FETCH_REMOVE_ALL_FROM_CART_SUCCESS,
        cart_data: [],
        total_Cart_Value: 0,
        count_cart: 0,
      });
    }
  } catch (error) {
    yield put({ type: FETCH_REMOVE_ALL_FROM_CART_FAILURE, payload: error });
  }
}
function* fetchUpdateCart(action) {
  try {
    const res = yield call(api.getUpdateCartData, {
      flag: action.flag,
      cart_id: action.cart_id,
      user_id: action.user_id,
      product_id: action.product_id,
    });
    if (res.data.status === "success") {
      yield put({ type: FETCH_ADD_TO_CART_UPDATE_SUCCESS, payload: res });
    } else {
      toast.error(res.data.message);
      yield put({ type: FETCH_ADD_TO_CART_UPDATE_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: FETCH_ADD_TO_CART_UPDATE_FAILURE, payload: error });
  }
}
function* fetchAddToWihslist(action) {
  try {
    const res = yield call(api.getaddToWishlist, {
      user_id: action.user_id,
      product_id: action.product_id,
    });

    yield put({ type: FETCH_ADD_TO_WISHLIST_SUCCESS, payload: res.data });
  } catch (error) {
    yield put({ type: FETCH_ADD_TO_WISHLIST_FAILURE, payload: error.message });
  }
}
function* fetchOrderPlace(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.getPlaceOrder, {
      user_id: action.user_id,
      cart_data: action.cart_data,
      totalPrice: action.totalOrderValue,
      payment_mode: action.payment_mode,
      order_status: action.order_status,
      coupon_id: action.coupon_id,
    });
    console.log("Order Place Cash-->", res);

    if (res.data.message) {
      toast.success(res.data.message);
      yield put({
        type: SET_ORDER_SUCCESS,
        cart_data: res.data.data,
        order_quantity: res.data.total_ordered_items,
        order_data: res.data.allOrders,
        couponUsed: res.data.couponUsed,
        couponName: res.data.code,
      });
    }
  } catch (error) {
    yield put({ type: SET_ORDER_FAILURE, payload: error.message });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
}

function* fetchOrderPlaceOnlinePayment(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.getPlaceOrderOnlinePayment, {
      user_id: action.user_id,
      cart_data: action.cart_data,
      totalPrice: action.totalOrderValue,
      payment_mode: action.payment_mode,
      order_status: action.order_status,
      coupon_id: action.coupon_id,
    });
    const res1 = yield call(api.getRazorpay_key);
    yield put({
      type: SET_ONLINE_PAYMENT_ORDER_SUCCESS,
      cart_data: res.data.data,
      order_quantity: res.data.total_ordered_items,
      order_data: res.data.allOrders,
      order: res.data.order,
      currentOrder: res.data.data,
      key_id: res1.data.key,
      couponUsed: res.data.couponUsed,
      couponName: res.data.code,
    });
  } catch (error) {
    yield put({ type: SET_ONLINE_PAYMENT_ORDER_ERROR, payload: error.message });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
}

function* fetchOnlinePaymentSuccess(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.getOnlinePaymentSuccess, {
      currentOrder: action.currentOrder,
      razorpay_payment_id: action.razorpay_payment_id,
      razorpay_order_id: action.razorpay_order_id,
      razorpay_signature: action.razorpay_signature,
    });

    if (res.data.message) {
      toast.success(res.data.message);
      yield put({
        type: GET_ONLINE_PAYMENT_SUCCESS_SUCCESS,
        isAuthentic: res.data.data,
        key_id: "",
        razorpay_payment_id: "",
        razorpay_order_id: "",
        razorpay_signature: "",
        order: [],
      });
    }
  } catch (error) {
    yield put({
      type: GET_ONLINE_PAYMENT_SUCCESS_FAILURE,
      payload: error.message,
    });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
}

function* fetchOnlinePaymentFailed(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.getOnlinePaymentFailed, {
      order_id: action.order_id,
      user_id: action.user_id,
    });
    yield put({
      type: GET_ONLINE_PAYMENT_FAILED_SUCCESS,
      order_quantity: 0,
      order_data: res.data.allOrders,
      currentOrder: [],
      isAuthentic: false,
      razorpay_payment_id: "",
      razorpay_order_id: "",
      razorpay_signature: "",
      key_id: "",
      order: [],
    });
  } catch (error) {
    yield put({
      type: GET_ONLINE_PAYMENT_FAILED_SUCCESS,
      payload: error.message,
    });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
}

function* fetchAllOrderDetails(action) {
  try {
    const pageLocal = localStorage.getItem("orderPage");
    const res = yield call(api.getAllOrder, {
      user_id: action.user_id,
      page: action.page || pageLocal,
      searchValue: action.searchValue || "All",
      filterOrder: action.filterOrder || "All Orders",
    });

    if (res) {
      yield put({
        type: GET_ORDER_DETAILS_SUCCESS,
        order_data: res.data.allOrders,
        order_list: res.data.data_length,
      });
    }
  } catch (error) {
    yield put({ type: GET_ORDER_DETAILS_FAILURE, payload: error.message });
  }
}

function* fetchWihslistDetails(action) {
  try {
    const res = yield call(api.getWishlistData, {
      user_id: action.user_id,
    });
    yield put({
      type: FETCH_WISHLIST_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    yield put({
      type: FETCH_WISHLIST_DETAILS_FAILURE,
      payload: error.message,
    });
  }
}
function* fetchRemoveWishlistData(action) {
  try {
    yield call(api.getremoveWishlistData, {
      _id: action.wishlist_id,
    });
    yield put({ type: FETCH_REMOVE_FROM_WISHLIST_SUCCESS });
  } catch (error) {
    yield put({ type: FETCH_REMOVE_FROM_WISHLIST_FAILURE, payload: error });
  }
}

function* fetchRemoveAllFromWishlist(action) {
  try {
    const res = yield call(api.getRemoveAllFromWishlist, {
      user_id: action.user_id,
    });

    if (res.data.status) {
      toast.success(res.data.message);
      yield put({
        type: FETCH_REMOVE_ALL_FROM_WISHLIST_SUCCESS,
        wishlist_data: [],
        count_wishlist: 0,
      });
    }
  } catch (error) {
    yield put({ type: FETCH_REMOVE_ALL_FROM_CART_FAILURE, payload: error });
  }
}

function* fetchLoginData(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.getLogin, action.payload);
    if (res.status === 200) {
      yield put({
        type: FETCH_CART_DETAILS_REQUEST,
        user_id: res.data.data.id,
      });
      yield put({
        type: FETCH_WISHLIST_DETAILS_REQUEST,
        user_id: res.data.data.id,
      });
      yield put({
        type: FETCH_USER_DETAILS_REQUEST,
        user_id: res.data.data.id,
      });
      yield put({
        type: GET_ORDER_DETAILS_REQUEST,
        user_id: res.data.data.id,
        page: 1,
        searchValue: "All",
      });
      yield put({
        type: FETCH_RESET_USER_PASSWORD_IsTrue_REQUEST,
      });
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
    if (res && res.status === 201) {
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
    const res = yield call(api.getUserData, action.user_id);

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
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.getAdditionalData, action);
    yield put({ type: FETCH_SET_USER_DATA_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: FETCH_SET_USER_DATA_FAILURE, payload: error });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
}

function* fetchUploadProfilePhoto(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });

    const res = yield call(api.uploadProfilePhoto, action.formData);
    yield put({ type: IMAGE_UPLOAD_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: IMAGE_UPLOAD_FAILURE, payload: error });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
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
      // yield put({ type: FETCH_RESET_USER_PASSWORD_IsTrue_REQUEST });
    }
  } catch (error) {
    yield put({ type: FETCH_RESET_USER_PASSWORD_FAILURE, payload: error });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
    yield put({ type: FETCH_LOGIN_EMPTY_REQUEST });
  }
}

function* fetchForgotPassword(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.getNewPassword, action);
    toast.success(
      res.data.status === true ? res.data.message : "Something went wrong!"
    );

    if (res) {
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
function* fetchReviewData(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.getReviewData, action);

    yield put({ type: GET_REVIEW_SUCCESS, reviewData: res.data.data });
  } catch (error) {
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
}
function* fetchGivingReview(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.setReview, action);

    if (res.data.status === "true") {
      toast.success(res.data.message);
      yield put({ type: SET_REVIEW_SUCCESS, reviewData: res.data.data });
    } else {
      toast.error(res.data.message);
      yield put({ type: SET_REVIEW_SUCCESS, reviewData: "" });
    }
  } catch (error) {
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
}
function* fetchVerifyToken(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });

    const res = yield call(api.getVerifyToken, action.payload);

    if (res.data.data._id) {
      yield put({
        type: FETCH_VERIFY_TOKEN_SUCCESS,
        payload: res,
      });
      yield put({
        type: FETCH_WISHLIST_DETAILS_REQUEST,
        user_id: res.data.data._id,
      });

      yield put({
        type: FETCH_CART_DETAILS_REQUEST,
        user_id: res.data.data._id,
      });
      yield put({
        type: FETCH_USER_DETAILS_REQUEST,
        user_id: res.data.data._id,
      });
      yield put({
        type: GET_ORDER_DETAILS_REQUEST,
        user_id: res.data.data._id,
        page: 1,
        searchValue: "All",
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_VERIFY_TOKEN_FAILURE,
      payload: error,
    });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
}

function* fetchApplyCoupon(action) {
  try {
    yield put({ type: SET_LOADING, payload: true });
    const res = yield call(api.applyCoupon, action);
    if (res.data.status === true) {
      toast.success(res.data.message);
      console.log("Saga Coupon Applied-->", res.data.price);

      yield put({
        type: SET_TOTAL_CART_VALUE_SUCCESS,
        payload: res.data.price,
      });
      yield put({
        type: SET_COUPON_SUCCESS,
        cart_data: res.data.data,
        code: res.data.code,
        applied: res.data.status,
        _id: res.data._id,
        minCartValue: res.data.minCartValue,
      });
    } else {
      toast.error(res.data.message);
      yield put({
        type: SET_TOTAL_CART_VALUE_SUCCESS,
        payload: res.data.price,
      });
      yield put({
        type: SET_COUPON_SUCCESS,
        cart_data: res.data.data,
        code: res.data.code,
        applied: res.data.status,
        _id: res.data._id,
        minCartValue: res.data.minCartValue,
      });
    }
  } catch (error) {
    yield put({ type: SET_COUPON_FAILURE, payload: error });
  } finally {
    yield put({ type: SET_LOADING, payload: false });
  }
}

export function* rootSaga() {
  yield takeEvery(FETCH_ALL_CATEGORY_REQUEST, fetchAllCategoriesSaga);
  yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchAllProductsSaga);
  yield takeEvery(FETCH_TOP_CATEGORY_REQUEST, fetchTopCategoriesSaga);
  yield takeEvery(FETCH_TOPTEN_PRODUCTS_REQUEST, fetchTopTenProductsSaga);
  yield takeEvery(FETCH_PRODUCT_DETAILS_REQUEST, fetchProductDetails);
  yield takeEvery(FETCH_ADD_TO_CART_REQUEST, fetchAddToCart);
  yield takeEvery(FETCH_CART_DETAILS_REQUEST, fetchCartDetails);
  yield takeEvery(FETCH_REMOVE_FROM_CART_REQUEST, fetchRemoveCartData);
  yield takeEvery(FETCH_REMOVE_ALL_FROM_CART_REQUEST, fetchRemoveAllFromCart);
  yield takeEvery(FETCH_ADD_TO_WISHLIST_REQUEST, fetchAddToWihslist);
  yield takeEvery(FETCH_WISHLIST_DETAILS_REQUEST, fetchWihslistDetails);
  yield takeEvery(FETCH_REMOVE_FROM_WISHLIST_REQUEST, fetchRemoveWishlistData);
  yield takeEvery(
    FETCH_REMOVE_ALL_FROM_WISHLIST_REQUEST,
    fetchRemoveAllFromWishlist
  );
  yield takeEvery(SET_ORDER_REQUEST, fetchOrderPlace);
  yield takeEvery(
    SET_ONLINE_PAYMENT_ORDER_REQUEST,
    fetchOrderPlaceOnlinePayment
  );
  yield takeEvery(GET_ORDER_DETAILS_REQUEST, fetchAllOrderDetails);
  yield takeEvery(
    GET_ONLINE_PAYMENT_SUCCESS_REQUEST,
    fetchOnlinePaymentSuccess
  );
  yield takeEvery(GET_ONLINE_PAYMENT_FAILED_REQUEST, fetchOnlinePaymentFailed);
  yield takeEvery(IMAGE_UPLOAD_REQUEST, fetchUploadProfilePhoto);
  yield takeEvery(GET_REVIEW_REQUEST, fetchReviewData);
  yield takeEvery(SET_REVIEW_REQUEST, fetchGivingReview);

  yield takeEvery(FETCH_LOGIN_REQUEST, fetchLoginData);
  yield takeEvery(FETCH_SIGNUP_REQUEST, fetchSignupData);
  yield takeEvery(FETCH_USER_DETAILS_REQUEST, fetchUserData);
  yield takeEvery(FETCH_SET_USER_DATA_REQUEST, fetchAddionalUserData);
  yield takeEvery(FETCH_ADD_TO_CART_UPDATE_REQUEST, fetchUpdateCart);
  yield takeEvery(FETCH_RESET_USER_PASSWORD_REQUEST, fetchResetPassword);
  yield takeEvery(FETCH_FORGOT_USER_PASSWORD_REQUEST, fetchForgotPassword);
  yield takeEvery(FETCH_VERIFY_TOKEN_REQUEST, fetchVerifyToken);
  yield takeEvery(SET_COUPON_REQUEST, fetchApplyCoupon);
}
