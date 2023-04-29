import { favouriteProductsReducer } from "./favouritePoductsReducer";
import { addToFavourites, removeFromFavourites } from "./favouriteProduct";

describe("favouriteProductsReducer", () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  test("returns default state if no state is provided", () => {
    const newState = favouriteProductsReducer(undefined, {});
    expect(newState).toEqual([]);
  });

  test("adds product to favourite", () => {
    const newState = favouriteProductsReducer(["2"], addToFavourites("1"));
    expect(newState).toEqual(["2", "1"]);
    expect(window.localStorage.getItem("favouriteProducts")).toEqual("2,1");
  });

  test("remove product from favourite", () => {
    const newState = favouriteProductsReducer(
      ["1", "2"],
      removeFromFavourites("1")
    );
    expect(newState).toEqual(["2"]);
    expect(window.localStorage.getItem("favouriteProducts")).toEqual("2");
  });
});
