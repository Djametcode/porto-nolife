/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import Cookies from "js-cookie";
import capitalizeName from "@/handler/capitalizeName";
import { HiUserCircle } from "react-icons/hi2";

interface Iuser {
  _id: string;
  avatar: string;
  username: string;
  follower: any[];
}

interface Ipost {
  postText: string;
  createdBy: {
    username: string;
    avatar: string;
  };
}

interface Idata {
  _id: string;
  user: Iuser[];
  post: Ipost[];
}

export default function SearchComponent() {
  const [userInput, setUserInput] = useState<string>();
  const token = Cookies.get("token");
  const [item, setItem] = useState<Idata[]>([]);
  console.log(item);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const searchSomething = async () => {
    try {
      const response = await axios.get(
        `https://backend-no-life-3678e78f1666.herokuapp.com/api/v17/no-life/post/search?key=${userInput}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result: { post: Ipost[]; user: Iuser[] } = response.data;
      setItem([{ _id: "djamet", post: result.post, user: result.user }]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsSearch(true);
      searchSomething();
    }, 600);

    return () => clearTimeout(timeOut);
  }, [userInput]);

  return (
    <div className=" w-screen h-screen bg-black text-white">
      <div className=" p-2">
        <div className=" p-2 flex items-center bg-slate-300/20 rounded-2xl">
          <CgSearch size={25} />
          <input
            className=" w-full bg-transparent rounded-2xl pl-4 focus:outline-none text-white"
            type="text"
            placeholder="Search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserInput(e.target.value)
            }
          />
        </div>
        <div>
          {item.map((items) => {
            return (
              <div className=" pt-6 pl-3 flex flex-col gap-6" key={items._id}>
                {items.user.map((item) => {
                  return (
                    <div key={item._id}>
                      <div className=" relative flex gap-5 items-center">
                        <div className=" w-[50px] h-[50px]">
                          {item.avatar === "" ? (
                            <div className=" w-full h-full">
                              <HiUserCircle
                                className=" w-full h-full"
                                size={70}
                              />
                            </div>
                          ) : (
                            <img
                              className=" w-full h-full rounded-full object-cover"
                              src={item.avatar}
                              alt=""
                            />
                          )}
                        </div>
                        <div className=" font-figtree flex flex-col gap-1">
                          <p className=" text-sm">
                            {capitalizeName(item.username)}
                          </p>
                          <p className=" text-xs text-slate-500">
                            {item.follower.length} follower
                          </p>
                        </div>
                        <div className=" absolute right-5">
                          <div className=" font-figtree text-sm border p-2">
                            <button>Follow</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
