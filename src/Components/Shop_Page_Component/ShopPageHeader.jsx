import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import {
  setFilter,
  setSearch,
} from "../../Redux/UniversalStore/UnivarSalState";

const ShopPageHeader = () => {
  const { filter } = useSelector((state) => state.universalReducer);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (searchValue === "") {
      dispatch(setSearch("All"));
    }
  }, [dispatch, searchValue]);

  function handleOption(e) {
    e.preventDefault();
    dispatch(setFilter(e.target.value));
  }
  function handleSearch(e) {
    e.preventDefault();
    // alert("Hi");
    setSearchValue(e.target.value);
    // setSearch(e.target.value);
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
              // onKeyDown={handleKeyDown}
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
        </div>
        <div className="col-6"></div>
        <div className="col-xl-3">
          <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
            <label for="fruits">Filter:</label>
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
};
export default ShopPageHeader;
