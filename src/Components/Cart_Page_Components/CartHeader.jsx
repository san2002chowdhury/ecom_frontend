import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setActive } from "../../Redux/UniversalStore/UnivarSalState";

const CartHeader = () => {
  const dispatch = useDispatch();
  return (
    <div className="container-fluid page-header py-5">
      <h1 className="text-center text-white display-6">Cart</h1>
      <ol className="breadcrumb justify-content-center mb-0">
        <li className="breadcrumb-item">
          <Link to="/" onClick={() => dispatch(setActive("Home"))}>
            Home
          </Link>
        </li>

        <li className="breadcrumb-item active text-white">Cart</li>
      </ol>
    </div>
  );
};
export default CartHeader;
