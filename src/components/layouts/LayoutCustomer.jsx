import React from "react";
import Footer from "../footer/Footer";
import HeaderCustomer from "../header/HeaderCustomer";

const LayoutCustomer = ({ children }) => {
  return (
    <div>
      <HeaderCustomer></HeaderCustomer>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default LayoutCustomer;
