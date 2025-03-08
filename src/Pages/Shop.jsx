/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import Categories from "../Components/Shop_Page_Component/Categories";
import FeaturedProduct from "../Components/Shop_Page_Component/FeaturedProduct";
import Pagination from "../Components/Shop_Page_Component/Pagination";
import Products from "../Components/Shop_Page_Component/Products";
import ShopPageHeader from "../Components/Shop_Page_Component/ShopPageHeader";
import { useEffect } from "react";
import {
  FETCH_ALL_CATEGORY_REQUEST,
  FETCH_PRODUCTS_REQUEST,
  FETCH_TOPTEN_PRODUCTS_REQUEST,
} from "../Redux/action";

const Shop = () => {
  const { category } = useSelector((state) => state.universalReducer);

  const { page } = useSelector((state) => state.universalReducer);
  const { filter } = useSelector((state) => state.universalReducer);
  const { search } = useSelector((state) => state.universalReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_ALL_CATEGORY_REQUEST });
    dispatch({ type: FETCH_TOPTEN_PRODUCTS_REQUEST });
    dispatch({
      type: FETCH_PRODUCTS_REQUEST,
      page: page,
      cat_id: category,
      filter: filter,
      search: search,
    });
  }, [dispatch, page, category, filter, search]);
  return (
    <div className="container-fluid fruite py-5">
      <ShopPageHeader />

      <div className="row g-4">
        <div className="col-lg-3">
          <Categories />
          <FeaturedProduct />
        </div>
        <div className="col-lg-9">
          <Products />
        </div>
      </div>
      <Pagination style={{ marginTop: "0px" }} />
    </div>
  );
};
export default Shop;
