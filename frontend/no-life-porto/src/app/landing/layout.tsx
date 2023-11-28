"use client";

import AuthenticationProvider from "@/component/authentication";
import NavbarComponent from "@/component/navbar";
import NavbarTopComponent from "@/component/navbarTop";
import StoryComponent from "@/component/story";
import { getCurrentUser } from "@/handler/getCurrentUser";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

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
  const [user, setUser] = useState<IUser[]>([]);
  const getUserDetail = async () => {
    try {
      const response = (await getCurrentUser()) as IResponse;
      setUser([
        { username: response.user.username, avatar: response.user.avatar },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      redirect("/auth");
    }
  }, [token]);
  return (
    <div className=" md:hidden w-screen h-full bg-black relative">
      <NavbarTopComponent />
      {user.map((item) => {
        return <StoryComponent key={item.avatar} avatar={item.avatar} />;
      })}
      {children}
      {user.map((item) => {
        return <NavbarComponent key={item.avatar} avatar={item.avatar} />;
      })}
    </div>
  );
};

export default LandingLayout;
