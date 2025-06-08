import React, { useEffect } from "react";
import CartDetails from "../Components/Cart_Page_Components/CartDetails";
import CartHeader from "../Components/Cart_Page_Components/CartHeader";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FETCH_CART_DETAILS_REQUEST } from "../Redux/action";

const Cart = () => {
  const dispatch = useDispatch();
  let user_id = localStorage.getItem("id");
  const { id } = useSelector(
    (state) => ({
      id: state.loginReducer.id,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch({
      type: FETCH_CART_DETAILS_REQUEST,
      user_id: id || user_id,
    });
  }, [dispatch, id, user_id]);
  return (
    <div>
      <CartHeader />
      <CartDetails />
    </div>
  );
};
export default Cart;
