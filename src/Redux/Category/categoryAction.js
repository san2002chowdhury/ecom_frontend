import {
  FETCH_ALL_CATEGORY_REQUEST,
  FETCH_TOP_CATEGORY_REQUEST,
} from "../action";

export const getAllCategories = () => {
  return { type: FETCH_ALL_CATEGORY_REQUEST };
};
export const getTopCategory = () => {
  return { type: FETCH_TOP_CATEGORY_REQUEST };
};
