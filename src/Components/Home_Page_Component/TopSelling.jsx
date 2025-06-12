/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable jsx-a11y/anchor-is-valid */
// /* eslint-disable react/jsx-no-comment-textnodes */
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Rating from "../Universal_Components/Rating";
import { setProductTitle } from "../../Redux/productState/productState";
import { getProductDetailsRequest } from "../../Redux/Products/ProductAction";
import { getAddToCartRequest } from "../../Redux/Cart/cartAction";
import toast from "react-hot-toast";
import {
  setActive,
  setCategoryName,
} from "../../Redux/UniversalStore/UnivarSalState";
import { memo } from "react";
import "./external.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const TopSelling = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { top_products, id } = useSelector(
    (state) => ({
      top_products: state.productReducer.top_products,
      id: state.loginReducer.id,
    }),
    shallowEqual
  );

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "700px" }}>
          <h1 className="display-4">
            Bestseller Products Based On Customer Rating
          </h1>
          <p>
            Latin words, combined with a handful of model sentence structures,
            to generate Lorem Ipsum which looks reasonable.
          </p>
        </div>
        <div className="row g-4">
          {top_products.map((product) => (
            <div className="col-lg-6 col-xl-4" key={product.title}>
              <div className="p-4 rounded bg-light hover">
                <div
                  className="row align-items-center"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "250px",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  <div className="col-6">
                    <img
                      src={`${BASE_URL}/images/` + product.product_image}
                      className="vesitable-img img-fluid rounded-circle "
                      style={{
                        width: "auto",
                        maxWidth: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                      loading="lazy"
                      alt=""
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(setProductTitle(product.slug));
                        dispatch(getProductDetailsRequest(product.slug));
                        dispatch(setActive("Shop"));
                        dispatch(setCategoryName("All Products"));
                        navigate(`/productDetails/${product.slug}`);
                      }}
                    />
                  </div>
                  <div className="col-6">
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
                    <div className="d-flex my-3">
                      <Rating
                        className="fas fa-star text-primary"
                        rating={Math.round(product.rating)}
                      />
                      &nbsp;
                      {product.rating}
                    </div>
                    <h4 className="mb-3">₹{product.price}</h4>
                    {product.product_quantity !== 0 ? (
                      <Link
                        href="#"
                        className="btn border border-secondary rounded-pill px-3 text-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          if (id) {
                            dispatch(getAddToCartRequest(id, product._id));
                          } else {
                            toast.error(
                              "You can't add to cart a product before login,please login!"
                            );
                          }
                        }}
                      >
                        <i className="fa fa-shopping-bag me-2 text-primary"></i>{" "}
                        Add to cart
                      </Link>
                    ) : (
                      <div
                        style={{
                          fontStyle: "italic",
                          fontWeight: "bolder",
                          color: "white",
                          backgroundColor: "red",
                          borderRadius: "50px",
                        }}
                      >
                        <p
                          style={{
                            marginTop: "5px",
                            textAlign: "center",
                            marginBottom: "5px",
                            fontSize: "13px",
                            padding: "5px",
                          }}
                        >
                          Currently Out Of Stock!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
export default TopSelling;
