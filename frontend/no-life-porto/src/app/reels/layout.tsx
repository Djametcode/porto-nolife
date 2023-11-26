"use client";

import NavbarComponent from "@/component/navbar";
import { getAllPostHandler } from "@/handler/getAllPost";
import { getCurrentUser } from "@/handler/getCurrentUser";
import React, { useEffect, useState } from "react";

interface Iuser {
  avatar: string;
  username: string;
}

export default function ReelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Iuser>();
  const getUser = async () => {
    try {
      const response = await getCurrentUser();
      console.log(response);
      setUser(response.user);
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
      <NavbarComponent avatar={user?.avatar} />
    </div>
  );
}
