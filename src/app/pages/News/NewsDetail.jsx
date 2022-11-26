import moment from "moment";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";
import * as newsAction from "../../modules/Admin/News/_redux/newsAction";

const NewsDetail = () => {
  const { slug } = useParams();
  const { currentState } = useSelector(
    (state) => ({ currentState: state.news }),
    shallowEqual
  );
  const { data } = currentState;
  const [newDataDetail, setNewDataDetail] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(newsAction.fetchNews());
  }, []);
  useEffect(() => {
    const p = data?.filter((item) => item.slug === slug);
    setNewDataDetail(p);
  }, [data, slug]);
  const [first] = newDataDetail?.length > 0 ? newDataDetail : [];

  return (
    <LayoutCustomer>
      <div className="pt-[88px] max-w-[1000px] w-full mx-auto">
        <div className="pt-5">
          <h1 className="text-3xl text-green-500 mb-4">{first?.title}</h1>
          <div className=" flex gap-x-4 items-center mb-4">
            <span className="text-[12px] text-red-400">{first?.typeNew}</span>
            <span>{moment(first?.updatedAt).format("LLLL")}</span>
          </div>
          <img
            src={first?.imageNew}
            alt=""
            className="w-full h-full rounded-lg"
          />
        </div>
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: `${first?.content}` }}
        ></div>
      </div>
    </LayoutCustomer>
  );
};

export default NewsDetail;
