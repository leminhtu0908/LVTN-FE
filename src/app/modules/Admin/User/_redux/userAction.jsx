import * as requestFromServer from "./userCrud";

import { callTypes, userSlice } from "./userSlice";

const { actions } = userSlice;

export const fetchUser = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllUser(queryParams)
    .then((response) => {
      const { data } = response;
      dispatch(actions.userList({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
// export const createTypeProduct = (values) => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.list }));
//   return requestFromServer
//     .createTypeProduct(values)
//     .then((response) => {
//       const { data } = response;
//       dispatch(actions.typeproductCreate(data));
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't find projects";
//       dispatch(actions.catchError({ error, callType: callTypes.list }));
//     });
// };

// export const deleteTypeProduct = (id) => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.action }));
//   return requestFromServer
//     .deleteTypeProduct(id)
//     .then((response) => {
//       dispatch(actions.typeproductDeleted({ id }));
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't delete point";
//       dispatch(actions.catchError({ error, callType: callTypes.action }));
//     });
// };
// export const updateTypeProduct = (values) => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.action }));
//   return requestFromServer
//     .updateTypeProduct(values)
//     .then((response) => {
//       const { data } = response.data;
//       dispatch(actions.typeproductUpdate(data));
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't update user";
//       dispatch(actions.catchError({ error, callType: callTypes.action }));
//     });
// };
