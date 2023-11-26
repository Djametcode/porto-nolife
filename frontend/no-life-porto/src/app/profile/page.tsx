/* eslint-disable @next/next/no-img-element */
"use client";

import { getMyPost } from "@/handler/getMyPost";
import { useEffect, useState } from "react";

interface ImageUrl {
  imageUrl: string;
}

interface Ipost {
  images: ImageUrl[];
  postText: string;
}

export default function ProfilePost() {
  const [post, setPost] = useState<Ipost[]>([]);
  console.log(post);
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
    <div className=" grid grid-cols-3 overflow-hidden">
      {post.map((item) => {
        return item.images.length !== 0 ? (
          item.images[0].imageUrl.includes("video") ? (
            <div className=" h-[150px]">
              <video
                className=" h-full w-full object-cover"
                controls
                src={item.images[0].imageUrl}
              />
            </div>
          ) : (
            <div className=" h-[150px]">
              <img
                className=" w-full object-cover"
                src={item.images[0].imageUrl}
                alt=""
              />
            </div>
          )
        ) : (
          <div className=" p-2 h-[150px] bg-black text-white font-figtree">
            <p>{item.postText}</p>
          </div>
        );
      })}
    </div>
  );
}
