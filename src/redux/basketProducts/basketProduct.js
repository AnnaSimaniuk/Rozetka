export const ADD_TO_BASKET = "ADD_TO_BASKET";
export const REMOVE_FROM_BASKET = "REMOVE_FROM_BASKET";
export const REMOVE_ALL_FROM_BASKET = "REMOVE_ALL_FROM_BASKET";
export const COUNTER_INCREMENT = "COUNTER_INCREMENT";
export const COUNTER_DECREMENT = "COUNTER_DECREMENT";

export const selectBasketProductId = (store) => Object.keys(store.basket);
export const selectBasketProduct = (store) => store.basket;

export const addToBasket = (id) => ({
  type: ADD_TO_BASKET,
  payload: id,
});

export const removeFromBasket = (id) => ({
  type: REMOVE_FROM_BASKET,
  payload: id,
});

export const removeAllFromBasket = () => ({
  type: REMOVE_ALL_FROM_BASKET,
});

export const counterIncrement = (id) => ({
  type: COUNTER_INCREMENT,
  payload: id,
});

export const counterDecrement = (id) => ({
  type: COUNTER_DECREMENT,
  payload: id,
});
