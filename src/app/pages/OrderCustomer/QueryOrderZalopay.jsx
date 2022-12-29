import React from "react";
import { Link, NavLink } from "react-router-dom";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";

const QueryOrderZalopay = ({ children }) => {
  const navLinkClass = ({ isActive }) => ({
    color: isActive ? "#fff" : "#000",
    backgroundColor: isActive ? "blue" : "#fff",
  });
  return (
    <LayoutCustomer>
      <div className="pt-[128px] h-[100vh] py-10">
        <div className="p-5 max-w-[1000px] w-full mx-auto rounded-lg bg-slate-200 shadow-lg h-full ">
          <div className="flex gap-x-5 h-full">
            <div className="basis-[30%] flex flex-col gap-y-2">
              <NavLink
                className={`p-4 rounded-lg`}
                to={"/query-order-zalopay/status"}
                style={navLinkClass}
              >
                Truy vấn trạng thái thanh toán
              </NavLink>
              <NavLink
                className={`p-4 rounded-lg`}
                to={"/query-order-zalopay/refund"}
                style={navLinkClass}
              >
                Truy vấn trạng thái hoàn tiền
              </NavLink>
            </div>

            <div className="basis-[70%] border border-l-black">
              <div className="px-4">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </LayoutCustomer>
  );
};
export default QueryOrderZalopay;
