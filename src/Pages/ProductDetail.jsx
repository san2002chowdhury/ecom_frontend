import React, { useEffect } from "react";
import ProductDetailsHeader from "../Components/Product_Detail_Page_Components/ProductDetailsHeader";
import ProductDisplay from "../Components/Product_Detail_Page_Components/ProductDisplay";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { GET_REVIEW_REQUEST } from "../Redux/action";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product_id } = useSelector(
    (state) => ({
      product_id: state.productReducer?.productDetails[0]?._id,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch({ type: GET_REVIEW_REQUEST, product_id: product_id });
  }, [dispatch, product_id]);
  return (
    <div>
      <ProductDetailsHeader />
      <ProductDisplay />
    </div>
  );
};
export default ProductDetails;
