import * as requestFromServer from "./productCrud";

import { callTypes, productSlice } from "./productSlice";

const { actions } = productSlice;

export const fetchProducts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getProducts(queryParams)
    .then((response) => {
      const { data } = response;
      dispatch(actions.productList(data?.products));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const createProduct = (formData) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createProduct(formData)
    .then((response) => {
      const { data } = response;
      dispatch(actions.productCreate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
