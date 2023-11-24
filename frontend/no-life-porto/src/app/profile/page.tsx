"use client";

import capitalizeName from "@/handler/capitalizeName";
import { getCurrentUser } from "@/handler/getCurrentUser";
import { useEffect, useState } from "react";

interface IUser {
  _id: string;
  avatar: string;
  username: string;
  post: any[];
  follower: any[];
  following: any[];
}

export default function ProfileComponent() {
  const [user, setUser] = useState<IUser[]>([]);
  console.log(user);

  const getData = async () => {
    try {
      const response = await getCurrentUser();
      console.log(response);
      setUser([...user, response.user]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {user.map((item) => {
        return (
          <div
            key={item._id}
            className=" p-3 h-full bg-black text-white flex flex-col gap-3"
          >
            <div className=" flex h-[75px] items-center">
              <div className=" w-1/3">
                <div className=" w-[75px] h-[75px]">
                  <img
                    className=" w-full h-full rounded-full"
                    src={item.avatar}
                    alt=""
                  />
                </div>
              </div>
              <div className=" flex w-2/3">
                <div className=" w-[60px] font-figtree flex flex-col items-center gap-1 text-sm">
                  <p>{item.post.length}</p>
                  <p>Post</p>
                </div>
                <div className=" w-[75px] font-figtree flex flex-col items-center gap-1 text-sm">
                  <p>{item.follower.length}</p>
                  <p>Follower</p>
                </div>
                <div className=" w-[75px] font-figtree flex flex-col items-center gap-1 text-sm">
                  <p>{item.following.length}</p>
                  <p>Following</p>
                </div>
              </div>
            </div>
            <div className=" font-figtree">
              <h1>{capitalizeName(item.username)}</h1>
              <p className=" text-sm text-gray-400">No bio yet</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
