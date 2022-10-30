import { createSlice } from "@reduxjs/toolkit";

const initialCategoryState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  brandForEdit: undefined,
  brand: undefined,
  brandId: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const brandsSlice = createSlice({
  name: "brands",
  initialState: initialCategoryState,
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
    brandList: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
    },
    brandCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.brand = action.payload;
    },
    brandDeleted: (state, action) => {
      state.error = null;
      state.brandId = action.payload.id;
      state.actionsLoading = false;
    },
    brandUpdate: (state, action) => {
      state.error = null;
      state.brand = action.payload;
      state.actionsLoading = false;
    },
  },
});
