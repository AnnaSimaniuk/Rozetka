import {
  getAllProducts,
  getAllProductsData,
  getAllProductsOfCategories,
} from "../../api/useHTTPRequest";
import { GET_PRODUCTS, getProducts } from "./products";

const defaultState = {};

export const productsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      if (action.payload.type === "byRating") {
        const sortedState = action.payload.data.products.sort((a, b) => b.rating - a.rating);
        return { ...state, ...action.payload.data, ...sortedState };
      }
      if (action.payload.type === "fromCheaperToExpensive") {
        const sortedState = action.payload.data.products.sort(
            (a, b) => Number(a.price) - Number(b.price)
        );
        return { ...state, ...action.payload.data, ...sortedState };
      }
      if (action.payload.type === "fromExpensiveToCheaper") {
        const sortedState = action.payload.data.products.sort(
            (a, b) => Number(b.price) - Number(a.price)
        );
        return { ...state, ...action.payload.data, ...sortedState };
      }
      return { ...state, ...action.payload.data};
    default:
      return state;
  }
};

export const loadAllProducts =
  (filter, navigate, pathname, type = "") =>
  async (dispatch, p, p1) => {
    const products = await getAllProducts(filter, navigate, pathname);
    await dispatch(getProducts(products, type));
  };

export const loadProductsOfCategory = (category, type='') => async (dispatch) => {
  const products = await getAllProductsOfCategories(category);
  await dispatch(getProducts(products, type));
};

export const loadAllProductsData = () => async (dispatch) => {
  const products = await getAllProductsData();
  await dispatch(getProducts(products));
};
