import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getResetPasswordRequest } from "../../Redux/User/userAction";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { BadgeCheck } from "lucide-react";
import { BadgeAlert } from "lucide-react";
const ResetPassword = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id, isPasswordReset } = useSelector(
    (state) => ({
      id: state.loginReducer.id,
      isPasswordReset: state.userReducer.isPasswordReset,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (input.confirmPassword && input.newPassword !== input.confirmPassword) {
      setError("Password do not match");
    } else {
      setError("");
      setSuccess(`Everything is fine `);
    }

    if (isPasswordReset) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
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
    marginTop: "10px",
    padding: "3px",
    backgroundColor: "#0013",
    maxWidth: "60%",
    borderRadius: "50px",
  };
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
            placeholder="New Password"
            name="newPassword"
            onChange={(e) => {
              handleInput(e);
            }}
            style={{ padding: "5px", marginTop: "15px", width: "100%" }}
          />
          <br />
          <input
            type="password"
            value={input.confirmPassword}
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleInput(e)}
            style={{ padding: "5px", marginTop: "15px", width: "100%" }}
          />
          {error ? (
            <div style={styleBackground}>
              <p style={style}>
                <BadgeAlert /> {error}
              </p>
            </div>
          ) : input.confirmPassword === "" ? (
            <></>
          ) : (
            <div style={styleBackground}>
              <p style={styleSuccess}>
                <BadgeCheck /> {success}
              </p>
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
export default ResetPassword;
