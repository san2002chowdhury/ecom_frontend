import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setActive } from "../../Redux/UniversalStore/UnivarSalState";

const ProductDetailsHeader = () => {
  const { productTitle } = useSelector((state) => state.productTitleReducer);
  const dispatch = useDispatch();
  // console.log("YXYXYXYXYXYXYXYXYXYX", productTitle);

  return (
    <div className="container-fluid page-header py-5">
      <h1 className="text-center text-white display-6">Shop Detail</h1>
      <ol className="breadcrumb justify-content-center mb-0">
        <li className="breadcrumb-item">
          <Link to="/" onClick={() => dispatch(setActive("Home"))}>
            Home
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/shop" onClick={() => dispatch(setActive("Shop"))}>
            Shop
          </Link>
        </li>
        <li className="breadcrumb-item active text-white">
          {productTitle
            .split("-")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ")}
        </li>
      </ol>
    </div>
  );
};
export default ProductDetailsHeader;
