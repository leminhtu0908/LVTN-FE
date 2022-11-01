import { Dialog, DialogTitle, Slide } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../../components/button";
import InputAdmin from "../../../../components/input/InputAdmin";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as actions from "./_redux/brandAction";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const BrandCreateDialog = (props) => {
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
  };
  const dispatch = useDispatch();
  const schemaValidation = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên nhà sản xuất"),
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
    if (props.isEdit) {
      const cloneValueUpdate = {
        ...values,
        id: props.data._id,
      };
      dispatch(actions.updateBrand(cloneValueUpdate));
    } else {
      dispatch(actions.createBrand(values));
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
        {props.isEdit ? (
          <DialogTitle>{"Cập nhật nhà sản xuất"}</DialogTitle>
        ) : (
          <DialogTitle>{"Thêm nhà sản xuất"}</DialogTitle>
        )}
        <div className="p-4">
          <form onSubmit={handleSubmit(handleSumitCategory)}>
            <InputAdmin
              placeholder="Tên nhà sản xuất"
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
            {/* <Button variant="contained" color="primary" type="submit">
            Thêm
          </Button> */}
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default BrandCreateDialog;
