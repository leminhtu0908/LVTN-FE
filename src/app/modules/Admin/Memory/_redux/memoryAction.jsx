import * as requestFromServer from "./memoryCrud";

import { callTypes, memorySlice } from "./memorySlice";

const { actions } = memorySlice;

export const fetchMemories = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllMemory(queryParams)
    .then((response) => {
      const { data } = response;
      dispatch(actions.memoryList({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const createMemory = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createMemory(values)
    .then((response) => {
      const { data } = response;
      dispatch(actions.memoryCreate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteMemory = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMemory(id)
    .then((response) => {
      dispatch(actions.memoryDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateMemory = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMemory(values)
    .then((response) => {
      const { memory } = response.data;
      dispatch(actions.memoryUpdate(memory));
    })
    .catch((error) => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
