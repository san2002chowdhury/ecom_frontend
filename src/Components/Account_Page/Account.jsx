/* eslint-disable react-hooks/exhaustive-deps */
import toast from "react-hot-toast";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "./Account.css";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getUploadProfilePhotoRequest,
  getUserAddDataRequest,
} from "../../Redux/User/userAction";
import { validateIndianPhoneNumber } from "../../utils/validateIndianPhoneNumber";
import { setLoading } from "../../Redux/Loading/LoadingAction";
import { BadgeAlert } from "lucide-react";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const { id, user_details, userDetails } = useSelector(
    (state) => ({
      id: state.loginReducer.id,
      user_details: state.userReducer?.user_details,
      userDetails: state.userReducer?.user_details,
    }),
    shallowEqual
  );
  const [errorPrimaryPhone, setErrorPrimaryPhone] = useState(false);
  const [errorAlternatePhone, setErrorAlternatePhone] = useState(false);

  const [startDate, setStartDate] = useState(user_details?.[0]?.dob);
  const [photo, setPhoto] = useState(0);
  const [selectedFile, setSelectedFile] = useState(
    user_details?.[0]?.profile_photo || ""
  );
  const [inputForRestField, setInputForRestField] = useState({
    id: id,
    user_details: user_details,
    fname: user_details?.[0]?.fname,
    mname: user_details?.[0]?.mname,
    lname: user_details?.[0]?.lname,
    phone: user_details?.[0]?.phone,
    email: user_details?.[0]?.email,
    alternatePhone: user_details?.[0]?.alternatePhone,
    city: user_details?.[0]?.city,
    nearestLandmark: user_details?.[0]?.nearestLandmark,
    address: user_details?.[0]?.address,
    pincode: user_details?.[0]?.pincode,
    state: user_details?.[0]?.state,
    dob: user_details?.[0]?.dob,
    country: user_details?.[0]?.country,
  });
  const [previewUrl, setPreviewUrl] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );
  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    if (user_details.length === 0) {
      dispatch(setLoading(true));
      setTimeout(() => {
        const userdetails = JSON.parse(localStorage.getItem("userDetails"));
        setInputForRestField({
          user_details: userdetails,
          fname: userdetails?.[0]?.fname,
          mname: userdetails?.[0]?.mname,
          lname: userdetails?.[0]?.lname,
          phone: userdetails?.[0]?.phone,
          email: userdetails?.[0]?.email,
          alternatePhone: userdetails?.[0]?.alternatePhone,
          city: userdetails?.[0]?.city,
          nearestLandmark: userdetails?.[0]?.nearestLandmark,
          address: userdetails?.[0]?.address,
          pincode: userdetails?.[0]?.pincode,
          state: userdetails?.[0]?.state,
          dob: userdetails?.[0]?.dob,
          country: userdetails?.[0]?.country,
        });
        setStartDate(userdetails?.[0]?.dob);
        dispatch(setLoading(false));
      }, 900);
    }
  });
  useEffect(() => {
    if (inputForRestField?.phone) {
      setErrorPrimaryPhone(validateIndianPhoneNumber(inputForRestField?.phone));
    }
    if (inputForRestField?.alternatePhone) {
      setErrorAlternatePhone(
        validateIndianPhoneNumber(inputForRestField?.alternatePhone)
      );
    }
  }, [inputForRestField?.alternatePhone]);
  function handleChange(e) {
    e.preventDefault();
    if (e.target.name === "alternatePhone") {
      setErrorAlternatePhone(validateIndianPhoneNumber(e.target.value));
      setInputForRestField({
        ...inputForRestField,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.name === "phone") {
      setErrorPrimaryPhone(validateIndianPhoneNumber(e.target.value));
      setInputForRestField({
        ...inputForRestField,
        [e.target.name]: e.target.value,
      });
    } else {
      setInputForRestField({
        ...inputForRestField,
        [e.target.name]: e.target.value,
      });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getUserAddDataRequest(id, inputForRestField));
  }
  function handleFileChange(e) {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.match("image.*")) {
        toast.error("Please select an image file (JPEG, PNG)");
        return;
      } else if (file.size > 3 * 1024 * 1024) {
        toast.error("Image should be less than 3MB");
        return;
      } else {
        setSelectedFile(file);
        setPhoto(1);

        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target.result);
        };
        reader.readAsDataURL(file);

        toast.success(
          "Image selected. Click on 'Save Profile Photo' button to save."
        );
      }
    }
  }

  function handleUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile_photo", selectedFile);
    formData.append("id", id);
    dispatch(getUploadProfilePhotoRequest(formData));
  }
  const style = {
    padding: "2px",
    backgroundColor: "#0011",
    maxWidth: "70%",
    borderRadius: "50px",
    marginTop: "5px",
    height: "30px",
  };
  const styleError = {
    color: "red",
    fontWeight: "bold",
    fontStyle: "italic",
  };
  const styleLable = {
    fontWeight: "bolder",
    color: "black",
    fontSize: "14px",
  };

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
              <form
                onClick={() => {
                  if (fileInputRef.current) fileInputRef.current.click();
                }}
                className="profile-image-container"
                style={{ cursor: "pointer" }}
                encType="multipart/form-data"
              >
                {photo !== 1 && selectedFile ? (
                  <img
                    src={
                      `${BASE_URL}/images/` + user_details?.[0]?.profile_photo
                    }
                    alt=""
                    loading="lazy"
                    className="rounded-circle mt-5 image"
                    style={{ marginBottom: "30px" }}
                  />
                ) : (
                  <img
                    src={previewUrl}
                    alt=""
                    className="rounded-circle mt-5 image"
                    style={{ marginBottom: "30px" }}
                  />
                )}
                <div className="uploadIcon">+</div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  maxWidth="150px"
                  onChange={(e) => handleFileChange(e)}
                />
              </form>
              <span className="font-weight-bold">
                {user_details?.[0]?.fname} {userDetails?.[0]?.mname}{" "}
                {user_details?.[0]?.lname}{" "}
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
                  marginTop: "30px",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  toast.success("logout done successfully");
                  navigate("/");
                  window.location.reload();
                  localStorage.clear();
                }}
              >
                Logout
              </button>

              {photo ? (
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
                  onClick={handleUpload}
                >
                  Save Profile Photo
                </button>
              ) : (
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
                  onClick={() => {
                    if (fileInputRef.current) fileInputRef.current.click();
                  }}
                >
                  Change Profile Photo
                </button>
              )}
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
                  <label className="labels" style={styleLable}>
                    First-name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="firstname"
                    name="fname"
                    value={inputForRestField?.fname}
                    onChange={handleChange}
                  />
                </div>
                {user_details?.[0]?.mname ? (
                  <div className="col-md-6">
                    <label className="labels" style={styleLable}>
                      Middle-name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="mname"
                      placeholder="middlename"
                      value={inputForRestField?.mname}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="col-md-6">
                  <label className="labels" style={styleLable}>
                    Last-name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="lname"
                    placeholder="lastname"
                    value={inputForRestField && inputForRestField?.lname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels" style={styleLable}>
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    name="phone"
                    value={inputForRestField?.phone}
                    onChange={handleChange}
                  />
                  {!inputForRestField?.phone && (
                    <div style={style}>
                      <BadgeAlert /> Please fill all details
                    </div>
                  )}
                  {!errorPrimaryPhone && (
                    <div style={style}>
                      <BadgeAlert /> Please enter a valid indian number
                    </div>
                  )}
                </div>
                <div className="col-md-12">
                  <label className="labels" style={styleLable}>
                    Alternate Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter alternate phone number"
                    name="alternatePhone"
                    value={inputForRestField?.alternatePhone}
                    onChange={handleChange}
                  />

                  {!inputForRestField?.alternatePhone && (
                    <div style={style}>
                      <p style={styleError}>
                        <BadgeAlert /> Please fill all details
                      </p>
                    </div>
                  )}
                  {!errorAlternatePhone && (
                    <div style={style}>
                      <p style={styleError}>
                        <BadgeAlert /> Please enter a valid indian number
                      </p>
                    </div>
                  )}
                </div>

                <div className="col-md-12">
                  <label className="labels" style={styleLable}>
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address"
                    name="address"
                    value={inputForRestField?.address}
                    onChange={handleChange}
                  />
                  {!inputForRestField?.address && (
                    <div style={style}>
                      <p style={styleError}>
                        <BadgeAlert /> Please fill all details
                      </p>
                    </div>
                  )}
                </div>

                <div className="col-md-12">
                  <label className="labels" style={styleLable}>
                    Nearest Landmark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter nearest-landmark"
                    name="nearestLandmark"
                    value={inputForRestField?.nearestLandmark}
                    onChange={handleChange}
                  />
                  {!inputForRestField?.nearestLandmark && (
                    <div style={style}>
                      <p style={styleError}>
                        <BadgeAlert /> Please fill all details
                      </p>
                    </div>
                  )}
                </div>

                <div className="col-md-12">
                  <label className="labels" style={styleLable}>
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter city"
                    name="city"
                    value={inputForRestField?.city}
                    onChange={handleChange}
                  />
                  {!inputForRestField?.city && (
                    <div style={style}>
                      <p style={styleError}>
                        <BadgeAlert /> Please fill all details
                      </p>
                    </div>
                  )}
                </div>

                <div className="col-md-12">
                  <label className="labels" style={styleLable}>
                    PIN Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter PIN Code"
                    name="pincode"
                    value={inputForRestField?.pincode}
                    onChange={handleChange}
                  />
                  {!inputForRestField?.pincode && (
                    <div style={style}>
                      <p style={styleError}>
                        <BadgeAlert /> Please fill all details
                      </p>
                    </div>
                  )}
                </div>
                <div className="col-md-12">
                  <label className="labels" style={styleLable}>
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter state"
                    name="state"
                    value={inputForRestField?.state}
                    onChange={handleChange}
                  />
                  {!inputForRestField?.state && (
                    <div style={style}>
                      <p style={styleError}>
                        <BadgeAlert /> Please fill all details
                      </p>
                    </div>
                  )}
                </div>

                <div className="col-md-12">
                  <label className="labels" style={styleLable}>
                    Email ID
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="enter email id"
                    name="email"
                    value={inputForRestField?.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-12">
                  <label className="labels" style={styleLable}>
                    Date Of Birth
                  </label>
                  <br />
                  <DatePicker
                    className="form-control"
                    placeholder="enter a date of birth"
                    name="dob"
                    selected={startDate}
                    onChange={(date) => {
                      let formateddate = moment(date).format("MM-DD-YYYY");
                      setInputForRestField({
                        ...inputForRestField,
                        dob: formateddate,
                      });
                      return setStartDate(formateddate);
                    }}
                  />
                </div>
                {!inputForRestField?.dob && (
                  <div style={style}>
                    <p style={styleError}>
                      <BadgeAlert /> Please fill all details
                    </p>
                  </div>
                )}
              </div>
              {/* <div className="row mt-3"> */}
              <div className="col-md-12">
                <label className="labels" style={styleLable}>
                  Country
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  name="country"
                  value={inputForRestField?.country}
                  onChange={handleChange}
                />
                {!inputForRestField?.country && (
                  <div style={style}>
                    <p style={styleError}>
                      <BadgeAlert /> Please fill all details
                    </p>
                  </div>
                )}
              </div>
              {/* </div> */}
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
                  onClick={handleSubmit}
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
