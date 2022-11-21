import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import InputAdmin from "../../../components/input/InputAdmin";

const PaymentInfo = (props) => {
  return (
    <div className="w-full">
      <h1>Thông tin khách hàng</h1>
      <div className="mt-5">
        <InputAdmin
          placeholder="Họ và tên"
          name="name"
          control={props.control}
        />
      </div>
      <div className="mt-5">
        <InputAdmin
          placeholder="Số điện thoại"
          name="phone"
          control={props.control}
        />
      </div>
      <div className="mt-5">
        <InputAdmin placeholder="Email" name="email" control={props.control} />
      </div>
      <div className="mt-5">
        {/* <InputAdmin
          placeholder="Tỉnh / Thành Phố"
          name="tinh"
          control={props.control}
        /> */}
        <Autocomplete
          style={{ width: "100%" }}
          id="select"
          options={props?.tinh || []}
          getOptionLabel={(option) => option.name}
          // defaultValue={
          // }
          // onChange={(event, newInputValue) => {
          //   setFormValue({
          //     ...formValue,
          //     memory: newInputValue.map((item) => item._id),
          //   });
          // }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label=""
              style={{ minWidth: "235px" }}
              placeholder={"Tỉnh / Thành phố"}
            />
          )}
        />
      </div>
      <div className="mt-5">
        <InputAdmin
          placeholder="Quận / Huyện"
          name="huyen"
          control={props.control}
        />
      </div>
      <div className="mt-5">
        <InputAdmin
          placeholder="Số nhà, tên đường"
          name="sonha"
          control={props.control}
        />
      </div>
    </div>
  );
};

export default PaymentInfo;
