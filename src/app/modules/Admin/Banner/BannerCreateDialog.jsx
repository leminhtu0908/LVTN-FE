import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Field } from "../../../../components/field";
import Input from "../../../../components/input/Input";
import * as Yup from "yup";
import InputAdmin from "../../../../components/input/InputAdmin";
import { Button } from "../../../../components/button";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "./_redux/bannerAction";
import ImageUpload from "../../../../components/image/ImageUpload";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const BannerCreateDialog = (props) => {
  const [typeFile, setTypeFile] = useState("");
  const [thumb, setThumb] = useState("");
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
  };
  const dispatch = useDispatch();
  const schemaValidation = Yup.object().shape({
    image: Yup.string().required("Vui lòng chọn ảnh"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
  // useEffect(() => {
  //   if (props.isEdit) {
  //     setValue("thumb", props.data?.imageBanner);
  //   } else if (!props.isEdit) {
  //     setValue("thumb", null);
  //   }
  // }, [props.data, props.isEdit, setValue]);
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
  const handleSubmitCreateBanner = async () => {
    if (props.isEdit) {
      // const cloneValueUpdate = {
      //   ...values,
      //   id: props.data._id,
      // };
      // dispatch(actions.updateColor(cloneValueUpdate));
    } else {
      const formData = new FormData();
      const imageFile = document.getElementById("bannerImage");
      formData.append("image", imageFile.files[0]);
      dispatch(actions.createBanner(formData));
    }
    props.closeCreateDialog(false);
  };
  return (
    <>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thêm ảnh bìa quảng cáo"}</DialogTitle>
        <div className="p-4">
          <form>
            <label
              className={`cursor-pointer flex items-center gap-x-2 justify-center bg-gray-100 rounded-lg relative group overflow-hidden`}
            >
              <input
                type="file"
                name="image"
                id="bannerImage"
                className="hidden-input"
                onChange={handleChangeImage}
              />
              {!thumb ? (
                <div className="flex flex-col items-center text-center pointer-events-none">
                  <img
                    srcSet="/img/img-upload.png"
                    alt="upload-img"
                    className="max-w-[80px] mb-5"
                  />
                  <p className="font-semibold">Choose photo</p>
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

            <div className="flex items-end gap-x-3 mt-5">
              <Button
                className="bg-red-600"
                onClick={handleCloseDialog}
                type="button"
              >
                Hủy
              </Button>

              <Button type="button" onClick={handleSubmitCreateBanner}>
                {props.isEdit ? "Cập nhật" : "Thêm"}
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default BannerCreateDialog;
