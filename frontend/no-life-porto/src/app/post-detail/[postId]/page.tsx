/* eslint-disable @next/next/no-img-element */
"use client";
import getPostById from "@/handler/getPostById";
import axios from "axios";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IPost } from "@/app/landing/page";
import FooterPostComponent from "@/component/postFooter";
import capitalizeName from "@/handler/capitalizeName";
import { BiSolidCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function PostDetailComponent({
  params,
}: {
  params: { postId: string };
}) {
  console.log(params.postId);
  const [post, setPost] = useState<IPost[]>([]);
  console.log(post);

  const getPostHandler = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v17/no-life/post/get-post/${params.postId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const item = response.data;
      setPost([...post, item.post]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostHandler();
  }, []);
  return (
    <div className=" p-3 h-full w-full text-white bg-black font-geologica flex flex-col gap-7 pb-14">
      {post.map((item) => {
        return (
          <Fragment key={item._id}>
            <div className=" flex flex-col gap-3 w-full h-full">
              <div className=" text-white">
                {item.createdBy.avatar === "" ? (
                  <div className=" flex items-center gap-3 font-geologica">
                    <BiSolidCircle size={35} />
                    <p>{capitalizeName(item.createdBy.username)}</p>
                  </div>
                ) : (
                  <div className=" flex items-center gap-3 font-geologica">
                    <div className=" w-[40px] h-[40px]">
                      <img
                        className=" w-full h-full rounded-full object-contain"
                        src={item.createdBy.avatar}
                        alt=""
                      />
                    </div>
                    <p>{capitalizeName(item.createdBy.username)}</p>
                  </div>
                )}
              </div>
              <div className=" w-full h-full">
                {item.images.length > 0 ? (
                  item.images[0].imageUrl.includes("video") ? (
                    <div className=" h-[400px]">
                      <video
                        className=" h-full w-full"
                        src={item.images[0].imageUrl}
                        controls
                      />
                    </div>
                  ) : (
                    <div className=" w-full h-full">
                      <img
                        className=" w-full h-full object-contain"
                        src={item.images[0].imageUrl}
                        alt=""
                      />
                    </div>
                  )
                ) : (
                  <div className=" h-[175px] font-figtree text-sm bg-slate-100/20 p-2 rounded-md">
                    <p>{item.postText}</p>
                  </div>
                )}
              </div>
              <FooterPostComponent
                _id={item._id}
                image={item.images}
                createdBy={{ username: item.createdBy.username }}
                postText={item.postText}
                createdDate={item.createdDate}
                like={item.like}
                comment={item.comment}
              />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
