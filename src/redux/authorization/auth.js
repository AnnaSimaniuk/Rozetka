export const OPEN_MODAL_AUTH = "OPEN_MODAL_AUTH";
export const CLOSE_MODAL_AUTH = "CLOSE_MODAL_AUTH";
export const SUCCESSFUL_AUTH = "SUCCESSFUL_AUTH";

export const selectAuth = (store) => store.auth.authorization;
export const selectModalAuth = (store) => store.auth.statusModal;

export const openModalAuth = () => ({
  type: OPEN_MODAL_AUTH,
});

export const closeModalAuth = () => ({
  type: CLOSE_MODAL_AUTH,
});

export const successfulAuth = () => ({
  type: SUCCESSFUL_AUTH,
});