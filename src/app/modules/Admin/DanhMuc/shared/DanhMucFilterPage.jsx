import React from "react";
import { useForm } from "react-hook-form";
import ActionButton from "../../../../../shared/components/ActionButton";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputSearch from "../../../../../components/input/InputSearch";
import { HiOutlineSearch } from "react-icons/hi";
import { Button } from "../../../../../components/button";

const DanhMucFilterPage = (props) => {
  // const schemaValidation = Yup.object().shape({
  //   name: Yup.string().required("Please enter your key"),
  // });
  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
  const openCreateDialog = () => {
    props.openCreate();
  };
  const handleFilter = (values) => {
    props.onSearch(values);
  };
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-semibold text-2xl">Danh mục</h1>
      <form onSubmit={handleSubmit(handleFilter)}>
        <div className="flex gap-x-2">
          <InputSearch
            placeholder="Nhập để tìm kiếm ..."
            control={control}
            name="name"
            type="text"
          >
            {/* <HiOutlineSearch onClick={handleClickFilter}></HiOutlineSearch> */}
          </InputSearch>
          <Button type="submit" className="py-2">
            Lọc
          </Button>
        </div>
      </form>
      <div className="">
        <ActionButton
          actionCreateDialog={openCreateDialog}
          title="Thêm danh mục"
        />
      </div>
    </div>
  );
};

export default DanhMucFilterPage;
