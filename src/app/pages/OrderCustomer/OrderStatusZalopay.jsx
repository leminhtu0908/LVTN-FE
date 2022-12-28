import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";
import * as action from "../Payments/_redux/paymentActions";
const OrderStatusZalopay = () => {
  const search = useLocation().search;
  const apptransid = new URLSearchParams(search).get("apptransid");
  const dispatch = useDispatch();
  if (apptransid) {
    dispatch(action.getStatusOrderZalopay(apptransid));
  }
  return (
    <LayoutCustomer>
      <div className="pt-[88px] h-[80vh]">Test</div>
    </LayoutCustomer>
  );
};

export default OrderStatusZalopay;
