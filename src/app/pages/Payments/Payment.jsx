import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Radio from "../../../components/checkbox/Radio";
import FieldCheckboxes from "../../../components/field/FieldCheckboxes";
import Label from "../../../components/label/Label";
import { PaymentType } from "../../../utils/type";

const Payment = (props) => {
  const [formValues, setFormValues] = useState(props.valuesRadio);
  const handleChangeRadio = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    const cloneValue = {
      ...formValues,
      [name]: value,
    };
    props.onChangeRadio(cloneValue);
  };
  return (
    <div className="w-full">
      <h1>Xác nhận thông tin đơn hàng</h1>
      <div className="min-h-[200px] border border-green-500 shadow-lg rounded-lg mt-5 p-4">
        <div className="flex gap-x-5">
          <h1>Họ và tên : </h1> <span>{props.info?.name}</span>
        </div>
        <div className="flex gap-x-5 mt-3">
          <h1>Email : </h1> <span>{props.info?.email}</span>
        </div>
        <div className="flex gap-x-5 mt-3">
          <h1>Số điện thoại : </h1> <span>{props.info?.phone}</span>
        </div>
        <div className="flex gap-x-5 mt-3">
          <h1>Địa chỉ : </h1>{" "}
          <span>{`${props.info?.sonha}, ${props.info?.xa}, ${props.info?.huyen}, ${props.info?.tinh} `}</span>
        </div>
      </div>
      <div className="border border-green-500 shadow-lg rounded-lg mt-5 p-4">
        <Label>Hình thức thanh toán :</Label>
        <div className="flex items-center gap-x-5 mt-3">
          <div className="flex gap-x-2">
            <input
              id="cash"
              value={PaymentType.CASH}
              name="bankcode"
              type="radio"
              defaultChecked
              defaultValue={PaymentType.CASH}
              className="w-5 h-5"
              onChange={handleChangeRadio}
            />
            <label htmlFor="cash">Tiền mặt</label>
          </div>
          <div className="flex gap-x-2">
            <input
              id="vizalopay"
              value={PaymentType.VIZALOPAY}
              name="bankcode"
              type="radio"
              className="w-5 h-5"
              onChange={handleChangeRadio}
            />
            <label htmlFor="vizalopay">Ví Zalopay</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
