import {
  FETCH_FORGOT_USER_PASSWORD_REQUEST,
  FETCH_FORGOT_USER_PASSWORD_SUCCESS,
  FETCH_RESET_USER_PASSWORD_IsTrue_REQUEST,
  FETCH_RESET_USER_PASSWORD_REQUEST,
  FETCH_RESET_USER_PASSWORD_SUCCESS,
  FETCH_SET_USER_DATA_REQUEST,
  FETCH_SET_USER_DATA_SUCCESS,
  FETCH_USER_DETAILS_REQUEST,
  FETCH_USER_DETAILS_SUCCESS,
} from "../action";

export const getUserDetailsRequest = (user_id) => {
  console.log(
    `Step-1--> getUserDetailsRequest------UserAction-->user_id--->${user_id}`
  );
  return {
    type: FETCH_USER_DETAILS_REQUEST,
    user_id: user_id,
  };
};

export const getUserDetailsSuccess = (action) => {
  console.log(
    `getUserDetailsSuccess-----UserAction---->details-->${action.payload}`
  );
  return {
    type: FETCH_USER_DETAILS_SUCCESS,
    user_details: action.payload,
  };
};
export const getUserAddDataRequest = (user_id, data) => {
  console.log("Step-1--->getUserAddDataRequest--->Action-->", user_id);
  console.log("Step-1--->getUserAddDataRequest--->Action-->", data);
  return {
    type: FETCH_SET_USER_DATA_REQUEST,
    user_id: user_id,
    aditional_data: data,
  };
};
export const getUserAddDataSuccess = (action) => {
  console.log("getUserAddDataSuccess--->Action--->", action);
  return {
    type: FETCH_SET_USER_DATA_SUCCESS,
    user_details: action.payload,
  };
};

export const getResetPasswordRequest = (user_id, data) => {
  console.log("Step-1--->getResetPasswordRequest----->", user_id);
  console.log("Step-1--->getResetPasswordRequest----->", data);
  return {
    type: FETCH_RESET_USER_PASSWORD_REQUEST,
    user_id: user_id,
    data: data,
  };
};
export const getResetPasswordSuccess = (action) => {
  console.log(
    "Step-3---->getResetPasswordSuccess---->FETCH_RESET_USER_PASSWORD_SUCCESS-->>",
    action
  );
  return {
    type: FETCH_RESET_USER_PASSWORD_SUCCESS,
  };
};

export const getForgotPasswordRequest = (user_id, data) => {
  console.log("Step-1--->getForgotPasswordRequest----->", user_id);
  console.log("Step-1--->getForgotPasswordRequest----->", data);
  return {
    type: FETCH_FORGOT_USER_PASSWORD_REQUEST,
    user_id: user_id,
    data: data,
  };
};
export const getForgotPasswordSuccess = (action) => {
  console.log(
    "Step-3---->getForgotPasswordSuccess---->FETCH_FORGOT_USER_PASSWORD_SUCCESS-->>",
    action
  );
  return {
    type: FETCH_FORGOT_USER_PASSWORD_SUCCESS,
  };
};

export const getResetPasswordIsReset = () => {
  return {
    type: FETCH_RESET_USER_PASSWORD_IsTrue_REQUEST,
  };
};
