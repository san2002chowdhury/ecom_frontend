import {
  FETCH_PRODUCT_DETAILS_REQUEST,
  FETCH_PRODUCT_DETAILS_SUCCESS,
} from "../action";
const initialState = {
  slug: "",
  productDetails: [],
  error: null,
};
const productReducer2 = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_DETAILS_REQUEST:
      // console.log("ACTION PAYLOAD IN PRODUCTREDUCER2----->", action.slug);

      return { ...state, slug: action.slug };

    case FETCH_PRODUCT_DETAILS_SUCCESS: {
      // console.log("----->PRODUCT DETAILS PAYLOAD---->", action.payload);
      return { ...state, productDetails: action.payload };
    }
    default:
      return { ...state };
  }
};
export default productReducer2;
