"use client";

import NavbarComponent from "@/component/navbar";
import NavbarProfile from "@/component/navbarProfile";
import ProfileComponent from "@/component/profile";
import React from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarProfile />
      <ProfileComponent />
      {children}
      <NavbarComponent avatar="" />
    </div>
  );
}
