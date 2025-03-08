/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../Redux/api";
import {
  getCartDetailsRequest,
  getRemoveFromCart,
  getUpdateCartDataRequest,
} from "../../Redux/Cart/cartAction";
import { FETCH_CART_DETAILS_REQUEST } from "../../Redux/action";
import { setProductTitle } from "../../Redux/productState/productState";
import { getProductDetailsRequest } from "../../Redux/Products/ProductAction";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CartDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart_details } = useSelector((state) => {
    console.log("XXX--->FROM CART", state);
    return state.cartReducer;
  });
  const { id } = useSelector((state) => state.loginReducer);
  let user_id = localStorage.getItem("id");
  useEffect(() => {
    dispatch({
      type: FETCH_CART_DETAILS_REQUEST,
      user_id_for_details: id || user_id,
    });
  }, [dispatch, id]);
  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="table-responsive">
          {cart_details.length !== 0 ? (
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
                {cart_details.map((cart) => (
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
                      <p className="mb-0 mt-4">{cart.product_price} ₹</p>
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
                              if (cart.quantity >= 1) {
                                dispatch(
                                  getUpdateCartDataRequest(
                                    "dec",
                                    cart._id,
                                    cart.user_id,
                                    cart.product_id
                                  )
                                );
                                dispatch(getCartDetailsRequest(id));
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
                              if (cart.quantity <= 5) {
                                dispatch(
                                  getUpdateCartDataRequest(
                                    "inc",
                                    cart._id,
                                    cart.user_id,
                                    cart.product_id
                                  )
                                );
                                setTimeout(() => {
                                  dispatch(getCartDetailsRequest(id));
                                }, 100);
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
                      <p className="mb-0 mt-4">{cart.total_price} ₹</p>
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
          <input
            type="text"
            className="border-0 border-bottom rounded me-5 py-3 mb-4"
            placeholder="Coupon Code"
          />
          <button
            className="btn border-secondary rounded-pill px-4 py-3 text-primary"
            type="button"
          >
            Apply Coupon
          </button>
        </div>
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
                  <p className="mb-0">$96.00</p>
                </div>
                <div className="d-flex justify-content-between">
                  <h5 className="mb-0 me-4">Shipping</h5>
                  <div className="">
                    <p className="mb-0">Flat rate: $3.00</p>
                  </div>
                </div>
                <p className="mb-0 text-end">Shipping to Ukraine.</p>
              </div>
              <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                <h5 className="mb-0 ps-4 me-4">Total</h5>
                <p className="mb-0 pe-4">$99.00</p>
              </div>
              <button
                className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/checkout");
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
};
export default CartDetails;
