import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-intl/src/utils";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../../../components/header/Heading";
import * as cartAction from "./_redux/cartAction";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";
import { useNavigate } from "react-router-dom";
const CartListPage = () => {
  const { currentState, authToken } = useSelector(
    (state) => ({
      authToken: state.auth,
      currentState: state.cart,
    }),
    shallowEqual
  );
  const { cart, cartTotalAmount } = currentState;
  const { cartQuantity } = cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDeleToCart = (item) => {
    dispatch(cartAction.deleteToCart(item));
  };
  const handleIncrement = (item) => {
    dispatch(cartAction.addToCart(item));
  };
  const handleDecrement = (item) => {
    dispatch(cartAction.decreaseCart(item));
  };
  const handleDeleAllCart = () => {
    dispatch(cartAction.clearCart());
  };
  const handleCheckout = () => {
    if (authToken?.authToken?.token) {
      navigate("/payments");
    } else {
      navigate("/sign-in");
    }
  };
  useEffect(() => {
    dispatch(cartAction.getTotal());
  }, [dispatch, cart, cartQuantity]);
  return (
    <LayoutCustomer>
      <div className="pt-[88px]">
        {cart?.length > 0 ? (
          <div className="p-4">
            <div className="flex items-start justify-between">
              <Heading>Giỏ hàng</Heading>
              <Button
                onClick={() => handleDeleAllCart()}
                variant="contained"
                color="error"
              >
                Xóa tất cả trong giỏ hàng
              </Button>
            </div>
            <hr />
            <div className="flex gap-x-5 mt-5">
              <div className="basis-[70%] p-4 bg-slate-100 shadow-lg rounded-lg">
                <ul>
                  {cart?.map((item) => (
                    <>
                      <li
                        key={item._id}
                        className="flex gap-x-4 py-4 justify-between items-center"
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="w-[160px] h-[180px] object-fill rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h1 className="text-lg font-medium">{`${item.name} - ${item.display} - ${item.memory}`}</h1>
                            <span className="text-xl font-semibold">
                              {item.price_discount
                                ? (
                                    item.price_discount * item.cartQuantity
                                  ).toLocaleString("vi", {
                                    style: "currency",
                                    currency: "VND",
                                  })
                                : (
                                    item.price * item.cartQuantity
                                  ).toLocaleString("vi", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                            </span>
                          </div>
                          <div className="mt-10 flex items-center justify-between">
                            <div className="basis-[80%] flex items-center gap-x-2">
                              <div className="basis-[30%]">
                                <span className="px-6 py-2 border border-green-500">
                                  {item.colors}
                                </span>
                              </div>
                              <div className="basis-[50%] flex gap-x-2 items-center">
                                <h1>Chọn số lượng :</h1>
                                <div className="flex items-center h-[35px]">
                                  <button
                                    onClick={() => handleDecrement(item)}
                                    className="py-1 px-4 rounded-l-lg bg-green-500 text-white text-lg"
                                  >
                                    -
                                  </button>
                                  <input
                                    type="text"
                                    value={item.cartQuantity || ""}
                                    className="text-center w-[50px] h-full border border-green-500 py-1 px-2"
                                  />
                                  <button
                                    onClick={() => handleIncrement(item)}
                                    className="py-1 px-4 rounded-r-lg bg-green-500 text-white text-lg"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                            <Button
                              onClick={() => handleDeleToCart(item)}
                              variant="contained"
                              color="error"
                            >
                              Xóa
                            </Button>
                          </div>
                        </div>
                      </li>
                      <hr />
                    </>
                  ))}
                </ul>
              </div>
              <div className="basis-[30%] p-8 bg-slate-100 shadow-lg rounded-lg h-[200px]">
                <div className="flex items-center mb-5 justify-between">
                  <h1>Tổng tiền tạm tính : </h1>
                  <span className="text-2xl font-semibold">
                    {cartTotalAmount.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                <button
                  onClick={() => handleCheckout()}
                  className="text-white mt-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
                >
                  Tiến hành thanh toán
                </button>
                <button
                  onClick={() => navigate("/danhmuc/dien-thoai")}
                  className="text-white mt-5 w-full bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Chọn thêm sản phẩm khác
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              srcSet="/img/empty-cart.png"
              alt=""
              className="w-full h-[80vh] object-cover"
            />
            <h1 className="text-2xl absolute inset-0 text-center top-[8%] font-semibold">
              Giỏ hàng rỗng !! Vui lòng thêm sản phẩm
            </h1>
          </div>
        )}
      </div>
    </LayoutCustomer>
  );
};

export default CartListPage;
