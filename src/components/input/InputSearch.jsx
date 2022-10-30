import React from "react";
import { useController } from "react-hook-form";
/**
 *
 * @param {*} placeholder(optional) - Placeholder of input
 * @param {*} name(optional) - name of input
 * @param {*} control - control from react hook form
 * @returns Input
 */
const InputSearch = ({
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
        className={`pt-2 pl-4 ${
          children ? "pr-[40px]" : "pr-[10px]"
        } pb-2 bg-primary border border-gray-100 rounded-lg  outline-none focus:border-blue-500 transition-all dark:text-black `}
      />
      {children ? (
        <span className="absolute right-[10px] top-[-4%] translate-y-2/4 text-2xl cursor-pointer text-gray-500 dark:text-black">
          {children}
        </span>
      ) : null}
    </div>
  );
};

export default InputSearch;
