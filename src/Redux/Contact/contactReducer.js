// import { toast } from "react-toastify";
import toast from "react-hot-toast";

import { FETCH_CONTACT_REQUEST, FETCH_CONTACT_SUCCESS } from "../action";

const initialState = {
  name: "",
  email: "",
  message: "",
  contact_details: [],
  error: null,
};
const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACT_REQUEST: {
      console.log("step-2---->we are in CONTACT request-->", action);
      return {
        ...state,
        name: action.name,
        email: action.email,
        message: action.message,
      };
    }
    case FETCH_CONTACT_SUCCESS: {
      console.log("res---->", action);
      toast.success(action.payload.data.message);

      return { ...state, contact_details: action };
    }
    default:
      return { ...state };
  }
};
export default contactReducer;
