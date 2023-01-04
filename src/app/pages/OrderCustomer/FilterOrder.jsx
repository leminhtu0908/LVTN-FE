import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputSearch from "../../../components/input/InputSearch";
import { Button } from "../../../components/button";

const FilterOrder = (props) => {
  //   const schemaValidation = Yup.object().shape({
  //     order_id: Yup.string().required("Vui lòng nhập mã đơn hàng"),
  //   });
  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
  const handleFilter = (values) => {
    props.onSearch(values);
  };
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-semibold text-2xl">Lịch sử đặt hàng</h1>
      <form onSubmit={handleSubmit(handleFilter)}>
        <div className="flex gap-x-2">
          <InputSearch
            placeholder="Nhập mã đơn hàng..."
            control={control}
            name="orderId"
            type="text"
          ></InputSearch>
          <Button type="submit" className="py-2">
            Lọc
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FilterOrder;
