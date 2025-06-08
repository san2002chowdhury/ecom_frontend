import {
  FETCH_LOGIN_EMPTY_REQUEST,
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_SIGNUP_FAILURE,
  FETCH_SIGNUP_REQUEST,
  FETCH_SIGNUP_SUCCESS,
  FETCH_VERIFY_TOKEN_REQUEST,
  FETCH_VERIFY_TOKEN_SUCCESS,
} from "../action";
import toast from "react-hot-toast";

const initialState = {
  payload: [],
  token: "",
  result: "",
  id: "",
  name: "",
  showSignin: false,

  error: null,
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return {
        type: FETCH_LOGIN_REQUEST,
        payload: action.payload,
      };
    case FETCH_LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.data.token);
      localStorage.setItem("name", action.payload.data.data.name);
      localStorage.setItem("id", action.payload.data.data.id);
      localStorage.setItem("showSignin", true);
      localStorage.setItem("isPasswordReset", false);

      toast.success(action.payload?.data?.result);
      return {
        type: FETCH_LOGIN_SUCCESS,
        payload: action.payload.data.data,
        token: action.payload.data.token,
        name: action.payload.data.data.name,
        id: action.payload.data.data.id,
        showSignin: true,
      };
    case FETCH_LOGIN_FAILURE:
      toast.error(action.payload?.response?.data?.message);
      return {
        type: FETCH_LOGIN_FAILURE,
        error: action.payload.message,
        showSignin: false,
      };
    case FETCH_SIGNUP_REQUEST:
      return {
        type: FETCH_SIGNUP_REQUEST,
        payload: action.payload,
      };
    case FETCH_SIGNUP_SUCCESS:
      toast.success(action.payload?.data?.result);

      return {
        type: FETCH_SIGNUP_SUCCESS,
        payload: action.payload.data,
      };
    case FETCH_SIGNUP_FAILURE:
      return {
        type: FETCH_SIGNUP_FAILURE,
        error: action.payload.message,
      };
    case FETCH_VERIFY_TOKEN_REQUEST:
      return {
        type: FETCH_VERIFY_TOKEN_REQUEST,
        token: action.payload.token,
      };
    case FETCH_VERIFY_TOKEN_SUCCESS:
      localStorage.setItem("flag", 1);
      localStorage.setItem("isPasswordReset", false);
      return {
        type: FETCH_VERIFY_TOKEN_SUCCESS,
        id: action.payload.data.id.id,
        payload: action.payload.data.data,
        token: action.payload.data.data.token,
        name: action.payload.data.data.name,
        showSignin: true,
      };
    case FETCH_LOGIN_EMPTY_REQUEST:
      return {
        type: FETCH_LOGIN_EMPTY_REQUEST,
        payload: [],
        token: "",
        result: "",
        id: "",
        name: "",
        error: null,
      };
    default:
      return { ...state };
  }
};
export default loginReducer;
