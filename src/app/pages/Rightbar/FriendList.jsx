import React, { useEffect } from "react";
import { useState } from "react";
// import userAPI from "../../api/userAPI";
import Friend from "./Friend";
import FriendItem from "./FriendItem";

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  // useEffect(() => {
  //   const fetchFriends = async () => {
  //     const res = await userAPI.getAllUser();
  //     setFriends(res.data);
  //   };
  //   fetchFriends();
  // }, []);

  return (
    <div>
      <Friend></Friend>
      <div className="mt-2">
        {friends.length > 0 &&
          friends.map((item, index) => (
            <FriendItem key={index} item={item}></FriendItem>
          ))}
      </div>
    </div>
  );
};

export default FriendList;
