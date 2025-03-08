import { toast } from "react-toastify";

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
} = require("../action");

const initialState = {
  user_details: [],
  user_id: "",
  error: null,
  aditional_data: [],
  data: [],
  isPasswordReset: false,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS_REQUEST:
      console.log(`FROM USER-REDUCERuser user_id---->${action.user_id}`);
      return {
        ...state,
        user_id: action.user_id,
      };
    case FETCH_USER_DETAILS_SUCCESS:
      console.log("FROM USER-REDUCER  user_details---->", action);
      return {
        ...state,
        user_details: action.payload.data.data,
      };
    case FETCH_SET_USER_DATA_REQUEST:
      console.log("FROM USER-REDUCER additional data---->", action.user_id);
      console.log("FROM USER-REDUCER additional data---->", action);

      return {
        ...state,
        user_id: action.user_id,
        aditional_data: action.data,
      };
    case FETCH_SET_USER_DATA_SUCCESS:
      console.log("FROM USER-REDUCER additional data---->", action);
      toast.success(action.payload.data.message);
      return {
        ...state,
        user_details: action.payload.data.data,
      };
    case FETCH_RESET_USER_PASSWORD_REQUEST:
      console.log("From USER-REDUCER---->DATA---->", action);
      return {
        ...state,
        user_id: action.user_id,
        data: action.data,
      };
    case FETCH_RESET_USER_PASSWORD_SUCCESS:
      console.log("From USER-REDUCER SUCCESS--->message--->", action);
      toast.success(action.payload.data.message);
      return {
        ...state,
        isPasswordReset: true,
      };

    case FETCH_FORGOT_USER_PASSWORD_REQUEST:
      console.log("From USER-REDUCER-->FORGOT PASSWORD---->DATA---->", action);
      return {
        ...state,
        user_id: action.user_id,
        data: action.data,
        isPasswordReset: false,
      };
    case FETCH_FORGOT_USER_PASSWORD_SUCCESS:
      console.log(
        "From USER-REDUCER SUCCESS-->FORGOT PASSWORD--->message--->",
        action
      );
      toast.success(action.payload.data.message);
      return {
        ...state,
        isPasswordReset: true,
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
