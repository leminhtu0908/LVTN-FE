import { callTypes, cartSlice } from "./cartSlice";

const { actions } = cartSlice;
export const addToCart = (data) => (dispatch) => {
  dispatch(actions.addToCart(data));
};
export const deleteToCart = (data) => (dispatch) => {
  dispatch(actions.deleteToCart(data));
};
export const decreaseCart = (data) => (dispatch) => {
  dispatch(actions.decreaseCart(data));
};
export const clearCart = (data) => (dispatch) => {
  dispatch(actions.clearCart(data));
};
