import React from "react";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";

const OrderGuide = () => {
  return (
    <LayoutCustomer>
      <div className="pt-[88px] max-w-[1200px] w-full mx-auto mb-10 ">
        <div className="p-5 h-full bg-slate-200 shadow-lg my-10 rounded-lg">
          <h1 className="text-center text-2xl font-semibold">
            Các bước thanh toán và đặt hàng bằng Zalopay
          </h1>
          <div className="">
            <p className="font-semibold text-xl py-2">
              Bước 1 : Nhập thông tin đặt hàng
            </p>
            <img alt="" srcset="/img/buoc-1.png" className="w-full h-[800px]" />
          </div>
          <div className="mt-5">
            <p className="font-semibold text-xl py-2">
              Bước 2 : Kiểm tra thông tin và chọn thanh toán trực tuyến Zalopay
            </p>
            <img alt="" srcset="/img/buoc-2.png" className="w-full h-[800px]" />
          </div>
          <div className="mt-5">
            <p className="font-semibold text-xl py-2">
              Bước 3 : Sau khi nhấn thanh toán, hệ thống sẽ chuyển hướng đến
              ZaloPay Gateway. Chọn ngân hàng thanh toán
            </p>
            <img alt="" srcset="/img/buoc-3.png" className="w-full h-[800px]" />
          </div>
          <div className="mt-5">
            <p className="font-semibold text-xl py-2">
              Bước 4 : Nhập thông tin thẻ ngân hàng của bạn. Tiếp theo chọn
              thanh toán
            </p>
            <img alt="" srcset="/img/buoc-4.png" className="w-full h-[800px]" />
          </div>
          <div className="mt-5">
            <p className="font-semibold text-xl py-2">
              Bước 5 : Nhập mã xác thực. Chọn thanh toán
            </p>
            <img alt="" srcset="/img/buoc-5.png" className="w-full h-[800px]" />
          </div>
          <div className="mt-5">
            <p className="font-semibold text-xl py-2">
              Bước 6 : Hệ thống thông báo thành công
            </p>
            <img alt="" srcset="/img/buoc-6.png" className="w-full h-[800px]" />
          </div>
          <div className="mt-5">
            <p className="font-semibold text-xl py-2">
              Bước 7 : Chuyển hướng về trang web và lưu đơn hàng. Khách hàng có
              thể xem lịch sử đặt hàng
            </p>
            <img alt="" srcset="/img/buoc-7.png" className="w-full h-[800px]" />
          </div>
        </div>
      </div>
    </LayoutCustomer>
  );
};

export default OrderGuide;
