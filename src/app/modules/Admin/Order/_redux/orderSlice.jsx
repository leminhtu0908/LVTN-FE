import { createSlice } from "@reduxjs/toolkit";

const initialOrderState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  orderForEdit: undefined,
  userDataOrder: null,
  size: null,
  totalElements: null,
  totalPages: null,
  order: undefined,
  orderId: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const orderSlice = createSlice({
  name: "orders",
  initialState: initialOrderState,
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
    orderList: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
    },
    createOrderZalopay: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.order = action.payload;
    },
    orderListUserHistory: (state, action) => {
      // const { content, size, totalElements, totalPages } = action.payload;
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.userDataOrder = data;
      // state.size = size;
      // state.totalElements = totalElements;
      // state.totalPages = totalPages;
    },
    orderDeleted: (state, action) => {
      state.error = null;
      state.orderId = action.payload.id;
      state.actionsLoading = false;
    },
    orderUpdateStatus: (state, action) => {
      state.error = null;
      state.orderForEdit = action.payload;
      state.actionsLoading = false;
    },
    orderPay: (state, action) => {
      state.error = null;
      state.orderForEdit = action.payload;
      state.actionsLoading = false;
    },
  },
});
