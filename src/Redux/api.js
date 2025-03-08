import axios from "axios";
export const BASE_URL = "http://localhost:3001/api";
export const getAllCategory = () => axios.get(`${BASE_URL}/category`);
export const getTopCategory = () => axios.get(`${BASE_URL}/category/top5`);
export const getAllProduct = (payload) => {
  console.log("API---->PRODUCT-->", payload);

  return axios.get(
    `${BASE_URL}/product/products/${payload.page || 1}/${payload.cat_id}/${
      payload.filter
    }/${payload.search}`
  );
};
// export const getProductByCategory = (payload) => {
//   console.log("ACTION-->", payload);

//   return axios.post(`${BASE_URL}/category/getData/${payload.page || 1}`, {
//     name: payload.name,
//   });
// };
export const getTopTenProduct = () => axios.get(`${BASE_URL}/product/topten`);
export const getProductDetails = (slug) => {
  return axios.post(`${BASE_URL}/product`, slug);
};
export const getaddToCart = (payload) => {
  console.log("add to cart api---->", payload);

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
  console.log("api called update cart----->", payload);
  return axios.patch(`${BASE_URL}/cart/updateQuantity`, {
    flag: payload.flag,
    _id: payload._id,
    user_id: payload.user_id,
    product_id: payload.product_id,
  });
};
export const getremoveCartData = (payload) => {
  return axios.delete(`${BASE_URL}/cart/remove`, {
    data: { _id: payload._id },
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
export const getLogin = (payload) => {
  return axios.post(`${BASE_URL}/user/login`, payload);
};
export const getSignUp = (payload) => {
  console.log("We are here in api--->and payload is---->", payload);
  return axios.post(`${BASE_URL}/user/signup`, payload);
};
export const getUserData = (user_id) => {
  console.log("user_id--->", user_id);
  const jwtToken = localStorage.getItem("token");
  return axios.post(
    `${BASE_URL}/user/user_details`,
    { user_id: user_id },
    {
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    }
  );
};
export const getAdditionalData = (payload) => {
  console.log("API---->SAVE PROFILE--->", payload.aditional_data);
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
  console.log("Api--->SET NEW PASSWORD--->", payload.data);
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
  console.log("Api--->New Password--->", payload);
  return axios.patch(`${BASE_URL}/user/forgot_password/${payload.user_id}`, {
    body: payload.data,
  });
};

// export const getContact = (payload) => {
//   console.log("We are here in getContact--->and payload is---->", payload);
//   return axios.post(`${BASE_URL}/contact/getContact`, payload);
// };

export const getVerifyToken = (payload) => {
  console.log("Api--->VERIFY Token---->", payload);
  return axios.post(`${BASE_URL}/user/verify_token`, { token: payload });
};
