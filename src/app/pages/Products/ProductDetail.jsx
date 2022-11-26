import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/button/Button";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";
import * as productAction from "../../modules/Admin/Product/_redux/productAction";
import * as cartAction from "../../pages/Cart/_redux/cartAction";
const ProductDetail = () => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.products }),
    shallowEqual
  );
  const { detail: dataDetail } = currentState;
  const { id } = useParams();
  const defaultValues = {
    memorys: "",
    colors: "",
  };
  const [formValues, setFormValues] = useState(defaultValues);
  const [colorData, setColorData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);
  useEffect(() => {
    setColorData(dataDetail?.colors?.map((item) => item.name));
  }, [dataDetail?.colors]);
  useEffect(() => {
    setMemoryData(dataDetail?.memorys?.map((item) => item.name));
  }, [dataDetail?.memorys]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productAction.fetchDetailProduct({ params: { product_id: id } }));
  }, [dispatch, id]);
  const handlePayment = (product) => {
    const cloneValues = {
      ...product,
      ...formValues,
    };
    dispatch(cartAction.addToCart(cloneValues));
    navigate("/cart");
  };
  const handleAddToCart = (product) => {
    const cloneValues = {
      ...product,
      ...formValues,
    };
    dispatch(cartAction.addToCart(cloneValues));
  };
  return (
    <LayoutCustomer>
      <div className="p-4 mx-auto w-full max-w-[1200px] pt-[88px]">
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
              <Autocomplete
                style={{ width: "100%" }}
                id="select"
                options={colorData || []}
                getOptionLabel={(option) => option}
                inputValue={formValues?.colors}
                defaultValue={formValues?.colors || ""}
                onInputChange={(event, newInputValue) => {
                  setFormValues({
                    ...formValues,
                    colors: newInputValue,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Màu sắc"
                    name="colors"
                    style={{ maxWidth: "300px" }}
                  />
                )}
              />
            </div>
            <div className="flex gap-x-2 my-5">
              {/* <Autocomplete
                style={{ width: "100%" }}
                id="select"
                options={memoryData || []}
                getOptionLabel={(option) => option}
                inputValue={formValues?.memorys}
                defaultValue={formValues?.memorys || ""}
                onInputChange={(event, newInputValue) => {
                  setFormValues({
                    ...formValues,
                    memorys: newInputValue,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Bộ nhớ"
                    name="memorys"
                    style={{ maxWidth: "300px" }}
                  />
                )}
              /> */}
              <div className="">
                Bộ nhớ :{" "}
                <mark className="p-2 text-white bg-green-500 rounded-md">
                  {dataDetail?.memory}
                </mark>{" "}
              </div>
            </div>
            <div
              className={`my-5 ${
                dataDetail?.stocking === true
                  ? "text-green-500 text-sm"
                  : "text-red-500 text-sm"
              } `}
            >
              <span>
                {dataDetail?.stocking === true ? "Còn hàng" : "Tạm hết"}
              </span>
            </div>
            <div className="my-5">
              <span className="text-2xl text-red-500 font-medium">
                {dataDetail?.price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <div className="my-5 mt-10 flex gap-x-5">
              <Button
                onClick={() => handlePayment(dataDetail)}
                type="submit"
                className="mx-0"
              >
                Mua ngay
              </Button>
              <Button
                onClick={() => handleAddToCart(dataDetail)}
                className="mx-0"
                type="submit"
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
            <div className="mt-10">
              <h1 className="text-xl font-semibold mb-5">
                {`Cấu hình chi tiết ${dataDetail?.name}`}
              </h1>
              <div className="">
                <ul>
                  <li className="p-4 bg-slate-300 flex items-center gap-x-5">
                    <p>Màn hình : </p>
                    <div className="">{dataDetail?.display}</div>
                  </li>
                  <li className="p-4 bg-white flex items-center gap-x-5">
                    <p>Hệ điều hành : </p>
                    <div className="">{dataDetail?.heDieuHanh}</div>
                  </li>
                  <li className="p-4 bg-slate-300 flex items-center gap-x-5">
                    <p>Camera trước: </p>
                    <div className="">{dataDetail?.camera_truoc}</div>
                  </li>
                  <li className="p-4 bg-white flex items-center gap-x-5">
                    <p>Camera sau : </p>
                    <div className="">{dataDetail?.camera_sau}</div>
                  </li>
                  <li className="p-4 bg-slate-300 flex items-center gap-x-5">
                    <p>Chip : </p>
                    <div className="">{dataDetail?.chip}</div>
                  </li>
                  <li className="p-4 bg-white flex items-center gap-x-5">
                    <p>Ram : </p>
                    <div className="">{dataDetail?.ram}</div>
                  </li>
                  <li className="p-4 bg-slate-300 flex items-center gap-x-5">
                    <p>SIM : </p>
                    <div className="">{dataDetail?.sim}</div>
                  </li>
                  <li className="p-4 bg-white flex items-center gap-x-5">
                    <p>Pin , Sạc : </p>
                    <div className="">{dataDetail?.pin_sac}</div>
                  </li>
                  <li className="p-4 bg-slate-300 flex items-center gap-x-5">
                    <p>Thiết kế : </p>
                    <div className="">{dataDetail?.thietke}</div>
                  </li>
                  <li className="p-4 bg-white flex items-center gap-x-5">
                    <p>Chất liệu : </p>
                    <div className="">{dataDetail?.chatlieu}</div>
                  </li>
                  <li className="p-4 bg-slate-300 flex items-center gap-x-5">
                    <p>Kích thước , khối lượng : </p>
                    <div className="">{dataDetail?.kichthuoc_khoiluong}</div>
                  </li>
                  <li className="p-4 bg-white flex items-center gap-x-5">
                    <p>Thời điểm ra mắt : </p>
                    <div className="">{dataDetail?.thoidiemramat}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutCustomer>
  );
};

export default ProductDetail;
