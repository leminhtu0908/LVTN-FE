import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import Label from "../../../../components/label/Label";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ProductCreateDialog = (props) => {
  const defaultValues = {
    category: "",
    brand: "",
    typeProduct: "",
    memory: "",
    color: "",
  };
  const defaultFilter = {
    name: "",
  };
  const [filter, setFilter] = useState(defaultFilter);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [formValue, setFormValue] = useState(defaultValues);
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
  };
  const { currentState, categoryState, brandState } = useSelector(
    (state) => ({
      currentState: state.products,
      categoryState: state.categorys,
      brandState: state.brands,
    }),
    shallowEqual
  );
  const { data: categoryData } = categoryState;
  const { data: brandData } = brandState;
  console.log(categoryData);
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
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
    defaultValues: {
      product_id: "",
      name: "",
      price: "",
      display: "",
    },
  });
  const handleSumitCategory = async (values) => {
    if (!isValid) return;
    // if (props.isEdit) {
    //   const cloneValueUpdate = {
    //     ...values,
    //     id: props.data._id,
    //   };
    //   dispatch(actions.updateMemory(cloneValueUpdate));
    // } else {
    //   dispatch(actions.createMemory(values));
    // }
    props.closeCreateDialog(false);
  };
  useEffect(() => {
    if (props.isEdit) {
      setValue("name", props.data.name);
    } else if (!props.isEdit) {
      setValue("name", "");
    }
  }, [props.data, props.isEdit, setValue]);
  useEffect(() => {
    dispatch(categoryAction.fetchCategories({ params: { ...filter } }));
    dispatch(brandAction.fetchBrands({ params: { ...filter } }));
  }, []);
  const handleSelectDropdown = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  return (
    <>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        maxWidth="lg"
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
                  <p className="text-red-600">{errors.title?.message}</p>
                )}
              </Field>
              <Field>
                <Label>Tên sản phẩm</Label>
                <InputAdmin type="text" control={control} name="name" />
                {errors && (
                  <p className="text-red-600">{errors.slug?.message}</p>
                )}
              </Field>
              <Field>
                <Label>Giá</Label>
                <InputAdmin type="text" control={control} name="price" />
                {errors && (
                  <p className="text-red-600">{errors.slug?.message}</p>
                )}
              </Field>
            </div>
            <div className="flex gap-x-5">
              <Field>
                <Label>Màn hình</Label>
                <InputAdmin type="text" control={control} name="display" />
                {errors && (
                  <p className="text-red-600">{errors.slug?.message}</p>
                )}
              </Field>
            </div>

            <div className="flex gap-x-5 justify-between">
              <Field>
                <Label>Danh mục</Label>
                <div className="custom-selector">
                  <select
                    onChange={handleSelectDropdown}
                    name="category"
                    value={formValue.category}
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
                    name="brand"
                    value={formValue.brand}
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
            </div>
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
