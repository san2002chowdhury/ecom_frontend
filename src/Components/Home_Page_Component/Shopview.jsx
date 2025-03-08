/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_TOP_CATEGORY_REQUEST,
} from "../../Redux/action";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../Redux/api";
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
import { setActive } from "../../Redux/UniversalStore/UnivarSalState";

const Shopview = () => {
  const [catValue, setCatValue] = useState("All");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => {
    return state.categoryReducer;
  });
  const { id } = useSelector((state) => {
    return state.loginReducer;
  });
  const { products } = useSelector((state) => {
    return state.productReducer;
  });

  useEffect(() => {
    console.log("Cat_ID-->", catValue);
    dispatch({ type: FETCH_TOP_CATEGORY_REQUEST });

    dispatch({
      type: FETCH_PRODUCTS_REQUEST,
      page: 1,
      cat_id: catValue,
      filter: 1,
      search: "All",
    });
  }, [dispatch, catValue]);

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
                    // data-bs-toggle="pill"
                    // href="#tab-1"
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
                      // data-bs-toggle=
                      // href={`#tab-${index + 2}`}
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
                        className="col-md-6 col-lg-4 col-xl-3"
                        key={product._id}
                      >
                        <div
                          className="rounded position-relative vesitable-item"
                          key={product.title}
                          value={product.title}
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            className="vesitable-img"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(setProductTitle(product.slug));
                              dispatch(getProductDetailsRequest(product.slug));
                              navigate(`/productDetails/${product.slug}`);
                            }}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "100%",
                              height: "150px",
                            }}
                          >
                            <img
                              src={
                                `${BASE_URL}/images/` + product.product_image
                              }
                              className="img-fluid w-100 rounded-top"
                              alt=""
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                              }}
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

                              navigate(`/productDetails/${product.slug}`);
                            }}
                          >
                            <i
                              className="fas fa-star"
                              style={{ color: " #ffffff" }}
                            >
                              {" "}
                              {product.rating}
                            </i>
                          </div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(setActive("Shop"));
                              }}
                            >
                              <Link
                                onClick={(e) => {
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
                                    // dispatch(incCartLength(1));
                                    toast.success(`product added on cart`);
                                    // setTimeout(() => {
                                    dispatch(getCartDetailsRequest(id));
                                    // }, 100);
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
                                    dispatch(
                                      getAddToWishlistRequest(id, product._id)
                                    );
                                    // setTimeout(() => {
                                    dispatch(getWishlistDataRequest(id));
                                    // }, 100);
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
};
export default Shopview;
