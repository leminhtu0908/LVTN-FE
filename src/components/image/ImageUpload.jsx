import React from "react";
import { useController } from "react-hook-form";
import { MdOutlineInsertPhoto } from "react-icons/md";
const ImageUpload = ({
  control,
  name,
  className,
  onChangeImageCreatePost,
  ...rest
}) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <label
      className={`cursor-pointer flex items-center gap-x-2 justify-center bg-gray-100 rounded-lg ${className} relative group overflow-hidden`}
    >
      <input
        type="file"
        name={name}
        className="hidden-input"
        onChange={onChangeImageCreatePost}
        {...rest}
        {...field}
      />
      <MdOutlineInsertPhoto />
      <span className="text-sm">Photo/Video</span>
    </label>
  );
};

export default ImageUpload;
