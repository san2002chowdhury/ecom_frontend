/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Redux/Products/ProductAction";
import {
  setCategory,
  setCurrPage,
  setPage,
} from "../../Redux/UniversalStore/UnivarSalState";
// import { unstable_HistoryRouter } from "react-router-dom";
import { useHistory, useNavigate } from "react-router-dom";

const Categories = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { allCategories } = useSelector((state) => {
    console.log("data--->category", state.categoryReducer);
    return state.categoryReducer;
  });
  const { category } = useSelector((state) => state.universalReducer);
  const { page } = useSelector((state) => state.universalReducer);
  console.log("PAGE-->", category);

  return (
    <div className="row g-4" style={{ marginLeft: "60px" }}>
      <div className="col-lg-12">
        <div className="mb-3">
          <h2>Categories</h2>
          <ul className="list-unstyled fruite-categorie">
            <li>
              <div
                className="d-flex justify-content-between fruite-name"
                key={1}
              >
                <button
                  className="btn"
                  style={{ cursor: "pointer" }}
                  value={1}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setCategory("All"));
                    dispatch(setPage(1));
                    dispatch(getAllProducts(page, "All", 1, "All"));
                  }}
                >
                  <span
                    className={`btn bg-light ${category === "All" && "active"}`}
                  >
                    <i className="text-primary fas fa-apple-alt me-2"></i>
                    All Products
                  </span>
                </button>
              </div>
            </li>
            {allCategories.map((el) => (
              <div>
                <div
                  className="d-flex justify-content-between fruite-name"
                  key={el._id}
                >
                  <button
                    className="btn btn-border"
                    style={{ cursor: "pointer" }}
                    name={el.name}
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(setCategory(el._id));
                      dispatch(setPage(1));
                      dispatch(setCurrPage(1));
                      dispatch(getAllProducts(1, el._id, 1, "All"));
                      setCategory(el.name.split(" ").join("-"));
                      navigate(
                        `/shop/${el.name.split(" ").join("-").toLowerCase()}`
                      );
                    }}
                  >
                    <span
                      className={`btn bg-light ${
                        category === el._id && "active"
                      }`}
                    >
                      <i className="text-primary fas fa-apple-alt me-2"></i>
                      {el.name}
                    </span>
                  </button>
                  <span>
                    {"("}
                    {el.productCount}
                    {")"}
                  </span>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
      {/* <div className="col-lg-12">
        <div className="mb-3">
          <h2 className="mb-2">Price</h2>
          <input
            type="range"
            className="form-range w-150"
            id="rangeInput"
            name="rangeInput"
            min="0"
            max="125000"
            value={range}
            onChange={(e) => handleRange(e)}
          />
          <output
            id="amount"
            name="amount"
            min-velue="0"
            max-value="125000"
            for="rangeInput"
          >
            {range}
          </output>
        </div>
      </div> */}
    </div>
  );
};
export default Categories;
