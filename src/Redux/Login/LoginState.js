import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "",
  user_id: "",
  isLoading: false,
  error: null,
};
const loginSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    setUserNameFetch(state) {
      state.isLoading = true;
    },
    setUserNameSuccess(state, action) {
      state.name = action.payload;
    },
    setUserNameFailure(state, action) {
      state.error = action.payload;
    },
    setUserIDFetch(state) {
      state.isLoading = true;
    },
    setUserIDSuccess(state, action) {
      state.user_id = action.payload;
    },
    setUserIDFailure(state, action) {
      state.error = action.payload;
    },
  },
});
export const {
  setUserNameFetch,
  setUserNameSuccess,
  setUserNameFailure,
  setUserIDFetch,
  setUserIDSuccess,
  setUserIDFailure,
} = loginSlice.actions;
export default loginSlice.reducer;
