import React from "react";
import { Link, useLocation } from "react-router-dom";
const AuthenticatePage = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <div className="authenticate overflow-y-scroll overflow-scrollbar p-4 flex items-center justify-center">
      <div className="w-[550px] p-8 bg-[#FAF7F0] rounded-xl my-auto">
        <h1 className="text-center font-bold text-4xl mb-4 text-[#4E5D78]">
          {pathname === "/sign-up"
            ? "Đăng ký"
            : pathname === "/forgot-password"
            ? "Quên mật khẩu"
            : pathname === "/reset-password"
            ? "Tạo lại mật khẩu"
            : "Đăng nhập"}
        </h1>
        <p className="text-center font-medium text-[16px] text-[#4E5D78] mb-10">
          {pathname === "/sign-up"
            ? "Tạo tài khoản để bắt đầu mua hàng"
            : pathname === "/forgot-password"
            ? "Nhập email để gửi link đến email của bạn"
            : pathname === "/reset-password"
            ? "Tạo lại mật khẩu với email"
            : "Xin chào, mừng bạn trở lại!"}
        </p>
        {children}
      </div>
    </div>
  );
};

export default AuthenticatePage;
