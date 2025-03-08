import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  active: "Home",
  category: "All",
  page: 1,
  filter: 1,
  search: "All",
  currPage: 1,
  showSignin: false,
  isLoading: false,
  error: null,
};
const universalSlice = createSlice({
  name: "universalCard",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },

    setShowSignin(state, action) {
      state.showSignin = action.payload;
    },
    setActive(state, action) {
      console.log("AC->", action.payload);
      state.active =
        localStorage.getItem("active", action.payload) || action.payload;
    },
    setInActive(state) {
      localStorage.removeItem("active");
      state.active = "";
    },

    setCategory(state, action) {
      // alert(action.payload);
      state.category = action.payload;
    },

    setPage(state, action) {
      console.log("PAGE-->SETPAGE-->", action.payload);

      state.page = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
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
  },
});
export const {
  setShowSignin,
  setActive,
  setInActive,
  setPage,
  setCategory,
  setNavbar,
  setFilter,
  setSearch,
  setCurrPage,
  setDefault,
} = universalSlice.actions;

export default universalSlice.reducer;
