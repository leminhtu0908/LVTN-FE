import { Autocomplete, Menu, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Button from "../../../components/button/Button";
import InputCustomer from "../../../components/input/InputCustomer";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";
import * as cartAction from "../Cart/_redux/cartAction";
import slugify from "slugify";
import * as productAction from "../../modules/Admin/Product/_redux/productAction";
import ContentFilterPage from "./ContentFilterPage";
import { slice } from "lodash";
import StarRatings from "react-star-ratings";
function makeTitle(slug) {
  var words = slug.split("-");

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(" ");
}

const sorts = [
  { label: "Giá từ thấp đến cao" },
  { label: "Giá từ cao đến thấp" },
  // { label: "Dưới 5 triệu" },
  // { label: "Từ 5 - 10 triệu" },
  // { label: "Từ 10 - 20 triệu" },
  // { label: "Trên 20 triệu" },
];
const ContentPage = () => {
  const defaultFilter = {
    name: "",
    display: "",
    brand: "",
    price: "",
    pin_sac: "",
    memory: "",
    typeProduct: "",
    ram: "",
    price_in: 500000,
    price_to: 50000000,
  };
  const [filter, setFilter] = useState(defaultFilter);
  const [newData, setNewData] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [activeIdTypeProduct, setActiveIdTypeProduct] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [index, setIndex] = useState(5);
  const [isCompleted, setIsCompleted] = useState(false);
  const initialDataPhone = slice(newData, 0, index);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { slug } = useParams();
  const dispatch = useDispatch();
  const {
    currentState,
    brandState,
    memorysState,
    typeProductState,
    productState,
  } = useSelector(
    (state) => ({
      currentState: state.categorys,
      brandState: state.brands,
      memorysState: state.memorys,
      typeProductState: state.typeProducts,
      productState: state.products,
    }),
    shallowEqual
  );
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
  });
  const { data: dataProduct, rate } = productState;
  const { data: dataBrand } = brandState;
  const { data: dataTypeProduct } = typeProductState;
  useEffect(() => {
    dispatch(
      // danhmucAction.fetchOneCategoryCustomer({ params: { name: slug } })
      productAction.fetchProducts({ params: { ...filter } })
    );
  }, [dispatch, filter, slug, rate]);

  useEffect(() => {
    const p = dataProduct?.filter(
      (item) =>
        slugify(item.category?.name, { lower: true, locale: "vi" }) === slug
    );
    setNewData(p);
  }, [dataProduct, slug]);
  const handleSubmitSearch = (values) => {
    const cloneValue = {
      ...filter,
      ...values,
    };
    setFilter(cloneValue);
  };
  const handleSubmitFilterLeft = (filter) => {
    setFilter(filter);
    setShowDetail(true);
  };
  const handleAddToCart = (product) => {
    dispatch(cartAction.addToCart(product));
  };
  const handleActive = (item) => {
    if (activeId === item._id) {
      setActiveId("");
      setFilter({
        ...filter,
        brand: "",
      });
    } else {
      setActiveId(item._id);
      setFilter({
        ...filter,
        brand: item.name,
      });
    }
  };
  const handleActiveTypeProduct = (item) => {
    if (activeIdTypeProduct === item._id) {
      setActiveIdTypeProduct("");
      setFilter({
        ...filter,
        typeProduct: "",
      });
    } else {
      setActiveIdTypeProduct(item._id);
      setFilter({
        ...filter,
        typeProduct: item.name,
      });
    }
  };
  const loadMore = () => {
    setIndex(index + 5);
    if (index >= newData.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  const handleRating = (rating, product_id) => {
    const cloneValue = {
      product_id: product_id,
      rating: rating,
    };
    dispatch(productAction.rateProduct(cloneValue));
  };
  return (
    <LayoutCustomer>
      <div className="pt-[88px]">
        <div className={`${slug === "dien-thoai" && "flex"} `}>
          {slug === "dien-thoai" && (
            <ContentFilterPage
              onSearch={handleSubmitFilterLeft}
              filter={filter}
            ></ContentFilterPage>
          )}
          <div className={`${slug === "dien-thoai" && "basis-[80%]"} `}>
            {slug === "dien-thoai" && (
              <>
                <div className="py-4 mb-5 bg-slate-200">
                  <div className="flex mb-5">
                    <form
                      onSubmit={handleSubmit(handleSubmitSearch)}
                      className="flex basis-[70%]"
                    >
                      <div className="basis-[70%]">
                        <InputCustomer
                          name="name"
                          className="bg-white"
                          control={control}
                          placeholder="Nhập tên sản phẩm ..."
                        />
                      </div>
                      <div className="">
                        <Button
                          type="submit"
                          className="mx-0 w-full h-full px-4 py-4 text-[15px] flex items-center justify-center gap-x-2 bg-green-500 rounded-l-none"
                        >
                          <BsSearch></BsSearch> Tìm kiếm
                        </Button>
                      </div>
                    </form>
                    <div className="flex-1">
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={sorts}
                        inputValue={filter.price}
                        onInputChange={(event, newInputValue) => {
                          setFilter({
                            ...filter,
                            price: newInputValue,
                          });
                        }}
                        sx={{ width: 305 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Sắp xếp" name="price" />
                        )}
                      />
                    </div>
                  </div>
                  <div className="w-full rounded-lg flex items-center justify-between">
                    <div className="flex gap-x-5">
                      {dataBrand?.map((item) => (
                        <div
                          className={`p-4 bg-white  cursor-pointer rounded-lg text-black hover:border hover:border-green-500 ${
                            activeId === item._id
                              ? "border-2 border-green-500"
                              : ""
                          }`}
                          key={item._id}
                          onClick={(e) => handleActive(item)}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                    <div className="">
                      <Button
                        id="basic-button"
                        type="button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      >
                        Loại sản phẩm
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <div className="flex gap-x-5 p-5">
                          {dataTypeProduct?.map((item) => (
                            <div
                              className={`p-4 bg-slate-100  cursor-pointer rounded-lg text-black hover:border hover:border-green-500 ${
                                activeIdTypeProduct === item._id
                                  ? "border-2 border-green-500"
                                  : ""
                              }`}
                              key={item._id}
                              onClick={(e) => handleActiveTypeProduct(item)}
                            >
                              {item.name}
                            </div>
                          ))}
                        </div>
                      </Menu>
                    </div>
                    {/* <div className="pr-16">
                      <Button
                        type="button"
                        className="bg-red-500"
                        onClick={() => {
                          setActiveIdTypeProduct(false);
                          setActiveId(false);
                          setFilter(defaultFilter);
                        }}
                      >
                        Bỏ chọn
                      </Button>
                    </div> */}
                  </div>
                </div>
              </>
            )}
            <div className="px-4 grid md:grid-cols-4 lg:grid-cols-5 gap-2 pb-4">
              {newData?.map((product) => (
                <div
                  key={product.product_id}
                  className="flex flex-col h-full w-full max-w-[250px] bg-slate-100 rounded-sm shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl"
                >
                  <Link to={`/sanpham/${product.product_id}`}>
                    <img
                      className="p-4 h-[250px] object-cover rounded-t-lg"
                      src={product.image}
                      alt="productimage"
                      loading="lazy"
                    />
                  </Link>
                  <div className="px-5 pb-5 flex flex-col flex-1">
                    <Link
                      to={`/sanpham/${product.product_id}`}
                      className="hover:text-blue-500"
                    >
                      <h5 className="text-xl font-semibold">{product.name}</h5>
                    </Link>
                    <div className="my-3">
                      <span>{product.display}</span>
                    </div>
                    <div className="flex gap-x-5">
                      {product?.price_discount ? (
                        <span className="text-md mb-4 text-gray-600 dark:text-white line-through">
                          {product?.price?.toLocaleString("vi", {
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
                    <span className="text-xl font-semibold mb-4 text-red-500 dark:text-white">
                      {product?.price_discount?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    <div className="flex items-start justify-center gap-x-2">
                      <div className="w-[100px]">
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
                    {showDetail && (
                      <>
                        <div className="my-1">
                          <span>Ram : {product?.ram}</span>
                        </div>
                        <div className="my-1">
                          <span>Pin : {product?.pin_sac}</span>
                        </div>
                        <div className="my-1">
                          <span>Bộ nhớ : {product?.dungluongluutru}</span>
                        </div>
                      </>
                    )}
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
            {/* {isCompleted && newData?.length < 0 ? null : (
              <Button
                type="button"
                className="flex mb-5 items-center justify-center w-[300px] text-center mt-5"
                onClick={loadMore}
              >
                Xem thêm {index} sản phẩm
              </Button>
            )} */}
          </div>
        </div>
      </div>
    </LayoutCustomer>
  );
};

export default ContentPage;
