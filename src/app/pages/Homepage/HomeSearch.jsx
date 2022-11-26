import React from "react";
import Button from "../../../components/button/Button";
import InputCutomer from "../../../components/input/InputCustomer";
import { BsSearch } from "react-icons/bs";
import { useForm } from "react-hook-form";
const HomeSearch = (props) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
  });
  const handleSubmitSearch = (values) => {
    props.onSearch(values);
    props.onScroll();
  };
  return (
    <div className="min-h-[520px] pt-[88px]">
      <img
        srcSet="/img/bg.png"
        alt=""
        className="w-full h-[520px] object-fill relative"
      />
      <div className="overlay absolute bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.2)] inset-0 mt-[88px] flex w-full h-[520px] flex-col items-center justify-center p-5 text-center md:px-20 lg:space-y-10">
        <h1 className="text-2xl text-white font-bold tracking-tight text-heading lg:text-4xl xl:text-5xl">
          Groceries Delivered in 90 Minute
        </h1>
        <p className="text-sm text-heading lg:text-base xl:text-lg text-white">
          Get your healthy foods &amp; snacks delivered at your doorsteps all
          day everyday
        </p>
        <div className="w-full max-w-3xl">
          <form onSubmit={handleSubmit(handleSubmitSearch)} className="w-full">
            <div className="relative flex rounded md:rounded-lg h-14 shadow-900 w-full">
              <div className="basis-[80%]">
                <InputCutomer
                  name="name"
                  className="bg-white"
                  control={control}
                  placeholder="Nhập tên sản phẩm để tìm kiếm"
                ></InputCutomer>
              </div>
              <div className="basis-[20%]">
                <Button
                  type="submit"
                  className="mx-0 w-full h-full px-4 py-4 flex items-center justify-center gap-x-2 bg-green-500 rounded-l-none"
                >
                  <BsSearch></BsSearch> Tìm kiếm
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;
