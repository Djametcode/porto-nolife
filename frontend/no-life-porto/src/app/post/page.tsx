"use client";

import { createPostHandler } from "@/handler/createPost";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { finishLoading, startLoading } from "@/store/slice";
import { Triangle } from "react-loader-spinner";

export default function PostComponent() {
  const [postText, setPostText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const dispatch = useDispatch();

  const loading = useSelector((state: RootState) => state.global.isLoading);
  console.log(loading);

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(startLoading());
      const response = await createPostHandler({
        postText: postText,
        file: file,
      });
      setPostText("");
      setFile(null);

      console.log("success post");
      dispatch(finishLoading());
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" bg-black text-white h-screen w-full p-4 flex flex-col gap-5">
      <div className=" flex flex-col gap-5">
        <textarea
          placeholder="What is on your mind?"
          className=" w-full focus:outline-none h-[300px] bg-slate-200/20 rounded-xl p-3 text-sm font-figtree"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPostText(e.target.value)
          }
          value={postText}
        />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files !== null) {
              setFile(e.target.files[0]);
            }
            console.log("Please attach file");
          }}
          className=" font-figtree"
          type="file"
          name="image"
        />
        <div className=" bg-slate-200/20 p-2 text-center font-figtree rounded-2xl">
          <button onClick={(e: React.FormEvent) => createPost(e)}>
            {loading ? (
              <Triangle
                height="35"
                width="35"
                color="white"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                visible={true}
              />
            ) : (
              "create post"
            )}
          </button>
        </div>
      </div>
      <div className=" font-figtree flex flex-col gap-5">
        <h1>* Rule Post</h1>
        <p className=" text-sm text-justify">
          Any NSFW, phising or something illegal, banned soon
        </p>
      </div>
    </div>
  );
}
