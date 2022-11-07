import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Field } from "../../../../components/field";
import Input from "../../../../components/input/Input";
import * as Yup from "yup";
import InputAdmin from "../../../../components/input/InputAdmin";
import { Button } from "../../../../components/button";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "./_redux/productAction";
import * as categoryAction from "../DanhMuc/_redux/danhMucAction";
import * as brandAction from "../Brand/_redux/brandAction";
import * as typeProductAction from "../TypeProduct/_redux/typeproductAction";
import * as memoryAction from "../Memory/_redux/memoryAction";
import * as colorAction from "../Color/_redux/colorAction";
import Label from "../../../../components/label/Label";
import { toast } from "react-toastify";
import { BsTrash } from "react-icons/bs";
import ReactQuill from "react-quill";
import axios from "axios";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ProductCreateDialog = (props) => {
  const defaultValues = {
    category_id: "",
    brand_id: "",
    typeProduct_id: "",
    memory: "",
    color: "",
  };
  const defaultFilter = {
    name: "",
  };
  const [filter, setFilter] = useState(defaultFilter);
  const [formValue, setFormValue] = useState(defaultValues);
  const [thumb, setThumb] = useState("");
  const [typeFile, setTypeFile] = useState("");
  const [content, setContent] = useState("");
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
  };
  const {
    currentState,
    categoryState,
    brandState,
    typeProductState,
    memoryState,
    colorState,
  } = useSelector(
    (state) => ({
      currentState: state.products,
      categoryState: state.categorys,
      brandState: state.brands,
      typeProductState: state.typeProducts,
      memoryState: state.memorys,
      colorState: state.colors,
    }),
    shallowEqual
  );
  const { data: categoryData } = categoryState;
  const { data: brandData } = brandState;
  const { data: typeProductData } = typeProductState;
  const { data: memoryData } = memoryState;
  const { data: colorData } = colorState;
  const dispatch = useDispatch();
  const schemaValidation = Yup.object().shape({
    product_id: Yup.string().required("Vui lòng nhập mã sản phẩm"),
    name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
    price: Yup.string().required("Vui lòng nhập giá"),
    display: Yup.string().required("Vui lòng nhập màn hình"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
    defaultValues: props.isEdit
      ? {
          product_id: "",
          name: "",
          price: "",
          display: "",
          soluong_sanpham: 0,
          title: "",
          heDieuHanh: "",
          camera_truoc: "",
          camera_sau: "",
          chip: "",
          ram: "",
          dungluongluutru: "",
          sim: "",
          pin_sac: "",
          thietke: "",
          chatlieu: "",
          kichthuoc_khoiluong: "",
          thoidiemramat: "",
        }
      : {
          product_id: "",
          name: "",
          price: "",
          display: "",
          soluong_sanpham: 0,
        },
  });
  useEffect(() => {
    if (props.isEdit) {
      reset(props.data);
      const filterMemory = props.data.memorys?.map((item) => item.name);
      const filterColor = props.data.colors?.map((item) => item.name);
      setFormValue({
        category_id: props.data.category._id,
        brand_id: props.data.brand._id,
        typeProduct_id: props.data.typeProduct._id,
        memory: filterMemory,
        color: filterColor,
      });
      setContent(props.data.content);
      setThumb(props.data.image);
    } else if (!props.isEdit) {
      reset({
        product_id: "",
        name: "",
        price: "",
        display: "",
        soluong_sanpham: 0,
      });
      setThumb("");
      setContent("");
      setFormValue(defaultValues);
    }
  }, [props.data, props.isEdit, reset]);

  useEffect(() => {
    dispatch(categoryAction.fetchCategories({ params: { ...filter } }));
    dispatch(brandAction.fetchBrands({ params: { ...filter } }));
    dispatch(typeProductAction.fetchTypeProducts({ params: { ...filter } }));
    dispatch(memoryAction.fetchMemories({ params: { ...filter } }));
    dispatch(colorAction.fetchColors({ params: { ...filter } }));
  }, [dispatch, filter]);
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/api/image/upload-photo`,
            data: bodyFormData,
          });
          return response.data.image.image;
        },
      },
    }),
    []
  );
  const handleSelectDropdown = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleChangeImage = (e) => {
    if (
      e.target.files[0]?.type === "image/jpeg" ||
      e.target.files[0]?.type === "image/png" ||
      e.target.files[0]?.type === "image/jpg"
    ) {
      if (e.target && e.target.files[0]) {
        setTypeFile("image");
        setThumb(URL?.createObjectURL(e.target.files[0]));
      } else {
        toast.warning("Please choose file");
      }
    }
  };
  const handleResetFileChoosen = () => {
    setThumb(null);
  };
  const handleSumitCategory = async (values) => {
    const { category_id, brand_id, typeProduct_id, memory, color } = formValue;
    const memoryConvert = Array.from(memory);
    const colorConvert = Array.from(color);
    if (!isValid) return;
    const cloneValue = {
      ...values,
      category_id,
      brand_id,
      typeProduct_id,
      memorys: memoryConvert,
      colors: colorConvert,
      content: content,
    };
    console.log(cloneValue);
    if (props.isEdit) {
      const cloneValueUpdate = {
        ...cloneValue,
        id: props.data._id,
      };
      const formData = new FormData();
      const imageFile = document.getElementById("imageProduct");
      formData.append("image", imageFile.files[0]);
      formData.append("data", JSON.stringify(cloneValueUpdate));
      dispatch(actions.updateProduct(formData));
    } else {
      const formData = new FormData();
      const imageFile = document.getElementById("imageProduct");
      formData.append("image", imageFile.files[0]);
      formData.append("data", JSON.stringify(cloneValue));
      dispatch(actions.createProduct(formData));
    }
    props.closeCreateDialog(false);
  };
  return (
    <>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        maxWidth="xl"
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        {props.isEdit ? (
          <DialogTitle>{"Cập nhật sản phẩm"}</DialogTitle>
        ) : (
          <DialogTitle>{"Thêm sản phẩm"}</DialogTitle>
        )}
        <div className="p-4">
          <form onSubmit={handleSubmit(handleSumitCategory)}>
            <div className="flex gap-x-5">
              <Field>
                <Label>Mã sản phẩm</Label>
                <InputAdmin type="text" control={control} name="product_id" />
                {errors && (
                  <p className="text-red-600">{errors.product_id?.message}</p>
                )}
              </Field>
              <Field>
                <Label>Tên sản phẩm</Label>
                <InputAdmin type="text" control={control} name="name" />
                {errors && (
                  <p className="text-red-600">{errors.name?.message}</p>
                )}
              </Field>
              <Field>
                <Label>Giá</Label>
                <InputAdmin type="text" control={control} name="price" />
                {errors && (
                  <p className="text-red-600">{errors.price?.message}</p>
                )}
              </Field>
            </div>
            <div className="flex gap-x-5">
              <Field>
                <Label>Màn hình</Label>
                <InputAdmin type="text" control={control} name="display" />
                {errors && (
                  <p className="text-red-600">{errors.display?.message}</p>
                )}
              </Field>
              <Field>
                <Label>Số lượng sản phẩm</Label>
                <InputAdmin
                  type="text"
                  control={control}
                  name="soluong_sanpham"
                />
                {errors && (
                  <p className="text-red-600">
                    {errors.soluong_sanpham?.message}
                  </p>
                )}
              </Field>
              <Field>
                <Label>Ảnh</Label>
                <label
                  className={`cursor-pointer w-[230px] flex items-center gap-x-2 justify-center bg-gray-100 rounded-lg relative group overflow-hidden`}
                >
                  <input
                    type="file"
                    name="image"
                    id="imageProduct"
                    className="hidden-input"
                    onChange={handleChangeImage}
                  />
                  {!thumb ? (
                    <div className="flex flex-col items-center text-center pointer-events-none">
                      <img
                        srcSet="/img/img-upload.png"
                        alt="upload-img"
                        className="max-w-[80px] mb-5"
                      />
                      <p className="font-semibold">Choose photo</p>
                    </div>
                  ) : (
                    <React.Fragment>
                      <img
                        src={thumb}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      <button
                        className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer z-10  opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible"
                        onClick={handleResetFileChoosen}
                        type="button"
                      >
                        <BsTrash className="text-red-500 text-4xl"></BsTrash>
                      </button>
                    </React.Fragment>
                  )}
                </label>
              </Field>
            </div>
            <div className="flex gap-x-5 justify-between">
              <Field>
                <Label>Danh mục</Label>
                <div className="custom-selector">
                  <select
                    onChange={handleSelectDropdown}
                    name="category_id"
                    value={formValue.category_id}
                    className="custom-select w-[236px] p-4 bg-primary border border-gray-100 rounded-lg  outline-none focus:border-blue-500 transition-all dark:text-black "
                  >
                    {props.isEdit ? null : <option value={null}></option>}
                    {categoryData?.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>
              <Field>
                <Label>Hãng sản xuất</Label>
                <div className="custom-selector">
                  <select
                    onChange={handleSelectDropdown}
                    name="brand_id"
                    value={formValue.brand_id}
                    className="custom-select w-[236px] p-4 bg-primary border border-gray-100 rounded-lg  outline-none focus:border-blue-500 transition-all dark:text-black "
                  >
                    {props.isEdit ? null : <option value={null}></option>}
                    {brandData?.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>
              <Field>
                <Label>Loại sản phẩm</Label>
                <div className="custom-selector">
                  <select
                    onChange={handleSelectDropdown}
                    name="typeProduct_id"
                    value={formValue.typeProduct_id}
                    className="custom-select w-[236px] p-4 bg-primary border border-gray-100 rounded-lg  outline-none focus:border-blue-500 transition-all dark:text-black "
                  >
                    {props.isEdit ? null : <option value={null}></option>}
                    {typeProductData?.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>
            </div>
            <div className="flex gap-x-5">
              <Field>
                <Label>Bộ nhớ</Label>
                <Autocomplete
                  multiple
                  style={{ width: "100%" }}
                  id="select"
                  options={memoryData || []}
                  getOptionLabel={(option) => option.name}
                  defaultValue={
                    formValue?.memory?.length > 0
                      ? formValue?.memory?.map((item) => item.split(","))
                      : []
                  }
                  onChange={(event, newInputValue) => {
                    setFormValue({
                      ...formValue,
                      memory: newInputValue.map((item) => item._id),
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label=""
                      style={{ minWidth: "235px" }}
                      placeholder={"Bộ nhớ"}
                    />
                  )}
                />
              </Field>
              <Field>
                <Label>Màu sắc</Label>
                <Autocomplete
                  multiple
                  style={{ width: "100%" }}
                  id="select"
                  options={colorData || []}
                  getOptionLabel={(option) => option.name}
                  defaultValue={
                    formValue?.color?.length > 0
                      ? formValue?.color?.map((item) => item.split(","))
                      : []
                  }
                  onChange={(event, newInputValue) => {
                    setFormValue({
                      ...formValue,
                      color: newInputValue.map((item) => item._id),
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label=""
                      style={{ minWidth: "235px" }}
                      placeholder="Màu sắc"
                    />
                  )}
                />
              </Field>
            </div>
            <div className="">
              <Field>
                <Label>Tin tức về sản phẩm</Label>
                <div className="w-full entry-content quill">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    modules={modules}
                    onChange={setContent}
                  />
                </div>
              </Field>
            </div>
            {props.isEdit && (
              <>
                <mark className="p-2 rounded-lg">
                  <Label>Chi tiết sản phẩm</Label>
                </mark>
                <div className="flex gap-x-5 mt-10">
                  <Field>
                    <Label>Tiêu đề</Label>
                    <InputAdmin type="text" control={control} name="title" />
                  </Field>
                  <Field>
                    <Label>Hệ điều hành</Label>
                    <InputAdmin
                      type="text"
                      control={control}
                      name="heDieuHanh"
                    />
                  </Field>
                  <Field>
                    <Label>Camera trước</Label>
                    <InputAdmin
                      type="text"
                      control={control}
                      name="camera_truoc"
                    />
                  </Field>
                </div>
                <div className="flex gap-x-5 mt-10">
                  <Field>
                    <Label>Camera sau</Label>
                    <InputAdmin
                      type="text"
                      control={control}
                      name="camera_sau"
                    />
                  </Field>
                  <Field>
                    <Label>Chip</Label>
                    <InputAdmin type="text" control={control} name="chip" />
                  </Field>
                  <Field>
                    <Label>Ram</Label>
                    <InputAdmin type="text" control={control} name="ram" />
                  </Field>
                </div>
                <div className="flex gap-x-5 mt-10">
                  <Field>
                    <Label>Dung lượng lưu trữ</Label>
                    <InputAdmin
                      type="text"
                      control={control}
                      name="dungluongluutru"
                    />
                  </Field>
                  <Field>
                    <Label>Sim</Label>
                    <InputAdmin type="text" control={control} name="sim" />
                  </Field>
                  <Field>
                    <Label>Pin & Sạc</Label>
                    <InputAdmin type="text" control={control} name="pin_sac" />
                  </Field>
                </div>
                <div className="flex gap-x-5 mt-10">
                  <Field>
                    <Label>Thiết kế</Label>
                    <InputAdmin type="text" control={control} name="thietke" />
                  </Field>
                  <Field>
                    <Label>Chất liệu</Label>
                    <InputAdmin type="text" control={control} name="chatlieu" />
                  </Field>
                  <Field>
                    <Label>Kích thước & Khối lượng</Label>
                    <InputAdmin
                      type="text"
                      control={control}
                      name="kichthuoc_khoiluong"
                    />
                  </Field>
                </div>
                <div className="flex gap-x-5 mt-10">
                  <Field>
                    <Label>Thời điểm ra mắt</Label>
                    <InputAdmin
                      type="text"
                      control={control}
                      name="thoidiemramat"
                    />
                  </Field>
                </div>
              </>
            )}
            <div className="flex items-center justify-end gap-x-3 mt-5 ">
              <Button
                className="bg-red-600 mx-0"
                onClick={handleCloseDialog}
                type="button"
              >
                Hủy
              </Button>
              <Button type="submit" className="mx-0">
                {props.isEdit ? "Cập nhật" : "Thêm"}
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default ProductCreateDialog;
