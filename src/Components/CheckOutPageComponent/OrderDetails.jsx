import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProductTitle } from "../../Redux/productState/productState";
import { getProductDetailsRequest } from "../../Redux/Products/ProductAction";
import { BadgeAlert } from "lucide-react";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const OrderDetails = ({ totalAmount, totalTax, deliveryCharge }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart_data, total_Cart_Value, applied, discountedCartValue } =
    useSelector(
      (state) => ({
        cart_data: state.cartReducer.cart_data,
        total_Cart_Value: state.cartReducer.total_Cart_Value,
        discountedCartValue: state.cartReducer.discountedCartValue,
        applied: state.couponReducer.applied,
      }),
      shallowEqual
    );
  const style = {
    padding: "2px",
    backgroundColor: "#0011",
    maxWidth: "100%",
    borderRadius: "50px",
    marginTop: "5px",
    height: "30px",
  };
  const styleError = {
    color: "red",
    fontWeight: "bold",
    fontStyle: "italic",
  };
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr className="text-center align-middle">
            <th style={{ width: "100px", color: "black" }}>Product</th>
            <th style={{ minWidth: "100px", color: "black" }}>Name</th>
            <th style={{ width: "90px", color: "black" }}>Price</th>
            <th style={{ width: "50px", color: "black" }}>Quantity</th>
            <th style={{ width: "100px", color: "black" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart_data.map((cart) => (
            <tr key={cart._id} className="text-center align-middle">
              <td>
                <img
                  src={`${BASE_URL}/images/` + cart.product_image}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setProductTitle(cart.slug));
                    dispatch(getProductDetailsRequest(cart.slug));
                    navigate(`/productDetails/${cart.slug}`);
                  }}
                  className="img-fluid rounded-circle"
                  style={{ width: "90px", height: "90px", cursor: "pointer" }}
                  alt=""
                />
              </td>
              <td
                className="py-5"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setProductTitle(cart.slug));
                  dispatch(getProductDetailsRequest(cart.slug));
                  navigate(`/productDetails/${cart.slug}`);
                }}
                style={{ cursor: "pointer" }}
              >
                {cart.product_name}
              </td>
              <td style={{ fontSize: "15px" }}>₹{cart.product_price}</td>
              <td style={{ fontSize: "15px" }}>{cart.quantity}</td>
              <td style={{ fontSize: "15px" }}>₹{cart.total_price}</td>
            </tr>
          ))}

          <tr className="text-center align-middle">
            <td></td>
            <td className="py-5">
              <p className="mb-0 text-dark text-uppercase py-3">Subtotal </p>
            </td>
            <td className="py-5">
              {applied === true ? (
                <div className="py-3 border-bottom border-top">
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
                      height: "30px",
                    }}
                  >
                    Coupon Applied
                  </p>
                </div>
              ) : (
                <></>
              )}
            </td>
            <td className="py-5"></td>
            <td className="py-5">
              <div className="py-3 border-bottom border-top">
                {applied ? (
                  <p className="mb-0 text-dark" style={{ fontSize: "15px" }}>
                    ₹{discountedCartValue}
                  </p>
                ) : (
                  <p className="mb-0 text-dark" style={{ fontSize: "15px" }}>
                    ₹{total_Cart_Value}
                  </p>
                )}
              </div>
            </td>
          </tr>
          <tr className="text-center align-middle">
            <th scope="row"></th>
            <td className="py-5">
              <p className="mb-0 text-dark text-uppercase py-3">Shipping</p>
            </td>
            <td className="py-5"></td>
            <td className="py-5"></td>
            <td className="py-5">
              <div className="py-3 border-bottom border-top">
                <p className="mb-0 text-dark" style={{ fontSize: "15px" }}>
                  ₹{deliveryCharge}
                </p>
              </div>
            </td>
          </tr>
          <tr className="text-center align-middle">
            <th scope="row"></th>
            <td className="py-5">
              <p className="mb-0 text-dark text-uppercase py-3">Tax</p>
            </td>
            <td className="py-5"></td>
            <td className="py-5"></td>
            <td className="py-5">
              <div className="py-3 border-bottom border-top">
                <p className="mb-0 text-dark" style={{ fontSize: "15px" }}>
                  ₹{totalTax}
                </p>
              </div>
            </td>
          </tr>
          <tr className="text-center align-middle">
            <th scope="row"></th>
            <td className="py-5">
              <p className="mb-0 text-dark text-uppercase py-3">Total</p>
            </td>
            <td className="py-5"></td>
            <td className="py-5"></td>
            <td className="py-5">
              <div className="py-3 border-bottom border-top">
                <p
                  className="mb-0 text-dark"
                  style={{ fontSize: "18px", width: "80px" }}
                >
                  ₹{parseInt(totalAmount)}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {applied === true ? (
        <div style={style}>
          <p style={styleError}>
            <BadgeAlert /> Please don't hard-refresh during you use any coupon.
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default OrderDetails;
