import React from "react";
import { useForm } from "react-hook-form";
import ActionButton from "../../../../../shared/components/ActionButton";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputSearch from "../../../../../components/input/InputSearch";
import { HiOutlineSearch } from "react-icons/hi";

const UserFilterPage = (props) => {
  const schemaValidation = Yup.object().shape({
    user: Yup.string().required("Please enter your key"),
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
      <h1 className="font-semibold text-2xl">Người dùng</h1>
      <div>
        <InputSearch
          placeholder="Nhập để tìm kiếm ..."
          control={control}
          name="user"
          type="text"
        >
          <HiOutlineSearch></HiOutlineSearch>
        </InputSearch>
      </div>
      <div className="">
        <ActionButton
          actionCreateDialog={openCreateDialog}
          title="Thêm người dùng"
        />
      </div>
    </div>
  );
};

export default UserFilterPage;
