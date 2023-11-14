"use client";

import NavbarComponent from "@/component/navbar";
import { getCurrentUser } from "@/handler/getCurrentUser";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface Children {
  children: React.ReactNode;
}

interface IUser {
  username: string;
  avatar: string;
}

interface IResponse {
  msg: string;
  user: {
    username: string;
    avatar: string;
  };
}

export default function PostLayout({ children }: Children) {
  const [user, setUser] = useState<IUser>();
  console.log(user);
  const getUserDetail = async () => {
    try {
      const response = (await getCurrentUser()) as IResponse;
      setUser({
        username: response.user.avatar,
        avatar: response.user.avatar,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);
  return (
    <div className=" w-screen h-full">
      <div className=" sticky top-0 text-white bg-black p-3 flex items-center gap-5">
        <IoClose size={30} />
        <h1 className=" font-figtree text-lg">New Post</h1>
      </div>
      {children}
      <NavbarComponent avatar={user?.avatar} />
    </div>
  );
}
