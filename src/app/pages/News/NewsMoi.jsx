import moment from "moment";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as newsAction from "../../modules/Admin/News/_redux/newsAction";

const NewsMoi = () => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.news }),
    shallowEqual
  );
  const { data } = currentState;
  const [newData, setNewData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(newsAction.fetchNews());
  }, []);
  useEffect(() => {
    const filterData = data?.filter((item) => item.typeNew === "san-pham-moi");
    setNewData(filterData);
  }, [data]);
  return (
    <div className="bg-slate-100 p-2 rounded-lg shadow-lg">
      {newData?.length > 0 &&
        newData?.map((item, index) => (
          <>
            <div
              className="flex gap-x-5 mb-5 items-start justify-start"
              key={index}
            >
              <div className="basis-[15%] h-[200px] w-[300px]">
                <img src={item.imageNew} alt="" className="h-full w-full" />
              </div>
              <div className="basis-[85%] ">
                <div className="mt-3">
                  <span className="px-4 py-2 rounded-3xl bg-orange-500 text-white text-sm">
                    {item.typeNew === "san-pham-moi" && "Sản phẩm mới"}
                  </span>
                </div>
                <div className="mt-3 text-sm italic">
                  <span>{moment(item.updatedAt).format("LLLL")}</span>
                </div>
                <div className="mt-4">
                  <h1
                    className="text-2xl font-semibold hover:text-green-500 cursor-pointer"
                    onClick={() => navigate(`/news-page/${item.slug}`)}
                  >
                    {item.title}
                  </h1>
                </div>
              </div>
            </div>
            <hr className="mb-5" />
          </>
        ))}
    </div>
  );
};

export default NewsMoi;
