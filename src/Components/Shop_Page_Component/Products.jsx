import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setProductTitle } from "../../Redux/productState/productState";
import { getProductDetailsRequest } from "../../Redux/Products/ProductAction";

import {
  getAddToWishlistRequest,
  getWishlistDataRequest,
} from "../../Redux/Wishlist/wishlistAction";
import toast from "react-hot-toast";
import {
  getAddToCartRequest,
  getCartDetailsRequest,
} from "../../Redux/Cart/cartAction";
import "./external.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, products } = useSelector(
    (state) => ({
      id: state.loginReducer.id,
      products: state.productReducer.products,
    }),
    shallowEqual
  );

  return (
    <div className="col-lg-9" style={{ marginLeft: "150px" }}>
      {products.length !== 0 ? (
        <div className="row g-4 justify-content-center">
          {products.map((product) => (
            <div className="col-md-6 col-lg-6 col-xl-4" key={product._id}>
              <div
                className="rounded position-relative vesitable-item hover"
                style={{
                  cursor: "pointer",
                  height: "350px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  className="vesitable-img"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "200px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`${BASE_URL}/images/` + product.product_image}
                    className="img-fluid w-100 rounded-top"
                    alt=""
                    style={{
                      width: "auto",
                      maxWidth: "100%",
                      height: "100%",
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                    loading="lazy"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(setProductTitle(product.slug));
                      dispatch(getProductDetailsRequest(product.slug));
                      navigate(`/productDetails/${product.slug}`);
                    }}
                  />
                </div>

                <div
                  className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                  style={{ top: "10px", left: "10px", fontStyle: "italic" }}
                >
                  <i className="fas fa-star" style={{ color: " #ffffff" }}>
                    {" "}
                    {product.rating < 1
                      ? Math.ceil(product.rating)
                      : product.rating.toFixed(1)}
                  </i>
                </div>
                <div
                  className="p-4 border border-secondary border-top-0 rounded-bottom"
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <h4>
                    {" "}
                    <Link
                      className="h5"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(setProductTitle(product.slug));
                        dispatch(getProductDetailsRequest(product.slug));
                        navigate(`/productDetails/${product.slug}`);
                      }}
                    >
                      {product.title}
                    </Link>
                  </h4>
                  {product.product_quantity !== 0 ? (
                    <div className="d-flex justify-content-between flex-lg-wrap">
                      <p className="text-dark fs-5 fw-bold mb-0">
                        {" "}
                        ₹{product.price}
                      </p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (id) {
                            dispatch(getAddToCartRequest(id, product._id));
                            dispatch(getCartDetailsRequest(id));
                          } else {
                            toast.error(
                              "you can't add to cart a product before login,please login!"
                            );
                          }
                        }}
                        className="btn border border-secondary rounded-pill px-3 text-primary"
                      >
                        <i className="fa fa-shopping-bag me-1 text-primary"></i>
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (id) {
                            dispatch(getAddToWishlistRequest(id, product._id));
                            dispatch(getWishlistDataRequest(id));
                          } else {
                            toast.error(
                              "you can't add to wishlist a product without login,please login!"
                            );
                          }
                        }}
                        className="btn border border-secondary rounded-pill px-3 text-primary"
                      >
                        <i className="fa fa-heart me-1 text-primary"></i>
                      </button>
                    </div>
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
                        }}
                      >
                        Currently Out Of Stock!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1
          style={{
            marginTop: "150px",
            marginLeft: "200px",
            fontStyle: "italic",
          }}
        >
          No Products Found 😥😥
        </h1>
      )}
    </div>
  );
};
export default Products;
