import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import { AvatarDefault } from "../../../../utils/avatarDefault";
const Birthdays = () => {
  return (
    <div className="bg-white rounded-lg mt-5">
      <div className="p-4 border-b border-b-gray-300">
        <div className=" flex items-center justify-between">
          <h1 className="text-sm text-[#4E5D78] font-medium">Birthdays</h1>
          <Link to="#" className="text-sm text-blue-500 font-medium">
            See all
          </Link>
        </div>
      </div>
      <div className="px-4 py-2 flex items-center gap-x-3">
        <img
          src={AvatarDefault.avatarMale}
          alt=""
          className="w-[40px] h-[40px] rounded-lg object-cover"
        />
        <div className="">
          <h1 className="text-sm text-[#4E5D78] font-medium">
            Edilson De Carvalho{" "}
          </h1>
          <span className="text-[10px] text-slate-500">Birthday today</span>
        </div>
      </div>
      <div className="px-4 py-2 flex items-center gap-x-2">
        <input
          type="text"
          className="border border-slate-300 w-full rounded-lg bg-gray-100 px-2 py-1 text-[10px]"
          placeholder="Write on his inbox"
        />
        <div className="p-1 cursor-pointer bg-blue-100 rounded-md">
          <AiOutlineSend className="text-blue-700"></AiOutlineSend>
        </div>
      </div>
      <div className="px-4 py-2">
        <div className="flex gap-x-2">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40" height="40" rx="6" fill="#FFAB00" />
            <rect
              width="40"
              height="40"
              rx="6"
              fill="white"
              fillOpacity="0.8"
            />
            <path
              d="M29 22.0659C29 22.6797 28.6826 23.2522 28.1298 23.6362C27.7171 23.9236 27.2172 24.0753 26.6855 24.0753C25.9766 24.0753 25.3154 23.7971 24.871 23.312L24.4583 22.8568L24.0431 23.312C23.6013 23.7971 22.94 24.073 22.2285 24.073C21.517 24.073 20.8557 23.7948 20.414 23.3097L20.0013 22.8568L19.586 23.312C19.1443 23.7971 18.483 24.0753 17.7715 24.0753C17.06 24.0753 16.3987 23.7971 15.9569 23.312L15.5443 22.8568L15.129 23.312C14.6873 23.7971 14.026 24.0753 13.3145 24.0753C12.7828 24.0753 12.2829 23.9236 11.8702 23.6362C11.3174 23.2522 11 22.6797 11 22.0659C11 20.9577 12.0369 20.0542 13.3145 20.0542C13.5578 20.0542 14.5815 20.0542 15.9622 20.0565L18.0492 20.0588V16.1618C18.0492 15.8491 18.3428 15.5939 18.7026 15.5939H21.3159C21.6757 15.5939 21.9693 15.8491 21.9693 16.1618V20.0588C24.3314 20.0611 26.3284 20.0611 26.6855 20.0611C27.9631 20.0611 29 20.96 29 22.0659Z"
              fill="#FFAB00"
            />
            <path
              d="M28.8676 24.3006V29.2666C28.8676 29.6713 28.4894 30.0001 28.0239 30.0001H11.9971C11.5316 30.0001 11.1533 29.6713 11.1533 29.2666V24.3098C11.1718 24.3236 11.1904 24.3373 11.2115 24.3511C11.32 24.427 11.4337 24.496 11.5501 24.5581C12.0791 24.8409 12.6901 24.9926 13.3144 24.9926C14.1476 24.9926 14.9332 24.7305 15.5442 24.2615C16.1552 24.7305 16.9408 24.9926 17.774 24.9926C18.6073 24.9926 19.3928 24.7305 20.0039 24.2615C20.6149 24.7305 21.4005 24.9926 22.2337 24.9926C23.0669 24.9926 23.8525 24.7305 24.4635 24.2615C25.0746 24.7305 25.8602 24.9926 26.6934 24.9926C27.3255 24.9926 27.9445 24.8363 28.4762 24.5489C28.5873 24.4891 28.6957 24.4224 28.7962 24.3511C28.8174 24.3373 28.8412 24.319 28.8676 24.3006Z"
              fill="#FFAB00"
            />
            <path
              d="M17.7793 13.0647V13.0601C17.8057 11.5703 19.6706 10.2368 19.7526 10.1793L20.0091 10L20.2604 10.1839C20.2816 10.2 20.7841 10.5725 21.2761 11.099C21.9639 11.8393 22.2839 12.5037 22.2257 13.0808C22.2152 14.1384 21.2232 14.996 20.0038 14.996C18.7765 14.996 17.7793 14.1292 17.7793 13.0647Z"
              fill="#FFAB00"
            />
          </svg>

          <div className="">
            <h1 className="text-sm text-[#4E5D78] font-medium">
              Upcoming birthdays
            </h1>
            <p className="text-[10px] text-[#8d8b8b]">
              See 12 others have upcoming birthdays
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Birthdays;
