import React from "react";
import { useController } from "react-hook-form";
/**
 *
 * @param {*} placeholder(optional) - Placeholder of input
 * @param {*} name(optional) - name of input
 * @param {*} control - control from react hook form
 * @returns Input
 */
const InputAdmin = ({
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
        className={`p-4 bg-primary border border-slate-500 rounded-lg  outline-none focus:border-blue-500 transition-all dark:text-black `}
      />
    </div>
  );
};

export default InputAdmin;
