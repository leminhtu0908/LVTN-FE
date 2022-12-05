import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsTrash } from "react-icons/bs";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "../../../components/button";
import Radio from "../../../components/checkbox/Radio";
import FieldCheckboxes from "../../../components/field/FieldCheckboxes";
import InputAdmin from "../../../components/input/InputAdmin";
import Label from "../../../components/label/Label";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";
import { Gender } from "../../../utils/type";
import * as userAciton from "../../modules/Admin/User/_redux/userAction";
const ProfilePage = () => {
  const { currentState } = useSelector(
    (state) => ({
      currentState: state.auth,
    }),
    shallowEqual
  );
  const [thumb, setThumb] = useState("");
  const [typeFile, setTypeFile] = useState("");
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isValid, errors },
  } = useForm({
    // resolver: yupResolver(schemaValidation),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      nickName: "",
      gender: Gender.FEMALE,
      phone: "",
      address: "",
      email: "",
      password: "",
    },
  });
  const genderWatch = watch("gender");
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentState?.user) {
      reset(currentState.user);
      setThumb(currentState.user.image);
    }
  }, [currentState.user, reset]);
  const handleChangeImage = (e) => {
    if (
      e.target.files[0]?.type === "image/jpeg" ||
      e.target.files[0]?.type === "image/png" ||
      e.target.files[0]?.type === "image/jpg"
    ) {
      if (e.target && e.target.files[0]) {
        setTypeFile("image");
        setThumb(URL?.createObjectURL(e.target.files[0]));
      } else {
        toast.warning("Please choose file");
      }
    }
  };
  const handleResetFileChoosen = () => {
    setThumb(null);
  };
  const handleUpdateUser = (values) => {
    const {
      _id,
      fullName,
      email,
      nickName,
      address,
      gender,
      phone,
      dateofbirth,
    } = values;
    const cloneValueUpdateUser = {
      _id,
      fullName,
      email,
      nickName,
      address,
      gender,
      phone,
      dateofbirth,
    };
    dispatch(userAciton.updateUser(cloneValueUpdateUser));
  };
  const handleUpLoadImageUser = () => {
    const formData = new FormData();
    const imageFile = document.getElementById("userImage");
    formData.append("image", imageFile.files[0]);
    dispatch(userAciton.uploadImageUser(formData));
  };
  return (
    <LayoutCustomer>
      <div className="min-h-[87vh] p-10 flex pt-[108px]">
        <div className="p-4 max-w-[1200px] w-full mx-auto h-full shadow-lg">
          <h1 className="text-2xl font-semibold">Thông tin tài khoản</h1>
          <hr />
          <div>
            <div className="mt-4 flex gap-x-4">
              <form
                className="basis-[20%]"
                onSubmit={handleSubmit(handleUpLoadImageUser)}
              >
                <label
                  className={`cursor-pointer w-[230px] flex items-center gap-x-2 justify-center bg-gray-100 rounded-lg relative group overflow-hidden`}
                >
                  <input
                    type="file"
                    name="image"
                    id="userImage"
                    className="hidden-input"
                    onChange={handleChangeImage}
                  />
                  {!thumb ? (
                    <div className="flex flex-col items-center text-center pointer-events-none">
                      <img
                        srcSet="/img/user-upload-1.png"
                        alt="upload-img"
                        className="w-full mb-2"
                      />
                      <p className="font-semibold mb-2">Choose photo</p>
                    </div>
                  ) : (
                    <React.Fragment>
                      <img
                        src={thumb}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      <button
                        className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer z-10  opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible"
                        onClick={handleResetFileChoosen}
                        type="button"
                      >
                        <BsTrash className="text-red-500 text-4xl"></BsTrash>
                      </button>
                    </React.Fragment>
                  )}
                </label>
                <div className="flex items-start justify-start">
                  <Button type="submit" className="mx-0 mt-4">
                    Lưu ảnh
                  </Button>
                </div>
              </form>
              <form
                className="flex-1 "
                onSubmit={handleSubmit(handleUpdateUser)}
              >
                <div className="flex gap-x-4">
                  <div className="basis-[50%]">
                    <div className="mb-5">
                      <Label>Họ và tên :</Label>
                      <InputAdmin
                        control={control}
                        name="fullName"
                        type="text"
                      />
                    </div>
                    <div className="mb-5">
                      <Label>Nickname :</Label>
                      <InputAdmin
                        control={control}
                        name="nickName"
                        type="text"
                      />
                    </div>
                    <div className="mb-5">
                      <Label>Giới tính :</Label>
                      <div className="flex items-center gap-x-5">
                        <FieldCheckboxes>
                          <Radio
                            name="gender"
                            control={control}
                            checked={genderWatch === Gender.MALE}
                            onClick={() => setValue("gender", Gender.MALE)}
                            value={Gender.MALE}
                          >
                            Nam
                          </Radio>
                          <Radio
                            name="gender"
                            control={control}
                            checked={genderWatch === Gender.FEMALE}
                            onClick={() => setValue("gender", Gender.FEMALE)}
                            value={Gender.FEMALE}
                          >
                            Nữ
                          </Radio>
                        </FieldCheckboxes>
                      </div>
                      {/* <InputAdmin control={control} name="gender" type="text" /> */}
                    </div>
                    <div className="mb-5">
                      <Label>Số điện thoại :</Label>
                      <InputAdmin control={control} name="phone" type="text" />
                    </div>
                  </div>
                  <div className="basis-[50%]">
                    <div className="mb-5">
                      <Label>Ngày sinh :</Label>
                      <InputAdmin
                        control={control}
                        name="dateofbirth"
                        type="date"
                      />
                    </div>
                    <div className="mb-5">
                      <Label>Địa chỉ :</Label>
                      <InputAdmin
                        control={control}
                        name="address"
                        type="text"
                      />
                    </div>
                    <div className="mb-5">
                      <Label>Email :</Label>
                      <InputAdmin control={control} name="email" type="text" />
                    </div>
                    {/* <div className="mb-5">
                  <Label>Mật khẩu :</Label>
                  <InputAdmin control={control} name="password" type="text" />
                </div> */}
                  </div>
                </div>
                <div className="flex-col items-end justify-end float-right">
                  <Button type="submit" className="mx-0">
                    Cập nhật
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LayoutCustomer>
  );
};

export default ProfilePage;
