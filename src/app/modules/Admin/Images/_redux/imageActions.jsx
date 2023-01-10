import * as requestFromServer from "./imageCrud";

import { callTypes, imageSlice } from "./imageSlice";

const { actions } = imageSlice;

export const fetchImages = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllImage(queryParams)
    .then((response) => {
      const { data } = response;
      dispatch(actions.imageList({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const createImage = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createImage(values)
    .then((response) => {
      const { data } = response;
      dispatch(actions.imageCreate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const deleteImage = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteImage(values)
    .then((response) => {
      const { data } = response;
      dispatch(actions.imageDeleted(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
