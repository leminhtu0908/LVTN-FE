import * as requestFromServer from "./dashboardCrud";

import { callTypes, dashboardSlice } from "./dashboardSlice";

const { actions } = dashboardSlice;

export const getDashboard = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getDashboard(queryParams)
    .then((response) => {
      const { data } = response;
      dispatch(actions.getDashboard({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't get list points";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
