/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { setProductTitle } from "../../Redux/productState/productState";
import { getProductDetailsRequest } from "../../Redux/Products/ProductAction";
import {
  getRemoveAllFromWishlist,
  getRemoveFromWishlist,
  getWishlistDataRequest,
} from "../../Redux/Wishlist/wishlistAction";
import { getAddToCartRequest } from "../../Redux/Cart/cartAction";
import { memo } from "react";
import toast from "react-hot-toast";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const WishlistDetails = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id, wishlist_data } = useSelector(
    (state) => ({
      id: state.loginReducer.id,
      wishlist_data: state.wishlistReducer.wishlist_data,
    }),
    shallowEqual
  );
  function handleClick(e) {
    e.preventDefault();
    if (wishlist_data.length > 0) dispatch(getRemoveAllFromWishlist(id));
    else toast.error("Your wishlist is empty nothing can't be removed");
  }

  return (
    <div className="container py-5">
      <div className="table-responsive">
        <div className="text-end mb-3">
          <button
            className="btn btn-primary"
            onClick={handleClick}
            style={{ marginTop: "5px", marginRight: "5px" }}
          >
            Clear All
          </button>
        </div>
        {wishlist_data?.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  Products
                </th>
                <th scope="col" className="text-center">
                  Name
                </th>
                <th scope="col" className="text-center">
                  Add To Cart
                </th>
                <th scope="col" className="text-center">
                  Remove From Wishlist
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlist_data?.map((item) => (
                <tr key={item._id} className="align-middle text-center">
                  <td>
                    <img
                      src={`${BASE_URL}/images/${item.product_img}`}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(setProductTitle(item.slug));
                        dispatch(getProductDetailsRequest(item.slug));
                        navigate(`/productDetails/${item.slug}`);
                      }}
                      className="img-fluid rounded-circle"
                      style={{
                        width: "80px",
                        height: "80px",
                        cursor: "pointer",
                      }}
                      alt={item.product_name}
                    />
                  </td>
                  <td
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(setProductTitle(item.slug));
                      dispatch(getProductDetailsRequest(item.slug));
                      navigate(`/productDetails/${item.slug}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="mb-0 mt-4">{item.product_name}</p>
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(getAddToCartRequest(id, item.product_id));
                        dispatch(getRemoveFromWishlist(item._id));
                        setTimeout(() => {
                          dispatch(getWishlistDataRequest(id));
                        }, 100);
                      }}
                      className="btn btn-md border border-secondary rounded-pill mt-4 text-primary"
                    >
                      <i className="fa fa-shopping-bag me-2 text-primary"></i>{" "}
                      Add To Cart
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(getRemoveFromWishlist(item._id));
                        setTimeout(() => {
                          dispatch(getWishlistDataRequest(id));
                        }, 100);
                      }}
                      className="btn btn-md border border-secondary rounded-pill mt-4 text-danger"
                    >
                      <i className="fa fa-times me-2 text-danger"></i> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1 style={{ textAlign: "center", fontStyle: "italic" }}>
            Your Wishlist Is Empty Please Add Product 😁💚
          </h1>
        )}
      </div>
    </div>
  );
});
export default WishlistDetails;
