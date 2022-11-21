import * as requestFromServer from "./tinhCrud";

import { callTypes, tinhSlice } from "./tinhSlice";

const { actions } = tinhSlice;

export const getAllTinh = (data) => (dispatch) => {
  dispatch(actions.tinhList({ data }));
};
