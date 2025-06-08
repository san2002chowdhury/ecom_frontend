/* eslint-disable react-hooks/exhaustive-deps */
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Account from "../Components/Account_Page/Account";
import { useEffect } from "react";
import { FETCH_USER_DETAILS_REQUEST } from "../Redux/action";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { id } = useSelector(
    (state) => ({ id: state.loginReducer.id }),
    shallowEqual
  );
  useEffect(() => {
    if (id) dispatch({ type: FETCH_USER_DETAILS_REQUEST, user_id: id });
  }, [dispatch, id]);
  return (
    <>
      <Account />
    </>
  );
};
export default UserDetails;
