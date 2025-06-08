import { FETCH_CONTACT_REQUEST, FETCH_CONTACT_SUCCESS } from "../action";

export const getContactRequest = (name, email, message) => {
  return {
    type: FETCH_CONTACT_REQUEST,
    name: name,
    email: email,
    message: message,
  };
};
export const getContactSuccess = (action) => {
  return { type: FETCH_CONTACT_SUCCESS, contact_details: action.payload };
};
