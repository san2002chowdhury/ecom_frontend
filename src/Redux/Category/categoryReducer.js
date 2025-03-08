import {
  FETCH_ALL_CATEGORY_REQUEST,
  FETCH_ALL_CATEGORY_SUCCESS,
  // FETCH_ALL_PRODUCTS_BY_CATEGORY_REQUEST,
  // FETCH_ALL_PRODUCTS_BY_CATEGORY_SUCCESS,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_TOP_CATEGORY_REQUEST,
  FETCH_TOP_CATEGORY_SUCCESS,
} from "../action";

const initialState = {
  categories: [],
  // page: 1,
  // name: "",
  allCategories: [],
  categoryName: "",
  // productsByCategory: [],
  length: 0,
  error: null,
};
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return { ...state };
    case FETCH_CATEGORY_SUCCESS:
      return { ...state, categories: action.payload };
    case FETCH_TOP_CATEGORY_REQUEST:
      return { ...state };
    case FETCH_TOP_CATEGORY_SUCCESS:
      return { ...state, categories: action.payload };
    case FETCH_ALL_CATEGORY_REQUEST:
      return { ...state };
    case FETCH_ALL_CATEGORY_SUCCESS:
      console.log("REDUCER->CATEGORIES-->", action.payload);
      return { ...state, allCategories: action.payload };
    // case FETCH_ALL_PRODUCTS_BY_CATEGORY_REQUEST:
    //   return { ...state, page: action.page, name: action.name };
    // case FETCH_ALL_PRODUCTS_BY_CATEGORY_SUCCESS:
    //   return {
    //     ...state,
    //     productsByCategory: action.payload,
    //     length: action.length,
    //   };
    default:
      return state;
  }
};
export default categoryReducer;
