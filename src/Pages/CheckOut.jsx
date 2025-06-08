/* eslint-disable react-hooks/exhaustive-deps */
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BillingDetails from "../Components/CheckOutPageComponent/BillingDetails";
import CheckOutPageHeader from "../Components/CheckOutPageComponent/CheckOutPageHeader";
import OrderDetails from "../Components/CheckOutPageComponent/OrderDetails";
import PaymentMehtod from "../Components/CheckOutPageComponent/PaymentMehtod";
import { useEffect } from "react";
import { FETCH_USER_DETAILS_REQUEST } from "../Redux/action";
import React from "react";

const Checkout = () => {
  const dispatch = useDispatch();
  const { id, total_Cart_Value, discountedCartValue, applied } = useSelector(
    (state) => ({
      id: state.loginReducer.id,
      total_Cart_Value: state.cartReducer.total_Cart_Value,
      discountedCartValue: state.cartReducer.discountedCartValue,
      applied: state.couponReducer.applied,
    }),
    shallowEqual
  );
  const deliveryCharge = 40;
  let totalTax = 0;
  let totalAmount = 0;
  applied
    ? (totalTax = parseInt(discountedCartValue * 0.05))
    : (totalTax = parseInt(total_Cart_Value * 0.05));
  applied
    ? (totalAmount = parseInt(discountedCartValue + deliveryCharge + totalTax))
    : (totalAmount = parseInt(total_Cart_Value + deliveryCharge + totalTax));
  useEffect(() => {
    dispatch({
      type: FETCH_USER_DETAILS_REQUEST,
      user_id: id,
    });
  }, []);
  return (
    <div>
      <CheckOutPageHeader />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <form>
            <div className="row g-5">
              <BillingDetails />
              <div className="col-md-12 col-lg-6 col-xl-5">
                <OrderDetails
                  totalAmount={totalAmount}
                  totalTax={totalTax}
                  deliveryCharge={deliveryCharge}
                />
              </div>
              <PaymentMehtod totalAmount={totalAmount} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
