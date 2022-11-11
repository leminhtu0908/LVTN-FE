import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  userForEdit: undefined,
  userImage: undefined,
  userId: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const userSlice = createSlice({
  name: "users",
  initialState: initialUserState,
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
    userList: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
    },
    userUpload: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.userImage = action.payload;
    },
  },
});
