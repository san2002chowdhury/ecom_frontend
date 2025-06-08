import toast from "react-hot-toast";

const {
  FETCH_USER_DETAILS_REQUEST,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_SET_USER_DATA_REQUEST,
  FETCH_SET_USER_DATA_SUCCESS,
  FETCH_RESET_USER_PASSWORD_REQUEST,
  FETCH_RESET_USER_PASSWORD_SUCCESS,
  FETCH_RESET_USER_PASSWORD_IsTrue_REQUEST,
  FETCH_FORGOT_USER_PASSWORD_REQUEST,
  FETCH_FORGOT_USER_PASSWORD_SUCCESS,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
} = require("../action");

const initialState = {
  user_details: [],
  user_id: "",
  token: "",
  aditional_data: [],
  data: [],
  formData: {},
  isPasswordReset: false,
  isPasswordForgot: false,
  error: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS_REQUEST:
      return {
        ...state,
        user_id: action.user_id,
      };
    case FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        user_details: action.payload.data.data,
      };
    case FETCH_SET_USER_DATA_REQUEST:
      return {
        ...state,
        user_id: action.user_id,
        aditional_data: action.data,
      };
    case IMAGE_UPLOAD_REQUEST:
      return {
        ...state,
        formData: action.formData,
      };
    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        user_details: action.payload.data.data,
      };
    case FETCH_SET_USER_DATA_SUCCESS:
      toast.success(action.payload.data.message);
      // toast.success(action.payload.data.message);
      localStorage.setItem("name", action.payload.data.name);
      return {
        ...state,
        user_details: action.payload.data.data,
      };
    case FETCH_RESET_USER_PASSWORD_REQUEST:
      return {
        ...state,
        user_id: action.user_id,
        data: action.data,
      };
    case FETCH_RESET_USER_PASSWORD_SUCCESS:
      toast.success(action.payload.data.message);
      return {
        ...state,
        isPasswordReset: true,
      };

    case FETCH_FORGOT_USER_PASSWORD_REQUEST:
      return {
        ...state,
        user_id: action.user_id,
        data: action.data,
        isPasswordForgot: false,
      };
    case FETCH_FORGOT_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        isPasswordForgot: true,
      };

    case FETCH_RESET_USER_PASSWORD_IsTrue_REQUEST:
      return {
        ...state,
        isPasswordReset: false,
      };
    default:
      return { ...state };
  }
};
export default userReducer;
