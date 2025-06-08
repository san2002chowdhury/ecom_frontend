/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllOrderDetails } from "../../Redux/Order/orderAction";
import "./OrderHistory.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const OrderHistory = memo(() => {
  const dispatch = useDispatch();
  const [expandedOrders, setExpandedOrders] = useState([]);

  const { order_data, order_list, id, search } = useSelector(
    (state) => ({
      order_data: state.orderReducer?.order_data,
      order_list: state.orderReducer?.order_list,
      id: state.loginReducer.id,
      search: state.universalReducer.search,
    }),
    shallowEqual
  );

  function toggleOrder(orderId) {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  }

  return (
    <div className="oh-table-container">
      {order_data.length > 0 ? (
        <table className="oh-order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Order Value</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {order_data?.map((item) => (
              <React.Fragment key={item._id}>
                <tr className="oh-order-row">
                  <td className="oh-order-id" style={{ padding: "0px 40px" }}>
                    {item?.order_id}
                  </td>
                  <td className="oh-order-date">{item.order_date}</td>
                  <td
                    className="oh-order-amount"
                    style={{ padding: "0px 60px" }}
                  >
                    {item.totalPrice}
                  </td>
                  <td>
                    <span
                      className={`oh-status ${
                        `oh-status-` + item.order_status
                      }`}
                    >
                      {`${item.order_status
                        .charAt(0)
                        .toUpperCase()}${item.order_status.slice(1)}`}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`oh-payment ${
                        `oh-payment-` + item.payment_status
                      }`}
                    >
                      {`${item.payment_status
                        .charAt(0)
                        .toUpperCase()}${item.payment_status.slice(1)}`}
                    </span>
                  </td>
                  <td className="oh-order-actions">
                    <button
                      className="oh-action-btn oh-view-btn"
                      onClick={() => toggleOrder(item._id)}
                      style={{ fontWeight: "bolder" }}
                    >
                      {expandedOrders.includes(item._id)
                        ? "Hide Details"
                        : "View Details"}
                    </button>
                  </td>
                </tr>

                {expandedOrders.includes(item._id) && (
                  <tr className="oh-product-details-row">
                    <td colSpan="6">
                      <table className="oh-product-table">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.product.map((product) => (
                            <tr key={product.id}>
                              <td>
                                <img
                                  src={`${BASE_URL}/images/${product.product_image}`}
                                  alt={product.product_name}
                                  className="oh-product-img"
                                />
                              </td>
                              <td>{product.product_name}</td>
                              <td>
                                ₹
                                {parseInt(product.total_price) /
                                  product.quantity}
                              </td>
                              <td>{product.quantity}</td>
                              <td>₹{parseInt(product.total_price)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <h1
          style={{
            textAlign: "center",
            color: "grey",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          No orders found{" "}
        </h1>
      )}
    </div>
  );
});
export default OrderHistory;
