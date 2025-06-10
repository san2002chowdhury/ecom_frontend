/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../Redux/api";

import {
  getCartDetailsRequest,
  getRemoveAllFromCart,
  getRemoveFromCart,
  getUpdateCartDataRequest,
} from "../../Redux/Cart/cartAction";
import { setProductTitle } from "../../Redux/productState/productState";
import { getProductDetailsRequest } from "../../Redux/Products/ProductAction";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { memo, useEffect, useState } from "react";
import {
  applyCouponRequest,
  removeCouponRequest,
} from "../../Redux/Coupon/couponAction";
import { setLoading } from "../../Redux/Loading/LoadingAction";
import { BadgeAlert, BadgeCheck } from "lucide-react";
import { setCouponUseStatusDefault } from "../../Redux/Order/orderAction";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const CartDetails = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");
  const [show, setShow] = useState(false);
  const {
    id,
    cart_data,
    total_Cart_Value,
    code,
    applied,
    minCartValue,
    discountedCartValue,
  } = useSelector(
    (state) => ({
      id: state.loginReducer.id,
      cart_data: state.cartReducer.cart_data,
      total_Cart_Value: state.cartReducer.total_Cart_Value,
      code: state.couponReducer.code,
      applied: state.couponReducer.applied,
      minCartValue: state.couponReducer.minCartValue,
      discountedCartValue: state.cartReducer.discountedCartValue,
    }),
    shallowEqual
  );
  function handleChange(e) {
    e.preventDefault();
    setCoupon(e.target.value);
  }
  function handleClick(e) {
    e.preventDefault();
    if (cart_data.length > 0) {
      dispatch(getRemoveAllFromCart(id));
      dispatch(removeCouponRequest());
      toast.success("Now cart is empty!");
    } else toast.error("Your cart is empty nothing can't be removed!");
  }
  function handleSubmitCoupon(e) {
    e.preventDefault();
    if (coupon === "") {
      toast.error("Please enter a valid coupon!");
    } else {
      dispatch(applyCouponRequest(id, cart_data, coupon));
      setCoupon("");
    }
  }
  function handleRemoveCoupon(e) {
    e.preventDefault();
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(removeCouponRequest());
      toast.success("Coupon removed!");
      dispatch(setLoading(false));
    }, 1500);
  }
  useEffect(() => {
    if (applied && total_Cart_Value < 2500 && code === "OFF200") {
      dispatch(setLoading(true));
      setTimeout(() => {
        dispatch(removeCouponRequest());
        dispatch(setLoading(false));
      }, 1000);
    }

    if (applied && cart_data.length === 0) {
      dispatch(setLoading(true));
      setTimeout(() => {
        dispatch(removeCouponRequest());
        dispatch(setLoading(false));
      }, 1000);
    }

    if (applied && total_Cart_Value < minCartValue) {
      dispatch(setLoading(true));
      setTimeout(() => {
        dispatch(removeCouponRequest());
        dispatch(setLoading(false));
      }, 1000);
    }
  }, [total_Cart_Value, code, applied, minCartValue, cart_data]);

  useEffect(() => {
    const seen = localStorage.getItem("seenWelcomeModal");
    if (!seen && cart_data.length !== 0) {
      setShow(true);
      localStorage.setItem("seenWelcomeModal", "true");
    }
  }, []);

  const style = {
    padding: "2px",
    backgroundColor: "#0011",
    maxWidth: "45%",
    borderRadius: "50px",
    marginTop: "5px",
    height: "30px",
  };
  const styleError = {
    color: "red",
    fontWeight: "bold",
    fontStyle: "italic",
  };
  const styleSuccess = {
    color: "green",
    fontWeight: "bold",
    fontStyle: "italic",
  };
  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        {cart_data.length !== 0 ? (
          <>
            <Modal
              show={show}
              onHide={() => setShow(false)}
              dialogClassName="modal-120w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Some Important Message
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  🎁 Use coupon code <strong>WELCOME10</strong> for 10% off on
                  your first order.
                  <br />
                  *Minimum order value must be above ₹50.
                </p>
                <p>
                  💳 <strong>Test Online Payment With This Credentials:</strong>
                  <br />
                  👉🏻 <strong>UPI ID:</strong> To test successful payment use,
                  <strong>success@razorpay</strong>.
                  <br />
                  👉🏻 <strong>Test Card for Visa Razorpay:</strong>
                  <br />
                  <strong>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Card Number:
                  </strong>{" "}
                  4111 1111 1111 1111.
                  <br />
                  <strong>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Expiry Date:
                  </strong>{" "}
                  Any future date.
                  <br />
                  <strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CVV:</strong> Any
                  random 3 digits.
                </p>
                <p>
                  📧 <strong>Order Confirmation:</strong> You'll receive an
                  email with a PDF attachment after placing your order.
                </p>
              </Modal.Body>
            </Modal>
          </>
        ) : (
          <></>
        )}
        <div className="text-end mb-3">
          <button className="btn btn-primary" onClick={handleClick}>
            Clear All
          </button>
        </div>
        <div className="table-responsive">
          {cart_data?.length !== 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Products</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {cart_data?.map((cart) => (
                  <tr key={cart._id}>
                    <th scope="row">
                      <div className="d-flex align-items-center">
                        <img
                          src={`${BASE_URL}/images/` + cart.product_image}
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(setProductTitle(cart.slug));
                            dispatch(getProductDetailsRequest(cart.slug));
                            navigate(`/productDetails/${cart.slug}`);
                          }}
                          className="img-fluid me-5 rounded-circle"
                          style={{ width: "80px", height: "80px" }}
                          alt=""
                        />
                      </div>
                    </th>
                    <td>
                      <p
                        className="mb-0 mt-4"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(setProductTitle(cart.slug));
                          dispatch(getProductDetailsRequest(cart.slug));
                          navigate(`/productDetails/${cart.slug}`);
                        }}
                      >
                        {cart.product_name}
                      </p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">₹{cart.product_price}</p>
                    </td>
                    <td>
                      <div
                        className="input-group quantity mt-4"
                        style={{ width: "100px" }}
                      >
                        <div className="input-group-btn">
                          <button
                            className="btn btn-sm btn-minus rounded-circle bg-light border"
                            onClick={(e) => {
                              e.preventDefault();
                              if (cart.quantity > 1) {
                                dispatch(
                                  getUpdateCartDataRequest(
                                    "dec",
                                    cart._id,
                                    cart.user_id,
                                    cart.product_id
                                  )
                                );
                              }
                              if (cart.quantity === 1) {
                                toast.error("You cant set the quantity at 0");
                              }
                            }}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm text-center border-0"
                          value={cart.quantity}
                        />
                        <div className="input-group-btn">
                          <button
                            className="btn btn-sm btn-plus rounded-circle bg-light border"
                            onClick={(e) => {
                              e.preventDefault();
                              if (cart.quantity < 5) {
                                dispatch(
                                  getUpdateCartDataRequest(
                                    "inc",
                                    cart._id,
                                    cart.user_id,
                                    cart.product_id
                                  )
                                );
                              }
                              if (cart.quantity === 5) {
                                toast.error(
                                  "You cant buy a product more than 5"
                                );
                              }
                            }}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">₹{cart.total_price}</p>
                    </td>
                    <td>
                      <button
                        className="btn btn-md rounded-circle bg-light border mt-4"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(getRemoveFromCart(cart._id, id));
                          setTimeout(() => {
                            dispatch(getCartDetailsRequest(id));
                          }, 100);
                        }}
                      >
                        <i className="fa fa-times text-danger"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1 style={{ textAlign: "center", fontStyle: "italic" }}>
              Your Cart Is Empty Please Add Product 😁💚
            </h1>
          )}
        </div>
        <div className="mt-5">
          {applied === false ? (
            <input
              type="text"
              className="border border-bottom  rounded me-5 py-3 mb-4"
              placeholder="Coupon Code"
              defaultValue={"Coupon Code"}
              value={coupon}
              style={{ padding: "20px", fontWeight: "bolder" }}
              onChange={handleChange}
            />
          ) : (
            <input
              className="border border-bottom  rounded me-5 py-3 mb-4"
              style={{
                padding: "10px",
                width: "300px",
                fontWeight: "bolder",
                fontStyle: "italic",
                backgroundColor: "yellowgreen",
                color: "#fff",
              }}
              value={`${code} Coupon Applied`}
              disabled={true}
            />
          )}
          {applied === false ? (
            <button
              className="btn border-secondary rounded-pill px-4 py-3 text-primary"
              type="button"
              style={{ cursor: "pointer" }}
              disabled={cart_data.length === 0 ? true : false}
              onClick={handleSubmitCoupon}
            >
              Apply Coupon
            </button>
          ) : (
            <button
              className="btn border-secondary rounded-pill px-4 py-3 text-primary"
              onClick={handleRemoveCoupon}
            >
              Remove Coupon
            </button>
          )}
        </div>
        {total_Cart_Value >= 2500 && applied === false ? (
          <div style={style}>
            <p style={styleSuccess}>
              <BadgeCheck /> Use "OFF200" coupon code for flat 200 ₹ ruppess off
              on your shopping!
            </p>
          </div>
        ) : (
          <div style={style}>
            <p style={styleError}>
              <BadgeAlert /> Please don't use ctrl+R/hard-refresh during you use
              any coupon
            </p>
          </div>
        )}
        <div className="row g-4 justify-content-end">
          <div className="col-8"></div>
          <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
            <div className="bg-light rounded">
              <div className="p-4">
                <h1 className="display-6 mb-4">
                  Cart <span className="fw-normal">Total</span>
                </h1>
                <div className="d-flex justify-content-between mb-4">
                  <h5 className="mb-0 me-4">Subtotal:</h5>
                  <p className="mb-0">₹{total_Cart_Value} </p>
                </div>
                <div className="d-flex justify-content-between">
                  <h5 className="mb-0 me-4">Shipping</h5>
                  <div className="">
                    <p className="mb-0">Fixed rate: ₹40 </p>
                  </div>
                </div>
              </div>
              <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                <h5 className="mb-0 ps-4 me-4">Total</h5>
                {code !== "" ? (
                  <div>
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "14px",
                        fontWeight: "bolder",
                        fontStyle: "italic",
                        border: "2px solid green",
                        borderRadius: "20px",
                        padding: "5px",
                        backgroundColor: "yellowGreen",
                        color: "#fff",
                        width: "130px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "40px",
                      }}
                    >
                      Coupon Applied
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                {applied ? (
                  <p className="mb-0 pe-4">
                    {cart_data.length !== 0
                      ? `₹${parseInt(discountedCartValue + 40)}`
                      : `₹0`}
                  </p>
                ) : (
                  <p className="mb-0 pe-4">
                    {cart_data.length !== 0
                      ? `₹${parseInt(total_Cart_Value + 40)}`
                      : `₹0`}
                  </p>
                )}
              </div>
              <button
                className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (cart_data.length !== 0) {
                    dispatch(setCouponUseStatusDefault());
                    navigate("/checkout");
                  } else toast.error("Please add a product on cart!");
                }}
              >
                Proceed Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default CartDetails;
