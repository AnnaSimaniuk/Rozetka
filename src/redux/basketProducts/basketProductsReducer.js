import {
  ADD_TO_BASKET,
  COUNTER_DECREMENT,
  COUNTER_INCREMENT,
  REMOVE_ALL_FROM_BASKET,
  REMOVE_FROM_BASKET,
} from "./basketProduct";

const data =
  !!window.localStorage.getItem("basketProducts") &&
  window.localStorage.getItem("basketProducts");
const defaultState = JSON.parse(data) || {};

export const basketProductsReducer = (state = defaultState, action) => {
  const id = action.payload;
  const counter = state[id] || 1;
  switch (action.type) {
    case ADD_TO_BASKET:
      window.localStorage.setItem(
        "basketProducts",
        `${JSON.stringify({ ...state, [id]: counter })}`
      );
      return { ...state, [id]: counter };
    case REMOVE_FROM_BASKET:
      const { [id]: _, ...rest } = state;
      window.localStorage.setItem("basketProducts", `${JSON.stringify(rest)}`);
      return rest;
    case REMOVE_ALL_FROM_BASKET:
      window.localStorage.removeItem("basketProducts");
      return {};
    case COUNTER_INCREMENT:
      window.localStorage.setItem(
        "basketProducts",
        `${JSON.stringify({ ...state, [id]: counter + 1 })}`
      );
      return { ...state, [id]: counter + 1 };
    case COUNTER_DECREMENT:
      window.localStorage.setItem(
        "basketProducts",
        `${JSON.stringify({ ...state, [id]: counter - 1 })}`
      );
      return { ...state, [id]: counter - 1 };
    default:
      return state;
  }
};