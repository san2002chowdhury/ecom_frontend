/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React from "react";
import Spinner from "./Components/Universal_Components/Spinner";
import Footer from "./Components/Universal_Components/Footer";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import OtpComponent from "./Components/SignIn/OtpComponent";
import PasswordConfirm from "./Components/SignIn/PasswordConfirm";
import { getVerifyTokenRequest } from "./Redux/Login/LoginAction";
import ScrollToTop from "./Components/Universal_Components/scrollTop";
import Navbar from "./Components/Universal_Components/Navbar";
import Shop from "./Pages/Shop";
import UserDetails from "./Pages/UserDetails";
import Contact from "./Pages/Contact";
import ForgotPassword from "./Components/SignIn/ForgotPassword";
import ResetPassword from "./Components/SignIn/ResetPassword";
import ProductDetails from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Checkout from "./Pages/CheckOut";
import OrderConfirmed from "./Pages/OrderConfirmed";
import OrderDetails from "./Pages/OrderDetails";
import Home from "./Pages/Home";

const App = () => {
  const dispatch = useDispatch();
  const { isLoading, showSignin, productTitle } = useSelector(
    (state) => ({
      isLoading: state.loadingReducer.isLoading,
      showSignin: state.loginReducer.showSignin,
      productTitle: state?.productTitleReducer.productTitle,
    }),
    shallowEqual
  );

  localStorage.setItem("flag", 0);
  let localToken = localStorage.getItem("token");
  let flagValue = localStorage.getItem("flag");
  useEffect(() => {
    if (localToken && flagValue === "0" && !isLoading) {
      dispatch(getVerifyTokenRequest(localToken));
    } else {
    }
  }, []);

  return (
    <>
      <Toaster />
      {isLoading && <Spinner />}
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" referrerPolicy="no-referrer" element={<Home />} />
          <Route
            path="/shop/:category?"
            basename="/shop"
            referrerPolicy="no-referrer"
            element={<Shop />}
          />
          <Route
            path="/account"
            referrerPolicy="no-referrer"
            element={<UserDetails />}
          />
          <Route
            path="/contact"
            referrerPolicy="no-referrer"
            element={<Contact />}
          />
          <Route
            path="/forgotPassword"
            referrerPolicy="no-referrer"
            element={<ForgotPassword />}
          />
          <Route
            path="/otp_verification"
            referrerPolicy="no-referrer"
            element={<OtpComponent />}
          />
          <Route
            path="/resetPassword"
            referrerPolicy="no-referrer"
            element={<ResetPassword />}
          />
          <Route
            path="/set_new_password"
            referrerPolicy="no-referrer"
            element={<PasswordConfirm />}
          />
          <Route
            path={`/productDetails/${productTitle}`}
            referrerPolicy="no-referrer"
            element={<ProductDetails />}
          />

          {showSignin && (
            <Route
              path="/cart"
              referrerPolicy="no-referrer"
              element={<Cart />}
            />
          )}
          {showSignin && (
            <Route
              path="/wishlist"
              referrerPolicy="no-referrer"
              element={<Wishlist />}
            />
          )}
          {showSignin && (
            <Route
              path="/checkout"
              referrerPolicy="no-referrer"
              element={<Checkout />}
            />
          )}
          {showSignin && (
            <Route
              path="/order-confirm"
              referrerPolicy="no-referrer"
              element={<OrderConfirmed />}
            />
          )}
          {showSignin && (
            <Route
              path="/myorder"
              referrerPolicy="no-referrer"
              element={<OrderDetails />}
            />
          )}
        </Routes>
        <Footer />
      </Router>
    </>
  );
};
export default App;
