import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Field } from "../../../../components/field";
import Input from "../../../../components/input/Input";
import * as Yup from "yup";
import InputAdmin from "../../../../components/input/InputAdmin";
import { Button } from "../../../../components/button";
import { useDispatch } from "react-redux";
import * as actions from "./_redux/userAction";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const UserCreateDialog = (props) => {
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
  };
  const dispatch = useDispatch();
  const schemaValidation = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên loại sản phẩm"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
  const handleSumitCategory = async (values) => {
    if (!isValid) return;
    // if (props.isEdit) {
    //   const cloneValueUpdate = {
    //     ...values,
    //     id: props.data._id,
    //   };
    //   dispatch(actions.updateTypeProduct(cloneValueUpdate));
    // } else {
    //   dispatch(actions.createTypeProduct(values));
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

  return (
    <>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thêm loại sản phẩm"}</DialogTitle>
        <div className="p-4">
          <form onSubmit={handleSubmit(handleSumitCategory)}>
            <InputAdmin
              placeholder="Tên loại sản phẩm"
              type="text"
              control={control}
              name="name"
            />
            {errors && <p className="text-red-600">{errors.name?.message}</p>}

            <div className="flex items-end gap-x-3 mt-5">
              <Button
                className="bg-red-600"
                onClick={handleCloseDialog}
                type="button"
              >
                Hủy
              </Button>
              <Button type="submit">
                {props.isEdit ? "Cập nhật" : "Thêm"}
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default UserCreateDialog;
