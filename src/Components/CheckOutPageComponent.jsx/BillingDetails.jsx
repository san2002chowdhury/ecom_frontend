import { useState } from "react";
import { useSelector } from "react-redux";

const BillingDetails = () => {
  const { user_details } = useSelector((state) => state.userReducer);
  const [inputForField, setInputForField] = useState({
    Nearest_Landmark: "",
    Address: "",
    City: "",
    State: "",
    Postcode: "",
    Mobile: "",
    Alternate_Mobile: "",
    Email: "",
  });
  function handleChange(e) {
    e.preventDefault();

    console.log("inputForRestField>>>>", inputForField);
    setInputForField({
      ...inputForField,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <div className="col-md-12 col-lg-6 col-xl-7">
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <div className="form-item w-100">
            <label className="form-label my-3">
              First Name<sup>*</sup>
            </label>
            <input
              type="text"
              className="form-control"
              value={user_details?.[0].fname}
              readOnly={user_details?.[0]?.fname ? true : false}
            />
          </div>
        </div>
        {user_details?.[0]?.mname ? (
          <div className="col-md-12 col-lg-6">
            <div className="form-item w-100">
              <label className="form-label my-3">
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
            <label className="form-label my-3">
              Last Name<sup>*</sup>
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
        <label className="form-label my-3">
          Nearest Landmark<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="Nearest_Landmark"
          onChange={handleChange}
          value={inputForField.Nearest_Landmark}
          readOnly={inputForField.Nearest_Landmark ? true : false}
        />
      </div>
      <div className="form-item">
        <label className="form-label my-3">
          Address <sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="House Number Street Name"
          value={user_details?.[0].address}
          readOnly={user_details?.[0].address ? true : false}
        />
      </div>
      <div className="form-item">
        <label className="form-label my-3">
          Town/City<sup>*</sup>
        </label>
        <input type="text" className="form-control" />
      </div>
      <div className="form-item">
        <label className="form-label my-3">
          State<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          value={user_details?.[0].state}
          readOnly={user_details?.[0].state ? true : false}
        />
      </div>
      <div className="form-item">
        <label className="form-label my-3">
          Postcode/Zip<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          value={user_details?.[0].pincode}
          readOnly={user_details?.[0].pincode ? true : false}
        />
      </div>
      <div className="form-item">
        <label className="form-label my-3">
          Mobile<sup>*</sup>
        </label>
        <input
          type="tel"
          className="form-control"
          value={user_details?.[0].phone}
          readOnly={user_details?.[0].phone ? true : false}
        />
      </div>
      <div className="form-item">
        <label className="form-label my-3">
          Alternate Mobile<sup>*</sup>
        </label>
        <input type="tel" className="form-control" />
      </div>
      <div className="form-item">
        <label className="form-label my-3">
          Email Address<sup>*</sup>
        </label>
        <input
          type="email"
          className="form-control"
          value={user_details?.[0].email}
          readOnly={user_details?.[0].email ? true : false}
        />
      </div>
    </div>
  );
};
export default BillingDetails;
