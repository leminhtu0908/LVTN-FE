import React from "react";
import { IoIosAdd } from "react-icons/io";
import { AvatarDefault } from "../../../utils/avatarDefault";
const FriendListHorizontal = () => {
  return (
    <div className="py-4 flex items-center gap-x-3">
      <div className="relative text-center">
        <img
          src={AvatarDefault.avatarMale}
          alt=""
          className="w-[50px] h-[50px] rounded-full object-cover border-2 border-blue-500 mb-2"
        />
        <span className="text-[14px] font-medium">Name</span>
        <div className="p-1 bg-slate-100 absolute rounded-full bottom-6 left-[14px] cursor-pointer">
          <IoIosAdd className="text-slate-500 text-sm"></IoIosAdd>
        </div>
      </div>
      <div className="text-center">
        <img
          src={AvatarDefault.avatarFemale}
          alt=""
          className="w-[50px] h-[50px] rounded-full object-cover border-2 border-blue-500 mb-2"
        />
        <span className="text-[14px] font-medium ">Name</span>
      </div>
      <div className="">
        <img
          src={AvatarDefault.avatarFemale}
          alt=""
          className="w-[50px] h-[50px] rounded-full object-cover border-2 border-blue-500 mb-2"
        />
        <span className="text-[14px] font-medium">Name</span>
      </div>
    </div>
  );
};

export default FriendListHorizontal;
