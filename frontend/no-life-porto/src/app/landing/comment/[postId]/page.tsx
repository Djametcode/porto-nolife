/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import capitalizeName from "@/handler/capitalizeName";
import { commentPostHandler } from "@/handler/commentPost";
import { getCommentPost } from "@/handler/getCommentPost";
import { getCurrentUser } from "@/handler/getCurrentUser";
import { refresh } from "@/store/slice";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

interface IComment {
  commentLike: [];
  commentReply: [];
  commentText: string;
  createdBy: {
    username: string;
    avatar: string;
  };
}

interface Iuser {
  username: string;
  avatar: string;
}

const CommentComponent = ({ params }: { params: { postId: string } }) => {
  const refresher = useSelector((state: RootState) => state.global.refresher);
  const dispatch = useDispatch();
  const [comment, setComment] = useState<IComment[]>([]);
  const [user, setUser] = useState<Iuser>({
    username: "",
    avatar: "",
  });

  const [commentText, setCommentText] = useState<string>("");
  console.log(commentText);

  const getAllComment = async () => {
    try {
      const response = await getCommentPost(params.postId);
      setComment(response.comment);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await getCurrentUser();
      console.log(response);
      setUser((prev) => {
        return {
          ...prev,
          avatar: response.user.avatar,
          username: response.user.username,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async () => {
    try {
      const response = await commentPostHandler(params.postId, commentText);
      dispatch(refresh());
      setCommentText("");
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllComment();
    getUser();
  }, [refresher]);
  return (
    <div className=" fixed bottom-0 h-full w-full z-50 bg-black">
      <div className=" flex flex-col gap-9 h-full">
        <div className=" flex justify-center items-center w-full font-figtree h-16 text-white">
          <h1 className=" text-lg"> Comment</h1>
          <div className=" absolute right-9">
            <Link href={"/landing"}>
              <IoClose size={25} />
            </Link>
          </div>
        </div>
        <div className=" h-full overflow-scroll pb-20">
          {comment.map((item) => {
            return (
              <div key={item.createdBy.username} className=" relative w-full">
                <div className=" w-full h-20 flex gap-4 pl-3">
                  <div className=" w-[50px] h-[50px]">
                    <img
                      className=" w-full h-full object-cover rounded-full"
                      src={item.createdBy.avatar}
                      alt=""
                    />
                  </div>
                  <div className=" font-figtree flex flex-col text-white">
                    <p className=" p-[1px] text-[12px] font-extrabold">
                      {capitalizeName(item.createdBy.username)}
                    </p>
                    <p className=" p-[1px] text-[14px]">{item.commentText}</p>
                    <div className=" p-[1px] flex gap-3 text-[12px] text-gray-500">
                      <p>{item.commentLike.length} like</p>
                      <p>reply</p>
                    </div>
                  </div>
                  <div className=" absolute right-10 text-white">
                    <AiOutlineHeart size={18} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>{" "}
      <div className=" absolute bottom-0 left-0 w-full bg-slate-500/20 p-3">
        <div className=" w-full flex justify-evenly gap-3 items-center h-14">
          <div className=" w-[40px] h-[40px]">
            <img
              className="w-full h-full rounded-full object-cover"
              src={user.avatar}
              alt=""
            />
          </div>
          <div className=" w-[250px] h-full flex items-center">
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCommentText(e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none"
              type="text"
              placeholder={`Add comment`}
              value={commentText}
            />
          </div>
          <div className="h-full flex items-center">
            <button
              onClick={postComment}
              className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
