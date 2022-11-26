import * as requestFromServer from "./orderCrud";

import { callTypes, orderSlice } from "./orderSlice";

const { actions } = orderSlice;

export const fetchOrders = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllOrder(queryParams)
    .then((response) => {
      const { data } = response;
      dispatch(actions.orderList({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchHistory = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllOrderUserHistory(queryParams)
    .then((response) => {
      const { data } = response;
      dispatch(actions.orderListUserHistory({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const updateStatusOrder = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusOrder(values)
    .then((response) => {
      const { order } = response.data;
      dispatch(actions.orderUpdateStatus(order));
    })
    .catch((error) => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const exportExcel = () => (dispatch) => {
  const randomId = Math.floor(Math.random() * 100000000);
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .exportExcel()
    .then((response) => {
      const filename = `${randomId}_order.xlsx`;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); //or any other extension
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOrderHistory = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteOrderUser(id)
    .then((response) => {
      dispatch(actions.orderDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
