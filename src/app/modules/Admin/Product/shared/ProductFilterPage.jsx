import React from "react";
import { useForm } from "react-hook-form";
import ActionButton from "../../../../../shared/components/ActionButton";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputSearch from "../../../../../components/input/InputSearch";
import { HiOutlineSearch } from "react-icons/hi";

const ProductFilterPage = (props) => {
  const schemaValidation = Yup.object().shape({
    name: Yup.string().required("Please enter your key"),
  });
  const { control } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
  const openCreateDialog = () => {
    props.openCreate();
  };
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-semibold text-2xl">Sản phẩm</h1>
      <div>
        <InputSearch
          placeholder="Nhập để tìm kiếm ..."
          control={control}
          name="name"
          type="text"
        >
          <HiOutlineSearch></HiOutlineSearch>
        </InputSearch>
      </div>
      <div className="">
        <ActionButton
          actionCreateDialog={openCreateDialog}
          title="Thêm sản phẩm"
        />
      </div>
    </div>
  );
};

export default ProductFilterPage;
