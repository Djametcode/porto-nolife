"use client";

import capitalizeName from "@/handler/capitalizeName";
import { getCurrentUser } from "@/handler/getCurrentUser";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { MdVideoLibrary } from "react-icons/md";
import { FaUserTag } from "react-icons/fa6";

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
            className=" p-3 h-full w-full bg-black text-white flex flex-col gap-3"
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
            <div className=" flex justify-center gap-2 text-sm font-figtree">
              <button className=" bg-slate-200/30 h-9 w-[300px] rounded-xl">
                Edit Profile
              </button>
              <button className=" bg-slate-200/30 h-9 w-[300px] rounded-xl">
                Share Profile
              </button>
            </div>
            <div>
              <div className=" flex flex-col gap-2 w-[55px] items-center">
                <div className=" w-[50px] h-[50px] border rounded-full flex items-center justify-center">
                  <GoPlus size={30} />
                </div>
                <p className=" text-xs font-figtree">Baru</p>
              </div>
            </div>
            <div className=" flex">
              <div className=" w-full flex justify-center border-b">
                <HiOutlineSquares2X2 size={25} />
              </div>
              <div className=" w-full flex justify-center">
                <MdVideoLibrary size={25} />
              </div>
              <div className=" w-full flex justify-center">
                <FaUserTag size={25} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
