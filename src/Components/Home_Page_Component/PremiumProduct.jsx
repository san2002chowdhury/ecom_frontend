import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FETCH_TOPTEN_PRODUCTS_REQUEST } from "../../Redux/action";
import { useEffect } from "react";
import { BASE_URL } from "../../Redux/api";

const PremiumProduct = () => {
  const dispatch = useDispatch();
  const { top_products } = useSelector((state) => {
    console.log(
      "top products------------->",
      state.productReducer1.top_products
    );
    return state.productReducer1;
  });
  useEffect(() => {
    dispatch({ type: FETCH_TOPTEN_PRODUCTS_REQUEST });
  }, [dispatch]);
  return (
    <>
      <h1 className="fw-bold mb-0">Related products</h1>
      <div className="vesitable">
        <div className="owl-carousel vegetable-carousel justify-content-center">
          {top_products.map((product) => (
            <div
              className="border border-primary rounded position-relative vesitable-item"
              key={product.title}
            >
              <div className="vesitable-img">
                <img
                  src={`${BASE_URL}/images/` + product.product_image}
                  className="img-fluid w-100 rounded-top"
                  alt=""
                />
              </div>
              <div
                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                style={{ top: "10px", right: "10px" }}
              >
                {product.rating}
              </div>
              <div className="p-4 pb-0 rounded-bottom">
                <h4>{product.title}</h4>
                <p>{product.tags}</p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold">${product.price}</p>
                  <Link
                    href="#"
                    className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary"></i> Add
                    to cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default PremiumProduct;
