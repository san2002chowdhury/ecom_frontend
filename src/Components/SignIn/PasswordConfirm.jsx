import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getForgotPasswordRequest,
  getResetPasswordIsReset,
} from "../../Redux/User/userAction";
// import { toast } from "react-toastify";
// import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const PasswordConfirm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  function handleClick(e) {
    e.preventDefault();
    const id = localStorage.getItem("id");
    console.log("id----->Here-->", id);
    dispatch(getForgotPasswordRequest(id, input));

    setInput({
      newPassword: "",
      confirmPassword: "",
    });
    getResetPasswordIsReset();
  }
  const { isPasswordReset } = useSelector((state) => state.userReducer);
  console.log("VAL-->", isPasswordReset);

  useEffect(() => {
    if (input.confirmPassword && input.newPassword !== input.confirmPassword) {
      setError("Password do not match");
    } else {
      setError("");
      setSuccess(`Everything is fine `);
    }
  }, [input.newPassword, input.confirmPassword]);
  return (
    <div style={{ marginTop: "200px" }}>
      {!isPasswordReset ? (
        <div
          className="col-lg-3"
          style={{
            marginTop: "200px",
            marginBottom: "70px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Forgot Password</h1>
          <hr />
          <input
            type="password"
            value={input.newPassword}
            placeholder="new password"
            name="newPassword"
            onChange={(e) => {
              handleChange(e);
            }}
            style={{ marginTop: "15px", width: "100%" }}
          />
          <br />
          <input
            type="password"
            value={input.confirmPassword}
            placeholder="confirm password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
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
        <>
          <h2 style={{ textAlign: "center", marginTop: "150px" }}>
            Password Changed successfully,
          </h2>

          <h2 style={{ textAlign: "center", marginBottom: "150px" }}>
            Please Go <Link to="/">Home-Page</Link> And Login Again 😀🤍!
          </h2>
        </>
      )}
    </div>
  );
};
export default PasswordConfirm;
