/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import capitalizeName from "@/handler/capitalizeName";
import { commentPostHandler } from "@/handler/commentPost";
import { getCommentPost } from "@/handler/getCommentPost";
import { getCurrentUser } from "@/handler/getCurrentUser";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";

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

const CommentComponent = () => {
  const postId: { postId: string } = useParams();
  console.log(postId);

  const [comment, setComment] = useState<IComment[]>([]);
  const [user, setUser] = useState<Iuser>({
    username: "",
    avatar: "",
  });

  const [counter, setCounter] = useState<number>(0);
  console.log(comment);

  const [commentText, setCommentText] = useState<string>("");
  console.log(commentText);

  const getAllComment = async () => {
    try {
      const response = await getCommentPost(postId.postId);
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
      const response = await commentPostHandler(postId.postId, commentText);
      setCounter((prev) => prev + 1);
      setCommentText("");
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllComment();
    getUser();
  }, [counter]);
  return (
    <div className=" fixed bottom-0 h-[850px] rounded-tr-3xl rounded-tl-3xl w-full z-50 bg-slate-200 p-3">
      <div className=" flex justify-center w-full font-figtree p-3">
        <h1> Comment</h1>
      </div>
      <div>
        {comment.map((item) => {
          return (
            <>
              <div className=" w-full h-20 flex gap-4 items-start pl-3">
                <div className=" w-[50px] h-[50px]">
                  <img
                    className=" w-full h-full object-contain rounded-full"
                    src={item.createdBy.avatar}
                    alt=""
                  />
                </div>
                <div className=" font-figtree flex flex-col">
                  <p className=" p-[1px] text-[12px] font-extrabold">
                    {capitalizeName(item.createdBy.username)}
                  </p>
                  <p className=" p-[1px] text-[14px]">{item.commentText}</p>
                  <div className=" p-[1px] flex gap-3 text-[12px] text-gray-500">
                    <p>{item.commentLike.length} like</p>
                    <p>reply</p>
                  </div>
                </div>
                <div className=" absolute right-10">
                  <AiOutlineHeart size={18} />
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="absolute bottom-5 w-full">
        <div className="w-full flex justify-start items-center gap-7 h-14">
          <div className="h-full">
            <img
              className="w-full h-full rounded-full object-cover"
              src={user.avatar}
              alt=""
            />
          </div>
          <div className="h-full flex items-center">
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
