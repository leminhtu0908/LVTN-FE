import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
        toast.info(`Increased ${state.cart[itemIndex].name} cart quantity`, {
          position: "bottom-left",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cart.push(tempProduct);
        toast.success(`${action.payload.name} added to cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    deleteToCart: (state, action) => {
      const nextCartItems = state.cart.filter(
        (item) => item.product_id !== action.payload.product_id
      );
      state.cart = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
      toast.error(`${action.payload.name} remove to cart`, {
        position: "bottom-left",
      });
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.product_id === action.payload.product_id
      );
      if (state.cart[itemIndex].cartQuantity > 1) {
        state.cart[itemIndex].cartQuantity -= 1;
        toast.info(`Decreased ${state.cart[itemIndex].name} cart quantity`, {
          position: "bottom-left",
        });
      } else if (state.cart[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cart.filter(
          (item) => item.product_id !== action.payload.product_id
        );
        state.cart = nextCartItems;
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        toast.error(`${action.payload.name} remove to cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    clearCart: (state, action) => {
      state.cart = [];
      toast.error(`Cart cleared`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
  },
});