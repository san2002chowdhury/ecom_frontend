import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  // FETCH_TOPTEN_PRODUCTS_SUCCESS,
} from "../action";

const initialState = {
  products: [],
  page: 1,
  cat_id: "All",
  search: "All",
  filter: 1,
  length: 0,
  error: null,
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      // console.log("productReducer");
      console.log("REDUCER-->", action);

      return {
        ...state,
        page: action.payload,
        cat_id: action.cat_id,
        filter: action.filter,
        search: action.search,
      };
    case FETCH_PRODUCTS_SUCCESS:
      // console.log("action----->", action.payload);
      // console.log("state-->", state);
      return { ...state, products: action.payload, length: action.length };

    default:
      return state;
  }
};
export default productReducer;
