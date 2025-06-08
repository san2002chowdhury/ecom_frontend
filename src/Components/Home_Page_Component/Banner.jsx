import { Link, useNavigate } from "react-router-dom";
import { banners } from "../../assets/asset";
import { useDispatch } from "react-redux";
import { setProductTitle } from "../../Redux/productState/productState";
import { getProductDetailsRequest } from "../../Redux/Products/ProductAction";
import { setActive } from "../../Redux/UniversalStore/UnivarSalState";
// import { banners } from "../assets/asset";

const Banner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const slug = "boat-headphone";
  return (
    <div
      className="container-fluid banner my-5"
      style={{ backgroundColor: "#45595b" }}
    >
      <div className="container py-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <div className="py-4">
              <h1
                className="display-3 text-white"
                style={{ cursor: "pointer", fontStyle: "italic" }}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setProductTitle(slug));
                  dispatch(getProductDetailsRequest(slug));
                  dispatch(setActive("Shop"));
                  navigate(`/productDetails/${slug}`);
                }}
              >
                BOAT Headset K8P4-9
              </h1>

              <p className="fw-normal display-3 text-white mb-4">
                in Our Store
              </p>
              <p className="mb-4 text-white">
                The generated Lorem Ipsum is therefore always free from
                repetition injected humour, or non-characteristic words etc.
              </p>
              <Link
                className="banner-btn btn border-2 border-white rounded-pill text-white py-3 px-5"
                key={banners[8].category}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setProductTitle(slug));
                  dispatch(getProductDetailsRequest(slug));
                  dispatch(setActive("Shop"));

                  navigate(`/productDetails/${slug}`);
                }}
              >
                Buy Now!
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="position-relative">
              <img
                src={banners[8].src}
                className="img-fluid w-100 rounded"
                alt=""
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setProductTitle(slug));
                  dispatch(getProductDetailsRequest(slug));
                  dispatch(setActive("Shop"));
                  navigate(`/productDetails/${slug}`);
                }}
              />
              <div
                className="d-flex align-items-center justify-content-center position-absolute"
                style={{
                  width: "140px",
                  top: "0",
                  left: "4",
                  backgroundColor: "white",
                  border: "3px solid black",
                  borderRadius: "30px",
                  fontStyle: "italic",
                  fontWeight: "bolder",
                }}
              >
                <h1 style={{ fontSize: "40px", color: "red" }}>₹</h1>
                <div className="d-flex flex-column">
                  <span className="h2 mb-0" style={{ color: "red" }}>
                    1599
                  </span>
                  <span className="h4 text-muted mb-0"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
