/* eslint-disable @next/next/no-img-element */
"use client";

import { GoHome, GoSearch, GoPlus, GoVideo } from "react-icons/go";
import { BiSolidUserCircle } from "react-icons/bi";
import Link from "next/link";

interface INav {
  avatar: string;
}

const NavbarComponent = (data: INav) => {
  console.log(data.avatar);
  return (
    <div className=" p-3 flex items-center justify-around w-full fixed bottom-0 z-40 bg-black text-white">
      <Link href={"landing"}>
        <GoHome size={25} />
      </Link>
      <Link href={"/search"}>
        <GoSearch size={25} />
      </Link>
      <Link href={"/post"}>
        <GoPlus size={25} />
      </Link>
      <Link href={"/reels"}>
        <GoVideo size={25} />
      </Link>
      <div>
        {data.avatar?.startsWith("https") ? (
          <Link href={"/profile"}>
            <div className=" h-[30px] w-[30px]">
              <img
                className=" w-full h-full rounded-full object-contain"
                src={data.avatar}
                alt=""
              />
            </div>
          </Link>
        ) : (
          <Link href={"/profile"}>
            <BiSolidUserCircle size={25} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavbarComponent;
