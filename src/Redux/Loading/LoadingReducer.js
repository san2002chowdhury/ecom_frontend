import { SET_LOADING } from "../action";

const initialState = {
  isLoading: false,
};
const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      console.log("ACTION-->Load->", action);

      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return { ...state };
  }
};
export default loadingReducer;
