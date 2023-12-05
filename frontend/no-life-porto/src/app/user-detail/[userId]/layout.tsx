"use client";

import { Iuser } from "@/app/profile/layout";
import NavbarComponent from "@/component/navbar";
import { getCurrentUser } from "@/handler/getCurrentUser";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import NavbarProfile from "@/component/navbarProfile";
import getUserById from "@/handler/getUserById";

export default function UserDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) {
  console.log(params.userId);
  const [user, setUser] = useState<Iuser[]>([]);
  const refresher = useSelector((state: RootState) => state.global.refresher);
  const getUserHandler = async () => {
    try {
      const response: {
        msg: string;
        user: { username: string; avatar: string; email: string };
      } = await getUserById(params.userId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserHandler();
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
    <div>
      {user.map((item) => {
        return <NavbarProfile key={item.avatar} username={item.username} />;
      })}
      {children}
      {user.map((item) => {
        return <NavbarComponent key={item._id} avatar={item.avatar} />;
      })}
    </div>
  );
}
