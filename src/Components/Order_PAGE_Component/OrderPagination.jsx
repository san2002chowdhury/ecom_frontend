import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "./OrderHistory.css";
import { memo } from "react";
import { setOrderPage } from "../../Redux/UniversalStore/UnivarSalState";
const OrderPagination = memo(({ handlePage }) => {
  const dispatch = useDispatch();
  const { order_list, orderPage } = useSelector(
    (state) => ({
      order_list: state.orderReducer.order_list,
      orderPage: state.universalReducer.orderPage,
    }),
    shallowEqual
  );
  const page_Size = 4;
  const pages = Math.ceil(order_list / page_Size);
  function handlePrev(e) {
    e.preventDefault();
    if (orderPage > 1) {
      localStorage.setItem("orderPage", parseInt(orderPage - 1));
      dispatch(setOrderPage(orderPage - 1));
    }
  }
  function handleNext(e) {
    e.preventDefault();
    if (orderPage < pages) {
      localStorage.setItem("orderPage", parseInt(orderPage + 1));
      dispatch(setOrderPage(orderPage + 1));
    }
  }
  return (
    <div className="oh-pagination">
      <div className="oh-page-item">
        <button
          className="oh-page-link"
          onClick={handlePrev}
          disabled={orderPage === 1 ? true : false}
        >
          &laquo;
        </button>
      </div>
      {[...Array(pages)].map((_, n) => {
        return (
          <button
            className={`oh-page-button${n + 1 === orderPage ? "-active" : ""}`}
            key={n + 1}
            value={n + 1}
            onClick={handlePage}
          >
            {n + 1}
          </button>
        );
      })}
      <div className="oh-page-item">
        <button
          className="oh-page-link"
          onClick={handleNext}
          disabled={orderPage === pages ? true : false}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
});
export default OrderPagination;
