import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";

const PaymentsCompleted = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-semibold my-5">
        Đơn hàng của bạn đang được duyệt
      </h1>
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
          onClick={() => (window.location.href = "/order/history")}
        >
          Lịch sử đặt hàng
        </Button>
      </div>
    </div>
  );
};

export default PaymentsCompleted;
