import { callTypes, cartSlice } from "./cartSlice";

const { actions } = cartSlice;
export const addToCart = (data) => (dispatch) => {
  dispatch(actions.addToCart(data));
};
