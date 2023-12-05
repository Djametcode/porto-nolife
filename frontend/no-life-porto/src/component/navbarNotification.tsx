"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function NotificationNavbarComponent() {
  const router = useRouter();
  return (
    <div className=" flex gap-5 font-figtree h-14 bg-black items-center pl-3 text-white">
      <div onClick={() => router.back()} className=" cursor-pointer">
        <FaArrowLeftLong size={20} />
      </div>
      <h1 className=" text-lg">Notification</h1>
    </div>
  );
}
