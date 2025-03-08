// import { useState } from "react";
import { Link } from "react-router-dom";
import { banners } from "../../assets/asset";
// import { banners } from "../assets/asset";

const Hero = () => {
  // const [search, setSearch] = useState("");
  // let data = "";
  // function handleInput(e) {
  //   e.preventDefault();
  //   setSearch(e.target.value);
  // }
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   data = search;
  //   setSearch("");
  //   console.log("Entered Data--->", data);
  // }

  return (
    <div className="container-fluid py-5 mb-5 hero-header">
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          <div className="col-md-12 col-lg-7">
            <h4 className="mb-3 text-secondary">100% Premium Quality</h4>
            <h1 className="mb-5 display-3 text-primary">
              Authentic Products,Groceries And Veggies
            </h1>
            <div className="position-relative mx-auto">
              {/* <input
                className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => handleInput(e)}
              /> */}
              {/* <button
                type="submit"
                className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
                style={{ top: "0", right: "25%" }}
                onClick={handleSubmit}
              >
                Submit Now
              </button> */}
            </div>
          </div>
          <div className="col-md-12 col-lg-5">
            <div
              id="carouselId"
              className="carousel slide position-relative"
              data-bs-ride="carousel"
              style={{ display: "flex" }}
            >
              <div className="carousel-inner" role="listbox">
                {banners.map((banner, index) =>
                  index === 0 ? (
                    <div
                      className="carousel-item active rounded"
                      key={banner.key}
                    >
                      <img
                        src={banner.src}
                        className="img-fluid w-100 h-100 bg-secondary rounded flex"
                        alt="First slide"
                      />
                      <Link
                        to="/"
                        className="btn px-4 py-2 text-white rounded"
                        onClick={() => console.log(banner.category)}
                      >
                        {banner.category}
                      </Link>
                    </div>
                  ) : (
                    <div className="carousel-item rounded" key={banner.key}>
                      <img
                        src={banner.src}
                        className="img-fluid w-100 h-100 bg-secondary rounded flex"
                        alt="First slide"
                      />
                      <Link
                        to="/shop"
                        className="btn px-4 py-2 text-white rounded"
                        onClick={() => console.log(banner.category)}
                      >
                        {banner.category}
                      </Link>
                    </div>
                  )
                )}
                <div className="carousel-item rounded">
                  <img
                    src={banners[1].src}
                    className="img-fluid w-100 h-100 rounded"
                    alt="Second slide"
                  />
                  <Link href="/" className="btn px-4 py-2 text-white rounded">
                    {banners[1].category}
                  </Link>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselId"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselId"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
