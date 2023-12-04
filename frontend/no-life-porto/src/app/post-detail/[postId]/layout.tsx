"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function PostDetailLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className=" bg-black h-full">
      <div className=" h-14 flex items-center font-figtree gap-4 justify-start pl-3 bg-black text-white">
        <div onClick={() => router.back()} className=" cursor-pointer">
          <FaArrowLeftLong size={20} />
        </div>
        <h1>Post</h1>
      </div>
      {children}
    </div>
  );
}
