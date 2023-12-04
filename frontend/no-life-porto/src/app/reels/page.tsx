/* eslint-disable @next/next/no-img-element */
"use client";

import capitalizeName from "@/handler/capitalizeName";
import { getAllPostHandler } from "@/handler/getAllPost";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import { refresh } from "@/store/slice";
import {
  PiHeartLight,
  PiChatCircleLight,
  PiPaperPlaneTiltLight,
  PiBookmarkSimpleLight,
  PiHeartFill,
  PiHeadlightsFill,
} from "react-icons/pi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Cookies from "js-cookie";
import { likePostHandler } from "@/handler/likeHandler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { followUserHandler } from "@/handler/followUser";

interface IVideo {
  imageUrl: string;
}

interface IReels {
  _id: string;
  images: IVideo[];
  createdBy: {
    _id: string;
    avatar: string;
    username: string;
    follower: [
      {
        userId: string;
      }
    ];
  };
  postText: string;
  like: [
    {
      likeId: {
        createdBy: {
          _id: string;
        };
      };
    }
  ];
  comment: [];
  createdDate: string;
}

export default function ReelsComponent() {
  const [video, setVideo] = useState<IReels[]>([]);
  const dispatch = useDispatch();
  const refresher = useSelector((state: RootState) => state.global.refresher);

  const filter = video.filter(
    (item) =>
      item.images.length !== 0 && item.images[0].imageUrl.includes("video")
  );

  const getAllPost = async () => {
    try {
      const response = await getAllPostHandler();
      console.log(response);
      setVideo(response.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPost();
  }, [refresher]);

  const likeReels = async (postId: string) => {
    try {
      const response = await likePostHandler(postId);
      console.log(response);
      dispatch(refresh());
    } catch (error) {
      console.log(error);
    }
  };

  const followUser = async (target: string) => {
    try {
      const response = await followUserHandler(target);
      console.log(response);
      dispatch(refresh());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full h-screen overflow-scroll snap-y snap-mandatory snap-always">
      <div className=" fixed z-40 top-5 left-5">
        <h1 className=" font-figtree font-extrabold text-2xl">Reels</h1>
      </div>
      {filter.map((item) => {
        return (
          <div className=" relative w-full h-full snap-center" key={item._id}>
            <video
              controls
              className=" absolute top-0 z-10 w-full h-full object-contain"
              src={item.images[0].imageUrl}
            />
            <div className=" w-full h-full">
              <div className=" z-30 w-full absolute bottom-16">
                <div className=" flex flex-col gap-3 p-4">
                  <div className=" w-full flex items-center gap-3">
                    <div className=" w-[40px] h-[40px]">
                      <img
                        className=" w-full h-full rounded-full object-cover"
                        src={item.createdBy.avatar}
                        alt="avatar"
                      />
                    </div>
                    <div className=" font-figtree text-sm">
                      <p>{capitalizeName(item.createdBy.username)}</p>
                    </div>
                    <button
                      onClick={() => followUser(item.createdBy._id)}
                      className=" border p-1 rounded-md text-xs"
                    >
                      {item.createdBy.follower.findIndex(
                        (item) => item.userId === Cookies.get("userId")
                      ) !== -1
                        ? "followed"
                        : "follow"}
                    </button>
                  </div>
                  <div className=" font-figtree text-sm">
                    <p>{item.postText}</p>
                  </div>
                  <div className="  absolute right-1 bottom-9">
                    <div className=" flex flex-col gap-5 p-4">
                      <div className=" flex flex-col gap-2 items-center">
                        {item.like.findIndex(
                          (item) =>
                            item.likeId.createdBy._id === Cookies.get("userId")
                        ) !== -1 ? (
                          <PiHeartFill fill={"red"} size={28} />
                        ) : (
                          <div
                            onClick={() => likeReels(item._id)}
                            className=" cursor-pointer"
                          >
                            <PiHeartLight size={28} />
                          </div>
                        )}
                        <p className=" text-sm font-figtree">
                          {item.like.length}
                        </p>
                      </div>
                      <div className=" flex flex-col gap-2 items-center">
                        <PiChatCircleLight size={28} />
                        <p className=" text-sm font-figtree">
                          {item.comment.length}
                        </p>
                      </div>
                      <div className=" flex flex-col gap-2 items-center">
                        <PiPaperPlaneTiltLight size={28} />
                      </div>
                      <div className=" flex flex-col items-center">
                        <HiOutlineDotsVertical size={27} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
