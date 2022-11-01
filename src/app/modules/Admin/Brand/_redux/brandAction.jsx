import * as requestFromServer from "./brandCrud";

import { callTypes, brandsSlice } from "./brandSlice";

const { actions } = brandsSlice;

export const fetchBrands = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllBrand(queryParams)
    .then((response) => {
      const { data } = response;
      dispatch(actions.brandList({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const createBrand = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createBrand(values)
    .then((response) => {
      const { data } = response;
      dispatch(actions.brandCreate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteBrand = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBrand(id)
    .then((response) => {
      dispatch(actions.brandDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateBrand = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateBrand(values)
    .then((response) => {
      const { brand } = response.data;
      dispatch(actions.brandUpdate(brand));
    })
    .catch((error) => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
