export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

export const selectFavouriteProductsId = (store) => store.favourite;

export const addToFavourites = (id) => ({
  type: ADD_TO_FAVORITES,
  payload: id,
});

export const removeFromFavourites = (id) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: id,
});
