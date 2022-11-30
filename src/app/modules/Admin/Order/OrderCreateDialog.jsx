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
import * as actions from "./_redux/orderAction";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const OrderCreateDialog = (props) => {
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
  };
  const dispatch = useDispatch();
  const schemaValidation = Yup.object().shape({
    price_pay: Yup.string().required("Vui lòng số tiền thanh toán trước"),
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
        order_id: props.data,
      };
      dispatch(actions.updateOrderPay(cloneValueUpdate));
    } else {
      //   dispatch(actions.createCategory(values));
    }
    props.closeCreateDialog(false);
  };
  useEffect(() => {
    if (props.isEdit) {
      setValue("price_pay", props.data.price_pay);
    } else if (!props.isEdit) {
      setValue("price_pay", "");
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
          <DialogTitle>{"Cập nhật thanh toán"}</DialogTitle>
        ) : (
          <DialogTitle>{"Thêm danh mục"}</DialogTitle>
        )}

        <div className="p-4">
          <form onSubmit={handleSubmit(handleSumitCategory)}>
            <InputAdmin
              placeholder="Số tiền thanh toán trước"
              type="text"
              control={control}
              name="price_pay"
            />
            {errors && (
              <p className="text-red-600">{errors.price_pay?.message}</p>
            )}

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

export default OrderCreateDialog;
