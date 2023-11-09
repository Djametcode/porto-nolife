"use client";

import { AiOutlineHeart } from "react-icons/ai";
import { RiMessengerLine } from "react-icons/ri";

const NavbarTopComponent = () => {
  return (
    <div className=" sticky top-0 z-30 bg-black text-white">
      <div className=" flex justify-start w-full h-[75px] items-center pl-3 relative">
        <div className=" font-geologica text-2xl">
          <h1>No Life</h1>
        </div>
        <div className=" absolute right-3">
          <div className=" flex gap-3">
            <AiOutlineHeart size={25} />
            <RiMessengerLine size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarTopComponent;
