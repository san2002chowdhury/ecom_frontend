import {
  FETCH_PRODUCT_DETAILS_REQUEST,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCTS_REQUEST,
  FETCH_TOPTEN_PRODUCTS_REQUEST,
} from "../action";

export const getAllProducts = (page, cat_id, filter, search) => {
  console.log(`Action called--->getAllProducts-->${page}--->${cat_id}`);
  return {
    type: FETCH_PRODUCTS_REQUEST,
    page: page,
    cat_id: cat_id,
    filter: filter,
    search: search,
  };
};
export const getTopTenProducts = () => {
  // console.log("We are in productAction page");

  return { type: FETCH_TOPTEN_PRODUCTS_REQUEST };
};
export const getProductDetailsRequest = (slug) => {
  console.log("PRODUCT DATA--------->", slug);

  return { type: FETCH_PRODUCT_DETAILS_REQUEST, slug: slug };
};
export const getProductDetailsSuccess = (action) => {
  return {
    type: FETCH_PRODUCT_DETAILS_SUCCESS,
    productDetails: action.payload,
  };
};
