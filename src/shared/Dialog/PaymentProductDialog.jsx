import { Dialog, IconButton, Slide } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const PaymentProductDialog = (props) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = () => {
    if (quantity > 20) return;
    setQuantity((pre) => pre + 1);
  };
  const handleDecrement = () => {
    if (quantity <= 1) {
      alert("Số lượng sản phẩm phải lớn hơn 1");
    } else {
      setQuantity((pre) => pre - 1);
    }
  };
  const handleChangeInput = (e) => {
    const { value } = e.target;
    setQuantity(Number(value));
  };
  const handleClickPayment = () => {
    const cloneValue = {
      ...props.productData,
      cartTotalQuantity: quantity,
      cartTotalAmount: quantity * props?.productData?.price,
    };
    navigate("/payments", { state: cloneValue });
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
        maxWidth={"xl"}
      >
        <div className="w-[1000px] h-[1000px] p-4">
          <div className="flex items-end justify-end">
            <IconButton onClick={() => props.handleClose()}>
              <AiOutlineCloseCircle></AiOutlineCloseCircle>
            </IconButton>
          </div>
          <div className="flex gap-x-4 mb-10">
            <div className="basis-[60%] flex flex-col items-center">
              <img
                src={props?.productData?.image}
                alt=""
                className="w-[397px] h-[373px] rounded-lg"
              />
              <div className="py-4 flex flex-col items-center justify-center">
                <h1 className="text-xl text-center">
                  {props?.productData?.name} - {props?.productData?.display} -{" "}
                  {props?.productData?.memory} - {props?.productData?.colors}
                </h1>
                <span className="text-xl pt-2 text-green-500 font-medium">
                  {(props?.productData?.price * quantity)?.toLocaleString(
                    "vi",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
                </span>
              </div>
            </div>
            <div className="basis-[40%]">
              <h1 className="text-2xl font-semibold">Đặt hàng sản phẩm</h1>
              <div className="my-5">
                <h1>Số lượng</h1>
                <div className="mt-2">
                  <button
                    className="px-2 py-0 border border-green-500"
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    defaultValue={1}
                    value={quantity || ""}
                    className="w-[50px] text-center border border-green-500"
                    pattern="[0-9]{0,5}"
                    onChange={handleChangeInput}
                  />
                  <button
                    className="px-2 py-0 border border-green-500"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="my-5">
                <Button type="button" onClick={handleClickPayment}>
                  Tiến hành thành toán
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PaymentProductDialog;
