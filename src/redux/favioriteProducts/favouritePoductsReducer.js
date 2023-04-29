import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "./favouriteProduct";

const data =
  !!window.localStorage.getItem("favouriteProducts") &&
  window.localStorage.getItem("favouriteProducts").split(",");
const defaultState = data || [];

export const favouriteProductsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      window.localStorage.setItem(
        "favouriteProducts",
        `${[...state, action.payload]}`
      );
      return [...state, action.payload.toString()];
    case REMOVE_FROM_FAVORITES:
      window.localStorage.setItem(
        "favouriteProducts",
        `${state.filter((goodId) => goodId !== action.payload.toString())}`
      );
      return state.filter((goodId) => goodId !== action.payload.toString());
    default:
      return state;
  }
};