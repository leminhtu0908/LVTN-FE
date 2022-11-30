import { Autocomplete, Slider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Button from "../../../components/button/Button";
import * as brandAction from "../../modules/Admin/Brand/_redux/brandAction";
import * as memoryAction from "../../modules/Admin/Memory/_redux/memoryAction";
import * as typeProductAction from "../../modules/Admin/TypeProduct/_redux/typeproductAction";
function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 1000000;
const ContentFilterPage = (props) => {
  const dispatch = useDispatch();
  const defaultValue = {
    name: "",
    display: "",
    // price: "",
    pin_sac: "",
    brand: "",
    ram: "",
    dung_luong_luu_tru: "",
    typeProduct: "",
  };
  const prices = [
    { label: "Dưới 5 triệu" },
    { label: "Từ 5 - 10 triệu" },
    { label: "Từ 10 - 20 triệu" },
    { label: "Trên 20 triệu" },
  ];
  const [formValues, setFormValues] = useState(defaultValue);
  const { brandState, memorysState, typeProductState } = useSelector(
    (state) => ({
      brandState: state.brands,
      memorysState: state.memorys,
      typeProductState: state.typeProducts,
    }),
    shallowEqual
  );
  const { data: dataBrand } = brandState;
  const { data: dataMemorys } = memorysState;
  const { data: dataTypeProduct } = typeProductState;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  useEffect(() => {
    dispatch(brandAction.fetchBrands());
    dispatch(memoryAction.fetchMemories());
    dispatch(typeProductAction.fetchTypeProducts());
  }, []);
  const handleSubmitFilterLeft = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.onSearch(formValues);
  };
  const [value1, setValue1] = React.useState([1000000, 5000000]);
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };
  return (
    <form
      onSubmit={(e) => handleSubmitFilterLeft(e)}
      className="basis-[20%] p-4 bg-slate-200"
    >
      <h1 className="text-2xl mb-[45px] font-semibold">Bộ lọc</h1>
      {/* <div className="mb-5">
        <Autocomplete
          autoComplete
          id="auto-combobox-brand"
          options={dataBrand || []}
          getOptionLabel={(option) => option?.name}
          inputValue={formValues?.brand}
          onInputChange={(event, newInputValue) => {
            setFormValues({
              ...formValues,
              brand: newInputValue,
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="form-control"
              label="Hãng sản xuất"
              variant="outlined"
              name="brand"
            />
          )}
        />
      </div> */}
      <div className="mb-5">
        <TextField
          id="outlined-basic"
          label="Màn hình"
          variant="outlined"
          name="display"
          onChange={handleChange}
          fullWidth
        />
      </div>
      <div className="mb-5">
        <Autocomplete
          autoComplete
          id="auto-combobox-brand"
          options={dataMemorys || []}
          getOptionLabel={(option) => option?.name}
          inputValue={formValues?.memorys}
          onInputChange={(event, newInputValue) => {
            setFormValues({
              ...formValues,
              dung_luong_luu_tru: newInputValue,
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="form-control"
              label="Bộ nhớ"
              variant="outlined"
              name="dung_luong_luu_tru"
            />
          )}
        />
      </div>
      {/* <div className="mb-5">
        <Autocomplete
          autoComplete
          id="auto-combobox-brand"
          options={prices || []}
          getOptionLabel={(option) => option?.label}
          inputValue={formValues?.price}
          onInputChange={(event, newInputValue) => {
            setFormValues({
              ...formValues,
              price: newInputValue,
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="form-control"
              label="Giá"
              variant="outlined"
              name="price"
            />
          )}
        />
      </div> */}
      <div className="mb-5">
        <TextField
          id="outlined-basic"
          label="Pin & Sạc"
          variant="outlined"
          name="pin_sac"
          onChange={handleChange}
          fullWidth
        />
      </div>
      {/* <div className="mb-5">
        <Autocomplete
          autoComplete
          id="auto-combobox-brand"
          options={dataTypeProduct || []}
          getOptionLabel={(option) => option?.name}
          inputValue={formValues?.typeProduct}
          onInputChange={(event, newInputValue) => {
            setFormValues({
              ...formValues,
              typeProduct: newInputValue,
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="form-control"
              label="Loại sản phẩm"
              variant="outlined"
              name="typeProduct"
            />
          )}
        />
      </div> */}
      <div className="mb-5">
        <TextField
          id="outlined-basic"
          label="Ram"
          variant="outlined"
          onChange={handleChange}
          name="ram"
          fullWidth
        />
      </div>
      <div className="mb-5">
        <div className="flex items-center">
          <TextField
            id="outlined-basic"
            onChange={handleChange1}
            value={value1}
            name="price_to"
          />
          <span>-</span>
          <TextField
            id="outlined-basic"
            onChange={handleChange1}
            name="price_in"
          />
        </div>
        <Slider
          min={500000}
          max={50000000}
          getAriaLabel={() => "Minimum distance"}
          value={value1}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
        />
      </div>
      <div className="">
        <Button
          type="submit"
          className="mx-0 w-full h-full px-4 py-4 text-[15px] flex items-center justify-center gap-x-2 bg-blue-500"
        >
          <FiFilter></FiFilter> Lọc
        </Button>
      </div>
    </form>
  );
};

export default ContentFilterPage;
