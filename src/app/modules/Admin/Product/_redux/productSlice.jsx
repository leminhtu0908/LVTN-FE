import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {
  listLoading: false,
  actionsLoading: false,
  meta: null,
  size: null,
  totalElements: null,
  totalPages: null,
  number: null,
  data: null,
  productForEdit: undefined,
  product: undefined,
  productId: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const productSlice = createSlice({
  name: "products",
  initialState: initialProductState,
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
    productList: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.data = action.payload;
    },
    productCreate: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.product = action.payload;
    },
  },
});
