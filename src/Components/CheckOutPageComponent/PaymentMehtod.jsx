/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setPayment } from "../../Redux/UniversalStore/UnivarSalState";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getOnlinePaymentFailedRequest,
  onlinePaymentSuccessRequest,
  placeOnlinePaymentOrderRequest,
  placeOrderRequest,
  setCouponUseStatusDefault,
} from "../../Redux/Order/orderAction";
import { getRemoveAllFromCart } from "../../Redux/Cart/cartAction";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../Redux/Loading/LoadingAction";

import { assets } from "../../assets/asset";
import { removeCouponRequest } from "../../Redux/Coupon/couponAction";

const PaymentMehtod = ({ totalAmount }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payment_mode, setPayment_Mode] = useState("");
  let {
    cart_data,
    id,
    key_id,
    currentOrder,
    payload,
    order,
    isAuthentic,
    user_details,
    _id,
  } = useSelector(
    (state) => ({
      cart_data: state.cartReducer.cart_data,
      id: state.loginReducer.id,
      key_id: state.orderReducer.key_id,
      currentOrder: state.orderReducer.currentOrder,
      payload: state.loginReducer.payload,
      order: state.orderReducer.order,
      isAuthentic: state.orderReducer.isAuthentic,
      user_details: state.userReducer?.user_details,
      _id: state.couponReducer._id,
    }),
    shallowEqual
  );

  cart_data = cart_data?.map((data) => ({
    product_name: data.cart_details.title || undefined,
    product_id: data.product_id,
    product_image: data.product_image,
    quantity: data.quantity,
    total_price: data.total_price || undefined,
  }));
  function handleChange(e) {
    if (
      user_details?.[0]?.address &&
      user_details?.[0]?.alternatePhone &&
      user_details?.[0]?.city &&
      user_details?.[0]?.country &&
      user_details?.[0]?.nearestLandmark &&
      user_details?.[0]?.pincode &&
      user_details?.[0]?.state
    ) {
      setPayment_Mode(e.target.value);
      dispatch(setPayment(e.target.value));
    } else {
      toast.error(
        `Please fill all details and click on "Save Details" and then you would able to order!`
      );
    }
  }
  function handleOrderPlaced(e) {
    e.preventDefault();
    dispatch(
      placeOrderRequest(
        id,
        cart_data,
        totalAmount,
        payment_mode,
        "processing",
        _id
      )
    );
    dispatch(getRemoveAllFromCart(id));
    dispatch(removeCouponRequest());
    navigate("/order-confirm");
  }
  function handleOnlinePayment(e) {
    e.preventDefault();
    dispatch(
      placeOnlinePaymentOrderRequest(
        id,
        cart_data,
        totalAmount,
        payment_mode,
        "processing",
        _id
      )
    );
  }
  useEffect(() => {
    if (key_id) {
      const options = {
        key: key_id,
        amount: totalAmount * 100,
        currency: "INR",
        name: "CHOWDHURY STORE",
        logo: assets.logo,
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          const data = {
            currentOrder: currentOrder,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };
          dispatch(onlinePaymentSuccessRequest(data));
          dispatch(removeCouponRequest());
        },
        modal: {
          ondismiss: function () {
            const data = {
              currentOrder: currentOrder,
            };
            dispatch(
              getOnlinePaymentFailedRequest(
                currentOrder._id,
                currentOrder.user_id
              )
            );
            dispatch(setCouponUseStatusDefault());
          },
        },
        prefill: {
          name: `${payload?.fname} ${payload?.lname}`,
          email: `${payload.email}`,
          contact: `${payload.phone}`,
        },
        theme: {
          color: "#A8F00D",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
    if (isAuthentic) {
      dispatch(getRemoveAllFromCart(id));
      navigate("/order-confirm");
    }
  }, [key_id, isAuthentic]);

  return (
    <div>
      <h1>Payment Modes</h1>
      <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
        <div className="col-12 col-md-6">
          <div className="form-check text-start my-3">
            <input
              type="checkbox"
              className="form-check-input bg-primary border-0"
              id="Payments-1"
              name="Payments"
              value="online/E-payment"
              onChange={handleChange}
              checked={payment_mode === "online/E-payment" && true}
              style={{ cursor: "pointer" }}
            />
            <label className="form-check-label" for="Payments-1">
              Online Payment{" "}
            </label>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="form-check text-start my-3">
            <input
              type="checkbox"
              className="form-check-input bg-primary border-0"
              id="Payments-1"
              name="Payments"
              value="cash-on-delivery"
              onChange={handleChange}
              checked={payment_mode === "cash-on-delivery" && true}
              style={{ cursor: "pointer" }}
            />
            <label className="form-check-label" for="Payments-1">
              Cash On Delivery
            </label>
          </div>
        </div>
      </div>
      {payment_mode !== "" ? (
        <div className="row g-4 text-center align-items-center justify-content-center pt-4">
          {payment_mode === "cash-on-delivery" ? (
            <button
              type="button"
              className="btn border-secondary py-3 px-4 text-uppercase w-50 text-primary"
              style={{ cursor: "pointer", fontWeight: "bolder" }}
              disabled={payment_mode === "online" && true}
              onClick={handleOrderPlaced}
            >
              Place Order
            </button>
          ) : (
            <button
              type="button"
              className="btn border-secondary py-3 px-4 text-uppercase w-50 text-primary"
              style={{ cursor: "pointer", fontWeight: "bolder" }}
              onClick={handleOnlinePayment}
            >
              Make Payment
            </button>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default PaymentMehtod;
