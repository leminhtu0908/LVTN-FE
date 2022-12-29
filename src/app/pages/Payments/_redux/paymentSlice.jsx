import { createSlice } from "@reduxjs/toolkit";

const initialPaymentState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  paymentForEdit: undefined,
  payment: undefined,
  paymentId: undefined,
  statusOrder: undefined,
  apptransid: undefined,
  refund: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const paymentSlice = createSlice({
  name: "payment",
  initialState: initialPaymentState,
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
    postOrder: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.payment = data;
    },
    getStatusOrder: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.statusOrder = data;
    },
    refundOrder: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.refund = data;
    },
    getApptransidOrder: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.apptransid = data;
    },
  },
});
