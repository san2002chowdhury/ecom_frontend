/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import OrderSuccessful from "../Components/Order_PAGE_Component/OrderSuccessful";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getResetPaymentGateway } from "../Redux/Order/orderAction";

const OrderConfirmed = () => {
  const dispatch = useDispatch();
  let { isAuthentic } = useSelector(
    (state) => ({
      isAuthentic: state.orderReducer.isAuthentic,
    }),
    shallowEqual
  );
  useEffect(() => {
    if (isAuthentic) dispatch(getResetPaymentGateway());
  }, [isAuthentic]);
  return <OrderSuccessful />;
};
export default OrderConfirmed;
