/* eslint-disable @next/next/no-img-element */
"use client";

import { getMyPost } from "@/handler/getMyPost";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  }, []);

  return (
    <div className=" relative grid grid-cols-3 overflow-hidden pb-12">
      {post.map((item) => {
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
      })}
    </div>
  );
}
