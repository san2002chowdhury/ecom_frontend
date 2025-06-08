/* eslint-disable no-unused-vars */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/img-redundant-alt */

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import Rating from "../Universal_Components/Rating";
import { getAddToCartRequest } from "../../Redux/Cart/cartAction";
import { getAddToWishlistRequest } from "../../Redux/Wishlist/wishlistAction";

import toast from "react-hot-toast";
import React, { useState } from "react";
import { giveReviewRequest } from "../../Redux/Review/reviewAction";
import { BadgeAlert } from "lucide-react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ProductDisplay = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [description, setDescription] = useState("");

  const { id, productDetails, reviewData, product_id } = useSelector(
    (state) => ({
      id: state.loginReducer.id,
      productDetails: state.productReducer.productDetails,
      reviewData: state.reviewReducer.reviewData,
      product_id: state.productReducer?.productDetails[0]?._id,
    }),
    shallowEqual
  );
  const style = {
    padding: "2px",
    backgroundColor: "#0011",
    maxWidth: "90%",
    borderRadius: "50px",
    marginTop: "5px",
    height: "30px",
  };
  const styleError = {
    color: "red",
    fontWeight: "bold",
    fontStyle: "italic",
  };
  function handleReview(e) {
    e.preventDefault();
    if (selectedRating !== 0 || description !== "") {
      dispatch(giveReviewRequest(product_id, id, description, selectedRating));
      setDescription("");
      setRating(0);
      setSelectedRating(0);
      setHover(0);
    } else {
      toast.error("Please give rating or give the review");
    }
  }
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
                      <img
                        src={`${BASE_URL}/images/` + product.product_image}
                        className="rounded"
                        style={{
                          width: "100%",
                          maxWidth: "400px",
                          height: "450px",
                          objectFit: "contain",
                          display: "block",
                          margin: "0 auto",
                        }}
                        alt="Image"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <h4 className="fw-bold mb-3">{product.title} </h4>
                    <p className="mb-3">
                      Category:- <i>{product.category_name}</i>
                    </p>
                    <h5 className="fw-bold mb-3">₹{product.price}</h5>
                    <div
                      className="d-flex mb-4"
                      style={{ fontWeight: "bolder" }}
                    >
                      <Rating rating={product.rating} />
                      &nbsp;
                      {product.rating < 1
                        ? Math.ceil(product.rating)
                        : product.rating.toFixed(1)}
                    </div>

                    <p className="mb-4">
                      Tags:- <i style={{ cursor: "pointer" }}>{product.tags}</i>
                    </p>
                    <p className="mb-4">
                      In Stock: <i>{product.product_quantity}</i>
                    </p>
                    <div
                      className="input-group quantity mb-5"
                      style={{ width: "100px" }}
                    >
                      <div className="input-group-btn">
                        <button
                          className="btn btn-sm btn-minus rounded-circle bg-light border"
                          disabled={
                            product.product_quantity >= 1 ? false : true
                          }
                          onClick={(e) => {
                            e.preventDefault();
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
                          disabled={
                            product.product_quantity <= 0 ? true : false
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (id) {
                              if (quantity === 5) {
                                toast.error(
                                  "You reach the maximum quantity,you can't add more quantity"
                                );
                                return;
                              } else if (
                                product.product_quantity === quantity
                              ) {
                                toast.error(
                                  `You can't add more stock we have only ${quantity} in our stock`
                                );
                              } else if (quantity >= 1) {
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
                    {product.product_quantity !== 0 ? (
                      <>
                        <Link
                          onClick={(e) => {
                            e.preventDefault();

                            if (id) {
                              dispatch(
                                getAddToCartRequest(id, product._id, quantity)
                              );
                            } else {
                              toast.error(
                                "you can't add a product on cart before login😥 please login!"
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
                              dispatch(
                                getAddToWishlistRequest(id, product._id)
                              );
                            } else {
                              toast.error(
                                "you can't add a product to wishlist before login😥 please login!"
                              );
                            }
                          }}
                          className="btn border border-secondary rounded-pill px-4 py-2 mb-4  text-primary"
                        >
                          <i className="fa fa-heart me-2 text-primary"></i> Add
                          To WishList
                        </Link>
                      </>
                    ) : (
                      <div style={style}>
                        <p style={styleError}>
                          <BadgeAlert /> Currently this product is out of stock
                          😥😥!
                        </p>
                      </div>
                    )}
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
                              <div
                                className="row bg-light align-items-center text-center justify-content-center py-2"
                                style={{ borderRadius: "20px" }}
                              >
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
                        {/* <div className="d-flex"> */}
                        {reviewData.length !== 0 ? (
                          reviewData.map(
                            (el) => (
                              // return (
                              <div key={el._id} className="d-flex mb-4">
                                <img
                                  src={`${BASE_URL}/images/` + el.profile_photo}
                                  style={{
                                    width: "120px",
                                    height: "120px",
                                    marginRight: "30px",
                                    objectFit: "cover",
                                    objectPosition: "center top",
                                    borderRadius: "50%",
                                  }}
                                  alt=""
                                />
                                <div className="">
                                  <p
                                    className="mb-2"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {moment(el.createdAt).format(
                                      "MMMM D, YYYY"
                                    )}
                                  </p>
                                  <div className="d-flex justify-content-between">
                                    <h5>{el.name}</h5>
                                    <div
                                      className="mb-3"
                                      style={{
                                        display: "flex",
                                        marginLeft: "20px",
                                      }}
                                    >
                                      <Rating rating={el.rating} />
                                    </div>
                                  </div>
                                  <p className="text-dark">{el.description}</p>
                                </div>
                              </div>
                            )
                            // );
                          )
                        ) : (
                          <h1
                            style={{
                              fontStyle: "italic",
                              marginLeft: "230px",
                            }}
                          >
                            No reviews are there
                          </h1>
                        )}
                        {/* </div> */}
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
                  {id ? (
                    <form action="#">
                      <h4 className="mb-2 fw-bold">Leave a Review</h4>
                      <div className="row g-4">
                        <div className="col-lg-12">
                          <div className="border-bottom rounded my-4">
                            <input
                              name=""
                              id=""
                              className="form-control border-0"
                              cols="30"
                              rows="3"
                              placeholder="Your Review *"
                              defaultValue={"Your Review *"}
                              spellcheck="false"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
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
                                {[...Array(5)].map((_, index) => {
                                  const starValue = index + 1;
                                  return (
                                    <span
                                      className={`bi bi-star${
                                        starValue <= (hover || selectedRating)
                                          ? "-fill"
                                          : ""
                                      }`}
                                      style={{
                                        fontSize: "24px",
                                        marginRight: "4px",
                                        cursor: "pointer",
                                        color:
                                          starValue <= (hover || selectedRating)
                                            ? "yellowGreen"
                                            : "#e4e5e9",
                                        transition: "color 0.2s",
                                      }}
                                      key={starValue}
                                      onMouseEnter={() => setHover(starValue)}
                                      onMouseLeave={() =>
                                        setHover(selectedRating)
                                      }
                                      onClick={() => {
                                        setSelectedRating(starValue);
                                        setRating(starValue);
                                      }}
                                    ></span>
                                  );
                                })}
                              </div>
                            </div>
                            <button
                              className="btn btn-primary border border-secondary  rounded-pill px-4 py-3"
                              style={{ color: "#fff" }}
                              onClick={handleReview}
                            >
                              Post Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
            <div className="col-lg-4 col-xl-3">
              <div className="row g-4 fruite">
                <div className="col-lg-12"></div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default ProductDisplay;
