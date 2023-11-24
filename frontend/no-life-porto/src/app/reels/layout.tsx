import NavbarComponent from "@/component/navbar";
import React from "react";

export default function ReelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" h-screen bg-black text-white font-figtree">
      <h1>Hello</h1>
      {children}
      <NavbarComponent avatar="" />
    </div>
  );
}
