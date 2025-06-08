import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useCallback, useMemo, useState } from "react";
import { assets } from "../../assets/asset";
import Signin from "../SignIn/Signin";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  setActive,
  setCategoryName,
  setDefault,
  setInActive,
} from "../../Redux/UniversalStore/UnivarSalState";
import { memo } from "react";
import { setLoading } from "../../Redux/Loading/LoadingAction";

const Navbar = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const closeModal = useCallback(() => setShowModal(false), []);
  const openModal = useCallback(() => setShowModal(true), []);
  const { showSignin, name, count_wishlist, count_cart, active } = useSelector(
    (state) => ({
      showSignin: state.loginReducer.showSignin,
      name: state.loginReducer.name,
      count_wishlist: state.wishlistReducer.count_wishlist,
      count_cart: state.cartReducer.count_cart,
      active: state.universalReducer.active,
    }),
    shallowEqual
  );
  const user_name = useMemo(() => {
    return (localStorage.getItem("name") || name)
      ?.split(" ")
      ?.map((el) => el.charAt(0).toUpperCase())
      ?.join("");
  }, [name]);

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
                onClick={() => dispatch(setInActive())}
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => {
                  dispatch(setDefault());
                  dispatch(setCategoryName("All Products"));
                  dispatch(setActive("Shop"));
                }}
                className={`nav-item nav-link ${
                  active === "Shop" ? "active" : ""
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
                  onClick={() => dispatch(setInActive())}
                >
                  Wishlist
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
                </Link>
              )}

              <Link
                to="/contact"
                className={`nav-item nav-link ${
                  location.pathname === "/contact" && "active"
                }`}
                onClick={() => dispatch(setInActive())}
              >
                Contact
              </Link>
              {showSignin && (
                <Link
                  to="/cart"
                  className="position-relative me-4 my-auto"
                  style={{
                    marginLeft: "100px",
                  }}
                  onClick={() => dispatch(setInActive())}
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
              {showSignin ? (
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
                        dispatch(setInActive());
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
                          dispatch(setLoading(true));
                          toast.success("logout done successfully");
                          navigate("/");
                          dispatch(setInActive());
                          setTimeout(() => {
                            window.location.reload();
                            localStorage.clear();
                            dispatch(setLoading(false));
                          }, 1000);
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
                          dispatch(setInActive());
                          e.preventDefault();
                          navigate("/myorder");
                        }}
                      >
                        My Orders
                      </button>
                    </div>
                  </div>
                </>
              ) : (
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
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
});
export default Navbar;
