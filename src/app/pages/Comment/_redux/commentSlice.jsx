import { createSlice } from "@reduxjs/toolkit";

const initialCommentState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  commentForEdit: undefined,
  comment: undefined,
  commentId: undefined,
  replyComment: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const commentSlice = createSlice({
  name: "comments",
  initialState: initialCommentState,
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
    commentList: (state, action) => {
      const { comments } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = comments;
    },
    commentCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.comment = action.payload;
    },
    commentDeleted: (state, action) => {
      state.error = null;
      state.commentId = action.payload.id;
      state.actionsLoading = false;
    },
    commentUpdate: (state, action) => {
      const { comment } = action.payload;
      state.error = null;
      state.actionsLoading = false;
      state.commentForEdit = comment;
    },
    replyDeleted: (state, action) => {
      state.error = null;
      state.replyComment = action.payload.id;
      state.actionsLoading = false;
    },
  },
});
