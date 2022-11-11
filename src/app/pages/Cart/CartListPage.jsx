import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-intl/src/utils";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../../../components/header/Heading";
import * as cartAction from "./_redux/cartAction";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";
const CartListPage = () => {
  const { currentState } = useSelector(
    (state) => ({
      currentState: state.cart,
    }),
    shallowEqual
  );
  const defaultValues = {
    memory: "",
    color: "",
  };
  const { cart } = currentState;
  console.log(cart);
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
  return (
    <LayoutCustomer>
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
                          <h1 className="text-lg font-medium">{item.name}</h1>
                          <span className="text-xl font-semibold">
                            {(item.price * item.cartQuantity).toLocaleString(
                              "vi",
                              {
                                style: "currency",
                                currency: "VND",
                              }
                            )}
                          </span>
                        </div>
                        <div className="mt-10 flex items-center justify-between">
                          <div className="flex-1 flex items-center gap-x-2">
                            <div className="basis-[25%]">
                              <Autocomplete
                                style={{ width: "100%" }}
                                id="select"
                                options={item.memorys || []}
                                getOptionLabel={(option) => option.name}
                                //   onChange={(event, newInputValue) => {
                                //     setFormValue({
                                //       ...formValue,
                                //       memory: newInputValue.map((item) => item._id),
                                //     });
                                //   }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    label=""
                                    size="small"
                                    style={{ maxWidth: "100%" }}
                                    placeholder={"Bộ nhớ"}
                                  />
                                )}
                              />
                            </div>
                            <div className="basis-[40%]">
                              <Autocomplete
                                style={{ width: "100%" }}
                                id="select"
                                options={item.colors || []}
                                getOptionLabel={(option) => option.name}
                                //   onChange={(event, newInputValue) => {
                                //     setFormValue({
                                //       ...formValue,
                                //       memory: newInputValue.map((item) => item._id),
                                //     });
                                //   }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    label=""
                                    size="small"
                                    style={{ maxWidth: "300px" }}
                                    placeholder={"Màu sắc"}
                                  />
                                )}
                              />
                            </div>
                            <div className="basis-[35%]">
                              <div className="flex gap-x-1 items-center h-[35px]">
                                <button
                                  onClick={() => handleDecrement(item)}
                                  className="py-1 px-4 rounded-lg bg-green-500 text-white text-lg"
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  value={item.cartQuantity}
                                  className="w-[80px] h-full border border-green-500 py-1 px-2"
                                />
                                <button
                                  onClick={() => handleIncrement(item)}
                                  className="py-1 px-4 rounded-lg bg-green-500 text-white text-lg"
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
            <div className="basis-[30%] p-4 bg-slate-100 shadow-lg rounded-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nam
              iste impedit eum obcaecati omnis. Adipisci rerum ex tempora enim
              fugit, animi iure officiis natus, fugiat ad, vitae doloremque
              repellendus!
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
    </LayoutCustomer>
  );
};

export default CartListPage;
