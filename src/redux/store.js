import { applyMiddleware, combineReducers, createStore } from "redux";
import { productsReducer } from "./products/productsReducer";
import { favouriteProductsReducer } from "./favioriteProducts/favouritePoductsReducer";
import { basketProductsReducer } from "./basketProducts/basketProductsReducer";
import { authReducer } from "./authorization/authReducer";
import { composeEnhancers, middleware } from "./middleware";

const rootReducer = combineReducers({
  products: productsReducer,
  favourite: favouriteProductsReducer,
  basket: basketProductsReducer,
  auth: authReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);