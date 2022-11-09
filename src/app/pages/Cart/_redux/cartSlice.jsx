import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  cartForEdit: undefined,
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartId: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
        state.data = null;
      } else {
        state.actionsLoading = true;
      }
    },
    addToCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.product_id === action.payload.product_id
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cart.push(tempProduct);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
  },
});
