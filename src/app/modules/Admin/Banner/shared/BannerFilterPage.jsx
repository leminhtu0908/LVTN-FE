import React from "react";
import { useForm } from "react-hook-form";
import ActionButton from "../../../../../shared/components/ActionButton";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputSearch from "../../../../../components/input/InputSearch";
import { HiOutlineSearch } from "react-icons/hi";

const BannerFilterPage = (props) => {
  const schemaValidation = Yup.object().shape({
    banner: Yup.string().required("Vui lòng nhập tên màu"),
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
      <h1 className="font-semibold text-2xl">Ảnh bìa quảng cáo</h1>
      {/* <div>
        <InputSearch
          placeholder="Nhập để tìm kiếm ..."
          control={control}
          name="color"
          type="text"
        >
          <HiOutlineSearch></HiOutlineSearch>
        </InputSearch>
      </div> */}
      <div className="">
        <ActionButton
          actionCreateDialog={openCreateDialog}
          title="Thêm ảnh bìa quảng cáo"
        />
      </div>
    </div>
  );
};

export default BannerFilterPage;
