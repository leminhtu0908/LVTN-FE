import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as danhmucAction from "../../modules/Admin/DanhMuc/_redux/danhMucAction";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";
import InputCustomer from "../../../components/input/InputCustomer";
import { useForm } from "react-hook-form";
import Button from "../../../components/button/Button";
import { BsSearch } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { Autocomplete, TextField } from "@mui/material";
import * as brandAction from "../../modules/Admin/Brand/_redux/brandAction";
import * as memoryAction from "../../modules/Admin/Memory/_redux/memoryAction";
import * as typeProductAction from "../../modules/Admin/TypeProduct/_redux/typeproductAction";
// function makeTitle(slug) {
//   var words = slug.split("-");

//   for (var i = 0; i < words.length; i++) {
//     var word = words[i];
//     words[i] = word.charAt(0).toUpperCase() + word.slice(1);
//   }

//   return words.join(" ");
// }
const prices = [
  { label: "Dưới 5 triệu", year: 1994 },
  { label: "Từ 5 - 10 triệu", year: 1972 },
  { label: "Từ 10 - 20 triệu", year: 1974 },
  { label: "Trên 20 triệu", year: 2008 },
];
const sorts = [{ label: "Từ thấp đến cao" }, { label: "Từ cao đến thấp" }];
const ContentPage = () => {
  const defaultValue = {
    name: "",
    brand: "",
    display: "",
    price: "",
    pin_sac: "",
    memorys: "",
    typeProduct: "",
    ram: "",
  };
  const [formValues, setFormValues] = useState(defaultValue);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { currentState, brandState, memorysState, typeProductState } =
    useSelector(
      (state) => ({
        currentState: state.categorys,
        brandState: state.brands,
        memorysState: state.memorys,
        typeProductState: state.typeProducts,
      }),
      shallowEqual
    );
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
  });
  const { productData } = currentState;
  const { data: dataBrand } = brandState;
  const { data: dataMemorys } = memorysState;
  const { data: dataTypeProduct } = typeProductState;
  useEffect(() => {
    dispatch(
      danhmucAction.fetchOneCategoryCustomer({ params: { name: slug } })
    );
  }, [dispatch, slug]);
  useEffect(() => {
    dispatch(brandAction.fetchBrands());
    dispatch(memoryAction.fetchMemories());
    dispatch(typeProductAction.fetchTypeProducts());
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  return (
    <LayoutCustomer>
      <div className={`${slug === "djien-thoai" && "flex"} `}>
        {slug === "djien-thoai" && (
          <div className="basis-[20%] p-4 bg-slate-200">
            <h1 className="text-2xl mb-10 font-semibold">Bộ lọc</h1>
            <div className="mb-5">
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
            </div>
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
                    memorys: newInputValue,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="form-control"
                    label="Dung lượng lưu trữ"
                    variant="outlined"
                    name="memorys"
                  />
                )}
              />
            </div>
            <div className="mb-5">
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
            </div>
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
            <div className="mb-5">
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
            </div>
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
            <div className="">
              <Button
                type="submit"
                className="mx-0 w-full h-full px-4 py-4 text-[15px] flex items-center justify-center gap-x-2 bg-blue-500"
              >
                <FiFilter></FiFilter> Lọc
              </Button>
            </div>
          </div>
        )}
        <div className={`${slug === "djien-thoai" && "basis-[80%]"} `}>
          {slug === "djien-thoai" && (
            <div className="py-4 mb-5 bg-slate-200">
              <div className="flex">
                <div className="flex basis-[70%]">
                  <div className="basis-[70%]">
                    <InputCustomer
                      name="name"
                      className="bg-white"
                      control={control}
                      placeholder="Nhập tên sản phẩm ..."
                    />
                  </div>
                  <div className="">
                    <Button
                      type="submit"
                      className="mx-0 w-full h-full px-4 py-4 text-[15px] flex items-center justify-center gap-x-2 bg-green-500 rounded-l-none"
                    >
                      <BsSearch></BsSearch> Tìm kiếm
                    </Button>
                  </div>
                </div>
                <div className="flex-1">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={sorts}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sắp xếp" />
                    )}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="p-4 grid md:grid-cols-3 lg:grid-cols-4 gap-2">
            {productData?.products?.map((product) => (
              <div
                key={product.product_id}
                className="flex flex-col h-full w-full max-w-[250px] bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="# ">
                  <img
                    className="p-4 h-[250px] object-cover rounded-t-lg"
                    src={product.image}
                    alt="productimage"
                  />
                </a>
                <div className="px-5 pb-5 flex flex-col flex-1">
                  <a href="# " className="hover:text-blue-500">
                    <h5 className="text-xl font-semibold">{product.name}</h5>
                  </a>
                  <div className="my-4">
                    <span>{product.display}</span>
                  </div>

                  <span className="text-lg mb-4 font-bold text-gray-900 dark:text-white">
                    {product.price.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                  <div className="flex items-center mt-2.5 mb-5">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>First star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Second star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Third star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Fourth star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Fifth star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                      5.0
                    </span>
                  </div>
                  <a
                    href="# "
                    className="text-white mt-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Thêm vào giỏ hàng
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutCustomer>
  );
};

export default ContentPage;
