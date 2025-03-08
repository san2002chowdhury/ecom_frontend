import { FETCH_CONTACT_REQUEST, FETCH_CONTACT_SUCCESS } from "../action";

export const getContactRequest = (name, email, message) => {
  console.log("Step-1--->GET CONTACT Request------>", name, email, message);
  return {
    type: FETCH_CONTACT_REQUEST,
    name: name,
    email: email,
    message: message,
  };
};
export const getContactSuccess = (action) => {
  console.log("Step-1.1-->GET CONTACT Success----->", action.payload);
  return { type: FETCH_CONTACT_SUCCESS, contact_details: action.payload };
};
