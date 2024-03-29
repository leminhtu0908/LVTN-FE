import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/button/Button";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";
import InfoProduct from "../../../shared/Dialog/InfoProduct";
import PaymentProductDialog from "../../../shared/Dialog/PaymentProductDialog";
import * as productAction from "../../modules/Admin/Product/_redux/productAction";
import * as cartAction from "../../pages/Cart/_redux/cartAction";
import * as action from "../Comment/_redux/commentAction";
import CommentList from "../Comment/CommentList";
import ProductRelease from "./ProductRelease";
import ConfirmDialog from "../../../shared/Dialog/ConfirmDialog";
import Swal from "sweetalert2";
const ProductDetail = () => {
  const { currentState, authState, commentState } = useSelector(
    (state) => ({
      currentState: state.products,
      authState: state.auth,
      commentState: state.comments,
    }),
    shallowEqual
  );
  const { detail: dataDetail } = currentState;
  const { authToken } = authState;
  const {
    data: dataComment,
    comment,
    listLoading,
    commentForEdit,
    commentId,
    replyComment,
  } = commentState;
  const { id } = useParams();
  const defaultValues = {
    colors: "",
  };
  const [formValues, setFormValues] = useState(defaultValues);
  const [colorData, setColorData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openInfoProduct, setOpenInfoProduct] = useState(false);
  const [dataInformationProduct, setDataInformationProduct] = useState(null);
  const [productData, setProductData] = useState({});
  const [dataImages, setDataImages] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState("");

  useEffect(() => {
    setColorData(dataDetail?.colors?.map((item) => item.name));
  }, [dataDetail?.colors]);
  useEffect(() => {
    setMemoryData(dataDetail?.memorys?.map((item) => item.name));
  }, [dataDetail?.memorys]);
  useEffect(() => {
    setDataImages(dataDetail);
  }, [dataDetail?.image]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productAction.fetchDetailProduct({ params: { product_id: id } }));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(action.fetchComments({ params: { product_id: dataDetail?._id } }));
  }, [
    dataDetail?._id,
    dispatch,
    comment,
    replyComment,
    commentForEdit,
    commentId,
  ]);
  const handlePayment = (product) => {
    if (authToken?.token) {
      const cloneValues = {
        ...product,
        ...formValues,
      };
      dispatch(cartAction.addToCart(cloneValues));
      navigate("/cart");
    } else {
      // setOpen(true);
      const cloneValues = {
        ...product,
        ...formValues,
      };
      // setProductData(cloneValues);
      dispatch(cartAction.addToCart(cloneValues));
      navigate("/sign-in");
    }
  };
  const handleAddToCart = (product) => {
    const cloneValues = {
      ...product,
      ...formValues,
    };
    dispatch(cartAction.addToCart(cloneValues));
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickImage = (item) => {
    setDataImages(item);
  };
  const handleInfoDetail = (content) => {
    setDataInformationProduct(content);
    setOpenInfoProduct(true);
  };
  const handleCloseInfo = () => {
    setOpenInfoProduct(false);
  };
  const handleValuesComment = (values) => {
    const newValue = {
      userId: authToken?.user?._id,
      ...values,
      productId: dataDetail?._id,
    };
    if (authToken?.user) {
      dispatch(action.createComment(newValue));
    } else {
      Swal.fire({
        title: "Để bình luận bạn cần phải đăng nhập",
        text: "Đi đến trang đăng nhập!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vâng, Đi!",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/sign-in");
        }
      });
    }
  };
  const handleEditComment = (values) => {
    dispatch(action.updateComment(values));
  };
  const handleSelectedComment = (values) => {
    setOpenDelete(true);
    setSelectedDelete(values);
  };
  const handleDeleteComment = (status) => {
    if (status) {
      dispatch(action.deleteComment(selectedDelete));
    }
    setOpenDelete(false);
  };
  const handleRelyComment = (values) => {
    const newValues = {
      username: authToken?.user?.fullName,
      image: authToken?.user?.image ? authToken.user.image : "",
      ...values,
    };
    dispatch(action.replyComment(newValues));
  };
  return (
    <>
      <LayoutCustomer>
        <div className="p-4 mx-auto w-full max-w-[1200px] pt-[88px]">
          <h1 className="py-4 text-2xl font-semibold">{dataDetail?.name}</h1>
          <hr />
          <div className="flex gap-x-5 mt-5">
            <div className="basis-[60%] flex flex-col items-center">
              {dataImages && (
                <img
                  src={dataImages?.image}
                  alt=""
                  className="w-[full] h-[397px]"
                />
              )}
              <div className="mt-5 flex items-start gap-x-4">
                <div
                  className="p-2 border border-slate-300 cursor-pointer"
                  onClick={() => handleClickImage(dataDetail)}
                >
                  <img
                    src={dataDetail?.image}
                    alt=""
                    className="w-[55px] h-[55px]"
                  />
                </div>
                {dataDetail?.imageMulti?.map((item) => (
                  <div className="flex flex-col">
                    <div
                      className="p-2 border border-slate-300 cursor-pointer"
                      key={item._id}
                      onClick={() => handleClickImage(item)}
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="w-[55px] h-[55px]"
                      />
                    </div>
                    <span className="text-center">{item.name}</span>
                  </div>
                ))}
                <div
                  className="p-3 border border-slate-300 cursor-pointer"
                  onClick={() => handleInfoDetail(dataDetail?.content)}
                >
                  Thông tin <br /> sản phẩm
                </div>
              </div>
              {/* <div className="mt-10 text-xl font-semibold mb-5">
              Thông tin sản phẩm
            </div>
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: `${dataDetail?.content}` }}
            ></div> */}
            </div>
            <div className="basis-[40%]">
              <div className="">{dataDetail?.display}</div>
              <div className="flex gap-x-2 my-5">
                <Autocomplete
                  style={{ width: "100%" }}
                  id="select"
                  options={colorData || []}
                  getOptionLabel={(option) => option}
                  inputValue={formValues?.colors}
                  defaultValue={formValues?.colors || ""}
                  onInputChange={(event, newInputValue) => {
                    setFormValues({
                      ...formValues,
                      colors: newInputValue,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Màu sắc"
                      name="colors"
                      style={{ maxWidth: "300px" }}
                    />
                  )}
                />
              </div>
              <div className="flex gap-x-2 my-5">
                {/* <Autocomplete
                style={{ width: "100%" }}
                id="select"
                options={memoryData || []}
                getOptionLabel={(option) => option}
                inputValue={formValues?.memorys}
                defaultValue={formValues?.memorys || ""}
                onInputChange={(event, newInputValue) => {
                  setFormValues({
                    ...formValues,
                    memorys: newInputValue,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Bộ nhớ"
                    name="memorys"
                    style={{ maxWidth: "300px" }}
                  />
                )}
              /> */}
                <div className="">
                  Bộ nhớ :{" "}
                  <mark className="p-2 text-white bg-green-500 rounded-md">
                    {dataDetail?.memory}
                  </mark>{" "}
                </div>
              </div>
              <div
                className={`my-5 ${
                  dataDetail?.sold < dataDetail?.soluong_sanpham
                    ? "text-green-500 text-sm"
                    : "text-red-500 text-sm"
                } `}
              >
                <span>
                  {dataDetail?.sold < dataDetail?.soluong_sanpham
                    ? "Còn hàng"
                    : "Tạm hết (Đang chờ nhập hàng)"}
                </span>
              </div>
              <div className="my-5">
                {/* <span className="text-2xl text-red-500 font-medium">
                {dataDetail?.price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span> */}
                <div className="flex gap-x-5">
                  {dataDetail?.price_discount ? (
                    <span className="text-md mb-4 text-gray-600 dark:text-white line-through">
                      {dataDetail.price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  ) : (
                    <span className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                      {dataDetail?.price?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  )}

                  <span className="font-semibold">{`${
                    dataDetail?.discount ? "-" : ""
                  }${dataDetail?.discount ? dataDetail?.discount : ""} ${
                    dataDetail?.discount ? "%" : ""
                  }`}</span>
                </div>
                <span className="text-xl font-semibold mb-4 text-red-500 dark:text-white">
                  {dataDetail?.price_discount?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <div className="my-5 mt-10 flex gap-x-5">
                <Button
                  onClick={() => handlePayment(dataDetail)}
                  type="submit"
                  className="mx-0"
                  disabled={
                    dataDetail?.sold >= dataDetail?.soluong_sanpham
                      ? true
                      : false
                  }
                >
                  Mua ngay
                </Button>
                <Button
                  onClick={() => handleAddToCart(dataDetail)}
                  className="mx-0"
                  type="submit"
                  disabled={
                    dataDetail?.sold >= dataDetail?.soluong_sanpham
                      ? true
                      : false
                  }
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
              <div className="mt-10">
                <h1 className="text-xl font-semibold mb-5">
                  {`Cấu hình chi tiết ${dataDetail?.name}`}
                </h1>
                <div className="">
                  <ul>
                    <li className="p-4 bg-slate-300 flex items-center gap-x-5">
                      <p>Màn hình : </p>
                      <div className="">{dataDetail?.display}</div>
                    </li>
                    <li className="p-4 bg-white flex items-center gap-x-5">
                      <p>Hệ điều hành : </p>
                      <div className="">{dataDetail?.heDieuHanh}</div>
                    </li>
                    <li className="p-4 bg-slate-300 flex items-center gap-x-5">
                      <p>Camera trước: </p>
                      <div className="">{dataDetail?.camera_truoc}</div>
                    </li>
                    <li className="p-4 bg-white flex items-center gap-x-5">
                      <p>Camera sau : </p>
                      <div className="">{dataDetail?.camera_sau}</div>
                    </li>
                    <li className="p-4 bg-slate-300 flex items-center gap-x-5">
                      <p>Chip : </p>
                      <div className="">{dataDetail?.chip}</div>
                    </li>
                    <li className="p-4 bg-white flex items-center gap-x-5">
                      <p>Ram : </p>
                      <div className="">{dataDetail?.ram}</div>
                    </li>
                    <li className="p-4 bg-slate-300 flex items-center gap-x-5">
                      <p>SIM : </p>
                      <div className="">{dataDetail?.sim}</div>
                    </li>
                    <li className="p-4 bg-white flex items-center gap-x-5">
                      <p>Pin , Sạc : </p>
                      <div className="">{dataDetail?.pin_sac}</div>
                    </li>
                    <li className="p-4 bg-slate-300 flex items-center gap-x-5">
                      <p>Thiết kế : </p>
                      <div className="">{dataDetail?.thietke}</div>
                    </li>
                    <li className="p-4 bg-white flex items-center gap-x-5">
                      <p>Chất liệu : </p>
                      <div className="">{dataDetail?.chatlieu}</div>
                    </li>
                    <li className="p-4 bg-slate-300 flex items-center gap-x-5">
                      <p>Kích thước , khối lượng : </p>
                      <div className="">{dataDetail?.kichthuoc_khoiluong}</div>
                    </li>
                    <li className="p-4 bg-white flex items-center gap-x-5">
                      <p>Thời điểm ra mắt : </p>
                      <div className="">{dataDetail?.thoidiemramat}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <ProductRelease name={dataDetail?.name} />
        </div>
        <div className="">
          <CommentList
            loading={listLoading}
            handleValuesComment={handleValuesComment}
            data={dataComment}
            userId={authToken?.user?._id}
            handleEditComment={handleEditComment}
            handleDeleteComment={handleSelectedComment}
            handleRelyComment={handleRelyComment}
          ></CommentList>
        </div>
        <PaymentProductDialog
          open={open}
          handleClose={handleClose}
          productData={productData}
        />
        <InfoProduct
          open={openInfoProduct}
          handleClose={handleCloseInfo}
          data={dataInformationProduct}
        />
      </LayoutCustomer>
      <ConfirmDialog
        openDialog={openDelete}
        closeDialog={handleDeleteComment}
        description={"Bạn có chắc chắn xóa bình luận này"}
      ></ConfirmDialog>
    </>
  );
};

export default ProductDetail;
