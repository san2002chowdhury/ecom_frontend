// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrPage,
  setPage,
} from "../../Redux/UniversalStore/UnivarSalState";

/* eslint-disable jsx-a11y/anchor-is-valid */
const Pagination = () => {
  const dispatch = useDispatch();
  const { length } = useSelector((state) => state.productReducer);
  const { page } = useSelector((state) => state.universalReducer);
  const { currPage } = useSelector((state) => state.universalReducer);

  console.log("LENGTH---->", length);

  const page_size = 12;
  const no_pages = Math.ceil(length / page_size);
  // const [currPage, setCurrPage] = useState(page);

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
            // alert(page);
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
            // alert(page);
          }}
          disabled={currPage === no_pages * 1 ? true : false}
        >
          {" "}
          &raquo;
        </button>
      </div>
    </div>
  );
};
export default Pagination;
