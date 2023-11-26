"use client";

import NavbarComponent from "@/component/navbar";
import NavbarProfile from "@/component/navbarProfile";
import ProfileComponent from "@/component/profile";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@/handler/getCurrentUser";

interface Iuser {
  avatar: string;
  username: string;
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Iuser[]>([]);
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
    <div>
      <div className=" sticky top-0">
        <NavbarProfile username="Djamet" />
      </div>
      <ProfileComponent />
      {children}
      <NavbarComponent avatar="" />
    </div>
  );
}
