import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  active: "Home",
  category: "All",
  categoryName: "All Products",
  page: 1,
  filter: 1,
  search: "All",
  currPage: 1,
  orderPage: 1,
  payMode: "",
  filterOrder: "All Orders",
  error: null,
};
const universalSlice = createSlice({
  name: "universalCard",
  initialState,
  reducers: {
    setPayment(state, action) {
      state.payMode = action.payload;
    },
    setActive(state, action) {
      state.active =
        localStorage.getItem("active", action.payload) || action.payload;
    },
    setInActive(state) {
      localStorage.removeItem("active");
      state.active = "";
    },

    setCategory(state, action) {
      state.category = action.payload;
    },

    setPage(state, action) {
      state.page = action.payload;
    },
    setOrderPage(state, action) {
      state.orderPage = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setOrderFilter(state, action) {
      state.filterOrder = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCurrPage(state, action) {
      state.currPage = action.payload;
    },
    setDefault(state) {
      state.page = 1;
      state.category = "All";
      state.filter = 1;
      state.search = "All";
      state.currPage = 1;
    },
    setCategoryName(state, action) {
      state.categoryName = action.payload;
    },
  },
});
export const {
  setPayment,
  setActive,
  setInActive,
  setPage,
  setCategory,
  setFilter,
  setOrderFilter,
  setSearch,
  setCurrPage,
  setDefault,
  setOrderPage,
  setCategoryName,
} = universalSlice.actions;

export default universalSlice.reducer;
