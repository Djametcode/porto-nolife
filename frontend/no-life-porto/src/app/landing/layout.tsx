"use client";

import NavbarComponent from "@/component/navbar";
import NavbarTopComponent from "@/component/navbarTop";
import StoryComponent from "@/component/story";
import { getCurrentUser } from "@/handler/getCurrentUser";
import { useEffect, useState } from "react";

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

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>();
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
    <div className=" md:hidden w-screen h-full bg-black relative">
      <NavbarTopComponent />
      <StoryComponent avatar={user?.avatar} />
      {children}
      <NavbarComponent avatar={user?.avatar} />
    </div>
  );
};

export default LandingLayout;
