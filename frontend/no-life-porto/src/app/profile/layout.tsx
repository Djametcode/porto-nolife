"use client";

import NavbarComponent from "@/component/navbar";
import NavbarProfile from "@/component/navbarProfile";
import ProfileComponent from "@/component/profile";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@/handler/getCurrentUser";

interface Iuser {
  _id?: string;
  avatar: string;
  username: string;
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Iuser[]>([]);
  console.log(user);
  const getUser = async () => {
    try {
      const response: {
        msg: string;
        user: { username: string; avatar: string };
      } = await getCurrentUser();
      setUser([
        ...user,
        { username: response.user.username, avatar: response.user.avatar },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <div className=" sticky top-0">
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
