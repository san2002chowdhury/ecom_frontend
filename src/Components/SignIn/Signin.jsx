/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./Signin.css";
import { assets } from "../../assets/asset";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginRequest,
  getSignUpRequest,
} from "../../Redux/Login/LoginAction";
import { setUserTokenFetch } from "../../Redux/Login/LoginState";
import { FETCH_WISHLIST_DETAILS_REQUEST } from "../../Redux/action";
import { useNavigate } from "react-router-dom";
const Signin = ({ showSignin, setShowSignin, show, onHide, closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { payload, token } = useSelector((state) => state.loginReducer);
  console.log(payload, token);
  const [currState, setCurrState] = useState("Login");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [val, setVal] = useState(true);
  const [inputForSignUp, setInputForSignUp] = useState({
    fname: "",
    mname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [inputForLogin, setInputForLogin] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    e.preventDefault();
    console.log(e.target);
    setInputForLogin({ ...inputForLogin, [e.target.name]: e.target.value });
  }
  function handleChangeSignUp(e) {
    e.preventDefault();
    console.log(e.target.value);

    setInputForSignUp({ ...inputForSignUp, [e.target.name]: e.target.value });
  }

  function handleSubmitForLogin() {
    console.log(inputForLogin);
    dispatch(getLoginRequest(inputForLogin));
    setInputForLogin({
      email: "",
      password: "",
    });
  }
  function handleForSignup() {
    console.log("before dispatch--->", inputForSignUp);

    dispatch(getSignUpRequest(inputForSignUp));
    setInputForSignUp({
      fname: "",
      mname: "",
      lname: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  }
  return (
    <div className="signin-popup">
      <div className="signin-popup-container" style={{ margin: "0 auto" }}>
        <div className="signin-popup-title">
          <h2 style={{ color: "greenYellow" }}>{currState}</h2>
          <img
            style={{
              backgroundColor: "white",
              borderRadius: "50px",
              width: "20px",
            }}
            onClick={() => closeModal(true)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="signin-popup-input">
          {currState === "Login" ? (
            <>
              <input
                type="email"
                placeholder="Your Email"
                required
                name="email"
                value={inputForLogin.email}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                placeholder="Your Password"
                required
                name="password"
                value={inputForLogin.password}
                onChange={(e) => handleChange(e)}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Your First Name"
                name="fname"
                value={inputForSignUp.fname}
                onChange={(e) => handleChangeSignUp(e)}
                required
              />
              <input
                type="text"
                name="mname"
                value={inputForSignUp.mname}
                onChange={(e) => handleChangeSignUp(e)}
                placeholder="(optional) Your Middle Name"
              />
              <input
                type="text"
                name="lname"
                value={inputForSignUp.lname}
                onChange={(e) => handleChangeSignUp(e)}
                placeholder="Your Last Name"
                required
              />

              <input
                type="text"
                name="phone"
                value={inputForSignUp.phone}
                onChange={(e) => handleChangeSignUp(e)}
                placeholder="Your Phone Number"
                required
              />
              <input
                type="text"
                name="email"
                value={inputForSignUp.email}
                onChange={(e) => handleChangeSignUp(e)}
                placeholder="Your Email"
                required
              />
              <input
                type="password"
                name="password"
                value={inputForSignUp.password}
                onChange={(e) => handleChangeSignUp(e)}
                placeholder="Your Password"
                required
              />
              <input
                type="password"
                name="confirm_password"
                value={inputForSignUp.confirm_password}
                onChange={(e) => handleChangeSignUp(e)}
                placeholder="Confirm Password"
                required
              />
            </>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setCurrState("Login");
            if (currState === "Login") {
              handleSubmitForLogin();
            }
            if (currState === "Sign Up") {
              alert("We are here");
              handleForSignup();
            }
          }}
          disabled={val === true ? true : false}
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input
            type="checkbox"
            onChange={() => setVal(false)}
            style={{ cursor: "pointer" }}
          />
          <p style={{ color: "#fff", fontWeight: "900", fontStyle: "italic" }}>
            By continuing, i agree to the terms of use & privacy policy
          </p>
        </div>
        {currState === "Login" ? (
          <>
            <p
              style={{
                color: "white",
                fontWeight: "600",
                marginBottom: "5px",
              }}
            >
              Create a new account?{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                style={{ color: "greenYellow", fontWeight: "900" }}
              >
                Click Here!
              </span>
            </p>
            <span
              style={{
                color: "white",
                fontWeight: "bolder",
                marginTop: "1x",
              }}
            >
              Forgot password?
              <span
                style={{
                  color: "greenYellow",
                  fontWeight: "bolder",
                  cursor: "pointer",
                }}
                onClick={() => {
                  closeModal(true);

                  navigate("/forgotPassword");
                }}
              >
                {" "}
                Click Here!
              </span>
            </span>
          </>
        ) : (
          <p style={{ color: "white", fontWeight: "600" }}>
            Already have an account?
            <span
              onClick={() => setCurrState("Login")}
              style={{ color: "greenYellow", fontWeight: "900" }}
            >
              {" "}
              Login Here!
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
export default Signin;
