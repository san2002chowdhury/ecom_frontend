import React, { useEffect } from "react";
import WishlistDetails from "../Components/Wishlist_Page_Components/WishlistDetails";
import WishlistHeader from "../Components/Wishlist_Page_Components/WishlistHeader";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FETCH_WISHLIST_DETAILS_REQUEST } from "../Redux/action";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.loginReducer, shallowEqual);
  let user_id = localStorage.getItem("id");
  useEffect(() => {
    dispatch({
      type: FETCH_WISHLIST_DETAILS_REQUEST,
      user_id: id || user_id,
    });
  }, [dispatch, id, user_id]);
  return (
    <div>
      <WishlistHeader />
      <WishlistDetails />
    </div>
  );
};
export default Wishlist;
