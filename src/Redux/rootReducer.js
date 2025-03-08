import { combineReducers } from "redux";
import categoryReducer from "./Category/categoryReducer";
import productReducer from "./Products/ProductReducer";
import productReducer1 from "./Products/productReducer1";
import productTitleReducer from "./productState/productState";
import universalReducer from "./UniversalStore/UnivarSalState";
import productReducer2 from "./Products/productReducer2";
// import tokenReducer from "./Login/LoginState";
import usernameReducer from "./Login/LoginState";
import cartReducer from "./Cart/cartReducer";
import wishlistReducer from "./Wishlist/wishlistReducer";
import loginReducer from "./Login/LoginReducer";
import contactReducer from "./Contact/contactReducer";
import userReducer from "./User/userReducer";
import loadingReducer from "./Loading/LoadingReducer";
export default combineReducers({
  universalReducer,
  categoryReducer,
  cartReducer,
  productReducer,
  productReducer1,
  productReducer2,
  productTitleReducer,
  wishlistReducer,
  loginReducer,
  usernameReducer,
  contactReducer,
  userReducer,
  loadingReducer,
});
