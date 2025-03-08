/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productTitle: "",
  isLoading: false,
  error: null,
};
const productSlice = createSlice({
  name: "productCard",
  initialState,
  reducers: {
    setProductTitleFetch(state) {
      state.isLoading = true;
    },
    setProductTitle(state, action) {
      state.productTitle = action.payload;
      console.log("log-------------------->TITLE---->", state.productTitle);
    },
    setProductTitleFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setProductTitleFetch, setProductTitle, setProductTitleFailure } =
  productSlice.actions;
export default productSlice.reducer;
