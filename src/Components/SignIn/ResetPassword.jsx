import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getResetPasswordRequest } from "../../Redux/User/userAction";
import { useSelector, useDispatch } from "react-redux";
import { getLoginEmpty } from "../../Redux/Login/LoginAction";
const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useSelector((state) => {
    return state.loginReducer;
  });
  const { isPasswordReset } = useSelector((state) => {
    console.log("isPasswordReset-->so reducer-->", state.userReducer);

    return state.userReducer;
  });
  console.log(">>>>>>isPasswordReset>>>>>", isPasswordReset);

  useEffect(() => {
    if (input.confirmPassword && input.newPassword !== input.confirmPassword) {
      setError("Password do not match");
    } else {
      setError("");
      setSuccess(`Everything is fine `);
    }
    console.log("isPasswordReset------>", isPasswordReset);

    if (isPasswordReset) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");

      dispatch(getLoginEmpty());
    }
  }, [dispatch, input.newPassword, input.confirmPassword, isPasswordReset]);

  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handleClick(e) {
    e.preventDefault();
    dispatch(getResetPasswordRequest(id, input));
    setInput({
      newPassword: "",
      confirmPassword: "",
    });
  }

  return (
    <div style={{ marginTop: "100px" }}>
      {console.log(">>>>isPasswordReset>>>>", isPasswordReset)}
      {!isPasswordReset ? (
        <button
          className="btn btn-info"
          style={{ marginTop: "100px", marginLeft: "300px" }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/account");
          }}
        >
          &#8617; Account Page
        </button>
      ) : (
        <div style={{ marginTop: "300px ", marginBottom: "200px" }}>
          <h2 style={{ textAlign: "center", marginTop: "50px" }}>
            Please Go <Link to="/">Home-Page</Link> At first Logout,then Login
            Again 😀🤍!
          </h2>
        </div>
      )}
      {!isPasswordReset ? (
        <div
          className="col-lg-3"
          style={{
            margin: "50px auto",
          }}
        >
          <h1>Reset Password</h1>
          <input
            type="password"
            value={input.newPassword}
            placeholder="new password"
            name="newPassword"
            onChange={(e) => handleInput(e)}
            style={{ marginTop: "15px", width: "100%" }}
          />
          <br />
          <input
            type="password"
            value={input.confirmPassword}
            placeholder="confirm password"
            name="confirmPassword"
            onChange={(e) => handleInput(e)}
            style={{ marginTop: "15px", width: "100%" }}
          />
          {error ? (
            <div style={{ color: "red", marginTop: "5px" }}>{error}</div>
          ) : input.confirmPassword === "" ? (
            <></>
          ) : (
            <div style={{ color: "green", marginTop: "5px" }}>
              {success} &#9989;
            </div>
          )}

          <button
            className="btn btn-primary"
            style={{ marginTop: "15px", width: "100%" }}
            onClick={(e) => handleClick(e)}
          >
            Done
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default ResetPassword;
