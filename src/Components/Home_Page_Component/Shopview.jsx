/* eslint-disable jsx-a11y/anchor-is-valid */
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setProductTitle } from "../../Redux/productState/productState";
import { Link, useNavigate } from "react-router-dom";
import { getProductDetailsRequest } from "../../Redux/Products/ProductAction";
import {
  getAddToCartRequest,
  getCartDetailsRequest,
} from "../../Redux/Cart/cartAction";
import toast from "react-hot-toast";
import {
  getAddToWishlistRequest,
  getWishlistDataRequest,
} from "../../Redux/Wishlist/wishlistAction";
import {
  setActive,
  setCategoryName,
} from "../../Redux/UniversalStore/UnivarSalState";
import { memo } from "react";
import "./external.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Shopview = memo(({ catValue, setCatValue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories, id, products } = useSelector(
    (state) => ({
      categories: state.categoryReducer.categories,
      id: state.loginReducer.id,
      products: state.productReducer.products,
    }),
    shallowEqual
  );

  return (
    <div className="container-fluid fruite py-5">
      <div className="container py-5">
        <div className="tab-class text-center">
          <div className="row g-4">
            <div className="col-lg-4 text-start">
              <h1>Our Products</h1>
            </div>
            <div className="col-lg-8 text-end">
              <ul className="nav nav-pills d-inline-flex text-center mb-5">
                <li className="nav-item">
                  <button
                    className={`btn d-flex m-2 py-2 bg-light rounded-pill ${
                      catValue === "All" && "active"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCatValue("All");
                    }}
                  >
                    All Products
                  </button>
                </li>
                {categories.map((cat) => (
                  <li className="nav-item" key={cat._id}>
                    <button
                      className={`btn d-flex py-2 m-2 bg-light rounded-pill  ${
                        catValue === cat._id && "active"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setCatValue(cat._id);
                      }}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="tab-content">
            <div id="tab-1" className="tab-pane fade show p-0 active">
              <div className="row g-4">
                <div className="col-lg-12">
                  <div className="row g-4">
                    {products.map((product) => (
                      <div
                        className="col-md-6 col-lg-4 col-xl-4"
                        key={product._id}
                      >
                        <div
                          className="rounded position-relative vesitable-item hover"
                          key={product.title}
                          value={product.title}
                          style={{
                            cursor: "pointer",
                            height: "350px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            className="vesitable-img"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(setActive("Shop"));
                              dispatch(setProductTitle(product.slug));
                              dispatch(getProductDetailsRequest(product.slug));
                              navigate(`/productDetails/${product.slug}`);
                            }}
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
                              src={
                                `${BASE_URL}/images/` + product.product_image
                              }
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
                              onClick={() => dispatch(setActive("Shop"))}
                            />
                          </div>
                          <div
                            className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                            style={{ top: "10px", left: "10px" }}
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(setProductTitle(product.slug));
                              dispatch(getProductDetailsRequest(product.slug));
                              dispatch(setActive("Shop"));
                              dispatch(setCategoryName("All Products"));
                              navigate(`/productDetails/${product.slug}`);
                            }}
                          >
                            <i
                              className="fas fa-star"
                              style={{ color: " #ffffff" }}
                            >
                              {" "}
                              {product.rating < 1
                                ? Math.ceil(product.rating)
                                : product.rating.toFixed(1)}
                            </i>
                          </div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>
                              <Link
                                onClick={(e) => {
                                  dispatch(setActive("Shop"));
                                  e.preventDefault();
                                  dispatch(setProductTitle(product.slug));
                                  dispatch(
                                    getProductDetailsRequest(product.slug)
                                  );

                                  navigate(`/productDetails/${product.slug}`);
                                }}
                              >
                                {product.title}
                              </Link>
                            </h4>
                            <p>{product.tags}</p>
                            {product.product_quantity !== 0 ? (
                              <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">
                                  ₹{product.price}
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (id) {
                                      dispatch(
                                        getAddToCartRequest(id, product._id)
                                      );
                                      dispatch(getCartDetailsRequest(id));
                                    } else {
                                      toast.error(
                                        "you can't add to cart a product before login,please login!"
                                      );
                                    }
                                  }}
                                  className="btn border border-secondary rounded-pill px-3 text-primary"
                                >
                                  Add{" "}
                                  <i className="fa fa-shopping-bag me-1 text-primary"></i>
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (id) {
                                      dispatch(
                                        getAddToWishlistRequest(id, product._id)
                                      );

                                      dispatch(getWishlistDataRequest(id));
                                    } else {
                                      toast.error(
                                        "you can't add to wishlist a product without login,please login!"
                                      );
                                    }
                                  }}
                                  className="btn border border-secondary rounded-pill px-3 text-primary"
                                >
                                  Add{" "}
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
                    ))}
                    <div className="d-flex justify-content-center my-4">
                      <button
                        to="/shop"
                        name="Shop"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(setActive(e.target.name));
                          navigate("/shop");
                        }}
                        className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-50"
                      >
                        Vew More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Shopview;
