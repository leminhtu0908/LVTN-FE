import * as requestFromServer from "./bannerCrud";

import { callTypes, bannerSlice } from "./bannerSlice";

const { actions } = bannerSlice;

export const fetchBanners = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllBanner(queryParams)
    .then((response) => {
      const { data } = response;
      dispatch(actions.bannerList({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const createBanner = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createBanner(values)
    .then((response) => {
      const { data } = response;
      dispatch(actions.bannerCreate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteBanner = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBanner(values)
    .then((response) => {
      const { data } = response;
      dispatch(actions.bannerDeleted(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
// export const updateColor = (values) => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.action }));
//   return requestFromServer
//     .updateColor(values)
//     .then((response) => {
//       const { data } = response.data;
//       dispatch(actions.colorUpdate(data));
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't update user";
//       dispatch(actions.catchError({ error, callType: callTypes.action }));
//     });
// };
