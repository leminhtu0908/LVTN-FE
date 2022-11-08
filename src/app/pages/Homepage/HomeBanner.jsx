import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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
    <div className="px-6 w-full max-w-[1200px] mx-auto">
      {data?.map((item) => (
        <img src={item.imageBanner} alt="" className="w-full" />
      ))}
    </div>
  );
};

export default HomeBanner;
