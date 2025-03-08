import { SET_LOADING } from "../action";

export const setLoading = (isLoading) => {
  return { type: SET_LOADING, isLoading: isLoading };
};
