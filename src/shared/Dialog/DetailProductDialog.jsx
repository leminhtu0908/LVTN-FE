import {
  Button,
  Dialog,
  Divider,
  List,
  ListItem,
  ListItemText,
  Slide,
} from "@mui/material";
import React, { useState } from "react";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DetailProductDialog = (props) => {
  const { data } = props;
  const [openImage, setOpenImage] = useState(false);
  const handleCloseImage = () => {
    setOpenImage(false);
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleCloseContent}
        TransitionComponent={Transition}
      >
        <div className="flex items-start justify-center p-20 pt-5 h-[100vh]">
          <div className="wrapper w-full">
            <div className="flex items-center justify-between  mb-5">
              <h1 className="font-semibold">Thông tin sản phẩm</h1>
              <Button
                color="error"
                variant="contained"
                onClick={props.handleCloseContent}
              >
                Đóng
              </Button>
            </div>
            <hr />
            <div className="mt-10">
              <div className="border border-blue-500">
                <div className="p-4">
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Mã sản phẩm :</span>
                    <mark className="px-2">{data?.product_id}</mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Tên sản phẩm :</span>
                    <mark className="px-2">{data?.name}</mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Giá sản phẩm :</span>
                    <mark className="px-2">{data?.price}</mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Màn hình sản phẩm :</span>
                    <mark className="px-2">{data?.display}</mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Danh mục sản phẩm : </span>
                    <mark className="px-2 bg-green-600 text-white">
                      {data?.category?.name}
                    </mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Loại sản phẩm : </span>
                    <mark className="px-2 bg-green-600 text-white">
                      {data?.typeProduct?.name}
                    </mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Hãng sản xuất : </span>
                    <mark className="px-2 bg-green-600 text-white">
                      {data?.brand?.name}
                    </mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Bộ nhớ : </span>
                    {data?.memorys?.map((item, index) => (
                      <mark className="px-2 bg-blue-600 text-white" key={index}>
                        {item?.name}
                      </mark>
                    ))}
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Màu sắc : </span>
                    {data?.colors?.map((item, index) => (
                      <mark className="px-2 bg-blue-600 text-white" key={index}>
                        {item?.name}
                      </mark>
                    ))}
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Ảnh sản phẩm :</span>
                    <img src={data?.image} className="w-20" alt="" />
                    <Button onClick={() => setOpenImage(!openImage)}>
                      Xem ảnh
                    </Button>
                    {openImage && (
                      <Dialog
                        fullWidth
                        open={openImage}
                        onClose={handleCloseImage}
                        TransitionComponent={Transition}
                        maxWidth="lg"
                      >
                        <img
                          src={data?.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </Dialog>
                    )}
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Số lượng sản phẩm :</span>
                    <mark className="px-2">{data?.soluong_sanpham}</mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span className="basis-[15%]">Tin tức về sản phẩm :</span>
                    <span
                      className="p-4 basis-[85%] w-full"
                      dangerouslySetInnerHTML={{ __html: `${data?.content}` }}
                    ></span>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Tiêu đề :</span>
                    <mark className="px-2">
                      {data?.title !== "" ? data?.title : "Chưa cập nhật"}
                    </mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Hệ điều hành :</span>
                    <mark className="px-2">
                      {data?.heDieuHanh !== ""
                        ? data?.heDieuHanh
                        : "Chưa cập nhật"}
                    </mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Camera trước :</span>
                    <mark className="px-2">
                      {data?.camera_truoc !== ""
                        ? data?.camera_truoc
                        : "Chưa cập nhật"}
                    </mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Camera sau :</span>
                    <mark className="px-2">
                      {data?.camera_sau !== ""
                        ? data?.camera_sau
                        : "Chưa cập nhật"}
                    </mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Chip :</span>
                    <mark className="px-2">
                      {data?.chip !== "" ? data?.chip : "Chưa cập nhật"}
                    </mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Ram :</span>
                    <mark className="px-2">
                      {data?.ram !== "" ? data?.ram : "Chưa cập nhật"}
                    </mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Dung lượng lưu trữ :</span>
                    <mark className="px-2">
                      {data?.dungluongluutru !== ""
                        ? data?.dungluongluutru
                        : "Chưa cập nhật"}
                    </mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Sim :</span>
                    <mark className="px-2">
                      {data?.sim !== "" ? data?.sim : "Chưa cập nhật"}
                    </mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Pin & Sạc :</span>
                    <mark className="px-2">
                      {data?.pin_sac !== "" ? data?.pin_sac : "Chưa cập nhật"}
                    </mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Thiết kế :</span>
                    <mark className="px-2">
                      {data?.thietke !== "" ? data?.thietke : "Chưa cập nhật"}
                    </mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Chất liệu :</span>
                    <mark className="px-2">
                      {data?.chatlieu !== "" ? data?.chatlieu : "Chưa cập nhật"}
                    </mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Kích thước & Khối lượng :</span>
                    <mark className="px-2">
                      {data?.kichthuoc_khoiluong !== ""
                        ? data?.kichthuoc_khoiluong
                        : "Chưa cập nhật"}
                    </mark>
                  </div>
                  <div className="flex items-center gap-x-5 mb-5">
                    <span>Thời điểm ra mắt :</span>
                    <mark className="px-2">
                      {data?.thoidiemramat !== ""
                        ? data?.thoidiemramat
                        : "Chưa cập nhật"}
                    </mark>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DetailProductDialog;
