import { Search } from "lucide-react";
import "./OrderHistory.css";
const OrderSearch = ({
  handleSearch,
  handleChange,
  handleFilter,
  search,
  filter,
}) => {
  return (
    <div className="oh-order-header">
      <h2 className="oh-title">Order History</h2>
      <div className="oh-order-div">
        <label>Order Status :-</label>
        <select
          value={filter}
          onChange={handleFilter}
          style={{ cursor: "pointer" }}
        >
          <option key={"All Orders"} value={"All Orders"}>
            All Orders
          </option>
          <option key={"Processing"} value={"processing"}>
            Processing
          </option>
          <option key={"Shipped"} value={"shipped"}>
            Shipped
          </option>
          <option key={"Delivered"} value={"delivered"}>
            Delivered
          </option>
        </select>
      </div>
      <div className="oh-search-bar">
        <i
          className="oh-search-icon"
          style={{ cursor: "pointer" }}
          onClick={handleSearch}
        >
          <Search />
        </i>
        <input
          type="text"
          className="oh-search-input"
          placeholder="Search orders by Order ID"
          value={search}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
export default OrderSearch;
