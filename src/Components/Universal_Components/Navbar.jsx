/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { memo, useEffect, useMemo, useState } from "react";
import { assets } from "../../assets/asset";
import Signin from "../SignIn/Signin";
import {
  setUserIDFetch,
  setUserNameSuccess,
} from "../../Redux/Login/LoginState";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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

// const Navbar = {
//   // showSignin,
//   //  setShowSignin,
//   userData,
//   setBackground,
// };
const Navbar = React.memo(() => {
  const { showSignin } = useSelector(
    (state) => state.universalReducer,
    shallowEqual
  );
  const Data = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();

  let { id, name } = useSelector((state) => state.loginReducer, shallowEqual);

  // let localToken = localStorage.getItem("token");

  const user_name = (name || localStorage.getItem("name"))
    ?.split(" ")
    ?.map((el) => el.charAt(0).toUpperCase())
    ?.join("");

  const closeModal = () => setShowModal(false);

  localStorage.setItem("flag", 0);
  let user_id = localStorage.getItem("id");

  console.log("we->nav->");

  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (id && !showSignin) {
      localStorage.setItem("isPasswordReset", false);
      dispatch(setUserIDFetch(id));
      dispatch(setShowSignin(true));
      closeModal(true);
      dispatch(setUserNameSuccess(name));
    } else if (id === undefined || !id) {
      dispatch(setShowSignin(false));
    } else {
      return;
    }
  }, [dispatch, id, showSignin]);

  const { count_wishlist } = useSelector(
    (state) => state.wishlistReducer,
    shallowEqual
  );

  const { count_cart } = useSelector(
    (state) => state.cartReducer,
    shallowEqual
  );

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
          <button className="navbar-toggler py-2 px-3" type="button">
            <span className="fLink fa-bars text-primary"></span>
          </button>
          <div className="collapse navbar-collapse bg-white">
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
                  {count_wishlist >= 0 && (
                    <span
                      className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                      style={{
                        top: "18px",
                        left: "800px",
                        height: "20px",
                        width: "20px",
                      }}
                    >
                      {count_wishlist}
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
                    {count_cart}
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
                      <Signin closeModal={closeModal} />
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
});
export default Navbar;
