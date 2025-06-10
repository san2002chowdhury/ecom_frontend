/* eslint-disable no-unused-vars */
// import { memo } from "react";
import React, { memo, useEffect, useState } from "react";
import Banner from "../Components/Home_Page_Component/Banner";
import Fact from "../Components/Home_Page_Component/Fact";
import Feature from "../Components/Home_Page_Component/Feature";
import Hero from "../Components/Home_Page_Component/Hero";
import Shopview from "../Components/Home_Page_Component/Shopview";
import TopSelling from "../Components/Home_Page_Component/TopSelling";
import { useDispatch } from "react-redux";
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_TOP_CATEGORY_REQUEST,
  FETCH_TOPTEN_PRODUCTS_REQUEST,
} from "../Redux/action";
import Modal from "react-bootstrap/Modal";
const Home = memo(() => {
  const dispatch = useDispatch();
  const [catValue, setCatValue] = useState("All");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("seenWelcomeHomeModal");
    if (!seen) {
      setShow(true);
      localStorage.setItem("seenWelcomeHomeModal", "true");
    }
  }, []);
  useEffect(() => {
    dispatch({ type: FETCH_TOP_CATEGORY_REQUEST });
    dispatch({ type: FETCH_TOPTEN_PRODUCTS_REQUEST });

    dispatch({
      type: FETCH_PRODUCTS_REQUEST,
      page: 1,
      cat_id: catValue,
      filter: 1,
      search: "All",
    });
  }, [dispatch, catValue]);
  return (
    <div>
      {show && (
        <>
          <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-120w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Some Important Message
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                My project is hosted through free hosting
                <strong>(Render.com).</strong>For that it has become relatively
                slow, it can usually be{" "}
                <strong style={{ color: "red" }}>
                  {" "}
                  50 seconds or more and slow,also it casue slow API response.
                </strong>
              </p>
            </Modal.Body>
          </Modal>
        </>
      )}
      <Hero />
      <Feature />
      <Shopview catValue={catValue} setCatValue={setCatValue} />
      <Banner />
      <TopSelling />
      <Fact />
    </div>
  );
});
export default Home;
