/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../Redux/api";
import { useNavigate } from "react-router-dom";
import { setProductTitle } from "../../Redux/productState/productState";
import { getProductDetailsRequest } from "../../Redux/Products/ProductAction";
import { useEffect } from "react";
import { FETCH_WISHLIST_DETAILS_REQUEST } from "../../Redux/action";
import {
  getRemoveFromWishlist,
  getWishlistDataRequest,
} from "../../Redux/Wishlist/wishlistAction";
import { getAddToCartRequest } from "../../Redux/Cart/cartAction";
import toast from "react-hot-toast";

const WishlistDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlist_details, user_id_for_add, _id } = useSelector((state) => {
    console.log("XXX--->FROM WISHLIST DETAILS", state.wishlistReducer);
    return state.wishlistReducer;
  });
  const { id } = useSelector((state) => {
    return state.loginReducer;
  });

  useEffect(() => {
    dispatch({
      type: FETCH_WISHLIST_DETAILS_REQUEST,
      user_id_for_details: id,
    });
  }, [dispatch, id]);

  return (
    <div className="container py-5">
      <div className="table-responsive">
        {wishlist_details.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Products</th>
                <th scope="col">Name</th>
                <th scope="col">Handle</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              {wishlist_details.map((item) => (
                <tr key={item._id}>
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <img
                        src={`${BASE_URL}/images/` + item.product_img}
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(setProductTitle(item.slug));
                          dispatch(getProductDetailsRequest(item.slug));
                          navigate(`/productDetails/${item.slug}`);
                        }}
                        className="img-fluid me-5 rounded-circle"
                        style={{ width: "80px", height: "80px" }}
                        alt=""
                      />
                    </div>
                  </th>
                  <td>
                    <p
                      className="mb-0 mt-4"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(setProductTitle(item.slug));
                        dispatch(getProductDetailsRequest(item.slug));
                        navigate(`/productDetails/${item.slug}`);
                      }}
                    >
                      {item.product_name}
                    </p>
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(getAddToCartRequest(id, item.product_id));
                        toast.success("Product added on cart");
                        dispatch(getRemoveFromWishlist(item._id));
                        setTimeout(() => {
                          dispatch(getWishlistDataRequest(id));
                        }, 100);
                      }}
                      className="btn btn-md border border-secondary rounded-pill  mt-4 text-primary"
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
                      className="btn btn-md border border-secondary rounded-pill  mt-4 text-primary"
                    >
                      <i className="fa fa-times me-2 text-primary"></i> Remove
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
};
export default WishlistDetails;
