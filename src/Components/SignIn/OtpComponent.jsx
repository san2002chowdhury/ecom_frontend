/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import "./VerifyOTP.css"; // Assuming CSS code is in VerifyOTP.css
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import { BASE_URL } from "../../Redux/api";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../Redux/Loading/LoadingAction";

const OtpComponent = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(Array(6).fill("")); // State to store OTP input values
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Track if the button should be disabled
  const inputRefs = useRef([]); // Ref to store the input elements

  // Focus the first input field on load
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Handle input change for OTP fields
  const handleInputChange = (e, index) => {
    e.preventDefault();
    const value = e.target.value;

    if (value.length > 1) return; // Prevent entering more than one digit

    const newInputs = [...inputs];
    newInputs[index] = value;

    if (value !== "" && index < inputs.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    setInputs(newInputs);
    checkButtonStatus(newInputs);
  };

  // Handle paste event for OTP
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

  // Handle backspace logic
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && inputs[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event for OTP

  // Check if the button should be enabled or disabled
  const checkButtonStatus = (inputs) => {
    const isValid = !inputs.includes("");
    setIsButtonDisabled(!isValid); // Enable button if all fields are filled
  };

  // Handle OTP verification
  // const handleVerify = (e) => {
  //   e.preventDefault();
  //   const handleFetch = async () => {
  //     const response = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ otp: inputs.join("") }),
  //     };
  //     await fetch(`${BASE_URL}/user/verify_otp`, response)
  //       .then((data) => {
  //         return data.json();
  //       })
  //       .then((data) => {
  //         console.log("data----->", data);
  //         setLoading(false);
  //         toast.success(data.message);
  //         localStorage.setItem("id", data.id);
  //         if (data.success) {
  //           navigate("/set_new_password");
  //         }
  //       });
  //   };
  //   handleFetch();
  // };

  const handleVerify = (e) => {
    e.preventDefault();

    const handleFetch = async () => {
      const response = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: inputs.join("") }),
      };

      // Wrap the fetch request with toast.promise
      toast.promise(
        fetch(`${BASE_URL}/user/verify_otp`, response).then((data) => {
          return data.json();
        }),
        {
          loading: "Verifying OTP...",
          success: (data) => {
            console.log("data----->", data);
            localStorage.setItem("id", data.id);

            if (data.success) {
              navigate("/set_new_password");
              return data.message; // Success message
            } else {
              throw new Error(data.message); // Trigger error toast if OTP is incorrect
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
                    ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
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
