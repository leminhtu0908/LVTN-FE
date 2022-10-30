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
import { Field } from "../../../../components/field/";
import Input from "../../../../components/input/Input";
import * as Yup from "yup";
import InputAdmin from "../../../../components/input/InputAdmin";
import { Button } from "../../../../components/button";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "./_redux/danhMucAction";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DanhMucCreateDialog = (props) => {
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
  };
  const dispatch = useDispatch();
  const schemaValidation = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên danh mục"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
  const handleSumitCategory = async (values) => {
    if (!isValid) return;
    if (props.isEdit) {
      const cloneValueUpdate = {
        ...values,
        id: props.data._id,
      };
      dispatch(actions.updateCatetory(cloneValueUpdate));
    } else {
      dispatch(actions.createCategory(values));
    }
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
        <DialogTitle>{"Thêm danh mục"}</DialogTitle>
        <div className="p-4">
          <form onSubmit={handleSubmit(handleSumitCategory)}>
            <InputAdmin
              placeholder="Tên danh mục"
              type="text"
              control={control}
              name="name"
            />
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
            {/* <Button variant="contained" color="primary" type="submit">
            Thêm
          </Button> */}
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default DanhMucCreateDialog;
