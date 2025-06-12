/* eslint-disable no-unused-vars */
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./OrderConfirm.css";
import { getAllOrderDetails } from "../../Redux/Order/orderAction";

const OrderSuccessful = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart_data, order_quantity, email, id, couponName, couponUsed } =
    useSelector(
      (state) => ({
        cart_data: state.orderReducer.cart_data,
        order_quantity: state.orderReducer.order_quantity,
        email: state.loginReducer.payload.email,
        id: state.loginReducer.id,
        couponUsed: state.orderReducer.couponUsed,
        couponName: state.orderReducer.couponName,
      }),
      shallowEqual
    );

  const deliveryCharge = 40;
  function handleContinueShopping(e) {
    e.preventDefault();
    navigate("/");
  }
  function handleTrackOrder(e) {
    e.preventDefault();
    navigate("/myorder");
  }
  const tax = cart_data.totalPrice * 0.05;
  const total = cart_data.product;

  return (
    <div
      className="order-confirmation-container"
      style={{ marginTop: "170px" }}
    >
      <div className="order-confirmation-header">
        <div className="order-confirmation-success-icon">✓</div>
        <h1>Thank You For Your Order!</h1>
        <p>Your order has been received and is being processed.</p>
      </div>

      <div className="order-confirmation-details">
        <h2>Order Information</h2>
        <div className="order-confirmation-detail-row">
          <span className="order-confirmation-detail-label">Order Number:</span>
          <span className="order-confirmation-detail-value">
            #{cart_data?._id?.slice(-5)}
          </span>
        </div>
        <div className="order-confirmation-detail-row">
          <span className="order-confirmation-detail-label">Date:</span>
          <span className="order-confirmation-detail-value">
            {cart_data.order_date}
          </span>
        </div>
        <div className="order-confirmation-detail-row">
          <span className="order-confirmation-detail-label">
            Ordered items:
          </span>
          <span className="order-confirmation-detail-value">
            {order_quantity}
          </span>
        </div>
        <div className="order-confirmation-detail-row">
          <span className="order-confirmation-detail-label">Email:</span>
          <span className="order-confirmation-detail-value">{email}</span>
        </div>
        <div className="order-confirmation-detail-row">
          <span className="order-confirmation-detail-label">
            Payment Method:
          </span>
          <span className="order-confirmation-detail-value">
            {cart_data.payment_mode?.split("-").join(" ").toUpperCase()}
          </span>
        </div>

        <div className="order-confirmation-product-list">
          <h2>Order Items</h2>
          {cart_data?.product?.map((item, index) => (
            <div className="order-confirmation-product-item" key={index}>
              <span className="order-confirmation-product-name">
                {item.product_name}
              </span>
              <span className="order-confirmation-product-quantity">
                {item.quantity} (quantity)
              </span>
              <span className="order-confirmation-product-price">
                ₹ {parseInt(item.total_price / item.quantity)}
              </span>
              <span className="order-confirmation-product-total">
                ₹ {item.total_price}
              </span>
            </div>
          ))}
          <div className="order-confirmation-product-item">
            <span className="order-confirmation-product-name">Shipping</span>
            <span className="order-confirmation-product-quantity"></span>
            <span className="order-confirmation-product-price"></span>
            <span className="order-confirmation-product-total">
              ₹ {deliveryCharge}
            </span>
          </div>
          <div className="order-confirmation-product-item">
            <span className="order-confirmation-product-name">Tax charges</span>
            <span className="order-confirmation-product-quantity"></span>
            <span className="order-confirmation-product-price"></span>
            <span className="order-confirmation-product-total">5%</span>
          </div>

          <div className="order-confirmation-summary">
            <div className="order-confirmation-summary-row order-confirmation-total">
              <span className="order-confirmation-detail-label">Total: </span>
              <span className="order-confirmation-detail-value">
                {couponUsed
                  ? `Coupon "${couponName}" Applied  ₹${cart_data.totalPrice}`
                  : `₹ ${cart_data.totalPrice}`}
              </span>
              <p>(Shipping and Tax also included!)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="order-confirmation-actions">
        <button
          className="order-confirmation-btn"
          onClick={handleTrackOrder}
          style={{ cursor: "pointer" }}
        >
          Track Your Order
        </button>
        <button
          className="order-confirmation-btn order-confirmation-btn-secondary"
          style={{ cursor: "pointer" }}
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>

      <div className="order-confirmation-thank-you">
        <p>
          Thank you for shopping with us! We'll send your order in between 3-7
          days.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccessful;
