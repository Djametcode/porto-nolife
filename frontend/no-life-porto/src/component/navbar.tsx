/* eslint-disable @next/next/no-img-element */
"use client";

import { GoHome, GoSearch, GoPlus, GoVideo } from "react-icons/go";
import { BiSolidUserCircle } from "react-icons/bi";
import Link from "next/link";

interface INav {
  avatar: string | undefined;
}

const NavbarComponent = (data: INav) => {
  return (
    <div className=" p-3 flex items-center w-full fixed bottom-0 z-40 bg-black text-white">
      <Link href={"landing"} className=" w-full flex justify-center">
        <GoHome size={25} />
      </Link>
      <Link href={"/search"} className=" w-full flex justify-center">
        <GoSearch size={25} />
      </Link>
      <Link href={"/post"} className=" w-full flex justify-center">
        <GoPlus size={25} />
      </Link>
      <div className=" w-full flex justify-center">
        <GoVideo size={25} />
      </div>
      <div className=" w-full flex justify-center">
        {data.avatar?.startsWith("https") ? (
          <div>
            <div className=" h-[30px] w-[30px]">
              <img
                className=" w-full h-full rounded-full object-contain"
                src={data.avatar}
                alt=""
              />
            </div>
          </div>
        ) : (
          <BiSolidUserCircle size={25} />
        )}
      </div>
    </div>
  );
};

export default NavbarComponent;
