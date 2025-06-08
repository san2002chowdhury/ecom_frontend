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
const Home = memo(() => {
  const dispatch = useDispatch();
  const [catValue, setCatValue] = useState("All");

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
