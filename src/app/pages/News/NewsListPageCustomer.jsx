import moment from "moment";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import HeadingLayout from "../../../components/header/HeadingLayout";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";
import * as newsAction from "../../modules/Admin/News/_redux/newsAction";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
const NewsListPageCustomer = () => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.news }),
    shallowEqual
  );
  const { data } = currentState;
  const [newData, setNewData] = useState([]);
  const [lastData, setLastData] = useState([]);
  const [dataCongNgheMoi, setDataCongNgheMoi] = useState([]);
  const [dataSanPhamMoi, setDataSanPhamMoi] = useState([]);
  const [dataMeoHay, setDataMeoHay] = useState([]);
  const [dataDanhGia, setDataDanhGia] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(newsAction.fetchNews());
  }, []);
  useEffect(() => {
    const filterDataCongNgheMoi = data?.filter(
      (item) => item.typeNew === "cong-nghe-moi"
    );
    setDataCongNgheMoi(filterDataCongNgheMoi);
    const filterDataSanphammoi = data?.filter(
      (item) => item.typeNew === "san-pham-moi"
    );
    setDataSanPhamMoi(filterDataSanphammoi);
    const filterDataMeohay = data?.filter((item) => item.typeNew === "meo-hay");
    setDataMeoHay(filterDataMeohay);
    const filterDataDanhgia = data?.filter(
      (item) => item.typeNew === "danh-gia"
    );
    setDataDanhGia(filterDataDanhgia);
  }, [data]);
  useEffect(() => {
    if (data && data.length > 0) {
      const [first, ...last] = data;
      setNewData(first);
      setLastData(last);
    }
  }, [data]);
  return (
    <LayoutCustomer>
      <div className="max-w-[1200px] w-full mx-auto pt-[88px]">
        <div className="flex py-4 gap-x-2">
          <div className="basis-[65%]">
            <div className="my-2 hover:cursor-pointer">
              <img
                src={newData.imageNew}
                alt=""
                className="rounded-lg hover:shadow-lg"
              />
              <div className="py-2">
                <h1
                  className="text-3xl mb-2 hover:text-green-500"
                  onClick={() => navigate(`/news-page/${newData.slug}`)}
                >
                  {newData.title}
                </h1>
                <div className=" flex gap-x-4 items-center">
                  <span className="text-[12px] text-red-400">
                    {newData.typeNew}
                  </span>
                  <span>{moment(newData.updatedAt).format("LLLL")}</span>
                </div>
              </div>
            </div>
            <div className="my-4">
              <Swiper
                spaceBetween={40}
                slidesPerView={"auto"}
                grabCursor={true}
                navigation={{ clickable: true }}
                modules={[Navigation, A11y]}
                className="swiper-wrapper-news w-full"
              >
                <div className="flex w-[320px] gap-x-5 ">
                  {lastData.length > 0 &&
                    lastData?.map((item) => (
                      <SwiperSlide key={item._id}>
                        <div className="w-full">
                          <div className="hover:cursor-pointer">
                            <img
                              src={item.imageNew}
                              alt=""
                              className="rounded-lg w-full h-[125px]"
                            />
                            <div className="py-2">
                              <h1
                                className="text-xl hover:text-green-500"
                                onClick={() =>
                                  navigate(`/news-page/${item.slug}`)
                                }
                              >
                                {item.title.length > 50
                                  ? item.title?.slice(0, 50) + "..."
                                  : item.title}
                              </h1>
                              <div className=" flex gap-x-4 items-center">
                                <span className="text-[12px] text-red-400">
                                  {item.typeNew}
                                </span>
                                <span>
                                  {moment(item.updatedAt).format("LT")} -{" "}
                                  {moment(item.updatedAt).format("ll")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </div>
              </Swiper>
            </div>
            <div className="my-4">
              <HeadingLayout>Công nghệ mới</HeadingLayout>
              {dataCongNgheMoi?.length > 0 &&
                dataCongNgheMoi?.map((item) => (
                  <>
                    <div className="flex hover:cursor-pointer my-2 gap-x-2 mb-4">
                      <div className="basis-[20%]">
                        <img
                          src={item.imageNew}
                          alt=""
                          className="w-full h-[100px] rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h1
                          className="text-xl hover:text-green-500"
                          onClick={() => navigate(`/news-page/${item.slug}`)}
                        >
                          {item.title.length > 50
                            ? item.title?.slice(0, 50) + "..."
                            : item.title}
                        </h1>
                        <div className=" flex gap-x-4 items-center">
                          <span className="text-[12px] text-red-400">
                            {item.typeNew}
                          </span>
                          <span>{moment(item.updatedAt).format("LT")}</span>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
            </div>
            <div className="my-4">
              <HeadingLayout>Sản phẩm mới</HeadingLayout>
              {dataSanPhamMoi?.length > 0 &&
                dataSanPhamMoi?.map((item) => (
                  <>
                    <div className="flex hover:cursor-pointer my-2 gap-x-2 mb-4">
                      <div className="basis-[20%]">
                        <img
                          src={item.imageNew}
                          alt=""
                          className="w-full h-[100px] rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h1
                          className="text-xl hover:text-green-500"
                          onClick={() => navigate(`/news-page/${item.slug}`)}
                        >
                          {item.title.length > 50
                            ? item.title?.slice(0, 50) + "..."
                            : item.title}
                        </h1>
                        <div className=" flex gap-x-4 items-center">
                          <span className="text-[12px] text-red-400">
                            {item.typeNew}
                          </span>
                          <span>{moment(item.updatedAt).format("LT")}</span>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
            </div>
            <div className="my-4">
              <HeadingLayout>Mẹo hay</HeadingLayout>
              {dataMeoHay?.length > 0 &&
                dataMeoHay?.map((item) => (
                  <>
                    <div className="flex hover:cursor-pointer my-2 gap-x-2 mb-4">
                      <div className="basis-[20%]">
                        <img
                          src={item.imageNew}
                          alt=""
                          className="w-full h-[100px] rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h1
                          className="text-xl hover:text-green-500"
                          onClick={() => navigate(`/news-page/${item.slug}`)}
                        >
                          {item.title.length > 50
                            ? item.title?.slice(0, 50) + "..."
                            : item.title}
                        </h1>
                        <div className=" flex gap-x-4 items-center">
                          <span className="text-[12px] text-red-400">
                            {item.typeNew}
                          </span>
                          <span>{moment(item.updatedAt).format("LT")}</span>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
            </div>
            <div className="my-4">
              <HeadingLayout>Đánh giá</HeadingLayout>
              {dataDanhGia?.length > 0 &&
                dataDanhGia?.map((item) => (
                  <>
                    <div className="flex hover:cursor-pointer my-2 gap-x-2 mb-4">
                      <div className="basis-[20%]">
                        <img
                          src={item.imageNew}
                          alt=""
                          className="w-full h-[100px] rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h1
                          className="text-xl hover:text-green-500"
                          onClick={() => navigate(`/news-page/${item.slug}`)}
                        >
                          {item.title.length > 50
                            ? item.title?.slice(0, 50) + "..."
                            : item.title}
                        </h1>
                        <div className=" flex gap-x-4 items-center">
                          <span className="text-[12px] text-red-400">
                            {item.typeNew}
                          </span>
                          <span>{moment(item.updatedAt).format("LT")}</span>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
            </div>
          </div>
          <div className="basis-[35%]">
            {data?.length > 0 &&
              data?.map((item) => (
                <>
                  <div className="flex hover:cursor-pointer my-2 gap-x-2 mb-4">
                    <div className="basis-[20%]">
                      <img
                        src={item.imageNew}
                        alt=""
                        className="w-full h-[80px] rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h1
                        className="text-xl hover:text-green-500"
                        onClick={() => navigate(`/news-page/${item.slug}`)}
                      >
                        {item.title.length > 50
                          ? item.title?.slice(0, 50) + "..."
                          : item.title}
                      </h1>
                      <div className=" flex gap-x-4 items-center">
                        <span className="text-[12px] text-red-400">
                          {item.typeNew}
                        </span>
                        <span>{moment(item.updatedAt).format("LT")}</span>
                      </div>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
          </div>
        </div>
      </div>
    </LayoutCustomer>
  );
};

export default NewsListPageCustomer;
