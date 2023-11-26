"use client";

import NavbarComponent from "@/component/navbar";
import { getAllPostHandler } from "@/handler/getAllPost";
import { getCurrentUser } from "@/handler/getCurrentUser";
import React, { useEffect, useState } from "react";

interface Iuser {
  avatar: string;
  username: string;
}

interface IResponse {
  msg: string;
  user: {
    username: string;
    avatar: string;
  };
}

export default function ReelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Iuser[]>([]);
  const getUser = async () => {
    try {
      const response = (await getCurrentUser()) as IResponse;
      console.log(response);
      setUser([
        { avatar: response.user.avatar, username: response.user.username },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className=" h-screen bg-black text-white font-figtree">
      {children}
      {user.map((item) => {
        return <NavbarComponent key={item.avatar} avatar={item.avatar} />;
      })}
    </div>
  );
}
