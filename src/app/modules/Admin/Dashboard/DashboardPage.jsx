import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FcDeleteDatabase } from "react-icons/fc";
import { TbRoadSign } from "react-icons/tb";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import DashboardChart from "./shared/DashboardChart";
import DashboardTable from "./shared/DashboardTable";
import * as actions from "./_redux/dashboardAction";
const DashboardPage = () => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.dashboard }),
    shallowEqual
  );
  const { dashboard } = currentState;
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    if (dashboard?.data?.length > 0) {
      setNewData(dashboard?.data);
    }
  }, [dashboard?.data]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getDashboard({ params: {} }));
  }, [dispatch]);
  return (
    <div>
      <div className="mb-5">
        <div className="grid gap-x-5 grid-cols-3">
          <div className="p-5 flex gap-x-4 bg-green-200 items-center rounded-lg shadow-md">
            <span className="basis-[30%]">
              <AiOutlineCheckCircle className="w-[100px] h-[100px] text-green-500"></AiOutlineCheckCircle>
            </span>
            <div className="flex-1">
              <h1>Số lượng sản phẩm đã bán</h1>
              <p className="text-xl font-semibold text-green-500">
                {dashboard?.totalSold}
              </p>
            </div>
          </div>
          <div className="p-5 flex gap-x-4 bg-orange-200 items-center rounded-lg shadow-md">
            <span className="basis-[30%]">
              <TbRoadSign className="w-[100px] h-[100px] text-orange-500"></TbRoadSign>
            </span>
            <div className="flex-1">
              <h1>Đơn hàng chưa duyệt</h1>
              <p className="text-xl font-semibold text-orange-500">
                {dashboard?.orderUnAllow}
              </p>
            </div>
          </div>
          <div className="p-5 flex gap-x-4 bg-red-200 items-center rounded-lg shadow-md">
            <span className="basis-[30%]">
              <FcDeleteDatabase className="w-[100px] h-[100px] text-red-500"></FcDeleteDatabase>
            </span>
            <div className="flex-1">
              <h1>Đơn hàng đã hủy</h1>
              <p className="text-xl font-semibold text-red-500">
                {dashboard?.orderDistroyed}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg mb-10">
        <DashboardChart data={newData}></DashboardChart>
      </div>
      <div className="p-4 bg-white rounded-lg">
        <DashboardTable data={dashboard?.dataTable}></DashboardTable>
      </div>
    </div>
  );
};

export default DashboardPage;
