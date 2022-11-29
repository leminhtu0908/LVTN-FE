import { createSlice } from "@reduxjs/toolkit";

const initialColorState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  size: null,
  totalElements: null,
  totalPages: null,
  colorForEdit: undefined,
  color: undefined,
  colorId: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const colorSlice = createSlice({
  name: "colors",
  initialState: initialColorState,
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
    colorList: (state, action) => {
      const { content, size, totalElements, totalPages } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = content;
      state.size = size;
      state.totalElements = totalElements;
      state.totalPages = totalPages;
    },
    colorFetchs: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
    },
    colorCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.color = action.payload;
    },
    colorDeleted: (state, action) => {
      state.error = null;
      state.colorId = action.payload.id;
      state.actionsLoading = false;
    },
    colorUpdate: (state, action) => {
      state.error = null;
      state.colorForEdit = action.payload;
      state.actionsLoading = false;
    },
  },
});
