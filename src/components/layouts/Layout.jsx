import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="h-[100vh]">
      <div className="shadow-xl w-full bg-white fixed z-100">
        <Header></Header>
      </div>
      <div className="flex flex-1 pt-20 h-[100vh] overflow-hidden">
        <div className="main-sidebar basis-[20%] overflow-y-scroll overflow-scrollbar">
          <Sidebar></Sidebar>
        </div>
        <div className="main-children basis-[80%] bg-slate-100 overflow-y-scroll p-4 h-full ">
          {children}
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Layout;
