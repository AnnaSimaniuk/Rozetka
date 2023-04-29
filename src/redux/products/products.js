export const GET_PRODUCTS = "GET_PRODUCTS";

export const selectProducts = (store) => store.products;
export const selectAllProducts = (store) => store.products.products;

export const getProducts = (data, type) => ({
  type: GET_PRODUCTS,
  payload: { data, type },
});

