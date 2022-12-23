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
    pin_sac: "",
    ram: "",
    memory: "",
  };
  const [formValues, setFormValues] = useState(props?.filter);
  const [value1, setValue1] = React.useState([500000, 50000000]);
  const [newDataMemory, setNewDataMemory] = useState([]);
  const [valuesInput, setValueInput] = React.useState({
    price_in: 500000,
    price_to: 50000000,
  });
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
    const cloneValues = {
      ...formValues,
      ...valuesInput,
    };
    props.onSearch(cloneValues);
  };
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
      setValueInput({
        ...valuesInput,
        price_in: Math.min(newValue[0], value1[1] - minDistance),
      });
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
      setValueInput({
        ...valuesInput,
        price_to: Math.max(newValue[1], value1[0] + minDistance),
      });
    }
  };
  const handleRangeInput = (e) => {
    const { name, value } = e.target;
    setValueInput({
      ...valuesInput,
      [name]: value,
    });
    // setValue1([...valuesInput, value]);
  };
  const handleReset = (e) => {
    e.preventDefault();

    setValueInput({
      price_in: 500000,
      price_to: 50000000,
    });
    setValue1([500000, 50000000]);
    setFormValues({
      name: "",
      display: "",
      pin_sac: "",
      ram: "",
      memory: "",
      brand: "",
      typeProduct: "",

      price: "",
      price_in: 500000,
      price_to: 50000000,
    });
    props.onSearch({
      name: "",
      display: "",
      pin_sac: "",
      ram: "",
      memory: "",
      brand: "",
      typeProduct: "",
      price: "",
      price_in: 500000,
      price_to: 50000000,
    });
  };
  useEffect(() => {
    setNewDataMemory(dataMemorys?.map((item) => item.name));
  }, [dataMemorys]);

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
          value={formValues.display}
          onChange={handleChange}
          fullWidth
        />
      </div>
      <div className="mb-5">
        <Autocomplete
          autoComplete
          id="auto-combobox-brand"
          options={newDataMemory || []}
          getOptionLabel={(option) => option}
          inputValue={formValues.memory}
          onInputChange={(event, newInputValue) => {
            setFormValues({
              ...formValues,
              memory: newInputValue,
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="form-control"
              label="Bộ nhớ"
              variant="outlined"
              name="memory"
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
          value={formValues.pin_sac}
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
          value={formValues.ram}
          name="ram"
          fullWidth
        />
      </div>
      <div className="mb-5">
        <div className="flex items-center">
          <TextField
            id="outlined-basic"
            // onChange={handleRangeInput}
            value={Number(valuesInput.price_in).toLocaleString("en")}
            name="price_in"
          />
          <span>-</span>
          <TextField
            id="outlined-basic"
            // onChange={handleRangeInput}
            name="price_to"
            value={Number(valuesInput.price_to).toLocaleString("en")}
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
        <Button
          type="button"
          onClick={handleReset}
          className="mx-0 w-full h-full px-4 py-4 text-[15px] flex items-center justify-center gap-x-2 bg-red-500 mt-5"
        >
          Bỏ chọn
        </Button>
      </div>
    </form>
  );
};

export default ContentFilterPage;
