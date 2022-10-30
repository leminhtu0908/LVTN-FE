import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";

const RecentEvent = () => {
  return (
    <div className="bg-white rounded-lg mt-5">
      <div className="p-4 border-b border-b-gray-300">
        <div className=" flex items-center justify-between">
          <h1 className="text-sm text-[#4E5D78] font-medium">Recent Event</h1>
          <FiMoreHorizontal className="cursor-pointer text-xl"></FiMoreHorizontal>
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
            <rect width="40" height="40" rx="6" fill="#38CB89" />
            <rect
              width="40"
              height="40"
              rx="6"
              fill="white"
              fillOpacity="0.8"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21 26.4807C21 26.8457 21.3805 27.0964 21.7221 26.968C22.9648 26.5007 25.7449 25.6044 29.538 25.2614C29.7983 25.2378 30.0001 25.0276 30.0001 24.7662C30.0001 22.851 30.0001 15.4811 30.0001 13.4912C30.0001 13.215 29.7786 12.9957 29.5028 13.0095C28.2477 13.0722 24.8014 13.3808 21.2953 14.9009C21.1152 14.979 21 15.1574 21 15.3537C21 16.9573 21 24.0941 21 26.4807Z"
              fill="#38CB89"
            />
            <path
              opacity="0.6"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19 26.4807C19 26.8457 18.6195 27.0964 18.2779 26.968C17.0352 26.5007 14.2551 25.6044 10.462 25.2614C10.2017 25.2378 9.99995 25.0276 9.99995 24.7662C9.99995 22.851 9.99995 15.4811 9.99995 13.4912C9.99995 13.215 10.2214 12.9957 10.4972 13.0095C11.7523 13.0722 15.1986 13.3808 18.7047 14.9009C18.8848 14.979 19 15.1574 19 15.3537C19 16.9573 19 24.0941 19 26.4807Z"
              fill="#38CB89"
            />
          </svg>
          <div className="">
            <h1 className="text-sm text-[#4E5D78] font-medium">
              Graduation Ceremony
            </h1>
            <p className="text-[10px] text-[#8d8b8b]">
              The graduation ceremony is also sometimes called...
            </p>
          </div>
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
            <rect width="40" height="40" rx="6" fill="#FF5630" />
            <rect
              width="40"
              height="40"
              rx="6"
              fill="white"
              fillOpacity="0.8"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 15.1995C10.8954 15.1995 10 16.0949 10 17.1995V25.9996C10 27.1042 10.8954 27.9996 12 27.9996H28C29.1046 27.9996 30 27.1042 30 25.9996V17.1995C30 16.0949 29.1046 15.1995 28 15.1995H12ZM15.5554 21.5998C15.5554 23.9562 17.5453 25.8665 19.9999 25.8665C22.4545 25.8665 24.4443 23.9562 24.4443 21.5998C24.4443 19.2433 22.4545 17.3331 19.9999 17.3331C17.5453 17.3331 15.5554 19.2433 15.5554 21.5998Z"
              fill="#FF5630"
            />
            <rect
              x="16.666"
              y="12"
              width="6.66667"
              height="2.13336"
              rx="1.06668"
              fill="#FF5630"
            />
            <path
              opacity="0.3"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.0005 23.7336C21.2278 23.7336 22.2228 22.7785 22.2228 21.6003C22.2228 20.4221 21.2278 19.4669 20.0005 19.4669C18.7732 19.4669 17.7783 20.4221 17.7783 21.6003C17.7783 22.7785 18.7732 23.7336 20.0005 23.7336Z"
              fill="#FF5630"
            />
          </svg>

          <div className="">
            <h1 className="text-sm text-[#4E5D78] font-medium">
              Photography Ideas
            </h1>
            <p className="text-[10px] text-[#8d8b8b]">
              Reflections. Reflections work because they can create...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentEvent;
