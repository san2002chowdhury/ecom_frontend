/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./App.css";
import { Suspense, lazy, memo, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React from "react";
import Spinner from "./Components/Universal_Components/Spinner";
import Navbar from "./Components/Universal_Components/Navbar";
import Footer from "./Components/Universal_Components/Footer";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import OtpComponent from "./Components/SignIn/OtpComponent";
import PasswordConfirm from "./Components/SignIn/PasswordConfirm";
import { getVerifyTokenRequest } from "./Redux/Login/LoginAction";
import { setUserIDFetch, setUserNameSuccess } from "./Redux/Login/LoginState";
import {
  FETCH_CART_DETAILS_REQUEST,
  FETCH_USER_DETAILS_REQUEST,
  FETCH_WISHLIST_DETAILS_REQUEST,
} from "./Redux/action";
import { setShowSignin } from "./Redux/UniversalStore/UnivarSalState";
import Account from "./Components/Account_Page/Account";

const App = memo(() => {
  const dispatch = useDispatch();
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  let { id } = useSelector((state) => state.loginReducer, shallowEqual);
  const { showSignin } = useSelector(
    (state) => state.universalReducer,
    shallowEqual
  );

  const { productTitle } = useSelector(
    (state) => state?.productTitleReducer,
    shallowEqual
  );

  const MyHome = lazy(() => import("./Pages/Home"));
  const MyProductDetails = lazy(() => import("./Pages/ProductDetail"));
  const MyCart = lazy(() => import("./Pages/Cart"));
  const MyWishlist = lazy(() => import("./Pages/Wishlist"));
  const MyCheckOut = lazy(() => import("./Pages/CheckOut"));
  const MyContact = lazy(() => import("./Pages/Contact"));
  const MyForgotPassword = lazy(() =>
    import("./Components/SignIn/ForgotPassword")
  );
  const MyResetPassword = lazy(() =>
    import("./Components/SignIn/ResetPassword")
  );

  const MyShop = lazy(() => import("./Pages/Shop"));
  const MyAccount = lazy(() => import("./Components/Account_Page/Account"));
  const MyNavbar = lazy(() =>
    import("./Components/Universal_Components/Navbar")
  );

  let localToken = localStorage.getItem("token");
  let flagValue = localStorage.getItem("flag");
  useEffect(() => {
    console.log("WE here-->");

    if (localToken && flagValue === "0" && !isAppLoaded) {
      // if (flagValue === "0" && !isAppLoaded) {
      dispatch(getVerifyTokenRequest(localToken));
      let user = localStorage.getItem("name");
      let user_id = localStorage.getItem("id");

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
      setIsAppLoaded(true);
      // }
    } else {
      console.log("logout");
    }
  }, []);
  // }, [dispatch, localToken, flagValue, isAppLoaded]);

  // useEffect(() => {
  //   if (!localToken) {
  //     // If no token, log out and exit early
  //     // console.log("No token found, user logged out.");

  //     return;
  //   }

  //   // Only proceed if the token is valid and flag is "0" (first-time login check)
  //   if (flagValue === "0" && !isAppLoaded) {
  //     // Dispatch the verification token request
  //     dispatch(getVerifyTokenRequest(localToken));

  //     // Proceed only if user details and name are not already available in the store
  //     if (!id) {
  //       let user = localStorage.getItem("name");
  //       let user_id = localStorage.getItem("id");

  //       dispatch(setUserNameSuccess(user));
  //       dispatch(setShowSignin(true));

  //       // Dispatch actions only if user details are not already fetched
  //       if (user_id) {
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
  //       }
  //     }

  //     // Set app loaded to true after data fetching actions are dispatched
  //     setIsAppLoaded(true);
  //   }
  // }, [dispatch, localToken, flagValue, isAppLoaded, id]);

  return (
    <>
      <Toaster />
      <Router>
        <Suspense fallback={isAppLoaded ? <Spinner /> : null}>
          <MyNavbar />
          <Routes>
            <Route path="/" referrerPolicy="no-referrer" element={<MyHome />} />
            <Route
              path="/shop/:category?"
              basename="/shop"
              referrerPolicy="no-referrer"
              element={<MyShop />}
            />
            <Route
              path="/account"
              referrerPolicy="no-referrer"
              element={<MyAccount />}
            />
            <Route
              path="/contact"
              referrerPolicy="no-referrer"
              element={<MyContact />}
            />
            <Route
              path="/forgotPassword"
              referrerPolicy="no-referrer"
              element={<MyForgotPassword />}
            />
            <Route
              path="/otp_verification"
              referrerPolicy="no-referrer"
              element={<OtpComponent />}
            />
            <Route
              path="/resetPassword"
              // referrerPolicy="no-referrer"
              element={<MyResetPassword />}
            />
            <Route
              path="/set_new_password"
              referrerPolicy="no-referrer"
              element={<PasswordConfirm />}
            />
            <Route
              path={`/productDetails/${productTitle}`}
              referrerPolicy="no-referrer"
              element={<MyProductDetails />}
            />

            {showSignin && (
              <Route
                path="/cart"
                referrerPolicy="no-referrer"
                element={<MyCart />}
              />
            )}
            {showSignin && (
              <Route
                path="/wishlist"
                referrerPolicy="no-referrer"
                element={<MyWishlist />}
              />
            )}
            {showSignin && (
              <Route
                path="/checkout"
                referrerPolicy="no-referrer"
                element={<MyCheckOut />}
              />
            )}
          </Routes>
          <Footer />
        </Suspense>
      </Router>
    </>
  );
});
export default memo(App);
