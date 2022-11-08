import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import * as bannerAction from "../../modules/Admin/Banner/_redux/bannerAction";
const HomeBanner = () => {
  const { bannerState } = useSelector(
    (state) => ({ bannerState: state.banners }),
    shallowEqual
  );
  const { data } = bannerState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(bannerAction.fetchBanners());
  }, [dispatch]);
  return (
    <div className="w-full max-w-full mx-auto">
      <Swiper
        spaceBetween={40}
        slidesPerView={"auto"}
        grabCursor={true}
        // loop={true}
        navigation={{ clickable: true }}
        modules={[Autoplay, Navigation, A11y]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
      >
        {data?.map((item) => (
          <SwiperSlide key={item._id}>
            <img src={item.imageBanner} alt="" className="w-full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner;
