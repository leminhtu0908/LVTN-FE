import React from "react";
import { useController } from "react-hook-form";
import { RiLockPasswordLine } from "react-icons/ri";
const InputToggle = ({
  name = "",
  type = "text",
  control,
  children,
  ...props
}) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <div className="flex flex-col relative">
      <input
        id={name}
        type={type}
        {...props}
        {...field}
        className={`pt-4 pl-[60px] ${
          children ? "pr-[60px]" : "pr-[16px]"
        } pb-4 bg-primary border border-gray-100 rounded-lg  outline-none focus:border-blue-500 transition-all dark:text-black`}
      />
      {children ? (
        <span className="absolute right-[20px] top-[10%] translate-y-2/4 text-2xl cursor-pointer text-gray-500 dark:text-black">
          {children}
        </span>
      ) : null}
      <RiLockPasswordLine className="absolute left-[20px] top-[10%] translate-y-2/4 text-2xl cursor-pointer text-gray-500 dark:text-black" />
    </div>
  );
};

export default InputToggle;
