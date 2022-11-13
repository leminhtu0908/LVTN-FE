import React, { useState } from "react";
import { FiVideo } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { AvatarDefault } from "../../../../utils/avatarDefault";
import { Button } from "../../../../components/button";
import LoadingSubmit from "../../../../components/loading/LoadingSubmit";
import { shallowEqual, useSelector } from "react-redux";
const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const [typeFile, setTypeFile] = useState("");
  const [thumb, setThumb] = useState("");
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    // resolver: yupResolver(schemaValidation),
    mode: "onChange",
    // defaultValues: {
    //   visible: Visible.FRIENDS,
    // },
  });
  const watchVisible = watch("visible");
  const handleResetFileChoosen = () => {
    setThumb("");
    setVideo("");
  };
  const { currentState } = useSelector(
    (state) => ({ currentState: state.auth }),
    shallowEqual
  );
  const { token, user } = currentState?.authToken;
  const { gender } = user;
  const onChangeImageCreatePost = (e) => {
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
    } else {
      setTypeFile("video");
      setVideo(URL?.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmitCreatePost = async () => {
    setLoading(true);
    const formData = new FormData();
    var imagefile = document.getElementById("postImage");
    if (typeFile === "image") {
      formData.append("image", imagefile.files[0]);
    } else {
      formData.append("video", imagefile.files[0]);
    }
    formData.append("title", title);
    await axios({
      method: "post",
      url: "https://meetmax.herokuapp.com/posts/create",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        toast.success("Create Post Successfully!");
        setOpen(false);
        setTitle("");
        handleResetFileChoosen();
        setLoading(false);
        window.location.reload();
      })
      .catch(function (response) {});
  };
  return (
    <>
      <div className="bg-white rounded-lg p-4">
        <div className="flex gap-x-2 mb-5">
          <img
            src={
              gender === "Nam"
                ? AvatarDefault.avatarMale
                : AvatarDefault.avatarFemale
            }
            alt=""
            className="w-[42px] h-[42px] rounded-full object-cover"
          />
          <input
            type="text"
            placeholder="What's happening?"
            className="px-2 border border-slate-300 w-full rounded-lg bg-gray-100"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div className="flex gap-x-2 items-center cursor-pointer text-gray-700">
              <FiVideo />
              <span className="text-sm">Live Video</span>
            </div>

            <div
              className="flex gap-x-2 items-center cursor-pointer text-gray-700"
              onClick={() => setOpen(!open)}
            >
              <MdOutlineInsertPhoto />
              <span className="text-sm">Photo/Video</span>
            </div>
            <div className="flex gap-x-2 items-center cursor-pointer text-gray-700">
              <BsEmojiSmile />
              <span className="text-sm">Feeling</span>
            </div>
          </div>
          <Button
            type="button"
            className="px-8 py-2 mx-0"
            onClick={() => setOpen(!open)}
          >
            Post
          </Button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 bg-slate-700 z-50 w-full bg-opacity-50  flex items-center justify-center">
          <div className="relative w-[500px] bg-zinc-100 rounded-lg">
            <div className="relative rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-center p-2 border-b border-b-slate-300">
                <h4 className="text-lg font-semibold text-[#4E5D78]">
                  Create a post
                </h4>
                <div className="flex items-center">
                  <span className="pr-5 text-sm">Visible for</span>
                  <div className="w-[150px] mr-2">
                    {/* <Dropdown>
                      <Dropdown.Select
                        placeholder={`${watchVisible}`}
                        className="text-sm"
                      ></Dropdown.Select>
                      <Dropdown.List>
                        <Dropdown.Option>
                          <Radio
                            name="visible"
                            control={control}
                            checked={watchVisible === Visible.PUBLIC}
                            onClick={() => setValue("visible", Visible.PUBLIC)}
                            value={Visible.PUBLIC}
                            className="p-0"
                          >
                            Public
                          </Radio>
                        </Dropdown.Option>
                        <Dropdown.Option>
                          <Radio
                            name="visible"
                            className="p-0"
                            control={control}
                            checked={watchVisible === Visible.FRIENDS}
                            onClick={() => setValue("visible", Visible.FRIENDS)}
                            value={Visible.FRIENDS}
                          >
                            Friends
                          </Radio>
                        </Dropdown.Option>
                        <Dropdown.Option>
                          <Radio
                            className="p-0"
                            name="visible"
                            control={control}
                            checked={watchVisible === Visible.ONLYME}
                            onClick={() => setValue("visible", Visible.ONLYME)}
                            value={Visible.ONLYME}
                          >
                            Only me
                          </Radio>
                        </Dropdown.Option>
                      </Dropdown.List>
                    </Dropdown> */}
                  </div>
                  <button
                    onClick={() => setOpen(!open)}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <form className="p-2" method="post">
                <div className="flex gap-x-2 mb-5 ">
                  <img
                    src={AvatarDefault.avatarMale}
                    alt=""
                    className="w-[42px] h-[42px] rounded-full object-cover"
                  />
                  <textarea
                    type="text"
                    name="tilte"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What's happening?"
                    className="border border-slate-300 w-full rounded-lg bg-gray-100 p-4 bg-primary resize-none h-[150px] outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                {thumb || video ? (
                  <div className="p-2 w-full h-[200px] overflow-y-scroll relative">
                    <div
                      className="absolute p-2 bg-white rounded-full cursor-pointer right-5 top-5 z-50"
                      onClick={handleResetFileChoosen}
                    >
                      <IoIosCloseCircleOutline className="text-2xl"></IoIosCloseCircleOutline>
                    </div>
                    {thumb && (
                      <img src={thumb} alt="Img Post" className="img__post" />
                    )}
                    {video && (
                      <video className="video__post" controls>
                        <source src={video} />
                      </video>
                    )}
                  </div>
                ) : null}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-4">
                    <div className="flex gap-x-2 items-center cursor-pointer text-gray-700">
                      <FiVideo />
                      <span className="text-sm">Live Video</span>
                    </div>
                    <div className="flex gap-x-2 items-center cursor-pointer text-gray-700 relative">
                      <label
                        className={`cursor-pointer flex items-center gap-x-2 justify-center bg-gray-100 rounded-lg relative group overflow-hidden`}
                      >
                        <input
                          type="file"
                          name="postImage"
                          id="postImage"
                          className="hidden-input"
                          onChange={onChangeImageCreatePost}
                        />
                        <MdOutlineInsertPhoto />
                        <span className="text-sm">Photo/Video</span>
                      </label>
                    </div>
                    <div className="flex gap-x-2 items-center cursor-pointer text-gray-700">
                      <BsEmojiSmile />
                      <span className="text-sm">Feeling</span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={handleSubmitCreatePost}
                    className="px-8 py-2 mx-0"
                    disabled={loading}
                  >
                    {loading ? <LoadingSubmit /> : "Post"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
