import {
  FETCH_LOGIN_EMPTY_REQUEST,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_SIGNUP_REQUEST,
  FETCH_SIGNUP_SUCCESS,
  FETCH_VERIFY_TOKEN_REQUEST,
  FETCH_VERIFY_TOKEN_SUCCESS,
} from "../action";

export const getLoginRequest = (payload) => {
  console.log(`step:1 --->LOGIN -------->`, payload);
  return {
    type: FETCH_LOGIN_REQUEST,
    payload,
  };
};

export const getLoginSuccess = (action) => {
  console.log(
    `getLoginSuccess-------WISHLIST-ACTION-------->${action.payload}`
  );
  return {
    type: FETCH_LOGIN_SUCCESS,
    action,
  };
};
export const getSignUpRequest = (payload) => {
  console.log("step:1--->SIGNUP---->", payload);
  return {
    type: FETCH_SIGNUP_REQUEST,
    payload,
  };
};
export const getSignUpSuccess = (action) => {
  console.log("getSignupSuccess--->SIGNUP---->", action);
  return {
    type: FETCH_SIGNUP_SUCCESS,
    action,
  };
};

export const getVerifyTokenRequest = (payload) => {
  console.log("getVerifyToken---->TOKEN--->", payload);
  return {
    type: FETCH_VERIFY_TOKEN_REQUEST,
    payload,
  };
};

export const getVerifyTokenSuccess = (action) => {
  console.log("getVerifyToken--->Token-->", action);
  return {
    type: FETCH_VERIFY_TOKEN_SUCCESS,
    action,
  };
};

export const getLoginEmpty = () => {
  return {
    type: FETCH_LOGIN_EMPTY_REQUEST,
  };
};
