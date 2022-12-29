import * as requestFromServer from "./paymentCrud";

import { callTypes, paymentSlice } from "./paymentSlice";

const { actions } = paymentSlice;
export const createOrderZalopay = (data) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createOrderZalopay(data)
    .then((response) => {
      const { data } = response;
      dispatch(actions.postOrder(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const getStatusOrderZalopay = (data) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getStatusOrderZalopay(data)
    .then((response) => {
      const { data } = response;
      dispatch(actions.postOrder(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const refundOrderZalopay = (data) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .refundOrderZalopay(data)
    .then((response) => {
      const { data } = response;
      dispatch(actions.refundOrder(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
