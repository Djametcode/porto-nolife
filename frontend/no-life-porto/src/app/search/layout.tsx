"use client";

import NavbarComponent from "@/component/navbar";
import { getCurrentUser } from "@/handler/getCurrentUser";
import React, { useEffect, useState } from "react";

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

export default function SearchLayout({ children }: Children) {
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
    <div>
      {children}
      <NavbarComponent avatar={user?.avatar} />
    </div>
  );
}
