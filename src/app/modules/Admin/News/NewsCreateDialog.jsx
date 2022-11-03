import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Field } from "../../../../components/field";
import Input from "../../../../components/input/Input";
import * as Yup from "yup";
import InputAdmin from "../../../../components/input/InputAdmin";
import { Button } from "../../../../components/button";
import { useDispatch } from "react-redux";
import * as actions from "./_redux/newsAction";
import Label from "../../../../components/label/Label";
import Dropdown from "../../../../components/dropdown/Dropdown";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import axios from "axios";
Quill.register("modules/imageUploader", ImageUploader);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const typeNews = [
  { name: "Introduce", title: "Giới thiệu" },
  { name: "New", title: "Mới" },
];
const NewsCreateDialog = (props) => {
  const handleCloseDialog = () => {
    props.closeCreateDialog(false);
  };
  const [typeFile, setTypeFile] = useState("");
  const [content, setContent] = useState("");
  const [thumb, setThumb] = useState("");
  const [typeNew, setTypeNew] = useState("");
  const dispatch = useDispatch();
  const schemaValidation = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập tên bài viết"),
    // content: Yup.string().required("Vui lòng nhập nội dụng"),
    slug: Yup.string().required("Vui lòng nhập tên đường dẫn"),
    // typeNews: Yup.string().required("Vui lòng nhập tên loại bài viết"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
    },
  });
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
  const handleSelectDropdown = (e) => {
    setTypeNew(e.target.value);
  };
  const handleSumitNews = async (values) => {
    if (!isValid) return;
    if (props.isEdit) {
      const formData = new FormData();
      const imageFile = document.getElementById("bannerImage");
      formData.append("image", imageFile.files[0]);
      const { imageNew, imagePublicId, slug, title } = values;
      const newValues = {
        imageNew,
        imagePublicId,
        slug,
        title,
      };
      const cloneValueUpdate = {
        ...newValues,
        typeNew: typeNew,
        content: content,
        id: props.data._id,
      };
      formData.append("data", JSON.stringify(cloneValueUpdate));
      dispatch(actions.updateNews(formData));
    } else {
      const formData = new FormData();
      const imageFile = document.getElementById("bannerImage");
      formData.append("image", imageFile.files[0]);
      const cloneValue = {
        ...values,
        typeNew: typeNew,
        content: content,
      };
      formData.append("data", JSON.stringify(cloneValue));
      dispatch(actions.createNews(formData));
    }
    props.closeCreateDialog(false);
  };
  useEffect(() => {
    if (props.isEdit) {
      reset(props.data);
      setContent(props.data.content);
      setThumb(props.data.imageNew);
      setTypeNew(props.data.typeNew);
    } else if (!props.isEdit) {
      reset({
        title: "",
        slug: "",
      });
      setThumb("");
      setContent("");
      setTypeNew("");
    }
  }, [props.data, props.isEdit, reset]);
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/api/image/upload-photo`,
            data: bodyFormData,
          });
          return response.data.image.image;
        },
      },
    }),
    []
  );
  return (
    <>
      <Dialog
        maxWidth="xl"
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        {props.isEdit ? (
          <DialogTitle>{"Cập nhật bài viết"}</DialogTitle>
        ) : (
          <DialogTitle>{"Thêm bài viết"}</DialogTitle>
        )}
        <div className="p-4 w-full">
          <form onSubmit={handleSubmit(handleSumitNews)}>
            <div className="flex gap-x-5">
              <Field>
                <Label>Tiêu đề</Label>
                <InputAdmin type="text" control={control} name="title" />
                {errors && (
                  <p className="text-red-600">{errors.title?.message}</p>
                )}
              </Field>
              <Field>
                <Label>Đường dẫn</Label>
                <InputAdmin type="text" control={control} name="slug" />
                {errors && (
                  <p className="text-red-600">{errors.slug?.message}</p>
                )}
              </Field>
            </div>
            <div className="flex gap-x-5">
              <Field>
                <Label>Loại bài viết</Label>
                <div className="custom-selector">
                  <select
                    onChange={handleSelectDropdown}
                    name="typeNew"
                    value={typeNew}
                    className="custom-select w-[236px] p-4 bg-primary border border-gray-100 rounded-lg  outline-none focus:border-blue-500 transition-all dark:text-black "
                  >
                    {props.isEdit ? null : <option value={null}></option>}
                    {typeNews?.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>
              <Field>
                <Label>Ảnh</Label>
                <label
                  className={`cursor-pointer w-[230px] flex items-center gap-x-2 justify-center bg-gray-100 rounded-lg relative group overflow-hidden`}
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
              </Field>
            </div>
            <div className="">
              <Field>
                <Label>Content</Label>
                <div className="w-full entry-content quill">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    modules={modules}
                    onChange={setContent}
                  />
                </div>
              </Field>
            </div>
            <div className="flex items-center justify-end gap-x-3 mt-5">
              <Button
                className="bg-red-600 mx-0"
                onClick={handleCloseDialog}
                type="button"
              >
                Hủy
              </Button>
              <Button type="submit" className="mx-0">
                {props.isEdit ? "Cập nhật" : "Thêm"}
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default NewsCreateDialog;
