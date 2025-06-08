import { Link } from "react-router-dom";
import { assets } from "../../assets/asset";
import { useState } from "react";
import toast from "react-hot-toast";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Footer = () => {
  const [inputEmail, setInputEmail] = useState("");
  function handleInputChange(e) {
    e.preventDefault();
    setInputEmail(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (inputEmail) {
      const payload = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputEmail }),
      };

      const promise = fetch(`${BASE_URL}/contact/subscribe`, payload)
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
        success: "Successfully submitted your response!",
        error: "Something went wrong!",
      });
      setInputEmail("");
    } else {
      toast.error("Please fill all details!");
    }
  }

  return (
    <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
      <div className="container py-5">
        <div
          className="pb-4 mb-4"
          style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}
        >
          <div className="row g-4">
            <div className="col-lg-3">
              <Link to="/">
                <img
                  className="display-6"
                  src={assets.logo}
                  alt=""
                  width={"250px"}
                  style={{ borderRadius: "50px" }}
                />

                <p
                  className="text-secondary mb-0"
                  style={{
                    fontStyle: "italic",
                    fontWeight: 900,
                    marginTop: "12px",
                  }}
                >
                  Authentic-Branded-Trendy Products
                </p>
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="position-relative mx-auto">
                <input
                  className="form-control border-0 w-100 py-3 px-4 rounded-pill"
                  type="text"
                  placeholder="Your Email"
                  value={inputEmail}
                  onChange={handleInputChange}
                />

                <button
                  type="submit"
                  className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white"
                  style={{ top: "0", right: "0" }}
                  onClick={(e) => handleSubmit(e)}
                >
                  Subscribe Now
                </button>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="d-flex justify-content-end pt-3">
                <Link
                  className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                  href=""
                >
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link
                  className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                  href=""
                >
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link
                  className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                  href=""
                >
                  <i className="fab fa-youtube"></i>
                </Link>
                <Link
                  className="btn btn-outline-secondary btn-md-square rounded-circle"
                  href=""
                >
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <div className="footer-item">
              <h4 className="text-light mb-3">Why People Like us!</h4>
              <p className="mb-4">
                Typesetting remaining essentially unchanged. It was popularised
                in the 1960s with the like Aldus PageMaker including of Lorem
                Ipsum.
              </p>
              <Link
                to="/"
                className="btn border-secondary py-2 px-4 rounded-pill text-primary"
              >
                Read More
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="d-flex flex-column text-start footer-item">
              <h4 className="text-light mb-3">Shop Info</h4>
              <Link className="btn-link" to="/contact">
                About Us
              </Link>
              <Link className="btn-link" to="/contact">
                Contact Us
              </Link>
              <Link className="btn-link" to="/">
                Privacy & Return Policy
              </Link>
              <Link className="btn-link" to="/">
                Terms & Condition
              </Link>
              <Link className="btn-link" to="/">
                FAQs & Help
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="d-flex flex-column text-start footer-item">
              <h4 className="text-light mb-3">Account</h4>
              <Link className="btn-link" to="/account">
                My Account
              </Link>
              <Link className="btn-link" to="/shop">
                Shop details
              </Link>
              <Link className="btn-link" to="/cart">
                Shopping Cart
              </Link>
              <Link className="btn-link" to="/wishlist">
                Wishlist
              </Link>
              <Link className="btn-link" to="/myorder">
                Order History
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-item">
              <h4 className="text-light mb-3">Contact</h4>
              <p>
                Address: Vivekananda Nagar,Madhyamgram,West Bengal,Kol:-700129
              </p>
              <p>Email:chowdhurystore2025@gmail.com</p>
              <p>Phone: +(91) 9038417823</p>
              <p>Payment Accepted</p>
              <img src="img/payment.png" className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
