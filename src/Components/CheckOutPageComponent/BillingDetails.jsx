/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { validateIndianPhoneNumber } from "../../utils/validateIndianPhoneNumber";
import isValidEmail from "../../utils/validateEmail";
import { BadgeAlert, PencilLine } from "lucide-react";
import { getUserAddDataRequest } from "../../Redux/User/userAction";
import { setLoading } from "../../Redux/Loading/LoadingAction";

const BillingDetails = () => {
  const { userDetails, user_details, id } = useSelector(
    (state) => ({
      userDetails: state.userReducer?.user_details,
      user_details: state.userReducer?.user_details,
      id: state.loginReducer.id,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const [button, setButton] = useState("Edit Details");
  const [errorPrimaryPhone, setErrorPrimaryPhone] = useState(false);
  const [errorAlternatePhone, setErrorAlternatePhone] = useState(false);

  const [errorEmail, setErrorEmail] = useState(false);
  const [inputForField, setInputForField] = useState({
    user_details: user_details,
    nearestLandmark: user_details?.[0]?.nearestLandmark,
    address: user_details?.[0]?.address,
    city: user_details?.[0]?.city,
    state: user_details?.[0]?.state,
    pincode: user_details?.[0]?.pincode,
    phone: user_details?.[0]?.phone,
    alternatePhone: user_details?.[0]?.alternatePhone,
    email: user_details?.[0]?.email,
  });

  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    if (user_details.length === 0) {
      dispatch(setLoading(true));
      setTimeout(() => {
        const userdetails = JSON.parse(localStorage.getItem("userDetails"));

        setInputForField({
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
        dispatch(setLoading(false));
      }, 900);
    }
  });
  useEffect(() => {
    if (inputForField?.email) {
      setErrorEmail(isValidEmail(inputForField?.email));
    }

    if (inputForField?.phone) {
      setErrorPrimaryPhone(validateIndianPhoneNumber(inputForField?.phone));
    }

    if (inputForField?.alternatePhone) {
      setErrorAlternatePhone(
        validateIndianPhoneNumber(inputForField?.alternatePhone)
      );
    }
  }, [
    inputForField?.alternatePhone,
    inputForField?.phone,
    inputForField?.email,
  ]);
  function handleChange(e) {
    e.preventDefault();
    setButton("Save Details");
    if (e.target.name === "alternatePhone") {
      setErrorAlternatePhone(validateIndianPhoneNumber(e.target.value));
      setInputForField({
        ...inputForField,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === "phone") {
      setErrorPrimaryPhone(validateIndianPhoneNumber(e.target.value));
      setInputForField({
        ...inputForField,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === "email") {
      setErrorEmail(isValidEmail(e.target.value));
      setInputForField({
        ...inputForField,
        [e.target.name]: e.target.value,
      });
    } else {
      setInputForField({
        ...inputForField,
        [e.target.name]: e.target.value,
      });
    }
  }
  function handleClick(e) {
    e.preventDefault();
    dispatch(getUserAddDataRequest(id, inputForField));
    setButton("Edit Details");
  }
  const style = {
    padding: "2px",
    backgroundColor: "#0013 ",
    maxWidth: "50%",
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
    fontSize: "18px",
  };
  return (
    <div className="col-md-12 col-lg-6 col-xl-7">
      <div style={{ display: "flex", gap: "100px" }}>
        <h1 className="mb-4">Billing details</h1>
        {button === "Edit Details" ? (
          <button className="btn btn-primary" onClick={handleClick}>
            <PencilLine /> {button}
          </button>
        ) : (
          <button className="btn btn-info" onClick={handleClick}>
            <PencilLine /> {button}
          </button>
        )}
      </div>
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <div className="form-item w-100">
            <label className="form-label my-3" style={styleLable}>
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              value={user_details?.[0]?.fname}
              readOnly={user_details?.[0]?.fname ? true : false}
            />
          </div>
        </div>
        {user_details?.[0]?.mname ? (
          <div className="col-md-12 col-lg-6">
            <div className="form-item w-100">
              <label className="form-label my-3" style={styleLable}>
                Middle Name<sup></sup>
              </label>
              <input
                type="text"
                className="form-control"
                value={user_details?.[0]?.mname}
                readOnly={user_details?.[0]?.mname ? true : false}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="col-md-12 col-lg-6">
          <div className="form-item w-100">
            <label className="form-label my-3" style={styleLable}>
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              value={user_details?.[0]?.lname}
              readOnly={user_details?.[0]?.lname ? true : false}
            />
          </div>
        </div>
      </div>
      <div className="form-item">
        <label className="form-label my-3" style={styleLable}>
          Nearest Landmark
        </label>
        <input
          type="text"
          className="form-control"
          name="nearestLandmark"
          placeholder="Nearest Landmark"
          value={inputForField?.nearestLandmark}
          onChange={handleChange}
        />
        {!inputForField?.nearestLandmark && (
          <div style={style}>
            <p style={styleError}>
              <BadgeAlert /> Please fill all details
            </p>
          </div>
        )}
      </div>
      <div className="form-item">
        <label className="form-label my-3" style={styleLable}>
          Address
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="House Number Street Name"
          name="address"
          value={inputForField?.address}
          onChange={handleChange}
        />
        {!inputForField?.address && (
          <div style={style}>
            <p style={styleError}>
              <BadgeAlert /> Please fill all details
            </p>
          </div>
        )}
      </div>
      <div className="form-item">
        <label className="form-label my-3" style={styleLable}>
          Town/City
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="City"
          name="city"
          value={inputForField.city}
          onChange={handleChange}
        />
        {!inputForField?.city && (
          <div style={style}>
            <p style={styleError}>
              <BadgeAlert /> Please fill all details
            </p>
          </div>
        )}
      </div>
      <div className="form-item">
        <label className="form-label my-3" style={styleLable}>
          State
        </label>
        <input
          type="text"
          className="form-control"
          name="state"
          placeholder="State"
          value={inputForField?.state}
          onChange={handleChange}
        />
        {!inputForField?.state && (
          <div style={style}>
            <p style={styleError}>
              <BadgeAlert /> Please fill all details
            </p>
          </div>
        )}
      </div>
      <div className="form-item">
        <label className="form-label my-3" style={styleLable}>
          Postcode/Zip
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Pincode"
          name="pincode"
          value={inputForField?.pincode}
          onChange={handleChange}
        />
        {!inputForField?.pincode && (
          <div style={style}>
            <p style={styleError}>
              <BadgeAlert /> Please fill all details
            </p>
          </div>
        )}
      </div>
      <div className="form-item">
        <label className="form-label my-3" style={styleLable}>
          Mobile
        </label>
        <input
          type="tel"
          className="form-control"
          name="phone"
          value={inputForField?.phone}
          onChange={handleChange}
        />
        {!inputForField?.phone && (
          <div style={style}>
            <p style={styleError}>*Please fill all details</p>
          </div>
        )}
        {!errorPrimaryPhone && (
          <div style={style}>
            <p style={styleError}>
              <BadgeAlert /> Please enter a valid indian number
            </p>
          </div>
        )}
      </div>
      <div className="form-item">
        <label className="form-label my-3" style={styleLable}>
          Alternate Mobile
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Alternate Phone Number"
          name="alternatePhone"
          value={inputForField?.alternatePhone}
          onChange={handleChange}
        />
        {!inputForField?.alternatePhone && (
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
      <div className="form-item">
        <label className="form-label my-3" style={styleLable}>
          Email Address
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={inputForField?.email}
          onChange={handleChange}
        />
      </div>
      {!inputForField?.email && (
        <div style={style}>
          <p style={styleError}>
            <BadgeAlert /> Please fill all details
          </p>
        </div>
      )}
      {!errorEmail && (
        <div style={style}>
          <p style={styleError}>
            <BadgeAlert /> Please enter a valid email.
          </p>
        </div>
      )}
    </div>
  );
};
export default BillingDetails;
