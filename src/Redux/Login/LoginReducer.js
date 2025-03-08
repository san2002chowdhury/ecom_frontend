import setCookie from "../../utils/setCookie";
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
// import { toast } from "react-toastify";
import toast from "react-hot-toast";

const initialState = {
  payload: [],
  token: "",
  resutl: "",
  id: "",
  name: "",
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
      localStorage.setItem("userData", JSON.stringify(action.payload.data));
      localStorage.setItem("name", action.payload.data.data.name);
      localStorage.setItem("id", action.payload.data.data.id);

      toast.success(action.payload?.data?.result);
      console.log("MESSAGE-->ALERT-->", action.payload?.data?.result);
      setCookie("token", action.payload.data.token, 60);
      return {
        type: FETCH_LOGIN_SUCCESS,
        payload: action.payload.data,
        token: action.payload.data.token,
        name: action.payload.data.data.name,
        id: action.payload.data.data.id,
      };
    case FETCH_LOGIN_FAILURE:
      toast.error(action.payload?.response?.data?.message);
      return {
        type: FETCH_LOGIN_FAILURE,
        error: action.payload.message,
      };
    case FETCH_SIGNUP_REQUEST:
      return {
        type: FETCH_SIGNUP_REQUEST,
        payload: action.payload,
      };
    case FETCH_SIGNUP_SUCCESS:
      console.log("FETCH SIGNUP REQUEST------>", action.payload);
      toast.success(action.payload?.data?.result);

      return {
        type: FETCH_SIGNUP_SUCCESS,
        payload: action.payload.data,
      };
    case FETCH_SIGNUP_FAILURE:
      console.log("FETCH SIGNUP REQUEST------>", action.payload);
      return {
        type: FETCH_SIGNUP_FAILURE,
        error: action.payload.message,
      };
    case FETCH_VERIFY_TOKEN_REQUEST:
      console.log("FETCH VERIFY TOKEN REQUEST", action.payload);

      return {
        type: FETCH_VERIFY_TOKEN_REQUEST,
        token: action.payload.token,
      };
    case FETCH_VERIFY_TOKEN_SUCCESS:
      console.log("FETCH VERIFY TOKEN SUCCESS", action.payload);

      localStorage.setItem("flag", 1);
      return {
        type: FETCH_VERIFY_TOKEN_SUCCESS,
        id: action.payload.data.id.id,
        payload: action.payload.data.data,
        token: action.payload.data.data.token,
        name: action.payload.data.data.name,
      };

    case FETCH_LOGIN_EMPTY_REQUEST:
      return {
        type: FETCH_LOGIN_EMPTY_REQUEST,
        payload: [],
        token: "",
        resutl: "",
        id: "",
        name: "",
        error: null,
      };
    default:
      return { ...state };
  }
};
export default loginReducer;
