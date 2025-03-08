/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";

import { BASE_URL } from "../../Redux/api";

import toast from "react-hot-toast";
/* eslint-disable jsx-a11y/iframe-has-title */
const ContactDetails = () => {
  const [inputForGetInTouch, setInputForGetInTouch] = useState({
    name: "",
    email: "",
    message: "",
  });
  function handleChange(e) {
    e.preventDefault();
    setInputForGetInTouch({
      ...inputForGetInTouch,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      inputForGetInTouch.name &&
      inputForGetInTouch.email &&
      inputForGetInTouch.message
    ) {
      const payload = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputForGetInTouch),
      };

      const promise = fetch(`${BASE_URL}/contact/getContact`, payload)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            toast.success(data.message || "Successfully submitted!");
          } else {
            toast.error(data.message || "Something went wrong!");
          }
        })
        .catch((err) => {
          toast.error("Network error or something went wrong!");
        });

      toast.promise(promise, {
        loading: "Please wait....",
        success: "Successfully submitted your message!",
        error: "Something went wrong!",
      });
      setInputForGetInTouch({
        name: "",
        email: "",
        message: "",
      });
    } else {
      toast.error("Please fill all details!");
    }
  }

  return (
    <div className="container-fluid contact py-5">
      <div className="container py-5">
        <div
          className="p-5 rounded"
          style={{
            background:
              "linear-gradient(90deg, rgba(120,112,255,1) 0%, rgba(132,219,255,1) 50%, rgba(93,255,177,1) 100%)",
          }}
        >
          <div className="row g-4">
            <div className="col-12">
              <div
                className="text-center mx-auto"
                style={{ maxWidth: "700px" }}
              >
                <h1
                  className="text"
                  style={{ fontWeight: "900", color: "#fff" }}
                >
                  Get in touch
                </h1>
                <p
                  className="mb-4"
                  style={{ color: "#fff", fontWeight: "800" }}
                >
                  Visitors who land on Unbounce's Contact Us page don't have to
                  sift through loads of information to find what they need. By
                  choosing from just four options, they're likely to find the
                  team they need to get in touch with quickly. Now that you have
                  ideas for a catchy header, use these examples to design the
                  rest of your Contact Us page.
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="h-100 rounded">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7361.722468735237!2d88.47223444999999!3d22.6962091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89f50823409b9%3A0xaed8915ab26f42f3!2sVivekananda%20Nagar%2C%20Madhyamgram%2C%20Kolkata%2C%20West%20Bengal%20700129!5e0!3m2!1sen!2sin!4v1736940867344!5m2!1sen!2sin"
                  className="rounded w-100"
                  style={{ height: "400px" }}
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className="col-lg-7">
              <form>
                <input
                  type="text"
                  name="name"
                  className="w-100 form-control border-0 py-3 mb-4"
                  placeholder="Your Name"
                  onChange={(e) => handleChange(e)}
                  value={inputForGetInTouch.name}
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="w-100 form-control border-0 py-3 mb-4"
                  placeholder="Enter Your Email"
                  onChange={(e) => handleChange(e)}
                  value={inputForGetInTouch.email}
                  required
                />
                <textarea
                  className="w-100 form-control border-0 mb-4"
                  rows="5"
                  cols="10"
                  name="message"
                  placeholder="Your Message"
                  onChange={(e) => handleChange(e)}
                  value={inputForGetInTouch.message}
                  required
                ></textarea>

                <button
                  className="w-100 btn form-control border-secondary py-3  text "
                  type="submit"
                  style={{
                    backgroundColor: "rgba(99, 219, 0, 0.95)",
                    color: "#fff",
                    fontWeight: "bolder",
                  }}
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="col-lg-5">
              <div className="d-flex p-4 rounded mb-4 bg-white">
                <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                <div>
                  <h4>Address</h4>
                  <p className="mb-2">
                    Vivekananda Nagar,Madhyamgram,West Bengal
                  </p>
                </div>
              </div>
              <div className="d-flex p-4 rounded mb-4 bg-white">
                <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                <div>
                  <h4>Mail Us</h4>
                  <p className="mb-2">chowdhurystore2025@gmail.com</p>
                </div>
              </div>
              <div className="d-flex p-4 rounded bg-white">
                <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                <div>
                  <h4>Telephone</h4>
                  <p className="mb-2">(+91) 9038417823</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactDetails;
