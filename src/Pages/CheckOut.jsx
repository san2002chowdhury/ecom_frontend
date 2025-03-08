import { useDispatch, useSelector } from "react-redux";
import BillingDetails from "../Components/CheckOutPageComponent.jsx/BillingDetails";
import CheckOutPageHeader from "../Components/CheckOutPageComponent.jsx/CheckOutPageHeader";
import OrderDetails from "../Components/CheckOutPageComponent.jsx/OrderDetails";
import PaymentMehtod from "../Components/CheckOutPageComponent.jsx/PaymentMehtod";
import { useEffect } from "react";
import { FETCH_USER_DETAILS_REQUEST } from "../Redux/action";
import { PencilLine } from "lucide-react";
// import { burger } from "@lucide/lab";
const Checkout = () => {
  const { id } = useSelector((state) => {
    return state.loginReducer;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: FETCH_USER_DETAILS_REQUEST,
      user_id: id,
    });
  }, [id, dispatch]);
  return (
    <div>
      <CheckOutPageHeader />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div style={{ display: "flex", gap: "100px" }}>
            <h1 className="mb-4">Billing details</h1>
            <button className="btn btn-primary">
              {/* <Icon iconNode={burger} /> */}
              <PencilLine /> Edit Details
            </button>
          </div>
          <form>
            <div className="row g-5">
              <BillingDetails />
              <div className="col-md-12 col-lg-6 col-xl-5">
                <OrderDetails />
              </div>
              <PaymentMehtod />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
