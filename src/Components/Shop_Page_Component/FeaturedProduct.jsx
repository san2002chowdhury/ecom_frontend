/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../Redux/api";
import Rating from "../Universal_Components/Rating";
import { Link, useNavigate } from "react-router-dom";
import { setProductTitle } from "../../Redux/productState/productState";
import { getProductDetailsRequest } from "../../Redux/Products/ProductAction";
import { setActive } from "../../Redux/UniversalStore/UnivarSalState";

const FeaturedProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { top_products } = useSelector((state) => {
    return state.productReducer1;
  });
  console.log("Top Products-->", top_products);
  top_products = top_products.slice(0, 4);
  return (
    <div className="col-lg-12" style={{ marginLeft: "60px" }}>
      <h2 className="mb-3" style={{ marginBottom: "30px" }}>
        Featured products
      </h2>
      {top_products.map((product) => (
        <div
          className="d-flex align-items-center justify-content-start"
          style={{ marginTop: "45px", marginBottom: "45px" }}
          key={product._id}
        >
          <div
            className="rounded me-4"
            style={{ width: "100px", height: "100px" }}
            // key={product._id}
          >
            <img
              src={`${BASE_URL}/images/` + product.product_image}
              className="img-fluid rounded"
              alt=""
              onClick={(e) => {
                e.preventDefault();
                dispatch(setProductTitle(product.slug));
                dispatch(getProductDetailsRequest(product.slug));
                dispatch(setActive("Shop"));
                navigate(`/productDetails/${product.slug}`);
              }}
            />
          </div>
          <div>
            <h6 className="mb-2">
              <Link
                className="h5"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setProductTitle(product.slug));
                  dispatch(getProductDetailsRequest(product.slug));
                  dispatch(setActive("Shop"));
                  navigate(`/productDetails/${product.slug}`);
                }}
              >
                {product.title}
              </Link>
            </h6>
            <div className="d-flex my-2">
              <Rating
                className="fas fa-star text-primary"
                rating={Math.round(product.rating)}
              />
              &nbsp;
              {product.rating}
            </div>
            <div className="d-flex mb-2">
              <h5 className="fw-bold me-2">₹{product.price}</h5>
            </div>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-center my-4">
        <button
          to="/"
          onClick={() => {
            navigate("/");
            dispatch(setActive("Home"));
          }}
          className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100"
        >
          Vew More
        </button>
      </div>
    </div>
  );
};
export default FeaturedProduct;
