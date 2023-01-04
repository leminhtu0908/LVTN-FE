import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import InputAdmin from "../../../components/input/InputAdmin";

const PaymentInfo = (props) => {
  const {
    tinhState: { data },
  } = useSelector(
    (state) => ({
      tinhState: state.tinh,
    }),
    shallowEqual
  );
  const [formValues, setFormValues] = useState(props.valuesSubmit);
  const [huyenData, setHuyenData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [ward, setWard] = useState([]);
  const [wardData, setWardData] = useState([]);
  const [tinhData, setTinhData] = useState([]);
  useEffect(() => {
    if (formValues.tinh != null) {
      const p = data?.find((item) => {
        return item.name === formValues.tinh;
      });
      if (p) {
        setHuyenData(p.districts);
      }
    }
  }, [data, formValues.tinh]);
  useEffect(() => {
    if (formValues.huyen != null) {
      const p = huyenData?.find((item) => {
        return item.name === formValues.huyen;
      });
      if (p) {
        setWardData(p.wards);
      }
    }
  }, [formValues.huyen, huyenData]);
  useEffect(() => {
    setDistricts(huyenData?.map((item) => item.name));
  }, [huyenData]);
  useEffect(() => {
    setTinhData(data?.map((item) => item.name));
  }, [data]);
  useEffect(() => {
    setWard(wardData?.map((item) => item.name));
  }, [wardData]);
  return (
    <div className="w-full">
      <h1>
        Thông tin khách hàng (Khách hàng cần nhập thông tin người nhận chính
        xác)
      </h1>
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
        <Autocomplete
          style={{ width: "100%" }}
          id="select"
          options={tinhData || []}
          getOptionLabel={(option) => option}
          inputValue={formValues?.tinh}
          defaultValue={formValues?.tinh || ""}
          onInputChange={(event, newInputValue) => {
            setFormValues({
              ...formValues,
              tinh: newInputValue,
            });
            const cloneValue = {
              ...formValues,
              tinh: newInputValue,
            };
            props.onChangeFormValue(cloneValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label=""
              name="tinh"
              style={{ minWidth: "235px" }}
              placeholder={"Tỉnh / Thành phố"}
            />
          )}
        />
      </div>
      <div className="mt-5">
        <Autocomplete
          style={{ width: "100%" }}
          id="select"
          options={districts || []}
          getOptionLabel={(option) => option}
          inputValue={formValues?.huyen}
          defaultValue={formValues?.huyen || ""}
          onInputChange={(event, newInputValue) => {
            setFormValues({
              ...formValues,
              huyen: newInputValue,
            });
            const cloneValue = {
              ...formValues,
              huyen: newInputValue,
            };
            props.onChangeFormValue(cloneValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label=""
              name="huyen"
              style={{ minWidth: "235px" }}
              placeholder={"Quận / Huyện"}
            />
          )}
        />
      </div>
      <div className="mt-5">
        <Autocomplete
          style={{ width: "100%" }}
          id="select"
          options={ward || []}
          getOptionLabel={(option) => option}
          inputValue={formValues?.xa}
          defaultValue={formValues?.xa || ""}
          onInputChange={(event, newInputValue) => {
            setFormValues({
              ...formValues,
              xa: newInputValue,
            });
            const cloneValue = {
              ...formValues,
              xa: newInputValue,
            };
            props.onChangeFormValue(cloneValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label=""
              name="xa"
              style={{ minWidth: "235px" }}
              placeholder={"Xã / Phường"}
            />
          )}
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
