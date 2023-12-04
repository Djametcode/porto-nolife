"use client";

/* eslint-disable @next/next/no-img-element */
import capitalizeName from "@/handler/capitalizeName";
import updateAvatar from "@/handler/updateAvatar";
import { avatarUpdate, finishUpdate } from "@/store/slice";
import { RootState } from "@/store/store";
import axios from "axios";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

interface IData {
  avatar: string;
  username: string;
  email: string;
}

export default function UpdateProfile(data: IData) {
  const dispatch = useDispatch();
  const avatarChange = useSelector(
    (state: RootState) => state.global.avatarUpdate
  );

  const [avatar, setAvatar] = useState<string | File>(data.avatar);
  console.log(avatar);
  const [loading, setLoading] = useState<boolean>(false);

  const updateProfileHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await updateAvatar(avatar as File);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-screen h-screen fixed top-0 z-50 bg-black">
      <div className=" flex gap-8 text-white h-16 items-center pl-3">
        <div
          onClick={() => dispatch(finishUpdate())}
          className=" cursor-pointer"
        >
          <FaArrowLeftLong size={20} />
        </div>
        <h1 className=" font-figtree">Edit Profile</h1>
      </div>
      <div className=" flex flex-col gap-5">
        <div className=" w-full flex flex-col gap-3 text-blue-700 items-center justify-center pt-5">
          <div className=" w-[90px] h-[90px]">
            <img
              className=" w-full h-full rounded-full object-cover"
              src={
                avatar instanceof File ? URL.createObjectURL(avatar) : avatar
              }
              alt="avatar"
            />
          </div>
          <div className=" font-figtree text-sm font-extrabold">
            <button onClick={() => dispatch(avatarUpdate())}>
              Edit Avatar
            </button>
          </div>
        </div>
        <div className=" text-white p-5 font-figtree flex flex-col gap-3">
          <div className=" flex flex-col gap-1">
            <label className=" text-xs" htmlFor="username">
              Name
            </label>
            <input
              type="text"
              id="username"
              placeholder="username"
              value={capitalizeName(data.username)}
              className=" bg-transparent border-b pb-1 pt-1 focus:outline-none"
            />
          </div>
          <div className=" flex flex-col gap-1">
            <label className=" text-xs" htmlFor="username">
              Email
            </label>
            <input
              type="text"
              id="username"
              placeholder="username"
              value={capitalizeName(data.email)}
              className=" bg-transparent border-b pb-1 pt-1 focus:outline-none"
            />
          </div>
          <div className=" flex flex-col gap-1">
            <label className=" text-xs" htmlFor="username">
              Bio
            </label>
            <input
              type="text"
              id="username"
              placeholder="username"
              value={"coming soon"}
              className=" bg-transparent border-b pb-1 pt-1 focus:outline-none"
            />
          </div>
          {avatarChange ? (
            <div className=" flex flex-col gap-2">
              <label className=" text-xs" htmlFor="username">
                Avatar Update
              </label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files !== null) {
                    setAvatar(e.target.files[0]);
                  }
                }}
                type="file"
                className=" border-b pb-2"
              />
            </div>
          ) : null}
          {avatarChange ? (
            <div className=" flex justify-center mt-7">
              <button
                onClick={(e: React.FormEvent) => updateProfileHandler(e)}
                className=" w-[60px] h-[35px] flex items-center justify-center rounded-md text-black bg-white"
              >
                {loading ? "updating" : "save"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
