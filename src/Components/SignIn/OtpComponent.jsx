/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import "./VerifyOTP.css";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const OtpComponent = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(Array(6).fill(""));
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const inputRefs = useRef([]);
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  const handleInputChange = (e, index) => {
    e.preventDefault();
    const value = e.target.value;
    if (value.length > 1) return;
    const newInputs = [...inputs];
    newInputs[index] = value;
    if (value !== "" && index < inputs.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    setInputs(newInputs);
    checkButtonStatus(newInputs);
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedValue = e.clipboardData.getData("text");
    const newInputs = [...inputs];
    for (let i = 0; i < newInputs.length; i++) {
      if (i < pastedValue.length) {
        newInputs[i] = pastedValue[i];
      } else {
        newInputs[i] = "";
      }
    }
    setInputs(newInputs);
    checkButtonStatus(newInputs);
  };
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && inputs[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const checkButtonStatus = (inputs) => {
    const isValid = !inputs.includes("");
    setIsButtonDisabled(!isValid);
  };
  const handleVerify = (e) => {
    e.preventDefault();

    const handleFetch = async () => {
      const response = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: inputs.join("") }),
      };

      toast.promise(
        fetch(`${BASE_URL}/user/verify_otp`, response).then((data) => {
          return data.json();
        }),
        {
          loading: "Verifying OTP...",
          success: (data) => {
            localStorage.setItem("id", data.id);

            if (data.success) {
              navigate("/set_new_password");
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
  };

  function handleRequest(e) {
    e.preventDefault();
    const handleFetch = async () => {
      const response = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: localStorage.getItem("id") }),
      };
      toast.promise(
        await fetch(`${BASE_URL}/user/request_otp`, response).then((data) => {
          return data.json();
        }),
        {
          loading: "Please wait for new otp",
          success: (data) => {
            if (data.success) {
              return data.message;
            } else {
              return new Error(data.message);
            }
          },
          error: (err) => {
            return err.message || "Something went wrong";
          },
        }
      );
    };
    handleFetch();
  }

  return (
    <div
      className="container-fluid bg-body-tertiary d-block"
      style={{ marginTop: "150px" }}
    >
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4" style={{ minWidth: "500px" }}>
          <h1 style={{ textAlign: "center" }}>OTP Verification</h1>
          <hr />

          <div
            className="card bg-white mb-5 mt-5 border-0"
            style={{ boxShadow: "3px 3px 20px 20px rgba(224, 249, 157, 0.96)" }}
          >
            <div className="card-body p-5 text-center" onPaste={handlePaste}>
              <h4>Verify</h4>
              <p>Your code was sent to you via email</p>

              <div className="otp-field mb-4">
                {inputs.map((input, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="number"
                    value={input}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    maxLength="1"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <button
                className={`btn btn-primary mb-3 ${
                  isButtonDisabled ? "" : "active"
                }`}
                onClick={(e) => handleVerify(e)}
              >
                Verify
              </button>

              <h2 className="resend text-muted mb-0">
                Didn't receive code?{" "}
                <button
                  className="btn-info"
                  style={{ borderRadius: "50px", padding: "7px" }}
                  onClick={(e) => handleRequest(e)}
                >
                  <b>Request again!</b>
                </button>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpComponent;
