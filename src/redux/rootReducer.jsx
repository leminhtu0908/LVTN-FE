import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { rootsSlice } from "../app/pages/Root/_redux/rootSlice";
import { categorySlice } from "../app/modules/Admin/DanhMuc/_redux/danhMucSlice";
import { brandsSlice } from "../app/modules/Admin/Brand/_redux/brandSlice";
export const rootReducer = combineReducers({
  auth: auth.reducer,
  roots: rootsSlice.reducer,
  categorys: categorySlice.reducer,
  brands: brandsSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
