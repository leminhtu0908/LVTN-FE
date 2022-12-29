import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";
import PaymentsCompleted from "../Payments/PaymentsCompleted";
import PaymentSuccess from "../Payments/PaymentSuccess";
import * as action from "../Payments/_redux/paymentActions";
import * as actionCart from "../Cart/_redux/cartAction";
const OrderStatusZalopay = () => {
  const search = useLocation().search;
  const apptransid = new URLSearchParams(search).get("apptransid");
  const dispatch = useDispatch();
  if (apptransid) {
    dispatch(action.getStatusOrderZalopay({ apptransid: apptransid }));
    dispatch(actionCart.clearCart());
  }
  return (
    <LayoutCustomer>
      <div className="pt-[88px] h-[80vh]">
        {apptransid && (
          <>
            <PaymentSuccess />
            <div className="mt-10"></div>
            <PaymentsCompleted noHeader={true} />
          </>
        )}
      </div>
    </LayoutCustomer>
  );
};

export default OrderStatusZalopay;
