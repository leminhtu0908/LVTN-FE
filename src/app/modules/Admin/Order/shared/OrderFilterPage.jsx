import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../../../../../components/button/Button";
import ActionButton from "../../../../../shared/components/ActionButton";
const list = [
  { name: "Đang chờ duyệt", status: false },
  { name: "Đã duyệt", status: true },
  { name: "Tất cả", status: "" },
];
const OrderFilterPage = (props) => {
  const [formValues, setFormValues] = useState(props.filter);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(list?.map((item) => item.name));
  }, []);

  const openCreateDialog = () => {
    props.openCreate();
  };
  const handleFilter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const checkValues = () => {
      if (formValues.allow_status === "Đã duyệt") {
        return { allow_status: true };
      } else if (formValues.allow_status === "Đang chờ duyệt") {
        return { allow_status: false };
      } else {
        return { allow_status: "" };
      }
    };
    props.onSearch(checkValues);
  };
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-semibold text-2xl">Quản lý đơn hàng</h1>
      <form action="post" onSubmit={handleFilter}>
        <div className="flex gap-x-2">
          <Autocomplete
            style={{ width: "200px" }}
            id="select"
            options={data || []}
            getOptionLabel={(option) => option}
            inputValue={formValues?.allow_status.toString()}
            // defaultValue={formValues?.allow_status || ""}
            onInputChange={(event, newInputValue) => {
              setFormValues({
                ...formValues,
                allow_status: newInputValue,
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Đơn hàng"
                name="allow_status"
              />
            )}
          />
          <Button type="submit" className="py-2" onClick={handleFilter}>
            Lọc
          </Button>
        </div>
      </form>
      <div className="">
        <ActionButton
          export
          actionCreateDialog={openCreateDialog}
          title="Xuất tất cả đơn hàng"
        />
      </div>
    </div>
  );
};

export default OrderFilterPage;
