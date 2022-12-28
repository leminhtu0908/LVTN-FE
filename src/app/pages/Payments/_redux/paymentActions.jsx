import * as requestFromServer from "./paymentCrud";

import { callTypes, paymentSlice } from "./paymentSlice";

const { actions } = paymentSlice;
export const createOrderZalopay = (formData) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createOrderZalopay(formData)
    .then((response) => {
      console.log("res", response);
      const { data } = response;
      dispatch(actions.postOrder(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
