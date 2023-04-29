import { CLOSE_MODAL_AUTH, OPEN_MODAL_AUTH, SUCCESSFUL_AUTH } from "./auth";

const defaultState = {
  authorization: !!window.localStorage.getItem("token"),
  statusModal: false,
};

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_MODAL_AUTH:
      return { ...state, statusModal: true };
    case CLOSE_MODAL_AUTH:
      return { ...state, statusModal: false };
    case SUCCESSFUL_AUTH:
      window.localStorage.setItem("token", "token");
      return { ...state, statusModal: false, authorization: true };
    default:
      return state;
  }
};