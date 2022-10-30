import React from "react";
import { shallowEqual, useSelector } from "react-redux";
const Loading = () => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.roots }),
    shallowEqual
  );
  const { isLoading } = currentState;
  return (
    <>
      {isLoading && (
        <div className="max-w-[1400px] w-full mx-auto inset-0 overflow-hidden bg-transparent opacity-90 z-[999] ">
          <div className="flex items-center justify-center gap-x-5 dot-loading h-[100vh]">
            <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
            <div className="w-8 h-8 bg-green-400 rounded-full"></div>
            <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
            <div className="w-8 h-8 bg-purple-400 rounded-full"></div>
            <div className="w-8 h-8 bg-black rounded-full"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
