import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import InputSearch from "../../../../../components/input/InputSearch";
import ActionButton from "../../../../../shared/components/ActionButton";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
const BrandFilterPage = (props) => {
  const schemaValidation = Yup.object().shape({
    danhmuc: Yup.string().required("Please enter your key"),
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
      <h1 className="font-semibold text-2xl">Nhà sản xuất</h1>
      <div>
        <InputSearch
          placeholder="Nhập để tìm kiếm ..."
          control={control}
          name="brand"
          type="text"
        >
          <HiOutlineSearch></HiOutlineSearch>
        </InputSearch>
      </div>
      <div className="">
        <ActionButton actionCreateDialog={openCreateDialog} />
      </div>
    </div>
  );
};

export default BrandFilterPage;
