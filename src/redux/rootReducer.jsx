import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { rootsSlice } from "../app/pages/Root/_redux/rootSlice";
import { categorySlice } from "../app/modules/Admin/DanhMuc/_redux/danhMucSlice";
import { brandsSlice } from "../app/modules/Admin/Brand/_redux/brandSlice";
import { typeproductSlice } from "../app/modules/Admin/TypeProduct/_redux/typeproductSlice";
import { userSlice } from "../app/modules/Admin/User/_redux/userSlice";
import { memorySlice } from "../app/modules/Admin/Memory/_redux/memorySlice";
import { colorSlice } from "../app/modules/Admin/Color/_redux/colorSlice";
import { bannerSlice } from "../app/modules/Admin/Banner/_redux/bannerSlice";
import { newsSlice } from "../app/modules/Admin/News/_redux/newsSlice";
import { productSlice } from "../app/modules/Admin/Product/_redux/productSlice";
import { cartSlice } from "../app/pages/Cart/_redux/cartSlice";
import { tinhSlice } from "../app/pages/Tinh/_redux/tinhSlice";
import { orderSlice } from "../app/modules/Admin/Order/_redux/orderSlice";
export const rootReducer = combineReducers({
  auth: auth.reducer,
  roots: rootsSlice.reducer,
  categorys: categorySlice.reducer,
  brands: brandsSlice.reducer,
  typeProducts: typeproductSlice.reducer,
  users: userSlice.reducer,
  memorys: memorySlice.reducer,
  colors: colorSlice.reducer,
  banners: bannerSlice.reducer,
  news: newsSlice.reducer,
  products: productSlice.reducer,
  cart: cartSlice.reducer,
  tinh: tinhSlice.reducer,
  orders: orderSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
