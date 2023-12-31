/* eslint-disable @next/next/no-img-element */
"use client";
import FooterPostComponent from "@/component/postFooter";
import capitalizeName from "@/handler/capitalizeName";
import { getAllPostHandler } from "@/handler/getAllPost";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";

export interface IPost {
  _id: string;
  postText: string;
  images: [{ imageUrl: string }];
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
  createdBy: { username: string; avatar: string };
  createdDate: string;
}

export default function HomeComponent() {
  const [post, setPost] = useState<IPost[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const [comment, setComment] = useState<boolean>(false);
  const refresher = useSelector((state: RootState) => state.global.refresher);

  const getAllPost = async () => {
    try {
      const response = await getAllPostHandler();
      setPost(response.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPost();
  }, [refresher]);

  const router = useRouter();

  return (
    <div className=" p-3 h-full w-full text-white font-geologica flex flex-col gap-7 pb-14">
      {post.map((item) => {
        return (
          <div key={item._id}>
            <div className=" flex flex-col gap-3 w-full h-full">
              <div
                onClick={() => router.push(`user-detail/${item._id}`)}
                className=" cursor-pointer"
              >
                {item.createdBy.avatar === "" ? (
                  <div className=" flex items-center gap-3 font-geologica">
                    <BiSolidUserCircle size={35} />
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
                    <div className=" h-[450px]">
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
                createdBy={{
                  username: item.createdBy.username,
                  avatar: item.createdBy.avatar,
                }}
                postText={item.postText}
                createdDate={item.createdDate}
                like={item.like}
                comment={item.comment}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
