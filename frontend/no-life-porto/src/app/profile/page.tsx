/* eslint-disable @next/next/no-img-element */
"use client";

import { getMyPost } from "@/handler/getMyPost";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";

interface ImageUrl {
  imageUrl: string;
}

interface Ipost {
  images: ImageUrl[];
  postText: string;
  _id: string;
}

export default function ProfilePost() {
  const [post, setPost] = useState<Ipost[]>([]);
  const router = useRouter();
  const refresher = useSelector((state: RootState) => state.global.refresher);

  const getPost = async () => {
    try {
      const response = await getMyPost();
      setPost(response.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, [refresher]);

  return (
    <div className=" relative grid grid-cols-3 overflow-hidden w-full pb-12">
      {post.length === 0 ? (
        <div className=" h-[400px] w-screen bg-black text-white flex items-center justify-center">
          <p>New in nolife ?</p>
          <div className=" text-white flex gap-3 items-center bg-slate-100/30 p-2 rounded-xl">
            <FaPlus size={15} />
            <p>No Post</p>
          </div>
        </div>
      ) : (
        post.map((item) => {
          return item.images.length !== 0 ? (
            item.images[0].imageUrl.includes("video") ? (
              <div
                onClick={() => router.push(`post-detail/${item._id}`)}
                className=" cursor-pointer h-[150px]"
              >
                <video
                  className=" h-full w-full object-cover"
                  controls
                  src={item.images[0].imageUrl}
                />
              </div>
            ) : (
              <Link href={`post-detail/${item._id}`} className=" h-[150px]">
                <img
                  className=" w-full h-full object-cover"
                  src={item.images[0].imageUrl}
                  alt=""
                />
              </Link>
            )
          ) : (
            <Link
              href={`post-detail/${item._id}`}
              className=" p-2 h-[150px] bg-black text-white font-figtree"
            >
              <p className=" text-xs">{item.postText}</p>
            </Link>
          );
        })
      )}
    </div>
  );
}
