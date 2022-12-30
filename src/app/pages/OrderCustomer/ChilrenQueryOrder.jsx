import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import QueryOrderZalopay from "./QueryOrderZalopay";
import * as paymentAction from "../Payments/_redux/paymentActions";
import { Autocomplete, TextField } from "@mui/material";
import { Button } from "../../../components/button";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import LoadingSubmit from "../../../components/loading/LoadingSubmit";
const ChilrenQueryOrder = () => {
  const { currentState, paymentState, rootState } = useSelector(
    (state) => ({
      currentState: state.auth,
      paymentState: state.payments,
      rootState: state.roots,
    }),
    shallowEqual
  );
  const { user } = currentState;
  const { apptransid, payment } = paymentState;
  const { isLoading } = rootState;
  const dispatch = useDispatch();
  const [appId, setAppId] = useState();
  const [formValues, setFormValues] = useState({ apptransid: "" });
  useEffect(() => {
    dispatch(paymentAction.getAllApptransidOrderZalopay(user?._id));
  }, [dispatch, user?._id]);
  useEffect(() => {
    setAppId(apptransid?.map((item) => item.apptransid));
  }, [apptransid]);
  const handleCallQueryOrder = () => {
    if (formValues.apptransid !== "") {
      dispatch(paymentAction.getStatusOrderZalopay(formValues));
    }
  };
  return (
    <QueryOrderZalopay>
      <h1 className="text-center font-semibold text-2xl">
        Trạng thái đơn hàng khi thanh toán
      </h1>
      <div className="flex gap-x-4 mt-5">
        <div className="basis-[70%]">
          <Autocomplete
            autoComplete
            id="auto-combobox"
            options={appId || []}
            getOptionLabel={(option) => option}
            inputValue={formValues?.apptransid || ""}
            onInputChange={(event, newInputValue) => {
              setFormValues({
                ...formValues,
                apptransid: newInputValue,
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className="form-control"
                label="Mã giao dịch của đơn hàng"
                variant="outlined"
                name="apptransid"
                color="primary"
              />
            )}
          />
        </div>
        <div className="flex-1">
          <Button
            type="button"
            className="mx-0 py-4"
            onClick={handleCallQueryOrder}
          >
            Xem
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div className="w-10 h-10 rounded-full border-4 mx-auto border-green-500 border-t-4 border-t-transparent animate-spin mt-5"></div>
      ) : (
        <div className="mt-5">
          {payment?.returncode === 1 && (
            <>
              <div className="flex gap-x-4 items-center">
                <AiOutlineCheckCircle className="w-[30px] h-[30px] text-green-500"></AiOutlineCheckCircle>{" "}
                <span className="text-green-500 font-semibold">
                  {payment?.returnmessage}
                </span>
              </div>
              <div className="flex gap-x-2 items-center mt-2">
                <span className="font-semibold">Số tiền thanh toán</span> :{" "}
                <mark className="px-2 py-1">
                  {payment?.amount?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </mark>
              </div>
            </>
          )}
          {(payment?.returncode === 0 ||
            payment?.returncode === -49 ||
            payment?.returncode === -92) && (
            <div className="flex gap-x-4 items-center">
              <AiOutlineCloseCircle className="w-[30px] h-[30px] text-red-500"></AiOutlineCloseCircle>{" "}
              <span className="text-red-500 font-semibold">
                {payment?.returnmessage}
              </span>
            </div>
          )}
        </div>
      )}
    </QueryOrderZalopay>
  );
};

export default ChilrenQueryOrder;
