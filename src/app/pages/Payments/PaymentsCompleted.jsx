import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";

const PaymentsCompleted = (props) => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.auth }),
    shallowEqual
  );
  const { authToken } = currentState;
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {props.noHeader === true ? null : (
        <h1 className="text-center text-2xl font-semibold my-5">
          Đơn hàng của bạn đang được duyệt
        </h1>
      )}
      <div
        className="flex gap-x-10 items-center justify-center"
        onClick={() => (window.location.href = "/")}
      >
        <Button type="button" className="bg-red-500 mx-0">
          Tiếp tục mua sắm
        </Button>
        <Button
          type="button"
          className="mx-0"
          // onClick={() => navigate("/order/history")}
        >
          <a href={`https://lmt-shop.vercel.app/order/history`}>
            {" "}
            Lịch sử đặt hàng
          </a>
        </Button>
      </div>
    </div>
  );
};

export default PaymentsCompleted;
