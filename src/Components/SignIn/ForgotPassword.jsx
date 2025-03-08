import { useState } from "react";
import { BASE_URL } from "../../Redux/api";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { setLoading } from "../../Redux/Loading/LoadingAction";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
  });
  function handleChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  // function handleCheck() {
  //   // setLoading(true);
  //   const handleFetch = async () => {
  //     const response = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email: input.email }),
  //     };
  //     await fetch(`${BASE_URL}/user/verify_email`, response)
  //       .then((data) => {
  //         return data.json();
  //       })
  //       .then((data) => {
  //         console.log("data----->FORGOT PASSWORD", data);
  //         // setLoading(false);
  //         toast.success(data.message);

  //         if (data.otp) {
  //           navigate("/otp_verification");
  //           localStorage.setItem("id", data.id);
  //         } else {
  //           toast.error(data.message);
  //         }
  //       });
  //   };
  //   handleFetch();
  // }

  function handleCheck() {
    // setLoading(true);

    const handleFetch = async () => {
      const response = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: input.email }),
      };

      // Wrap the fetch request with toast.promise
      toast.promise(
        fetch(`${BASE_URL}/user/verify_email`, response).then((data) => {
          return data.json();
        }),
        {
          loading: "Verifying email...",
          success: (data) => {
            console.log("data----->FORGOT PASSWORD", data);
            // setLoading(false);
            if (data.otp) {
              navigate("/otp_verification");
              localStorage.setItem("id", data.id);
              return data.message; // Success message
            } else {
              throw new Error(data.message); // Trigger error toast
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
