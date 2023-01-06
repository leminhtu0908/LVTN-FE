import * as requestFromServer from "./commentCrud";

import { callTypes, commentSlice } from "./commentSlice";

const { actions } = commentSlice;
export const fetchComments = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getCommentByProduct(queryParams)
    .then((response) => {
      const { comments } = response.data;
      dispatch(actions.commentList({ comments }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const createComment = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createComment(values)
    .then((response) => {
      const { data } = response;
      dispatch(actions.commentCreate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const updateComment = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateComment(values)
    .then((response) => {
      const { comment } = response.data;
      dispatch(actions.commentUpdate({ comment }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteComment = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteComment(id)
    .then((response) => {
      dispatch(actions.commentDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
