"use client";

import NavbarComponent from "@/component/navbar";
import { getCurrentUser } from "@/handler/getCurrentUser";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

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

  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      redirect("/auth");
    }
  }, [token]);

  return (
    <div className=" md:max-w-[450px] w-full h-screen bg-black text-white font-figtree">
      {children}
    </div>
  );
}
