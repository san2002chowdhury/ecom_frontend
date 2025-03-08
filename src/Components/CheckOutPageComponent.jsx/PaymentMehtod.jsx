const PaymentMehtod = () => {
  return (
    <div>
      <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
        <div className="col-12">
          <div className="form-check text-start my-3">
            <input
              type="checkbox"
              className="form-check-input bg-primary border-0"
              id="Payments-1"
              name="Payments"
              value="Payments"
            />
            <label className="form-check-label" for="Payments-1">
              Online Payment
            </label>
          </div>
        </div>
      </div>
      <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
        <div className="col-12">
          <div className="form-check text-start my-3">
            <input
              type="checkbox"
              className="form-check-input bg-primary border-0"
              id="Payments-1"
              name="Payments"
              value="Payments"
            />
            <label className="form-check-label" for="Payments-1">
              Cash On Delivery
            </label>
          </div>
        </div>
      </div>
      <div className="row g-4 text-center align-items-center justify-content-center pt-4">
        <button
          type="button"
          className="btn border-secondary py-3 px-4 text-uppercase w-50 text-primary"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
export default PaymentMehtod;
