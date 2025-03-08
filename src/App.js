/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./App.css";
import { Suspense, lazy, memo, useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
// import { browserHistory } from "react-router";
import { Toaster } from "react-hot-toast";
import React from "react";
import Spinner from "./Components/Universal_Components/Spinner";
import Navbar from "./Components/Universal_Components/Navbar";
import Footer from "./Components/Universal_Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import OtpComponent from "./Components/SignIn/OtpComponent";
import PasswordConfirm from "./Components/SignIn/PasswordConfirm";
import Loading from "./Components/Universal_Components/Loding";
import axios from "axios";
import { BASE_URL } from "./Redux/api";
import TopSelling from "./Components/Home_Page_Component/TopSelling";
import { getVerifyTokenRequest } from "./Redux/Login/LoginAction";
import { setUserIDFetch, setUserNameSuccess } from "./Redux/Login/LoginState";
import {
  FETCH_CART_DETAILS_REQUEST,
  FETCH_USER_DETAILS_REQUEST,
  FETCH_WISHLIST_DETAILS_REQUEST,
} from "./Redux/action";
import { setShowSignin } from "./Redux/UniversalStore/UnivarSalState";

function App() {
  const dispatch = useDispatch();
  let { id, token, name } = useSelector((state) => {
    return state.loginReducer;
  });
  const { showSignin } = useSelector((state) => state.universalReducer);
  // const { isLoading } = useSelector((state) => state.universalReducer);
  const { isLoading } = useSelector((state) => state.loadingReducer);
  console.log("LOAD-->", isLoading);

  const { productTitle } = useSelector((state) => state?.productTitleReducer);

  // const [showSignin, setShowSignin] = useState(false);
  const MyHome = lazy(() => import("./Pages/Home"));
  const MyProductDetails = lazy(() => import("./Pages/ProductDetail"));
  const MyCart = lazy(() => import("./Pages/Cart"));
  const MyWishlist = lazy(() => import("./Pages/Wishlist"));
  const MyCheckOut = lazy(() => import("./Pages/CheckOut"));
  const Account = lazy(() => import("./Components/Account_Page/Account"));
  const MyContact = lazy(() => import("./Pages/Contact"));
  const MyForgotPassword = lazy(() =>
    import("./Components/SignIn/ForgotPassword")
  );
  const MyResetPassword = lazy(() =>
    import("./Components/SignIn/ResetPassword")
  );

  const MyShop = lazy(() => import("./Pages/Shop"));

  let localToken = localStorage.getItem("token");

  useEffect(() => {
    if (localToken) {
      // alert("HI ");
      if (localStorage.getItem("flag") === "0") {
        dispatch(getVerifyTokenRequest(localStorage.getItem("token")));
        let user = localStorage.getItem("name");
        let user_id = localStorage.getItem("id");

        setTimeout(() => {
          dispatch(setUserNameSuccess(user));
          dispatch(setShowSignin(true));

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
        }, 2000);
      }
    } else {
      console.log("logout");
    }
  }, [dispatch, setShowSignin]);
  // }, []);

  return (
    <>
      {/* <ToastContainer /> */}
      <Toaster />
      <Router>
        {/* <Navbar showSignin={showSignin} setShowSignin={setShowSignin} /> */}
        <Navbar />
        {/* {isLoading && <Spinner />} */}
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" referrerpolicy="no-referrer" element={<MyHome />} />
            <Route
              path="/shop/:category?"
              basename="/shop"
              referrerpolicy="no-referrer"
              element={<MyShop />}
            />
            <Route
              path="/account"
              referrerpolicy="no-referrer"
              element={<Account />}
            />
            <Route
              path="/contact"
              referrerpolicy="no-referrer"
              element={<MyContact />}
            />
            <Route
              path="/forgotPassword"
              referrerpolicy="no-referrer"
              element={<MyForgotPassword />}
            />
            <Route
              path="/otp_verification"
              referrerpolicy="no-referrer"
              element={<OtpComponent />}
            />
            <Route
              path="/resetPassword"
              referrerpolicy="no-referrer"
              element={<MyResetPassword />}
            />
            <Route
              path="/set_new_password"
              referrerpolicy="no-referrer"
              element={<PasswordConfirm />}
            />
            <Route
              path={`/productDetails/${productTitle}`}
              referrerpolicy="no-referrer"
              element={<MyProductDetails />}
            />

            {/* {showSignin && (
              <Route
                path="/cart"
                referrerpolicy="no-referrer"
                element={<MyCart />}
              />
            )} */}
            {showSignin && (
              <Route
                path="/wishlist"
                referrerpolicy="no-referrer"
                element={<MyWishlist />}
              />
            )}
            {/* {showSignin && (
              <Route
                path="/checkout"
                referrerpolicy="no-referrer"
                element={<MyCheckOut />}
              />
            )} */}

            {/* {showSignin ? (
              <Route path="/wishlist" element={<MyWishlist />} />
            ) : (
              <></>
            )} */}
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </>
  );
}
export default memo(App);
