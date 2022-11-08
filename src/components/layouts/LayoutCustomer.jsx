import React from "react";
import HeaderCustomer from "../header/HeaderCustomer";

const LayoutCustomer = ({ children }) => {
  return (
    <div>
      <HeaderCustomer></HeaderCustomer>
      {children}
    </div>
  );
};

export default LayoutCustomer;
