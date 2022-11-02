import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignInPage from "../modules/Auth/pages/SignInPage";
import SignUpPage from "../modules/Auth/pages/SignUpPage";
import ForgotPasswordPage from "../modules/Auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../modules/Auth/pages/ResetPasswordPage";
import NotFoundPage from "./NotFound/NotFoundPage";
import { IntlProvider } from "react-intl";
import { shallowEqual, useSelector } from "react-redux";
import Loading from "./Root/Loading";
import HomePage from "./Homepage/HomePage";
import AdminPage from "../modules/Admin/AdminPage";
import DanhMucListPage from "../modules/Admin/DanhMuc/DanhMucListPage";
import BrandListPage from "../modules/Admin/Brand/BrandListPage";
import TypeProductListPage from "../modules/Admin/TypeProduct/TypeProductListPage";
import UserListPage from "../modules/Admin/User/UserListPage";
import MemoryListPage from "../modules/Admin/Memory/MemoryListPage";
import ColorListPage from "../modules/Admin/Color/ColorListPage";
import BannerListPage from "../modules/Admin/Banner/BannerListPage";
import NewsListPage from "../modules/Admin/News/NewsListPage";
import ProductListPage from "../modules/Admin/Product/ProductListPage";

const Router = () => {
  const { currentState, rootsState } = useSelector(
    (state) => ({ currentState: state.auth, rootsState: state.roots }),
    shallowEqual
  );
  const { authToken } = currentState;
  return (
    <>
      <Routes>
        {/* Auth */}
        <Route
          path="/sign-in"
          element={
            !currentState?.authToken?.token ? (
              <SignInPage />
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
        <Route
          path="/sign-up"
          element={
            !currentState?.authToken?.token ? (
              <SignUpPage />
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
        <Route
          path="/forgot-password"
          element={
            !currentState?.authToken?.token ? (
              <ForgotPasswordPage />
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
        <Route
          path="/reset-password"
          element={
            !currentState?.authToken?.token ? (
              <ResetPasswordPage />
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
        <Route path="/logout" element={<Navigate to="/" />}></Route>
        {/* Home */}
        <Route
          path="/"
          element={
            authToken?.user?.role === "Admin" ? (
              <Navigate to="/admin" />
            ) : (
              <HomePage />
            )
          }
        ></Route>
        {/* Admin */}
        <Route
          path="/admin"
          element={
            authToken?.user?.role === "Admin" ? (
              <AdminPage />
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
        <Route path="/admin/category" element={<DanhMucListPage />}></Route>
        <Route path="/admin/brand" element={<BrandListPage />}></Route>
        <Route
          path="/admin/type-product"
          element={<TypeProductListPage />}
        ></Route>
        <Route path="/admin/user" element={<UserListPage />}></Route>
        <Route path="/admin/memory" element={<MemoryListPage />}></Route>
        <Route path="/admin/color" element={<ColorListPage />}></Route>
        <Route path="/admin/banner" element={<BannerListPage />}></Route>
        <Route path="/admin/news" element={<NewsListPage />}></Route>
        <Route path="/admin/products" element={<ProductListPage />}></Route>
        {/*  */}
        {/* Content */}
        {/*  */}

        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
};

export default Router;
