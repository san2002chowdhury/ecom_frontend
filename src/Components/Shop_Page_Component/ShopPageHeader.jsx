import { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  setCategory,
  setCategoryName,
  setFilter,
  setPage,
  setSearch,
} from "../../Redux/UniversalStore/UnivarSalState";
import { CircleX } from "lucide-react";
import { getAllProducts } from "../../Redux/Products/ProductAction";
import "./external.css";
const ShopPageHeader = memo(() => {
  const [searchValue, setSearchValue] = useState("");
  const { filter, categoryName, page } = useSelector(
    (state) => ({
      filter: state.universalReducer.filter,
      categoryName: state.universalReducer.categoryName,
      page: state.universalReducer.page,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (searchValue === "") {
      dispatch(setSearch("All"));
    }
  }, [searchValue, dispatch]);

  function handleOption(e) {
    e.preventDefault();
    dispatch(setFilter(e.target.value));
  }
  function handleSearch(e) {
    e.preventDefault();
    setSearchValue(e.target.value);
    dispatch(setSearch(searchValue));
  }
  function handleClick(e) {
    e.preventDefault();
    if (searchValue) {
      dispatch(setSearch(searchValue));
    } else toast.warn("please put a value");
  }
  return (
    <div className="container py-5" style={{ marginTop: "100px" }}>
      <div className="row g-4">
        <div className="col-xl-3">
          <div className="input-group w-100 mx-auto d-flex">
            <input
              style={{ cursor: "pointer" }}
              type="search"
              className="form-control p-3"
              placeholder="keywords"
              aria-describedby="search-icon-1"
              value={searchValue}
              onChange={handleSearch}
            />
            <span
              style={{ cursor: "pointer" }}
              id="search-icon-1"
              className="input-group-text p-3"
              onClick={(e) => handleClick(e)}
            >
              <i className="fa fa-search"></i>
            </span>
          </div>
          <span
            className="badge rounded-pill  text-dark"
            style={{
              fontWeight: "bolder",
              marginTop: "20px",
              height: "30px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "13px",
              padding: "3px 10px",
              boxSizing: "border-box",
              position: "relative",
              maxWidth: "100%",
              backgroundColor: "yellowgreen",
              border: "3px solid orange",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                maxWidth: "150px",
                fontWeight: "bolder",
                color: "white",
              }}
            >
              {categoryName}
            </span>
            {categoryName !== "All Products" ? (
              <CircleX
                className="cossButton"
                onClick={(e) => {
                  e.preventDefault();
                  if (categoryName !== "All Products") {
                    dispatch(setCategory("All"));
                    dispatch(setPage(1));
                    dispatch(getAllProducts(page, "All", 1, "All"));
                    dispatch(setCategoryName("All Products"));
                  }
                }}
              />
            ) : (
              ""
            )}
          </span>
        </div>

        <div className="col-6"></div>
        <div className="col-xl-3">
          <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
            <label htmlFor="fruits">Filter:</label>
            <select
              id="fruits"
              name="fruitlist"
              className="border-0 form-select-sm bg-light me-3"
              form="fruitform"
              value={filter}
              onChange={(e) => handleOption(e)}
            >
              <option value={1}>Low-To-High</option>
              <option value={-1}>High-To-Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
});
export default ShopPageHeader;
