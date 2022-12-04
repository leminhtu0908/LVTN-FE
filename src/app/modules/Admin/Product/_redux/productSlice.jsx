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
  rate: null,
  detail: null,
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
    productFetchs: (state, action) => {
      const { products, size, totalElements, totalPages } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = products;
      state.size = size;
      state.totalElements = totalElements;
      state.totalPages = totalPages;
    },
    productDetail: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.detail = action.payload;
    },
    productCreate: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.product = action.payload;
    },
    productDeleted: (state, action) => {
      state.error = null;
      state.productId = action.payload.id;
      state.actionsLoading = false;
    },
    productUpdate: (state, action) => {
      state.error = null;
      state.productForEdit = action.payload;
      state.actionsLoading = false;
    },
    producRating: (state, action) => {
      state.error = null;
      state.rate = action.payload;
      state.actionsLoading = false;
    },
  },
});
