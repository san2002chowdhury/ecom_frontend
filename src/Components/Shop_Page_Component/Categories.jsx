/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { memo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Redux/Products/ProductAction";
import {
  setCategory,
  setCategoryName,
  setCurrPage,
  setPage,
} from "../../Redux/UniversalStore/UnivarSalState";
import { useNavigate } from "react-router-dom";

const Categories = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allCategories, category, page } = useSelector(
    (state) => ({
      allCategories: state.categoryReducer.allCategories,
      category: state.universalReducer.category,
      page: state.universalReducer.page,
    }),
    shallowEqual
  );

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
                <span
                  className="btn"
                  style={{ cursor: "pointer" }}
                  value={1}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setCategory("All"));
                    dispatch(setPage(1));
                    dispatch(getAllProducts(page, "All", 1, "All"));
                    dispatch(setCategoryName("All Products"));
                  }}
                >
                  <span
                    className={`btn bg-light ${category === "All" && "active"}`}
                  >
                    <i className="text-primary fas fa-apple-alt me-2"></i>
                    All Products
                  </span>
                </span>
              </div>
            </li>
            {allCategories.map((el) => (
              <li key={el._id}>
                <div className="d-flex justify-content-between fruite-name">
                  <span
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
                      dispatch(setCategoryName(el.name));
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
                  </span>
                  <span>
                    {"("}
                    {el.productCount}
                    {")"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});
export default Categories;
