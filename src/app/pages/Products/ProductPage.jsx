import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";
import Heading from "../../../components/header/Heading";
import * as cartAction from "../../pages/Cart/_redux/cartAction";
import { slice } from "lodash";
import { Rating } from "@mui/material";
import StarRatings from "react-star-ratings";
const ProductPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [index, setIndex] = useState(10);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAddToCart = (product) => {
    dispatch(cartAction.addToCart(product));
  };
  const initialDataPhone = slice(props?.data, 0, index);
  const loadMore = () => {
    setIndex(index + 5);
    if (index >= props?.data.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  const handleRating = (rate, product_id) => {
    props.onRating(product_id, rate);
  };
  return (
    <div
      ref={props.scrollRef}
      className="py-4 my-5 max-w-[1200px] w-full mx-auto bg-slate-100 rounded-lg"
    >
      <div className="mt-2 px-4">
        <Heading>
          <span
            onClick={() => navigate("/danhmuc/dien-thoai")}
            className="hover:underline cursor-pointer"
          >
            Điện thoại
          </span>
        </Heading>
      </div>
      <div className="h-full relative">
        <div className="h-full">
          <div className="px-4 grid md:grid-cols-4 lg:grid-cols-5 gap-2">
            {initialDataPhone?.map((product) => (
              <div
                key={product.product_id}
                className="flex flex-col h-full w-full max-w-[250px] bg-white rounded-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl"
              >
                <Link to={`/sanpham/${product.product_id}`}>
                  <img
                    className="p-4 h-[250px] object-cover rounded-t-lg"
                    src={product.image}
                    alt="productimage"
                  />
                </Link>
                <div className="px-5 pb-5 flex flex-col flex-1">
                  <Link
                    to={`/sanpham/${product.product_id}`}
                    className="hover:text-blue-500"
                  >
                    <h5 className="text-xl font-semibold">{product.name}</h5>
                  </Link>
                  <div className="my-4">
                    <span>{product.display}</span>
                  </div>

                  <div className="flex gap-x-5">
                    {product?.price_discount ? (
                      <span className="text-md mb-4 text-gray-600 dark:text-white line-through">
                        {product.price.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    ) : (
                      <span className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        {product?.price?.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    )}

                    <span className="font-semibold">{`${
                      product?.discount ? "-" : ""
                    }${product?.discount ? product?.discount : ""} ${
                      product?.discount ? "%" : ""
                    }`}</span>
                  </div>
                  <span className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {product?.price_discount?.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                  <div className="flex items-center justify-center gap-x-2">
                    <div className="w-[100px]">
                      {/* <Rating
                        name="simple-controlled"
                        value={product?.rate}
                        precision={0.1}
                        onChange={(event, newValue) =>
                          handleRating(newValue, product.product_id)
                        }
                      /> */}
                      <StarRatings
                        rating={product?.rate}
                        starDimension="18px"
                        starSpacing="1px"
                        starRatedColor="orange"
                        starHoverColor="orange"
                        changeRating={(rate) =>
                          handleRating(rate, product.product_id)
                        }
                      />
                    </div>
                    <span className="text-sm">
                      {product.totalReview} đánh giá
                    </span>
                  </div>
                  {/* <button
                    onClick={() => handleAddToCart(product)}
                    className="text-white mt-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Thêm vào giỏ hàng
                  </button> */}
                </div>
              </div>
            ))}
          </div>
          {!isCompleted && (
            <Button
              type="button"
              className="flex items-center justify-center w-[300px] text-center mt-5"
              onClick={loadMore}
            >
              Xem thêm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
