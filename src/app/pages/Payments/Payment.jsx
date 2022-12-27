import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Radio from "../../../components/checkbox/Radio";
import FieldCheckboxes from "../../../components/field/FieldCheckboxes";
import Label from "../../../components/label/Label";
import { PaymentType } from "../../../utils/type";

const Payment = (props) => {
  const [formValues, setFormValues] = useState(props.valuesRadio);
  const [openBank, setOpenBank] = useState(false);
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
    if (value === "zalopayapp") {
      setOpenBank(true);
    } else if (value === "cash") {
      setOpenBank(false);
    }
    props.onChangeRadio(cloneValue);
  };
  const handleChangeBank = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  console.log("formValue", formValues);

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
        <div className="flex flex-col items-start gap-x-5 mt-3">
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
            <label htmlFor="cash">Thanh toán khi nhận hàng</label>
          </div>
          <div className="flex gap-x-2">
            <input
              id="vivnpay"
              value={PaymentType.VIZALOPAY}
              name="bankcode"
              type="radio"
              className="w-5 h-5"
              onChange={handleChangeRadio}
            />
            <label htmlFor="vivnpay">Thanh toán trực tuyến VNPAY</label>
          </div>
          {openBank && (
            <select name="bankCode" id="" onChange={handleChangeBank}>
              <option value="">Không chọn</option>
              <option value="VNPAYQR">Ngân hàng VNPAYQR</option>
              <option value="NCB">Ngân hàng NCB</option>
              <option value="SCB">Ngân hàng SCB</option>
              <option value="SACOMBANK">Ngân hàng SACOMBANK</option>
              <option value="EXIMBANK">Ngân hàng EXIMBANK</option>
              <option value="MSBANK">Ngân hàng MSBANK</option>
              <option value="NAMABANK">Ngân hàng NAMABANK</option>
              <option value="VISA">Ngân hàng VISA</option>
              <option value="VNMART">Ngân hàng VNMART</option>
              <option value="VIETINBANK">Ngân hàng VIETINBANK</option>
              <option value="VIETCOMBANK">Ngân hàng VIETCOMBANK</option>
              <option value="HDBANK">Ngân hàng HDBANK</option>
              <option value="DONGABANK">Ngân hàng Dong A</option>
              <option value="TPBANK">Ngân hàng Tp Bank</option>
              <option value="OJB">Ngân hàng OceanBank</option>
              <option value="BIDV">Ngân hàng BIDV</option>
              <option value="TECHCOMBANK">Ngân hàng Techcombank</option>
              <option value="VPBANK">Ngân hàng VPBank</option>
              <option value="AGRIBANK">Ngân hàng AGRIBANK</option>
              <option value="MBBANK">Ngân hàng MBBank</option>
              <option value="ACB">Ngân hàng ACB</option>
              <option value="OCB">Ngân hàng OCB</option>
              <option value="SHB">Ngân hàng SHB</option>
              <option value="IVB">Ngân hàng IVB</option>
            </select>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
