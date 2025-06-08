import { combineReducers } from "redux";
import categoryReducer from "./Category/categoryReducer";
import productReducer from "./Products/ProductReducer";
import productTitleReducer from "./productState/productState";
import universalReducer from "./UniversalStore/UnivarSalState";
import usernameReducer from "./Login/LoginState";
import cartReducer from "./Cart/cartReducer";
import wishlistReducer from "./Wishlist/wishlistReducer";
import loginReducer from "./Login/LoginReducer";
import contactReducer from "./Contact/contactReducer";
import userReducer from "./User/userReducer";
import loadingReducer from "./Loading/LoadingReducer";
import orderReducer from "./Order/orderReducer";
import reviewReducer from "./Review/reviewReducer";
import couponReducer from "./Coupon/couponReducer";
export default combineReducers({
  universalReducer,
  categoryReducer,
  cartReducer,
  productReducer,
  productTitleReducer,
  wishlistReducer,
  loginReducer,
  usernameReducer,
  contactReducer,
  userReducer,
  loadingReducer,
  orderReducer,
  reviewReducer,
  couponReducer,
});
