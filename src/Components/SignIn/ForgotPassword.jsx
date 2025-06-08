import { useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
  });
  function handleChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function handleCheck() {
    const handleFetch = async () => {
      const response = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: input.email }),
      };

      toast.promise(
        fetch(`${BASE_URL}/user/verify_email`, response).then((data) => {
          return data.json();
        }),
        {
          loading: "Verifying email...",
          success: (data) => {
            if (data.otp) {
              navigate("/otp_verification");
              localStorage.setItem("id", data.id);
              return data.message;
            } else {
              throw new Error(data.message);
            }
          },
          error: (err) => {
            return err.message || "Something went wrong!";
          },
        }
      );
    };

    handleFetch();
  }

  return (
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
      <hr style={{ height: "5px", marginBottom: "10px" }} />

      <input
        type="text"
        placeholder="enter your email"
        name="email"
        style={{ width: "100%" }}
        value={input.email}
        onChange={handleChange}
      />
      <button
        className="btn btn-primary"
        style={{ marginTop: "15px", width: "100%" }}
        onClick={(e) => {
          e.preventDefault();
          handleCheck();
        }}
      >
        Check
      </button>
    </div>
  );
};
export default ForgotPassword;
