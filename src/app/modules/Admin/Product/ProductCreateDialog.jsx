import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Box,
  Dialog,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsTrash } from "react-icons/bs";
import ReactQuill from "react-quill";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Button } from "../../../../components/button";
import { Field } from "../../../../components/field";
import InputAdmin from "../../../../components/input/InputAdmin";
import Label from "../../../../components/label/Label";
import * as brandAction from "../Brand/_redux/brandAction";
import * as colorAction from "../Color/_redux/colorAction";
import * as categoryAction from "../DanhMuc/_redux/danhMucAction";
import * as memoryAction from "../Memory/_redux/memoryAction";
import * as typeProductAction from "../TypeProduct/_redux/typeproductAction";
import * as imageAction from "../Images/_redux/imageActions";
import * as actions from "./_redux/productAction";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ProductCreateDialog = (props) => {
  const defaultValues = {
    category_id: "",
    brand_id: "",
    typeProduct_id: "",
    memory: "",
    colors: "",
    imageMulti: "",
  };
  const defaultFilter = {
    name: "",
  };
  const [filter, setFilter] = useState(defaultFilter);
  const [formValue, setFormValue] = useState(defaultValues);
  const [thumb, setThumb] = useState("");
  const [typeFile, setTypeFile] = useState("");
  const fileRef = useRef(null);
  const [content, setContent] = useState("");
  const [isDragEnter, setIsDragEnter] = useState(false);
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
    imageState,
  } = useSelector(
    (state) => ({
      currentState: state.products,
      categoryState: state.categorys,
      brandState: state.brands,
      typeProductState: state.typeProducts,
      memoryState: state.memorys,
      colorState: state.colors,
      imageState: state.images,
    }),
    shallowEqual
  );
  const { data: categoryData } = categoryState;
  const { data: brandData } = brandState;
  const { data: typeProductData } = typeProductState;
  const { data: memoryData } = memoryState;
  const { data: colorData } = colorState;
  const { data: imageData } = imageState;
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
      const { brand, category, colors, typeProduct, imageMulti, ...field } =
        props.data;
      reset(field);
      // const filterColor = props.data.colors?.map((item) => item._id);
      setFormValue({
        category_id: props.data.category._id || "",
        brand_id: props.data.brand._id || "",
        typeProduct_id: props.data.typeProduct._id || "",
        memory: props.data.memory || "",
        colors: colors,
        imageMulti: imageMulti,
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
    dispatch(colorAction.fetchAllColor({ params: { ...filter } }));
    dispatch(imageAction.fetchImages({ param: {} }));
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
  const onDragLeave = (e) => {
    setIsDragEnter(false);
  };

  const onDragEnter = (e) => {
    setIsDragEnter(true);
  };

  const onDrop = (e) => {
    setIsDragEnter(false);
    const newFile = URL?.createObjectURL(e.dataTransfer.files?.[0]);
    setTypeFile("image");
    setThumb(newFile);
  };
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // Disable open image in new tab
    };
    window.addEventListener("dragover", handler);
    window.addEventListener("drop", handler);
    return () => {
      window.removeEventListener("dragover", handler);
      window.removeEventListener("drop", handler);
    };
  }, []);
  const handleResetFileChoosen = () => {
    setThumb(null);
  };
  const handleSumitCategory = async (values) => {
    if (!isValid) return;
    if (props.isEdit) {
      const colors = formValue.colors?.map((item) => item);
      const imageMulti = formValue.imageMulti?.map((item) => item);
      const cloneValueUpdate = {
        ...values,
        ...formValue,
        colors: colors,
        imageMulti: imageMulti,
        content: content,
        id: props.data._id,
      };
      const formData = new FormData();
      const imageFile = document.getElementById("imageProduct");
      formData.append("image", imageFile.files[0]);
      formData.append("data", JSON.stringify(cloneValueUpdate));
      dispatch(actions.updateProduct(formData));
    } else {
      const { colors, imageMulti } = formValue;
      const colorConvert = Array.from(colors);
      const imageMultiConvert = Array.from(imageMulti);
      const cloneValue = {
        ...values,
        ...formValue,
        colors: colorConvert,
        imageMulti: imageMultiConvert,
        content: content,
      };
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
            <div className="mb-10">
              <div className="flex items-center gap-x-5">
                <div className="basis-[20%]">
                  <Label>Mã sản phẩm : </Label>
                </div>
                <div className="flex-1">
                  <InputAdmin type="text" control={control} name="product_id" />
                  {errors && (
                    <p className="text-red-600">{errors.product_id?.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-10">
              <div className="flex items-center gap-x-5">
                <div className="basis-[20%]">
                  <Label>Tên sản phẩm :</Label>
                </div>
                <div className="flex-1">
                  <InputAdmin type="text" control={control} name="name" />
                  {errors && (
                    <p className="text-red-600">{errors.name?.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-10">
              <div className="flex items-center gap-x-5">
                <div className="basis-[20%]">
                  <Label>Giá :</Label>
                </div>
                <div className="flex-1">
                  <InputAdmin type="text" control={control} name="price" />
                  {errors && (
                    <p className="text-red-600">{errors.price?.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-10">
              <div className="flex items-center gap-x-5">
                <div className="basis-[20%]">
                  <Label>Màn hình : </Label>
                </div>
                <div className="flex-1">
                  <InputAdmin type="text" control={control} name="display" />
                  {errors && (
                    <p className="text-red-600">{errors.display?.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-10">
              <div className="flex items-center gap-x-5">
                <div className="basis-[20%]">
                  <Label>Số lượng sản phẩm : </Label>
                </div>
                <div className="flex-1">
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
                </div>
              </div>
            </div>
            <div className="mb-10">
              <div className="flex items-center gap-x-5">
                <div className="basis-[20%]">
                  <Label>Ảnh</Label>
                </div>
                <div className="flex-1">
                  <label
                    onDrop={onDrop}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    className={`border-dashed border border-green-500 cursor-pointer w-full flex items-center gap-x-2 justify-center bg-gray-100 rounded-lg relative group overflow-hidden`}
                  >
                    <input
                      ref={fileRef}
                      type="file"
                      name="image"
                      id="imageProduct"
                      className="hidden-input"
                      onChange={handleChangeImage}
                    />
                    {!thumb ? (
                      <div className="flex flex-col items-center text-center pointer-events-none py-5">
                        <img
                          srcSet="/img/img-upload.png"
                          alt="upload-img"
                          className="w-full h-[50px] mb-5"
                        />
                        <p className="font-semibold">
                          {isDragEnter ? "Thả ảnh vào đây" : "Chọn ảnh"}
                        </p>
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
                </div>
              </div>
            </div>
            <div className="mb-10">
              <div className="flex items-center gap-x-5">
                <div className="basis-[20%]">
                  <Label>Ảnh chi tiết : </Label>
                </div>
                <div className="flex-1">
                  <Autocomplete
                    id="country-select-demo"
                    sx={{ width: "100%" }}
                    options={imageData || []}
                    autoHighlight
                    multiple
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newInputValue) => {
                      setFormValue({
                        ...formValue,
                        imageMulti: newInputValue.map((item) => item),
                      });
                    }}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        <img
                          loading="lazy"
                          width="60"
                          src={`${option?.image}`}
                          srcSet={`${option?.image} 2x`}
                          alt=""
                        />
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Chọn ảnh cho sản phẩm"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                  <div className="flex gap-x-5 mt-5">
                    <span>Ảnh đã chọn :</span>
                    {formValue?.imageMulti?.length > 0
                      ? formValue?.imageMulti?.map((img) => (
                          <img
                            key={img._id}
                            src={img.image}
                            alt=""
                            className="w-[60px] h-[40px] object-cover"
                          />
                        ))
                      : props?.data?.imageMulti?.map((img) => (
                          <img
                            key={img._id}
                            src={img.image}
                            alt=""
                            className="w-[60px] h-[40px] object-cover"
                          />
                        ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-x-5">
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
                <div className="custom-selector">
                  <select
                    onChange={handleSelectDropdown}
                    name="memory"
                    value={formValue.memory}
                    className="custom-select w-[236px] p-4 bg-primary border border-gray-100 rounded-lg  outline-none focus:border-blue-500 transition-all dark:text-black "
                  >
                    {props.isEdit ? null : <option value={null}></option>}
                    {memoryData?.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>
              {/* <Field>
                <Autocomplete
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
              </Field> */}
              <Field>
                <Label>Màu sắc</Label>
                <Autocomplete
                  multiple
                  style={{ width: "100%" }}
                  id="select"
                  options={colorData || []}
                  getOptionLabel={(option) => option.name}
                  // defaultValues={props?.data?.colors?.map((item) =>
                  //   item.name?.split(",")
                  // )}
                  onChange={(event, newInputValue) => {
                    setFormValue({
                      ...formValue,
                      colors: newInputValue.map((item) => item),
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label=""
                      style={{ minWidth: "235px" }}
                      placeholder="Màu sắc"
                      name="colors"
                    />
                  )}
                />
                {props.isEdit && (
                  <>
                    <div className="flex gap-x-5">
                      <span>Màu đã lưu :</span>
                      {formValue?.colors?.length > 0
                        ? formValue?.colors?.map((color) => (
                            <span
                              key={color._id}
                              className="px-2 py-1 rounded-lg bg-green-600 text-white"
                            >
                              {color.name}
                            </span>
                          ))
                        : props?.data?.colors?.map((color) => (
                            <span
                              key={color._id}
                              className="px-2 py-1 rounded-lg bg-green-600 text-white"
                            >
                              {color.name}
                            </span>
                          ))}
                    </div>
                  </>
                )}
              </Field>
              <Field>
                <Label>Phần trăm giảm giá</Label>
                <InputAdmin type="text" control={control} name="discount" />
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
                  <div className="w-full">
                    <Label>Tiêu đề</Label>
                    <InputAdmin type="text" control={control} name="title" />
                  </div>
                  <div className="w-full">
                    <Label>Hệ điều hành</Label>
                    <InputAdmin
                      type="text"
                      control={control}
                      name="heDieuHanh"
                    />
                  </div>
                </div>
                <div className="flex gap-x-5 mt-10">
                  <div className="w-full">
                    <Label>Camera trước</Label>
                    <InputAdmin
                      type="text"
                      control={control}
                      name="camera_truoc"
                    />
                  </div>
                  <div className="w-full">
                    <Label>Camera sau</Label>
                    <InputAdmin
                      type="text"
                      control={control}
                      name="camera_sau"
                    />
                  </div>
                </div>
                <div className="flex gap-x-5 mt-10">
                  <div className="w-full">
                    <Label>Chip</Label>
                    <InputAdmin type="text" control={control} name="chip" />
                  </div>
                  <div className="w-full">
                    <Label>Ram</Label>
                    <InputAdmin type="text" control={control} name="ram" />
                  </div>
                </div>

                <div className="flex gap-x-5 mt-10">
                  <div className="w-full">
                    <Label>Dung lượng lưu trữ</Label>
                    <InputAdmin
                      type="text"
                      control={control}
                      name="dungluongluutru"
                    />
                  </div>
                  <div className="w-full">
                    <Label>Sim</Label>
                    <InputAdmin type="text" control={control} name="sim" />
                  </div>
                  <div className="w-full">
                    <Label>Pin & Sạc</Label>
                    <InputAdmin type="text" control={control} name="pin_sac" />
                  </div>
                </div>
                <div className="flex gap-x-5 mt-10">
                  <div className="w-full">
                    <Label>Thiết kế</Label>
                    <InputAdmin type="text" control={control} name="thietke" />
                  </div>
                  <div className="w-full">
                    <Label>Chất liệu</Label>
                    <InputAdmin type="text" control={control} name="chatlieu" />
                  </div>
                </div>
                <div className="flex gap-x-5 mt-10">
                  <div className="w-full">
                    <Label>Kích thước & Khối lượng</Label>
                    <InputAdmin
                      type="text"
                      control={control}
                      name="kichthuoc_khoiluong"
                    />
                  </div>
                  <div className="w-full">
                    <Label>Thời điểm ra mắt</Label>
                    <InputAdmin
                      type="text"
                      control={control}
                      name="thoidiemramat"
                    />
                  </div>
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
