/* eslint-disable @next/next/no-img-element */
"use client";
import { getAllPostHandler } from "@/handler/getAllPost";
import { Fragment, useEffect, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";

interface IPost {
  _id: string;
  postText: string;
  images: [{ imageUrl: string }];
  like: [];
  comment: [];
  createdBy: { username: string; avatar: string };
  createdData: string;
}

export default function HomeComponent() {
  const [post, setPost] = useState<IPost[]>([]);
  console.log(post);
  const getAllPost = async () => {
    try {
      const response = await getAllPostHandler();
      console.log(response);
      setPost(response.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <div>
      {post.map((item) => {
        return (
          <Fragment key={item._id}>
            <div className=" flex flex-col gap-3 w-full h-full">
              <div>
                {item.createdBy.avatar === "" ? (
                  <div className=" flex items-center gap-3 font-figtree">
                    <BiSolidUserCircle size={35} />
                    <p>{item.createdBy.username}</p>
                  </div>
                ) : (
                  <img src={item.createdBy.avatar} alt="avatar" />
                )}
              </div>
              <div className=" w-full h-[200px] p-3">
                {item.images.length > 0 ? (
                  <div className=" w-[200px]">
                    <img src={item.images[0].imageUrl} alt="" />
                  </div>
                ) : null}
                <p className=" text-sm">{item.postText}</p>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
