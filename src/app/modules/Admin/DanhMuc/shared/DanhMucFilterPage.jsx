import React from "react";
import { useForm } from "react-hook-form";
import ActionButton from "../../../../../shared/components/ActionButton";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputSearch from "../../../../../components/input/InputSearch";
import { HiOutlineSearch } from "react-icons/hi";

const DanhMucFilterPage = (props) => {
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
      <h1 className="font-semibold text-2xl">Danh mục</h1>
      <div>
        <InputSearch
          placeholder="Nhập để tìm kiếm ..."
          control={control}
          name="danhmuc"
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

export default DanhMucFilterPage;
