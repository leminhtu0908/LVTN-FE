import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        <img srcSet="/img/success-1.png" alt="" className="w-80" />
      </div>
      <h1 className="text-center font-semibold text-2xl text-green-500">
        Đặt hàng thành công
      </h1>
    </div>
  );
};

export default PaymentSuccess;
