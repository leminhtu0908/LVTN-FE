import { createSlice } from "@reduxjs/toolkit";

const initialTypeProductState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  typeproductForEdit: undefined,
  typeproduct: undefined,
  typeproductId: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const typeproductSlice = createSlice({
  name: "typeProducts",
  initialState: initialTypeProductState,
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
    typeproductList: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
    },
    typeproductCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.typeproduct = action.payload;
    },
    typeproductDeleted: (state, action) => {
      state.error = null;
      state.typeproductId = action.payload.id;
      state.actionsLoading = false;
    },
    typeproductUpdate: (state, action) => {
      state.error = null;
      state.typeproductForEdit = action.payload;
      state.actionsLoading = false;
    },
  },
});
