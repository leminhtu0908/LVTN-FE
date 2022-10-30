import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
// import postAPI from "../../api/postAPI";
import PostItem from "./PostItem";

const PostList = () => {
  // const {
  //   current: { _id },
  // } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   const fetchPostByAuthor = async () => {
  //     const res = await postAPI.getPostAll();
  //     setPosts(res.data);
  //   };
  //   fetchPostByAuthor();
  // }, []);

  return (
    <div>
      {posts.map((post, index) => (
        <PostItem key={index} post={post} />
      ))}
    </div>
  );
};

export default PostList;
