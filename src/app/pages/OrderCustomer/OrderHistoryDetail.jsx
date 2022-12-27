import moment from "moment";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../components/button";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";

const OrderHistoryDetail = () => {
  const location = useLocation();
  const data = location?.state;
  const navigate = useNavigate();
  return (
    <LayoutCustomer>
      <div className="pt-[108px] p-10 max-w-[1000px] w-full mx-auto">
        <div className="flex items-start gap-x-5">
          <div className="left basis-[50%]">
            <h1 className="p-4 bg-slate-100 rounded-lg font-semibold">
              Thông tin đơn hàng
            </h1>
            <div className="mt-2">
              <span>Mã đơn hàng: </span> <span>{data.order_id}</span>
              <div className="">
                <span>Tên đơn hàng: </span> <span>{data.productNameOrder}</span>
              </div>
              <div className="">
                <span>Tổng số lượng: </span> <span>{data.total_product}</span>
              </div>
              <div className="">
                <span>Ngày đặt hàng: </span>{" "}
                <span>{moment(data.createdAt).format("LLLL")}</span>
              </div>
              <div className="">
                <span>Trạng thái đơn hàng: </span>{" "}
                {data.allow_status === 0 ? (
                  <span className="px-4 py-1 rounded-full bg-orange-600 text-white">
                    Đang đợi duyệt
                  </span>
                ) : (
                  <span className="px-4 py-1 rounded-full bg-green-800 text-white">
                    Đã duyệt
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="right flex-1">
            <h1 className="p-4 bg-slate-100 rounded-lg font-semibold">
              Thông tin chi tiết sản phẩm
            </h1>
            <div className="">
              {data?.cart?.length > 0 &&
                data?.cart?.map((item, index) => (
                  <div className="" key={index}>
                    <div className="">
                      {" "}
                      <span>Tên sản phẩm: </span>{" "}
                      <span>
                        {item?.name} - {item?.memory} - {item?.colors}
                      </span>
                    </div>
                    <div className="">
                      {" "}
                      <span>Số lượng sản phẩm: </span>{" "}
                      <span>{item?.cartQuantity}</span>
                    </div>
                    <div className="">
                      {" "}
                      <span>Giá: </span>{" "}
                      <span>
                        {item?.price_discount
                          ? item?.price_discount.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })
                          : item?.price.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                      </span>
                    </div>
                    <div className="mb-2 flex items-center">
                      {" "}
                      <span>Ảnh sản phẩm: </span>{" "}
                      <img
                        src={item?.image}
                        alt=""
                        className="w-[50px] h-[50px]"
                      />
                    </div>
                    <hr />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-x-5 my-20">
          <div className="left basis-[50%]">
            <h1 className="p-4 bg-slate-100 rounded-lg font-semibold">
              Người nhận
            </h1>
            <div className="mt-2">
              <span>Họ và tên: </span> <span>{data.fullName}</span>
              <div className="">
                <span>Địa chỉ: </span> <span>{data.address}</span>
              </div>
              <div className="">
                <span>Số điện thoại: </span> <span>{data.phone}</span>
              </div>
            </div>
          </div>
          <div className="right flex-1">
            <h1 className="p-4 bg-slate-100 rounded-lg font-semibold">
              Tổng tiền
            </h1>
            <div className="mt-2">
              <span>Tổng tiền: </span>{" "}
              <span>
                {data.total_price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          </div>
        </div>
        <Button type="button" onClick={() => navigate("/")}>
          Về trang chủ
        </Button>
      </div>
    </LayoutCustomer>
  );
};

export default OrderHistoryDetail;
