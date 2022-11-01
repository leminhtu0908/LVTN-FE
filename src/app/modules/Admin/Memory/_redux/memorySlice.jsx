import { createSlice } from "@reduxjs/toolkit";

const initialMemoryState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  memoryForEdit: undefined,
  memory: undefined,
  memoryId: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const memorySlice = createSlice({
  name: "memorys",
  initialState: initialMemoryState,
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
    memoryList: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
    },
    memoryCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.memory = action.payload;
    },
    memoryDeleted: (state, action) => {
      state.error = null;
      state.memoryId = action.payload.id;
      state.actionsLoading = false;
    },
    memoryUpdate: (state, action) => {
      state.error = null;
      state.memoryForEdit = action.payload;
      state.actionsLoading = false;
    },
  },
});
