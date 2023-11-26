"use client";

import { getAllPostHandler } from "@/handler/getAllPost";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";

interface IVideo {
  imageUrl: string;
}

interface IReels {
  _id: string;
  images: IVideo[];
}

export default function ReelsComponent() {
  const [video, setVideo] = useState<IReels[]>([]);

  const filter = video.filter(
    (item) =>
      item.images.length !== 0 && item.images[0].imageUrl.includes("video")
  );

  const getAllPost = async () => {
    try {
      const response = await getAllPostHandler();
      setVideo(response.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  // const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // const videoRef = useRef<HTMLVideoElement | null>(null);

  // const handlePlayPause = () => {
  //   if (videoRef.current) {
  //     if (videoRef.current.paused) {
  //       videoRef.current.play();
  //       setIsPlaying(true);
  //     } else {
  //       videoRef.current.pause();
  //       setIsPlaying(false);
  //     }
  //   }
  // };

  return (
    <div className=" w-full h-screen overflow-scroll snap-y snap-mandatory snap-always">
      {filter.map((item) => {
        return (
          <div className=" w-full h-full snap-center" key={item._id}>
            <video
              // onClick={handlePlayPause}
              className=" pb-16 relative w-full h-full object-contain"
              src={item.images[0].imageUrl}
              // ref={videoRef}
              controls
            />
            {/* <div className="">
              <button onClick={handlePlayPause}>
                {isPlaying ? <FaPause size={35} /> : <FaPlay size={35} />}
              </button>
            </div> */}
          </div>
        );
      })}
    </div>
  );
}
