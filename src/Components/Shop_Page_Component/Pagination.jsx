import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  setCurrPage,
  setPage,
} from "../../Redux/UniversalStore/UnivarSalState";
import { memo } from "react";

const Pagination = memo(() => {
  const dispatch = useDispatch();
  const { length, page, currPage } = useSelector(
    (state) => ({
      length: state.productReducer.length,
      page: state.universalReducer.page,
      currPage: state.universalReducer.currPage,
    }),
    shallowEqual
  );
  const page_size = 12;
  const no_pages = Math.ceil(length / page_size);

  return (
    <div className="col-12">
      <div className="pagination d-flex justify-content-center mt-5">
        <button
          className="btn btn-primary rounded"
          style={{ marginRight: "10px" }}
          onClick={(e) => {
            e.preventDefault();
            dispatch(setPage(page * 1 - 1));
            dispatch(setCurrPage(page * 1 - 1));
          }}
          disabled={currPage === 1 ? true : false}
        >
          &laquo;
        </button>
        {[...Array(no_pages)].map((_, n) => (
          <button
            className={`btn btn-dark ${n + 1 === currPage && "active"} rounded`}
            style={{ marginRight: "10px" }}
            value={n + 1}
            key={n + 1}
            onClick={(e) => {
              e.preventDefault();
              dispatch(setCurrPage(e.target.value * 1));
              dispatch(setPage(e.target.value * 1));
            }}
          >
            {" "}
            {n + 1}{" "}
          </button>
        ))}

        <button
          className="btn btn-primary rounded"
          style={{ marginLeft: "10px" }}
          onClick={(e) => {
            e.preventDefault();
            dispatch(setPage(page * 1 + 1));
            dispatch(setCurrPage(page * 1 + 1));
          }}
          disabled={currPage === no_pages * 1 ? true : false}
        >
          {" "}
          &raquo;
        </button>
      </div>
    </div>
  );
});
export default Pagination;
