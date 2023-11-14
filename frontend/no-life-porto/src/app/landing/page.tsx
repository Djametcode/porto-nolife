/* eslint-disable @next/next/no-img-element */
"use client";
import FooterPostComponent from "@/component/postFooter";
import capitalizeName from "@/handler/capitalizeName";
import { getAllPostHandler } from "@/handler/getAllPost";
import { Fragment, useEffect, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";

interface IPost {
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
  console.log(post);
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
  }, [counter]);
  return (
    <div className=" h-full w-full text-white p-3 font-geologica flex flex-col gap-7 pb-14">
      {post.map((item) => {
        return (
          <Fragment key={item._id}>
            <div className=" flex flex-col gap-3 w-full h-full">
              <div>
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
                  <div className=" w-full h-full">
                    <img
                      className=" w-full h-full object-contain"
                      src={item.images[0].imageUrl}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className=" h-[175px] font-figtree text-sm bg-slate-700 p-2 rounded-xl">
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
                counter={counter}
                setCounter={setCounter}
              />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
