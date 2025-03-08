import {
  FETCH_TOPTEN_PRODUCTS_REQUEST,
  FETCH_TOPTEN_PRODUCTS_SUCCESS,
} from "../action";

const initialState = {
  top_products: [],
  error: null,
};
const productReducer1 = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPTEN_PRODUCTS_REQUEST:
      // console.log("categoryReducer");
      return { ...state };
    case FETCH_TOPTEN_PRODUCTS_SUCCESS:
      // console.log(action.payload);
      return { ...state, top_products: action.payload };
    default:
      return state;
  }
};
export default productReducer1;
