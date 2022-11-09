import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as newsAction from "../../modules/Admin/News/_redux/newsAction";
const NewsIntroduce = () => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.news }),
    shallowEqual
  );
  const { data } = currentState;
  const [newData, setNewData] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(newsAction.fetchNews());
  }, []);
  useEffect(() => {
    const filterData = data?.filter((item) => item.typeNew === "Introduce");
    setNewData(filterData);
  }, [data]);
  return (
    <div>
      {newData?.length > 0 &&
        newData?.map((item, index) => (
          <div
            className="flex gap-x-5 mb-5 items-start justify-start"
            key={index}
          >
            <div className="basis-[15%] h-[200px] w-[300px]">
              <img src={item.imageNew} alt="" className="h-full w-full" />
            </div>
            <div className="basis-[85%] ">
              <div className="mt-3">
                <span className="px-4 py-2 rounded-3xl bg-green-500 text-white">
                  {item.typeNew === "Introduce" && "Giới thiệu"}
                </span>
              </div>
              <div className="mt-4">
                <a href="# ">
                  <h1 className="text-2xl font-semibold text-blue-500">
                    {item.title}
                  </h1>
                </a>
                <div className=""></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NewsIntroduce;
