/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Signin.css";
import { assets } from "../../assets/asset";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getLoginRequest,
  getSignUpRequest,
} from "../../Redux/Login/LoginAction";
import { BadgeAlert, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { validateIndianPhoneNumber } from "../../utils/validateIndianPhoneNumber";
import isValidEmail from "../../utils/validateEmail";
import toast from "react-hot-toast";
const Signin = ({ closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSignin } = useSelector(
    (state) => ({
      showSignin: state.loginReducer.showSignin,
    }),
    shallowEqual
  );

  const [currState, setCurrState] = useState("Login" || currState);
  const [error, setError] = useState("");
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorConfirmPassowrd, setErrorConfirmPassword] = useState(true);
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
  useEffect(() => {
    if (showSignin === true) {
      closeModal(true);
    }
    if (
      inputForSignUp.confirm_password &&
      inputForSignUp.password === inputForSignUp.confirm_password
    ) {
      setErrorConfirmPassword(false);
    }
  }, [
    showSignin,
    closeModal,
    inputForSignUp.password,
    inputForSignUp.confirm_password,
  ]);
  function handleChange(e) {
    e.preventDefault();
    if (e.target.name === "email") {
      setErrorEmail(isValidEmail(e.target.value));
      setInputForLogin({ ...inputForLogin, [e.target.name]: e.target.value });
    } else
      setInputForLogin({ ...inputForLogin, [e.target.name]: e.target.value });
  }
  function handleChangeSignUp(e) {
    e.preventDefault();
    if (e.target.name === "phone") {
      setErrorPhone(validateIndianPhoneNumber(e.target.value));
      setInputForSignUp({ ...inputForSignUp, [e.target.name]: e.target.value });
    }
    if (e.target.name === "email") {
      setErrorEmail(isValidEmail(e.target.value));
      setInputForSignUp({ ...inputForSignUp, [e.target.name]: e.target.value });
    } else
      setInputForSignUp({ ...inputForSignUp, [e.target.name]: e.target.value });
  }

  function handleSubmitForLogin(e) {
    e.preventDefault();

    dispatch(getLoginRequest(inputForLogin));
    setInputForLogin({
      email: "",
      password: "",
    });
    setErrorEmail(false);
    setVal(true);
    navigate("/");
  }
  function handleForSignup(e) {
    e.preventDefault();

    let flag = true;
    if (
      validateIndianPhoneNumber(inputForSignUp.phone) === false &&
      isValidEmail(inputForSignUp.email) === false
    ) {
      setError("Please check email & phone");
      flag = false;
    }

    if (flag) {
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
      setErrorEmail(false);
      setErrorPhone(false);
      setErrorConfirmPassword(true);
      setError("");
      setVal(true);
    }
  }
  const style = {
    color: "red",
    fontWeight: "bold",
    fontStyle: "italic",
    marginTop: "1px",
    marginBottom: "0px",
  };
  const styleSuccess = {
    color: "green",
    fontWeight: "bolder",
    fontStyle: "italic",
    marginTop: "1px",
    marginBottom: "0px",
  };
  const styleBackground = {
    padding: "3px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    maxWidth: "75%",
    borderRadius: "50px",
  };
  return (
    <div className="signin-popup">
      <div className="signin-popup-container" style={{ margin: "0 auto" }}>
        <div className="signin-popup-title">
          <h2 style={{ color: "greenYellow" }}>{currState}</h2>
          <img
            onClick={(e) => {
              e.preventDefault();
              closeModal(true);
            }}
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
                required={true}
                name="email"
                value={inputForLogin.email}
                onChange={handleChange}
              />
              {!errorEmail ? (
                <div style={styleBackground}>
                  <p style={style}>
                    <BadgeAlert /> Please enter a valid email
                  </p>
                </div>
              ) : (
                <div style={styleBackground}>
                  <p style={styleSuccess}>
                    <BadgeCheck /> Everything is fine!
                  </p>
                </div>
              )}
              <input
                type="password"
                placeholder="Your Password"
                required={true}
                name="password"
                value={inputForLogin.password}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Your First Name"
                name="fname"
                value={inputForSignUp.fname}
                onChange={handleChangeSignUp}
                required={true}
              />
              <input
                type="text"
                name="mname"
                value={inputForSignUp.mname}
                onChange={handleChangeSignUp}
                placeholder="(optional) Your Middle Name"
              />
              <input
                type="text"
                name="lname"
                value={inputForSignUp.lname}
                onChange={handleChangeSignUp}
                placeholder="Your Last Name"
                required={true}
              />

              <input
                type="text"
                name="phone"
                value={inputForSignUp.phone}
                onChange={handleChangeSignUp}
                placeholder="Your Phone Number"
                required={true}
              />
              {!errorPhone ? (
                <div style={styleBackground}>
                  <p style={style}>
                    <BadgeAlert /> Please enter a valid indian number
                  </p>
                </div>
              ) : (
                <div style={styleBackground}>
                  <p style={styleSuccess}>
                    <BadgeCheck /> Everything is fine!
                  </p>
                </div>
              )}
              <input
                type="text"
                name="email"
                value={inputForSignUp.email}
                onChange={handleChangeSignUp}
                placeholder="Your Email"
                required={true}
              />
              {!errorEmail ? (
                <div style={styleBackground}>
                  <p style={style}>
                    <BadgeAlert /> Please enter a valid email
                  </p>
                </div>
              ) : (
                <div style={styleBackground}>
                  <p style={styleSuccess}>
                    <BadgeCheck /> Everything is fine!
                  </p>
                </div>
              )}
              <input
                type="password"
                name="password"
                value={inputForSignUp.password}
                onChange={handleChangeSignUp}
                placeholder="Your Password"
                required={true}
              />
              <input
                type="password"
                name="confirm_password"
                value={inputForSignUp.confirm_password}
                onChange={handleChangeSignUp}
                placeholder="Confirm Password"
                required={true}
              />
              {errorConfirmPassowrd !== false ? (
                <div style={styleBackground}>
                  <p style={style}>
                    <BadgeAlert /> Please re-enter the password properly
                  </p>
                </div>
              ) : (
                <div style={styleBackground}>
                  <p style={styleSuccess}>
                    <BadgeCheck /> Everything is fine!
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        {error && <p style={style}>*`${error}`</p>}
        <div className="login-popup-condition">
          <input
            type="checkbox"
            onChange={() => setVal(false)}
            checked={val === true ? false : true}
            style={{ cursor: "pointer" }}
          />
          <p style={{ color: "#fff", fontWeight: "900", fontStyle: "italic" }}>
            By continuing, i agree to the terms of use & privacy policy
          </p>
        </div>
        <button
          onClick={(e) => {
            setCurrState("Login");
            if (currState === "Login") {
              handleSubmitForLogin(e);
            }
            if (currState === "Sign Up") {
              alert("We are here");
              if (
                inputForSignUp.fname &&
                inputForSignUp.lname &&
                inputForSignUp.phone &&
                inputForSignUp.email &&
                inputForSignUp.password &&
                inputForSignUp.confirm_password
              ) {
                handleForSignup(e);
              } else {
                toast.error("Please fill all details then try!");
              }
            }
          }}
          disabled={val === true ? true : false}
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

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
                onClick={(e) => {
                  e.preventDefault();
                  setCurrState("Sign Up");
                }}
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
                onClick={(e) => {
                  e.preventDefault();
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
              onClick={(e) => {
                e.preventDefault();
                setCurrState("Login");
              }}
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
