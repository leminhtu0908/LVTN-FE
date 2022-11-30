import { createSlice } from "@reduxjs/toolkit";

const initialImageState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  imageForEdit: undefined,
  image: undefined,
  imageId: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const imageSlice = createSlice({
  name: "images",
  initialState: initialImageState,
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
    imageList: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
    },
    imageCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.image = action.payload;
    },
    imageDeleted: (state, action) => {
      state.error = null;
      state.imageId = action.payload;
      state.actionsLoading = false;
    },
    imageUpdate: (state, action) => {
      state.error = null;
      state.image = action.payload;
      state.actionsLoading = false;
    },
  },
});
