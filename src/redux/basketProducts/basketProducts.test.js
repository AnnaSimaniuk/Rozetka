import { basketProductsReducer } from "./basketProductsReducer";
import {
  addToBasket,
  counterDecrement,
  counterIncrement,
  removeAllFromBasket,
  removeFromBasket,
} from "./basketProduct";

describe("basketProductsReducer", () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  test("returns default state if no state is provided", () => {
    const newState = basketProductsReducer(undefined, {});
    expect(newState).toEqual({});
  });

  test("adds product to basket", () => {
    const newState = basketProductsReducer({}, addToBasket("1"));
    expect(newState).toEqual({ 1: 1 });
    expect(window.localStorage.getItem("basketProducts")).toEqual(
      JSON.stringify({ 1: 1 })
    );
  });

  test("removes product from basket", () => {
    const state = { 1: 1 };
    const newState = basketProductsReducer(state, removeFromBasket("1"));
    expect(newState).toEqual({});
    expect(window.localStorage.getItem("basketProducts")).toEqual(
      JSON.stringify({})
    );
  });

  test("removes all products from basket", () => {
    const state = { 1: 2, 2: 1 };
    const newState = basketProductsReducer(state, removeAllFromBasket());
    expect(newState).toEqual({});
    expect(window.localStorage.getItem("basketProducts")).toBeNull();
  });

  test("increments product counter", () => {
    const state = { 1: 2 };
    const newState = basketProductsReducer(state, counterIncrement("1"));
    expect(newState).toEqual({ 1: 3 });
    expect(window.localStorage.getItem("basketProducts")).toEqual(
      JSON.stringify({ 1: 3 })
    );
  });

  test("decrements product counter", () => {
    const state = { 1: 2 };
    const newState = basketProductsReducer(state, counterDecrement("1"));
    expect(newState).toEqual({ 1: 1 });
    expect(window.localStorage.getItem("basketProducts")).toEqual(
      JSON.stringify({ 1: 1 })
    );
  });
});