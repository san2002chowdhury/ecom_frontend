/* eslint-disable react/style-prop-object */

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setProductTitle } from "../../Redux/productState/productState";
import { getProductDetailsRequest } from "../../Redux/Products/ProductAction";
import { BASE_URL } from "../../Redux/api";
import {
  getAddToWishlistRequest,
  getWishlistDataRequest,
} from "../../Redux/Wishlist/wishlistAction";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import {
  getAddToCartRequest,
  getCartDetailsRequest,
} from "../../Redux/Cart/cartAction";
// import { incCartLength } from "../../Redux/UniversalStore/UnivarSalState";

/* eslint-disable jsx-a11y/anchor-is-valid */
const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => {
    return state.productReducer;
  });

  const { id } = useSelector((state) => {
    return state.loginReducer;
  });
  console.log("Products-->", products);

  return (
    <div className="col-lg-9" style={{ marginLeft: "150px" }}>
      <div className="row g-4 justify-content-center">
        {products.map((product) => (
          <div className="col-md-6 col-lg-6 col-xl-4" key={product._id}>
            <div
              className="rounded position-relative vesitable-item"
              style={{ cursor: "pointer" }}
            >
              <div
                className="vesitable-img"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "150px",
                }}
              >
                <img
                  src={`${BASE_URL}/images/` + product.product_image}
                  className="img-fluid w-100 rounded-top"
                  alt=""
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setProductTitle(product.slug));
                    dispatch(getProductDetailsRequest(product.slug));
                    navigate(`/productDetails/${product.slug}`);
                  }}
                />
              </div>
              <div
                className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                style={{ top: "10px", left: "10px" }}
              >
                <i className="fas fa-star" style={{ color: " #ffffff" }}>
                  {" "}
                  {product.rating}
                </i>
              </div>
              <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                <h4>
                  <Link
                    className="h5"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(setProductTitle(product.slug));
                      dispatch(getProductDetailsRequest(product.slug));
                      navigate(`/productDetails/${product.slug}`);
                    }}
                  >
                    {product.title}
                  </Link>
                </h4>
                {/* <p>{product.tags}</p> */}
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold mb-0">
                    {" "}
                    ₹{product.price}
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (id) {
                        dispatch(getAddToCartRequest(id, product._id));
                        // dispatch(incCartLength(1));
                        toast.success(`product added on cart`);
                        // setTimeout(() => {
                        dispatch(getCartDetailsRequest(id));
                        // }, 100);
                      } else {
                        toast.error(
                          "you can't add to cart a product before login,please login!"
                        );
                      }
                    }}
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-1 text-primary"></i>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (id) {
                        dispatch(getAddToWishlistRequest(id, product._id));
                        // setTimeout(() => {
                        dispatch(getWishlistDataRequest(id));
                        // }, 100);
                      } else {
                        toast.error(
                          "you can't add to wishlist a product without login,please login!"
                        );
                      }
                    }}
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-heart me-1 text-primary"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Products;
