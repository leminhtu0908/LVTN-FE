import React, { useEffect, useRef, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { BiHide } from "react-icons/bi";
import { TbMessageReport } from "react-icons/tb";
import {
  RiShareForwardLine,
  RiSendPlane2Line,
  RiUserUnfollowLine,
} from "react-icons/ri";
import {
  IoMdNotificationsOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import axios from "axios";
import { AvatarDefault } from "../../../../utils/avatarDefault";

const formatCreatedTime = (time) => {
  const event = new Date(time);
  return event.toLocaleString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
const PostItem = ({ post }) => {
  const { author, title, likes, comments, image, createdAt, _id } = post;
  const [openSelect, setOpenSelect] = useState(false);
  const [hiddenPost, setHiddenPost] = useState(false);
  // const [currentPostSelected, setCurrentPostSelected] = useState();
  // const [currentLikeNumnber, setCurrentLikeNumnber] = useState(0);
  const [likeActive, setLikeActive] = useState(false);
  const handleOpen = (id) => {
    setOpenSelect(!openSelect);
  };
  const handleHiddenPost = () => {
    setHiddenPost(true);
    setOpenSelect(false);
  };
  const token = localStorage.getItem("token");
  const handleLikePost = (id) => {
    console.log("id", id);
    const data = {
      postId: id,
    };
    axios({
      method: "post",
      url: "https://meetmax.herokuapp.com/likes/create",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        console.log("like", response.data);
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  return (
    <>
      {hiddenPost ? (
        <div className="p-4 bg-white rounded-lg mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <BiHide className="text-xl text-gray-600"></BiHide>
              <div className="">
                <p className="text-xl text-[#4E5D78] font-medium">
                  Post Hidden
                </p>
                <span className="text-sm">
                  You won’t see this post in your Timeline.
                </span>
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setHiddenPost(false)}
            >
              <IoMdCloseCircleOutline
                className="text-2xl
                text-gray-600"
              ></IoMdCloseCircleOutline>
            </div>
          </div>
        </div>
      ) : null}
      {!hiddenPost && (
        <div className="p-4 bg-white rounded-lg mb-5">
          <div className="header">
            <div className="flex items-center justify-between">
              <div className="flex gap-x-3">
                <img
                  src={
                    author.gender === "Nam"
                      ? AvatarDefault.avatarMale
                      : AvatarDefault.avatarFemale
                  }
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div className="">
                  <h4 className="font-medium text-[#4E5D78] text-lg">
                    {author.fullName}
                  </h4>
                  <span className="text-[12px] text-slate-500">
                    {formatCreatedTime(createdAt)}
                  </span>
                </div>
              </div>
              <div
                className={`p-2 cursor-pointer hover:bg-slate-200 rounded-full relative ${
                  openSelect ? "bg-slate-200" : ""
                }`}
              >
                <FiMoreHorizontal
                  className="text-xl"
                  onClick={() => handleOpen(_id)}
                ></FiMoreHorizontal>
                {openSelect && (
                  <div className="z-10 origin-top-right absolute right-0 top-[100%] mt-2 w-80 py-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div
                      className="text-gray-700 flex items-center gap-x-3 px-4 py-2 text-sm hover:bg-slate-200 cursor-pointer"
                      onClick={handleHiddenPost}
                    >
                      <BiHide></BiHide> <span> Hidden Post</span>
                    </div>
                    <div className="text-gray-700 flex items-center gap-x-3 px-4 py-2 text-sm hover:bg-slate-200 cursor-pointer">
                      <IoMdNotificationsOutline></IoMdNotificationsOutline>{" "}
                      <span> Turn on notification for this post</span>
                    </div>
                    <div className="text-gray-700 flex items-center gap-x-3 px-4 py-2 text-sm hover:bg-slate-200 cursor-pointer">
                      <TbMessageReport></TbMessageReport>{" "}
                      <span>Report this post</span>
                    </div>
                    <div className="text-gray-700 flex items-center gap-x-3 px-4 py-2 text-sm hover:bg-slate-200 cursor-pointer">
                      <RiUserUnfollowLine></RiUserUnfollowLine>{" "}
                      <span>Unfollow</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="content mt-4">
            <p className="text-black font-normal text-[14px] mb-4">{title}</p>
            {image !== undefined && (
              <div className="">
                <img
                  src={image}
                  alt=""
                  className="w-full h-[268px] object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          <div className="total-action mt-4">
            <div className="flex items-center justify-between text-gray-500">
              <div className="">
                <span>{likes.length}</span> Like
              </div>
              <div className="flex gap-x-5">
                <div className="">
                  <span>{comments?.length}</span> Comments
                </div>
                <div className="">
                  <span>0</span> Share
                </div>
              </div>
            </div>
          </div>
          <div className="action mt-2">
            <div className="flex items-center justify-between py-2 border-t border-t-gray-200 border-b border-b-gray-200">
              <div
                className="flex items-center gap-x-2 cursor-pointer"
                onClick={() => {
                  setLikeActive(!likeActive);
                  handleLikePost(_id);
                }}
              >
                {likeActive ? (
                  <FcLike></FcLike>
                ) : (
                  <AiOutlineHeart></AiOutlineHeart>
                )}

                <span>Like</span>
              </div>
              <div className="flex items-center gap-x-2 cursor-pointer">
                <FaRegComment></FaRegComment>
                <span>Comments</span>
              </div>
              <div className="flex items-center gap-x-2 cursor-pointer">
                <RiShareForwardLine></RiShareForwardLine>
                <span>Share</span>
              </div>
            </div>
          </div>
          <div className="comment"></div>
          <div className="write-comment mt-2">
            <div className="flex gap-x-3">
              <div className="basis-[10%]">
                <img
                  src={
                    author.gender === "Nam"
                      ? AvatarDefault.avatarMale
                      : AvatarDefault.avatarFemale
                  }
                  alt=""
                  className="w-[38px] h-[38px] rounded-full object-cover"
                />
              </div>
              <div className="basis-[90%] flex gap-x-2">
                <div className="w-full relative">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="py-2 pl-3 pr-[70px] bg-slate-200 w-full rounded-lg text-sm"
                  />
                  <div className="absolute flex gap-x-3 top-[23%] right-[10px]">
                    <div className="">
                      <label className="cursor-pointer flex items-center gap-x-2 justify-center bg-gray-100 relative group overflow-hidden">
                        <input
                          type="file"
                          name="postImage"
                          id="postImage"
                          className="hidden-input"
                        />
                        <BsImage className="text-slate-600 cursor-pointer text-lg"></BsImage>
                      </label>
                    </div>
                    <BsEmojiSmile className="text-slate-600 cursor-pointer text-lg"></BsEmojiSmile>
                  </div>
                </div>
                <button className="py-2 px-4 bg-slate-300 rounded-lg">
                  <RiSendPlane2Line className="text-[#377DFF] text-xl"></RiSendPlane2Line>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostItem;
