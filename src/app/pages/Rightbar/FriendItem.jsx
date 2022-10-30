import React, { useState } from "react";
import { AvatarDefault } from "../../../utils/avatarDefault";

const FriendItem = ({ item }) => {
  console.log("item", item);

  const [isOnLine, setIsOnLine] = useState(false);
  return (
    <div className="flex items-center justify-between mb-4 hover:bg-slate-300">
      <div className="flex gap-x-2 items-center">
        <img
          src={
            item.gender === "Nam"
              ? AvatarDefault.avatarMale
              : AvatarDefault.avatarFemale
          }
          alt=""
          className="h-[40px] w-[40px] object-cover rounded-full"
        />
        <span className="text-[14px] text-[#4E5D78] font-medium">
          {item.fullName}
        </span>
      </div>
      {item.isOnLine ? (
        <div className="h-[8px] w-[8px] bg-green-600 rounded-full"></div>
      ) : (
        <div className="h-[8px] w-[8px] bg-slate-600 rounded-full"></div>
      )}
    </div>
  );
};

export default FriendItem;
