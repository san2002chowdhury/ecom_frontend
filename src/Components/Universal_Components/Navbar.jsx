/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { assets } from "../../assets/asset";
import Signin from "../SignIn/Signin";
import {
  setUserIDFetch,
  setUserNameSuccess,
} from "../../Redux/Login/LoginState";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_CART_DETAILS_REQUEST,
  FETCH_RESET_USER_PASSWORD_IsTrue_REQUEST,
  FETCH_USER_DETAILS_REQUEST,
  FETCH_WISHLIST_DETAILS_REQUEST,
} from "../../Redux/action";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import { getUserDetailsRequest } from "../../Redux/User/userAction";
import setCookie from "../../utils/setCookie";
import {
  getLoginEmpty,
  getVerifyTokenRequest,
} from "../../Redux/Login/LoginAction";
import { BASE_URL } from "../../Redux/api";
import handleRequest from "../../utils/verifyToken";
import {
  setDefault,
  setShowSignin,
} from "../../Redux/UniversalStore/UnivarSalState";

const Navbar = ({
  // showSignin,
  //  setShowSignin,
  userData,
  setBackground,
}) => {
  const { showSignin, cartLength } = useSelector(
    (state) => state.universalReducer
  );
  const Data = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();

  let { id, token, name } = useSelector((state) => {
    return state.loginReducer;
  });

  let localToken = localStorage.getItem("token");
  // console.log(
  //   "------------------token------------------------------>>>>",
  //   localStorage.getItem("token")
  // );
  // useEffect(() => {
  //   console.log("PATH NAME-->", location);
  //   if (localToken) {
  //     if (localStorage.getItem("flag") === "0") {
  //       dispatch(getVerifyTokenRequest(localStorage.getItem("token")));
  //       let user = localStorage.getItem("name");
  //       let user_id = localStorage.getItem("id");

  //       setTimeout(() => {
  //         dispatch(setUserNameSuccess(user));
  //         setShowSignin(true);

  //         dispatch(setUserIDFetch(id));
  //         dispatch({
  //           type: FETCH_WISHLIST_DETAILS_REQUEST,
  //           user_id_for_details: id || user_id,
  //         });

  //         dispatch({
  //           type: FETCH_CART_DETAILS_REQUEST,
  //           user_id_for_details: id || user_id,
  //         });
  //         dispatch({
  //           type: FETCH_USER_DETAILS_REQUEST,
  //           user_id: id || user_id,
  //         });
  //       }, 2000);
  //     }
  //   } else {
  //     console.log("logout");
  //   }
  // }, [dispatch, setShowSignin, location]);

  const user_name = (name || localStorage.getItem("name"))
    ?.split(" ")
    ?.map((el) => el.charAt(0).toUpperCase())
    ?.join("");
  const { wishlist_details } = useSelector((state) => {
    return state.wishlistReducer;
  });
  const { cart_details } = useSelector((state) => {
    console.log(
      "======================================================initial cart state---->",
      state.cartReducer
    );

    return state.cartReducer;
  });
  console.log(
    cart_details.length,
    "========================================================CART DETAILS--->",
    cart_details
  );

  let lengthCart = cart_details.length;
  let lengthWishlist = wishlist_details.length;
  const closeModal = () => setShowModal(false);

  // console.log("id------>", id);

  localStorage.setItem("flag", 0);
  let user_id = localStorage.getItem("id");

  useEffect(() => {
    if (id && !showSignin) {
      dispatch(setShowSignin(true));
      localStorage.setItem("isPasswordReset", false);
      closeModal(true);

      dispatch(setUserNameSuccess(name));

      dispatch(setUserIDFetch(id));
      dispatch({
        type: FETCH_WISHLIST_DETAILS_REQUEST,
        user_id_for_details: id || user_id,
      });

      dispatch({
        type: FETCH_CART_DETAILS_REQUEST,
        user_id_for_details: id || user_id,
      });
      dispatch({
        type: FETCH_USER_DETAILS_REQUEST,
        user_id: id || user_id,
      });
      dispatch({
        type: FETCH_RESET_USER_PASSWORD_IsTrue_REQUEST,
      });
    }
    if (id === undefined || !id) {
      setShowSignin(false);
    }
  }, [id, dispatch, showSignin, closeModal, location]);

  // console.log("value---->", showSignin);

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  return (
    <div className="container-fluid fixed-top">
      <div className="container topbar bg-primary d-none d-lg-block">
        <div className="d-flex justify-content-between">
          <div className="top-info ps-2">
            <small className="me-3">
              <i className="fas fa-map-marker-alt me-2 text-secondary"></i>{" "}
              <Link to="/" className="text-white">
                Vivekananda Nagar,Madhyamgram,West Bengal
              </Link>
            </small>
            <small className="me-3">
              <i className="fas fa-envelope me-2 text-secondary"></i>
              <Link to="/" className="text-white">
                chowdhurystore2025@gmail.com
              </Link>
            </small>
          </div>
          <div className="top-link pe-2">
            <Link to="/" className="text-white">
              <small className="text-white mx-2">Privacy Policy</small>/
            </Link>
            <Link to="/" className="text-white">
              <small className="text-white mx-2">Terms of Use</small>/
            </Link>
            <Link to="/" className="text-white">
              <small className="text-white ms-2">Sales and Refunds</small>
            </Link>
          </div>
        </div>
      </div>
      <div className="container px-0">
        <nav className="navbar navbar-light bg-white navbar-expand-xl">
          <Link to="/" className="navbar-brand" style={{ marginLeft: "80px" }}>
            <img
              className="display-6"
              src={assets.logo}
              alt=""
              width={"350px"}
              style={{ borderRadius: "50px" }}
            />
          </Link>
          <button
            className="navbar-toggler py-2 px-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fLink fa-bars text-primary"></span>
          </button>
          <div
            className="collapse navbar-collapse bg-white"
            id="navbarCollapse"
          >
            <div className="navbar-nav mx-auto">
              <Link
                to="/"
                className={`nav-item nav-link ${
                  location.pathname === "/" && "active"
                }`}
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => dispatch(setDefault())}
                className={`nav-item nav-link ${
                  location.pathname === "/shop" && "active"
                }`}
              >
                Shop
              </Link>
              {showSignin && (
                <Link
                  to="/wishlist"
                  className={`nav-item nav-link ${
                    location.pathname === "/wishlist" && "active"
                  }`}
                >
                  Wishlist
                  {wishlist_details && (
                    <span
                      className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                      style={{
                        top: "18px",
                        left: "800px",
                        height: "20px",
                        width: "20px",
                      }}
                    >
                      {lengthWishlist}
                    </span>
                  )}
                </Link>
              )}

              <Link
                to="/contact"
                className={`nav-item nav-link ${
                  location.pathname === "/contact" && "active"
                }`}
              >
                Contact
              </Link>
              {showSignin && (
                <Link
                  to="/cart"
                  className="position-relative me-4 my-auto"
                  style={{ marginLeft: "100px" }}
                >
                  <i className="fa fa-shopping-bag fa-2x"></i>
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{
                      top: "-5px",
                      left: "15px",
                      height: "20px",
                      minWidth: "20px",
                    }}
                  >
                    {lengthCart}
                  </span>
                </Link>
              )}
              {showSignin === false ? (
                <>
                  <div>
                    <button className="btn btn-primary" onClick={openModal}>
                      <i className="fas fa-user fa-1x"> Login</i>
                    </button>

                    <div
                      className={`modal fade ${showModal ? "show" : ""}`}
                      tabIndex="-1"
                      style={{ display: showModal ? "block" : "none" }}
                      aria-hidden={!showModal}
                    >
                      <Signin
                        closeModal={closeModal}
                        setBackground={setBackground}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div
                    className="nav-item dropdown"
                    style={{ outline: "none" }}
                  >
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="dropdown"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/account");
                      }}
                    >
                      <i
                        className="fas fa-user fa-1x 
                    btn btn-primary nav-link dropdown-toggle
                    "
                      >
                        {" "}
                        {user_name}
                      </i>
                    </button>
                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                      <button
                        className="dropdown-item btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          const loadingToast = toast.success(
                            "logout done successfully"
                          );

                          navigate("/");
                          setTimeout(() => {
                            window.location.reload();
                            localStorage.clear();
                          }, 1000);
                          setTimeout(() => {
                            toast.promise(loadingToast);
                          }, 3000);
                        }}
                      >
                        Logout
                      </button>
                      <button
                        className="dropdown-item btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/account");
                        }}
                      >
                        My Account
                      </button>
                      <button
                        className="dropdown-item btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        My Orders
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default Navbar;
