// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { banners } from "../../assets/asset";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../Redux/Products/ProductAction";
import {
  setActive,
  setCategory,
  setCategoryName,
  setCurrPage,
  setPage,
} from "../../Redux/UniversalStore/UnivarSalState";

const Hero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="container-fluid py-5 mb-5 hero-header">
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          <div className="col-md-12 col-lg-7">
            <h4 className="mb-3 text-secondary">100% Premium Quality</h4>
            <h1
              className="mb-5 display-4 text-primary"
              style={{ fontStyle: "italic" }}
            >
              Authentic Good Quality Products,Groceries,Veggies And Many More...
            </h1>
            <div className="position-relative mx-auto"></div>
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
                      key={banner.alt}
                    >
                      <img
                        src={banner.src}
                        className="img-fluid w-100 h-100 bg-secondary rounded flex"
                        alt="First slide"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          dispatch(setCategory(banner.id));
                          dispatch(setPage(1));
                          dispatch(setCurrPage(1));
                          setCategory(banner.category.split(" ").join("-"));
                          dispatch(getAllProducts(1, banner.id, 1, "All"));
                          dispatch(setCategoryName(banner.category));
                          dispatch(setActive("Shop"));

                          navigate(
                            `/shop/${banner.category
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`
                          );
                        }}
                      />
                      <Link
                        className="btn px-4 py-2 text-white rounded"
                        to={`/shop/${banner.category
                          .split(" ")
                          .join("-")
                          .toLowerCase()}`}
                        onClick={() => {
                          dispatch(setCategory(banner.id));
                          dispatch(setPage(1));
                          dispatch(setCurrPage(1));
                          setCategory(banner.category.split(" ").join("-"));
                          dispatch(getAllProducts(1, banner.id, 1, "All"));
                          dispatch(setCategoryName(banner.category));
                          dispatch(setActive("Shop"));
                        }}
                      >
                        {banner.category}
                      </Link>
                    </div>
                  ) : (
                    <div className="carousel-item rounded" key={banner.alt}>
                      <img
                        src={banner.src}
                        className="img-fluid w-100 h-100 bg-secondary rounded flex"
                        alt="First slide"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          dispatch(setCategory(banner.id));
                          dispatch(setPage(1));
                          dispatch(setCurrPage(1));
                          setCategory(banner.category.split(" ").join("-"));
                          dispatch(getAllProducts(1, banner.id, 1, "All"));
                          dispatch(setCategoryName(banner.category));
                          dispatch(setActive("Shop"));

                          navigate(
                            `/shop/${banner.category
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`
                          );
                        }}
                      />
                      <Link
                        className="btn px-4 py-2 text-white rounded"
                        to={`/shop/${banner.category
                          .split(" ")
                          .join("-")
                          .toLowerCase()}`}
                        onClick={() => {
                          dispatch(setCategory(banner.id));
                          dispatch(setPage(1));
                          dispatch(setCurrPage(1));
                          setCategory(banner.category.split(" ").join("-"));
                          dispatch(getAllProducts(1, banner.id, 1, "All"));
                          dispatch(setCategoryName(banner.category));
                          dispatch(setActive("Shop"));
                        }}
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
