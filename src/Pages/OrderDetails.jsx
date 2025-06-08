/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import OrderHistory from "../Components/Order_PAGE_Component/OrderHistory";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { GET_ORDER_DETAILS_REQUEST } from "../Redux/action";
import OrderSearch from "../Components/Order_PAGE_Component/OrderSearch";
import OrderPagination from "../Components/Order_PAGE_Component/OrderPagination";
import { getAllOrderDetails } from "../Redux/Order/orderAction";
import "../Components/Order_PAGE_Component/OrderHistory.css";
import {
  setOrderFilter,
  setOrderPage,
  setSearch,
} from "../Redux/UniversalStore/UnivarSalState";
const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id, search, filterOrder, orderPage } = useSelector(
    (state) => ({
      id: state.loginReducer.id,
      search: state.universalReducer.search,
      filterOrder: state.universalReducer.filterOrder,
      orderPage: state.universalReducer.orderPage,
    }),
    shallowEqual
  );
  let user_id = localStorage.getItem("id");
  const pageLocal = localStorage.getItem("orderPage");
  useEffect(() => {
    if (search === "" && filterOrder === "All Orders") {
      dispatch({
        type: GET_ORDER_DETAILS_REQUEST,
        user_id: id || user_id,
        // page: orderPage || 1,
        page: orderPage || pageLocal,
        searchValue: "All",
        filterOrder: "All Orders",
      });
    } else if (search !== "" && filterOrder !== "All Orders") {
      dispatch({
        type: GET_ORDER_DETAILS_REQUEST,
        user_id: id || user_id,
        page: orderPage || pageLocal,
        searchValue: search,
        filterOrder: filterOrder,
      });
    } else {
      dispatch({
        type: GET_ORDER_DETAILS_REQUEST,
        user_id: id || user_id,
        page: pageLocal || orderPage,
        searchValue: search,
        filterOrder: filterOrder,
      });
    }
  }, [dispatch, id, user_id, search, filterOrder, orderPage, pageLocal]);
  function handleSearch(e) {
    e.preventDefault();
    dispatch(getAllOrderDetails(id, 1, search, filterOrder));
  }
  function handleChange(e) {
    e.preventDefault();
    dispatch(setSearch(e.target.value));
  }
  function handleFilter(e) {
    e.preventDefault();
    dispatch(setOrderPage(1));
    dispatch(setOrderFilter(e.target.value));
  }
  function handlePage(e) {
    e.preventDefault();
    localStorage.setItem("orderPage", parseInt(e.target.value));
    dispatch(setOrderPage(parseInt(e.target.value)));
  }
  return (
    <div className="oh-container" style={{ marginTop: "200px" }}>
      <div className="oh-order-history">
        <OrderSearch
          handleSearch={handleSearch}
          handleChange={handleChange}
          handleFilter={handleFilter}
          searchValue={search}
          filter={filterOrder}
        />
        <OrderHistory searchValue={search} />
        <OrderPagination handlePage={handlePage} />
      </div>
    </div>
  );
};
export default OrderDetails;
