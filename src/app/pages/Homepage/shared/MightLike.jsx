import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/button";
import { AvatarDefault } from "../../../../utils/avatarDefault";
const MightLike = () => {
  return (
    <div className="bg-white rounded-lg">
      <div className="p-4 border-b border-b-gray-300">
        <div className="flex items-center justify-between ">
          <h5 className="text-sm text-[#4E5D78] font-medium">You Might Like</h5>
          <Link to="#" className="text-sm text-blue-500 font-medium">
            See all
          </Link>
        </div>
      </div>
      <div className="py-2 px-3">
        <div className="mb-2 flex gap-x-4">
          <img
            src={AvatarDefault.avatarMale}
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div className="">
            <h3 className="text-sm font-normal text-[#596a8b]">
              Radovan SkillArena
            </h3>
            <p className="text-[12px]">Introduction</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button type="button" className="px-8 py-2 text-sm bg-slate-400">
            Ignore
          </Button>
          <Button type="button" className="px-8 py-2 text-sm">
            Flolow
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MightLike;
