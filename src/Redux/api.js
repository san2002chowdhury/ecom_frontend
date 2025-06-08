import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config({ path: "./config.env" });
const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log("BASE URL-->", BASE_URL);

export const getAllCategory = () => axios.get(`${BASE_URL}/category`);
export const getTopCategory = () => axios.get(`${BASE_URL}/category/top5`);
export const getAllProduct = (payload) => {
  return axios.get(
    `${BASE_URL}/product/products/${payload.page || 1}/${payload.cat_id}/${
      payload.filter
    }/${payload.search}`
  );
};
export const getTopTenProduct = () => axios.get(`${BASE_URL}/product/topten`);
export const getProductDetails = (slug) => {
  return axios.post(`${BASE_URL}/product`, slug);
};
export const getaddToCart = (payload) => {
  const jwtToken = localStorage.getItem("token");

  return axios.post(
    `${BASE_URL}/cart/add`,
    {
      user_id: payload.user_id,
      product_id: payload.product_id,
      quantity: payload?.quantity || 1,
    },
    {
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    }
  );
};
export const getCartData = (user_id) => {
  return axios.post(`${BASE_URL}/cart/cartData`, user_id);
};
export const getUpdateCartData = (payload) => {
  return axios.patch(`${BASE_URL}/cart/updateQuantity`, {
    flag: payload.flag,
    _id: payload.cart_id,
    user_id: payload.user_id,
    product_id: payload.product_id,
  });
};
export const getremoveCartData = (payload) => {
  return axios.delete(`${BASE_URL}/cart/remove`, {
    data: { _id: payload._id },
  });
};

export const getRemoveAllFromCart = (payload) => {
  const jwtToken = localStorage.getItem("token");
  return axios.delete(`${BASE_URL}/cart/removeAll`, {
    data: { user_id: payload.user_id },

    headers: {
      authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const getaddToWishlist = (payload) => {
  const jwtToken = localStorage.getItem("token");
  return axios.post(
    `${BASE_URL}/wishlist/add`,
    { user_id: payload.user_id, product_id: payload.product_id },
    {
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    }
  );
};
export const getWishlistData = (user_id) => {
  return axios.post(`${BASE_URL}/wishlist/data`, user_id);
};
export const getremoveWishlistData = (payload) => {
  return axios.delete(`${BASE_URL}/wishlist/remove`, {
    data: { _id: payload._id },
  });
};
export const getRemoveAllFromWishlist = (payload) => {
  const jwtToken = localStorage.getItem("token");
  return axios.delete(`${BASE_URL}/wishlist/removeAll`, {
    data: { user_id: payload.user_id },
    headers: {
      authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });
};
export const getLogin = (payload) => {
  return axios.post(`${BASE_URL}/user/login`, payload);
};
export const getSignUp = (payload) => {
  return axios.post(`${BASE_URL}/user/signup`, payload);
};
export const getUserData = (user_id) => {
  return axios.post(`${BASE_URL}/user/user_details`, { user_id: user_id });
};
export const getAdditionalData = (payload) => {
  const jwtToken = localStorage.getItem("token");
  return axios.patch(
    `${BASE_URL}/user/save_profile/${payload.user_id}`,
    { body: payload.aditional_data },
    {
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getSetNewPassword = (payload) => {
  const jwtToken = localStorage.getItem("token");
  return axios.patch(
    `${BASE_URL}/user/reset_password/${payload.user_id}`,
    { body: payload.data },
    {
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getNewPassword = (payload) => {
  return axios.patch(`${BASE_URL}/user/forgot_password/${payload.user_id}`, {
    body: payload.data,
  });
};

export const getVerifyToken = (payload) => {
  return axios.post(`${BASE_URL}/user/verify_token`, { token: payload });
};
export const getPlaceOrder = (payload) => {
  const jwtToken = localStorage.getItem("token");
  return axios.post(
    `${BASE_URL}/order/placeOrder`,
    {
      user_id: payload.user_id,
      cart_data: payload.cart_data,
      totalPrice: payload?.totalPrice,
      payment_mode: payload.payment_mode,
      order_status: payload.order_status,
      coupon_id: payload.coupon_id,
    },
    {
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getPlaceOrderOnlinePayment = (payload) => {
  const jwtToken = localStorage.getItem("token");
  return axios.post(
    `${BASE_URL}/order/processPayment`,
    {
      user_id: payload.user_id,
      cart_data: payload.cart_data,
      totalPrice: payload?.totalPrice,
      payment_mode: payload.payment_mode,
      order_status: payload.order_status,
      coupon_id: payload.coupon_id,
    },
    {
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    }
  );
};
export const getRazorpay_key = () => {
  return axios.get(`${BASE_URL}/order/getKey`);
};
export const getOnlinePaymentSuccess = (payload) => {
  const jwtToken = localStorage.getItem("token");
  return axios.post(
    `${BASE_URL}/order/order-confirm`,
    {
      currentOrder: payload.currentOrder,
      razorpay_payment_id: payload.razorpay_payment_id,
      razorpay_order_id: payload.razorpay_order_id,
      razorpay_signature: payload.razorpay_signature,
    },
    {
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getOnlinePaymentFailed = (payload) => {
  const jwtToken = localStorage.getItem("token");

  return axios.post(
    `${BASE_URL}/order/order-failed`,
    { order_id: payload.order_id, user_id: payload.user_id },
    {
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getAllOrder = (payload) => {
  const pageLocal = localStorage.getItem("orderPage");

  return axios.post(`${BASE_URL}/order/getAll`, {
    user_id: payload.user_id,
    page: payload.page || pageLocal,
    searchValue: payload.searchValue,
    filterOrder: payload.filterOrder,
  });
};

export const uploadProfilePhoto = (formData) => {
  return axios.post(`${BASE_URL}/user/profile_photo`, formData);
};

export const getReviewData = (payload) => {
  return axios.post(`${BASE_URL}/review/reviewDetails`, {
    product_id: payload.product_id,
  });
};
export const setReview = (payload) => {
  return axios.post(`${BASE_URL}/review/addReview`, {
    product_id: payload.product_id,
    user_id: payload.user_id,
    description: payload.description,
    rating: payload.rating,
  });
};

export const applyCoupon = (payload) => {
  return axios.post(`${BASE_URL}/coupon/useCoupon`, {
    user_id: payload.user_id,
    cart_data: payload.cart_data,
    code: payload.code,
  });
};
