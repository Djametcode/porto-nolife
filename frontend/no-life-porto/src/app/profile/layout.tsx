/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import NavbarComponent from "@/component/navbar";
import NavbarProfile from "@/component/navbarProfile";
import ProfileComponent from "@/component/profile";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@/handler/getCurrentUser";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { finishUpdate, updateProfile } from "@/store/slice";
import UpdateProfile from "@/component/updateProfile";

interface Iuser {
  _id?: string;
  avatar: string;
  username: string;
  email: string;
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Iuser[]>([]);
  const refresher = useSelector((state: RootState) => state.global.refresher);
  const getUser = async () => {
    try {
      const response: {
        msg: string;
        user: { username: string; avatar: string; email: string };
      } = await getCurrentUser();
      setUser([
        {
          username: response.user.username,
          avatar: response.user.avatar,
          email: response.user.email,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [refresher]);

  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      redirect("/auth");
    }
  }, [token]);

  const update = useSelector((state: RootState) => state.global.update);
  console.log(update);

  return (
    <div className=" md:max-w-[450px] justify-center bg-black relative">
      {update
        ? user.map((item) => {
            return (
              <UpdateProfile
                key={item._id}
                username={item.username}
                avatar={item.avatar}
                email={item.email}
              />
            );
          })
        : null}
      <div className=" sticky top-0 z-40">
        {user.map((item) => {
          return <NavbarProfile key={item._id} username={item.username} />;
        })}
      </div>
      <ProfileComponent />
      {children}
      {user.map((item) => {
        return <NavbarComponent key={item._id} avatar={item.avatar} />;
      })}
    </div>
  );
}
