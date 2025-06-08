import {
  FETCH_PRODUCT_DETAILS_REQUEST,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_TOPTEN_PRODUCTS_REQUEST,
  FETCH_TOPTEN_PRODUCTS_SUCCESS,
} from "../action";

const initialState = {
  products: [],
  top_products: [],
  productDetails: [],
  slug: "",
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
      return {
        ...state,
        page: action.payload,
        cat_id: action.cat_id,
        filter: action.filter,
        search: action.search,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload, length: action.length };

    case FETCH_TOPTEN_PRODUCTS_REQUEST:
      return { ...state };
    case FETCH_TOPTEN_PRODUCTS_SUCCESS:
      return { ...state, top_products: action.payload };
    case FETCH_PRODUCT_DETAILS_REQUEST:
      return { ...state, slug: action.slug };
    case FETCH_PRODUCT_DETAILS_SUCCESS: {
      return { ...state, productDetails: action.payload };
    }
    default:
      return state;
  }
};
export default productReducer;
