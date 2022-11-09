import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";
import * as productAction from "../../modules/Admin/Product/_redux/productAction";
const ProductDetail = () => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.products }),
    shallowEqual
  );
  const { detail: dataDetail } = currentState;
  const { id } = useParams();
  const [values, setValue] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productAction.fetchDetailProduct({ params: { product_id: id } }));
  }, [dispatch, id]);
  const handleDecrement = () => {
    if (values <= 0) return;
    setValue(values - 1);
  };
  const handleIncrement = () => {
    if (values >= dataDetail?.soluong_sanpham) {
      alert("Số lượng sản phẩm vượt quá giới hạn");
      setValue(0);
    } else {
      setValue(values + 1);
    }
  };
  return (
    <LayoutCustomer>
      <div className="p-4">
        <h1 className="py-4 text-2xl font-semibold">{dataDetail?.name}</h1>
        <hr />
        <div className="flex gap-x-5 mt-5">
          <div className="basis-[60%]">
            <img
              src={dataDetail?.image}
              alt=""
              className="w-[850px] h-[397px]"
            />
            <div className="mt-10 text-xl font-semibold mb-5">
              Thông tin sản phẩm
            </div>
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: `${dataDetail?.content}` }}
            ></div>
          </div>
          <div className="basis-[40%]">
            <div className="">{dataDetail?.display}</div>
            <div className="flex gap-x-2 my-5">
              {dataDetail?.colors?.map((item) => (
                <span
                  key={item._id}
                  className="p-4 bg-slate-200 cursor-pointer rounded-lg border border-blue-500"
                >
                  {item.name}
                </span>
              ))}
            </div>
            <div className="flex gap-x-2 my-5">
              {dataDetail?.memorys?.map((item) => (
                <span
                  key={item._id}
                  className="p-4 bg-slate-200 cursor-pointer rounded-lg border border-blue-500"
                >
                  {item.name}
                </span>
              ))}
            </div>
            <div className="">
              <p className="pt-4 pb-2">Số lượng sản phẩm :</p>
              <div className="flex gap-x-1 items-center h-[35px]">
                <button
                  onClick={handleDecrement}
                  className="py-1 px-4 bg-green-500 text-white text-lg"
                >
                  -
                </button>
                <input
                  type="text"
                  value={values}
                  className="w-[80px] h-full border border-green-500 py-1 px-2"
                />
                <button
                  onClick={handleIncrement}
                  className="py-1 px-4 bg-green-500 text-white text-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutCustomer>
  );
};

export default ProductDetail;
