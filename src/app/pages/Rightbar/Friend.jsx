import React from "react";
import { RiMoreFill } from "react-icons/ri";
const Friend = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-[#4E5D78] font-semibold text-[16px]">Friends</h1>
      <div className="p-2 rounded-full hover:bg-slate-200 cursor-pointer">
        <RiMoreFill className="text-xl text-gray-700"></RiMoreFill>
      </div>
    </div>
  );
};

export default Friend;
