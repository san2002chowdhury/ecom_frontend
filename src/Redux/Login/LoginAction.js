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
  return {
    type: FETCH_LOGIN_REQUEST,
    payload: payload,
  };
};

export const getLoginSuccess = (action) => {
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload: action.payload.data,
    token: action.payload.data.token,
    name: action.payload.data.data.name,
    id: action.payload.data.data.id,
    showSignin: true,
  };
};
export const getSignUpRequest = (payload) => {
  return {
    type: FETCH_SIGNUP_REQUEST,
    payload,
  };
};
export const getSignUpSuccess = (action) => {
  return {
    type: FETCH_SIGNUP_SUCCESS,
    action,
  };
};

export const getVerifyTokenRequest = (payload) => {
  return {
    type: FETCH_VERIFY_TOKEN_REQUEST,
    payload,
  };
};

export const getVerifyTokenSuccess = (action) => {
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
