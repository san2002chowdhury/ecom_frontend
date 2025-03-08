/* eslint-disable no-unused-vars */
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import "./Account.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getUserAddDataRequest,
  getUserDetailsRequest,
} from "../../Redux/User/userAction";
import { FETCH_USER_DETAILS_REQUEST } from "../../Redux/action";

const Account = () => {
  const { id } = useSelector((state) => {
    return state.loginReducer;
  });
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    console.log("======", state.userReducer);
    return state?.userReducer?.user_details;
  });

  console.log("===data===", data);
  useEffect(() => {
    dispatch({
      type: FETCH_USER_DETAILS_REQUEST,
      user_id: id,
    });
  }, [id, dispatch]);

  const [inputForRestField, setInputForRestField] = useState({
    address: "",
    pincode: "",
    state: "",
    dob: "",
    country: "",
  });

  function handleChange(e) {
    e.preventDefault();

    console.log("inputForRestField>>>>", inputForRestField);
    setInputForRestField({
      ...inputForRestField,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("data-->", inputForRestField);
    dispatch(getUserAddDataRequest(id, inputForRestField));
  }
  const { user_details } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  return (
    <div
      style={{
        marginTop: "150px ",
        marginBottom: "150px",
        marginLeft: "150px",
        position: "relative",
        top: "50%",
      }}
    >
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                alt=""
              />
              <span className="font-weight-bold">
                {user_details?.[0]?.fname} {user_details?.[0]?.lname}
              </span>
              <span className="text-black-50">{user_details?.[0]?.email}</span>
              <button
                className="btn profile-button "
                type="button"
                style={{
                  backgroundColor: "#6610f2",
                  color: "#fff",
                  borderColor: " #6610f2",
                  marginLeft: "25px",
                  marginTop: "50px",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  const loadingToast = toast.success(
                    "logout done successfully"
                  );
                  navigate("/");
                  window.location.reload();
                  localStorage.clear();
                }}
              >
                Logout
              </button>
              <button
                className="btn profile-button "
                type="button"
                style={{
                  backgroundColor: "#6610f2",
                  color: "#fff",
                  borderColor: " #6610f2",
                  marginLeft: "25px",
                  marginTop: "10px",
                }}
              >
                Change Profile Photo
              </button>
              <span> </span>
            </div>
          </div>
          <div
            className="col-md-5 border-right"
            style={{ marginLeft: "100px" }}
          >
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">First-name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="firstname"
                    value={user_details?.[0]?.fname}
                  />
                </div>
                {user_details?.[0]?.mname ? (
                  <div className="col-md-6">
                    <label className="labels">Middle-name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={user_details?.[0]?.mname}
                      placeholder="middlename"
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="col-md-6">
                  <label className="labels">Last-name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user_details?.[0]?.lname}
                    placeholder="lastname"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Mobile Number</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="enter phone number"
                    value={user_details?.[0]?.phone}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address"
                    name="address"
                    value={
                      inputForRestField.address ||
                      user_details?.[0]?.address ||
                      ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="col-md-12">
                  <label className="labels">PIN Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter PIN Code"
                    name="pincode"
                    value={
                      inputForRestField.pincode ||
                      user_details?.[0]?.pincode ||
                      ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">State</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter state"
                    name="state"
                    value={
                      inputForRestField.state || user_details?.[0]?.state || ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="col-md-12">
                  <label className="labels">Email ID</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="enter email id"
                    value={user_details?.[0]?.email}
                  />
                </div>

                <div className="col-md-12">
                  <label className="labels">Date Of Birth</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter a date of birth"
                    name="dob"
                    value={
                      inputForRestField.dob || user_details?.[0]?.dob || ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="country"
                    name="country"
                    value={
                      inputForRestField.country ||
                      user_details?.[0]?.country ||
                      ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn profile-button"
                  type="button"
                  style={{
                    backgroundColor: "#198754",
                    color: "#fff",
                    borderColor: " #198754",
                    marginLeft: "25px",
                  }}
                  onClick={(e) => handleSubmit(e)}
                >
                  Save Profile
                </button>

                <button
                  className="btn profile-button "
                  type="button"
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    borderColor: " #dc3545",
                    marginLeft: "25px",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/resetPassword");
                  }}
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
