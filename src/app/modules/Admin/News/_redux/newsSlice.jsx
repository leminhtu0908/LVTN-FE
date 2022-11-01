import { createSlice } from "@reduxjs/toolkit";

const initialNewsState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  newsForEdit: undefined,
  news: undefined,
  newsId: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const newsSlice = createSlice({
  name: "news",
  initialState: initialNewsState,
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
    newsList: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
    },
    newsCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.news = action.payload;
    },
    newsDeleted: (state, action) => {
      state.error = null;
      state.newsId = action.payload.id;
      state.actionsLoading = false;
    },
    newsUpdate: (state, action) => {
      state.error = null;
      state.newsForEdit = action.payload;
      state.actionsLoading = false;
    },
  },
});
