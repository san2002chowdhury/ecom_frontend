/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/img-redundant-alt */

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { FETCH_PRODUCT_DETAILS_REQUEST } from "../../Redux/action";
// import { useEffect } from "react";
import { BASE_URL } from "../../Redux/api";
import Rating from "../Universal_Components/Rating";
import {
  getAddToCartRequest,
  // getCartDetailsRequest,
} from "../../Redux/Cart/cartAction";
import { getAddToWishlistRequest } from "../../Redux/Wishlist/wishlistAction";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import { useState } from "react";

const ProductDisplay = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // const { id } = JSON?.parse(localStorage?.getItem("userData")) || "";
  const { id } = useSelector((state) => {
    return state.loginReducer;
  });
  console.log(id);

  const { productDetails } = useSelector((state) => {
    return state.productReducer2;
  });
  console.log("product details---->", productDetails);

  return (
    <div style={{ marginLeft: "275px" }}>
      <div className="container-fluid py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-lg-8 col-xl-9">
              {productDetails.map((product) => (
                <div className="row g-4" key={product.title}>
                  <div className="col-lg-6">
                    <div className="border rounded">
                      <Link href="#">
                        <img
                          src={`${BASE_URL}/images/` + product.product_image}
                          className="img-fluid rounded"
                          alt="Image"
                          style={{ maxWidth: "100%", maxHeight: "80%" }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <h4 className="fw-bold mb-3">{product.title} </h4>
                    <p className="mb-3">Category: {product.category_name}</p>
                    <h5 className="fw-bold mb-3">₹{product.price}</h5>
                    <div className="d-flex mb-4">
                      <Rating
                        className="fas fa-star text-primary"
                        rating={Math.round(product.rating)}
                      />
                      &nbsp;
                      {product.rating}
                    </div>
                    <p className="mb-4">{product.slug}</p>
                    <p className="mb-4">{product.tags}</p>
                    <p className="mb-4">In Stock: {product.product_quantity}</p>
                    <div
                      className="input-group quantity mb-5"
                      style={{ width: "100px" }}
                    >
                      <div className="input-group-btn">
                        <button
                          className="btn btn-sm btn-minus rounded-circle bg-light border"
                          onClick={() => {
                            if (id) {
                              if (quantity !== 1) setQuantity(quantity - 1);
                              if (quantity === 1)
                                toast.error("You can't set quantity at zero");
                            } else {
                              toast.error(
                                "You can't without login,please login before!"
                              );
                            }
                          }}
                        >
                          <i className="fa fa-minus"></i>
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-sm text-center border-0"
                        value={quantity}
                      />
                      <div className="input-group-btn">
                        <button
                          className="btn btn-sm btn-plus rounded-circle bg-light border"
                          onClick={() => {
                            // alert("hi");
                            // if (quantity > 1) setQuantity(quantity + 1);
                            // alert(`quantity---> ${product.product_quantity}`);
                            if (id) {
                              if (quantity === product.product_quantity) {
                                toast.error(
                                  "You reach the maximum quantity,you can't add more quantity"
                                );
                                return;
                              }
                              if (quantity >= 1) {
                                setQuantity(quantity + 1);
                              }
                            } else {
                              toast.error(
                                "You can't without login,please login before!"
                              );
                            }
                          }}
                        >
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(product._id);

                        if (id) {
                          console.log(
                            "Step 1 When i clicked on Add-To-Cart button",
                            id,
                            product._id
                          );

                          dispatch(
                            getAddToCartRequest(id, product._id, quantity)
                          );
                          toast.success(`product added on cart`);
                        } else {
                          toast.error(
                            "you cant add a product on cart before login😥 please login!"
                          );
                        }
                      }}
                      className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                    >
                      <i className="fa fa-shopping-bag me-2 text-primary"></i>{" "}
                      Add to cart
                    </Link>
                    <Link
                      style={{ marginLeft: "15px" }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (id) {
                          dispatch(getAddToWishlistRequest(id, product._id));
                          toast.success(`product added on wishlist`);
                        } else {
                          toast.error(
                            "you cant add a product to wishlist before login😥 please login!"
                          );
                        }
                      }}
                      className="btn border border-secondary rounded-pill px-4 py-2 mb-4  text-primary"
                    >
                      <i className="fa fa-heart me-2 text-primary"></i> Add To
                      WishList
                    </Link>
                  </div>
                  <div className="col-lg-12">
                    <nav>
                      <div className="nav nav-tabs mb-3">
                        <button
                          className="nav-link active border-white border-bottom-0"
                          type="button"
                          role="tab"
                          id="nav-about-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-about"
                          aria-controls="nav-about"
                          aria-selected="true"
                        >
                          Description
                        </button>
                        <button
                          className="nav-link border-white border-bottom-0"
                          type="button"
                          role="tab"
                          id="nav-mission-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-mission"
                          aria-controls="nav-mission"
                          aria-selected="false"
                        >
                          Reviews
                        </button>
                      </div>
                    </nav>
                    <div className="tab-content mb-5">
                      <div
                        className="tab-pane active"
                        id="nav-about"
                        role="tabpanel"
                        aria-labelledby="nav-about-tab"
                      >
                        <p>{product.description}</p>
                        <div className="px-2">
                          <div className="row g-4">
                            <div className="col-6">
                              <div className="row bg-light align-items-center text-center justify-content-center py-2">
                                <p
                                  style={{ color: "black", fontWeight: "900" }}
                                >
                                  Offers
                                </p>
                                <hr />
                                <div className="col-6">
                                  <p className="mb-0" style={{ color: "red" }}>
                                    {product.discount_type}
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p
                                    className="mb-0"
                                    style={{
                                      color: "black",
                                      fontWeight: "900",
                                    }}
                                  >
                                    {product.discount_value}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane"
                        id="nav-mission"
                        role="tabpanel"
                        aria-labelledby="nav-mission-tab"
                      >
                        <div className="d-flex">
                          <img
                            src="img/avatar.jpg"
                            className="img-fluid rounded-circle p-3"
                            style={{ width: "100px", height: "100px" }}
                            alt=""
                          />
                          <div className="">
                            <p className="mb-2" style={{ fontSize: "14px" }}>
                              April 12, 2024
                            </p>
                            <div className="d-flex justify-content-between">
                              <h5>Jason Smith</h5>
                              <div className="d-flex mb-3">
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star"></i>
                              </div>
                            </div>
                            <p>
                              The generated Lorem Ipsum is therefore always free
                              from repetition injected humour, or
                              non-characteristic words etc. Susp endisse
                              ultricies nisi vel quam suscipit
                            </p>
                          </div>
                        </div>
                        <div className="d-flex">
                          <img
                            src="img/avatar.jpg"
                            className="img-fluid rounded-circle p-3"
                            style={{ width: "100px", height: "100px" }}
                            alt=""
                          />
                          <div className="">
                            <p className="mb-2" style={{ fontSize: "14px" }}>
                              April 12, 2024
                            </p>
                            <div className="d-flex justify-content-between">
                              <h5>Sam Peters</h5>
                              <div className="d-flex mb-3">
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                              </div>
                            </div>
                            <p className="text-dark">
                              The generated Lorem Ipsum is therefore always free
                              from repetition injected humour, or
                              non-characteristic words etc. Susp endisse
                              ultricies nisi vel quam suscipit
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane" id="nav-vision" role="tabpanel">
                        <p className="text-dark">
                          Tempor erat elitr rebum at clita. Diam dolor diam
                          ipsum et tempor sit. Aliqu diam amet diam et eos
                          labore. 3
                        </p>

                        <p className="mb-0">
                          Diam dolor diam ipsum et tempor sit. Aliqu diam amet
                          diam et eos labore. Clita erat ipsum et lorem et sit
                        </p>
                      </div>
                    </div>
                  </div>
                  <form action="#">
                    <h4 className="mb-5 fw-bold">Leave a Review</h4>
                    <div className="row g-4">
                      <div className="col-lg-6">
                        <div className="border-bottom rounded">
                          <input
                            type="text"
                            className="form-control border-0 me-4"
                            placeholder="Your Name *"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="border-bottom rounded">
                          <input
                            type="email"
                            className="form-control border-0"
                            placeholder="Your Email *"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="border-bottom rounded my-4">
                          <textarea
                            name=""
                            id=""
                            className="form-control border-0"
                            cols="30"
                            rows="8"
                            placeholder="Your Review *"
                            spellcheck="false"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="d-flex justify-content-between py-3 mb-5">
                          <div className="d-flex align-items-center">
                            <p className="mb-0 me-3">Please rate:</p>
                            <div
                              className="d-flex align-items-center"
                              style={{ fontSize: "12px" }}
                            >
                              <i className="fa fa-star text-muted"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                          </div>
                          <Link
                            href="#"
                            className="btn border border-secondary text-primary rounded-pill px-4 py-3"
                          >
                            Post Comment
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              ))}
            </div>
            <div className="col-lg-4 col-xl-3">
              <div className="row g-4 fruite">
                <div className="col-lg-12">
                  <div className="input-group w-100 mx-auto d-flex mb-4">
                    <input
                      type="search"
                      className="form-control p-3"
                      placeholder="keywords"
                      aria-describedby="search-icon-1"
                    />
                    <span id="search-icon-1" className="input-group-text p-3">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default ProductDisplay;
