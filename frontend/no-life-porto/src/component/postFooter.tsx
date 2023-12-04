/* eslint-disable @next/next/no-img-element */
import {
  PiHeartLight,
  PiChatCircleLight,
  PiPaperPlaneTiltLight,
  PiBookmarkSimpleLight,
  PiHeartFill,
} from "react-icons/pi";
import timeAgo from "@/handler/timeConverter";
import capitalizeName from "@/handler/capitalizeName";
import { likePostHandler } from "@/handler/likeHandler";
import Cookies from "js-cookie";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { refresh } from "@/store/slice";

interface LikeDetail {
  likeId: {
    createdBy: {
      _id?: string;
    };
  };
}

interface IPost {
  _id: string;
  like: LikeDetail[];
  comment: [];
  postText: string;
  createdDate: string;
  createdBy: { username: string; avatar: string };
  image: any[];
}

const FooterPostComponent = (data: IPost) => {
  const check = data.like.findIndex(
    (item) => item.likeId.createdBy._id === Cookies.get("userId")
  );
  const dispatch = useDispatch();

  const likePost = async (postId: string) => {
    try {
      const response = await likePostHandler(postId);
      console.log(response);
      dispatch(refresh());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex flex-col gap-3 font-figtree">
      <div className=" flex relative">
        <div className=" flex gap-3 font-extralight">
          <div onClick={() => likePost(data._id)} className=" cursor-pointer">
            {check !== -1 ? (
              <PiHeartFill fill={"red"} size={23} />
            ) : (
              <PiHeartLight size={23} />
            )}
          </div>
          <Link href={`/landing/comment/${data._id}`}>
            <PiChatCircleLight size={23} />
          </Link>
          <PiPaperPlaneTiltLight size={23} />
        </div>
        <div className=" absolute right-3">
          <PiBookmarkSimpleLight size={23} />
        </div>
      </div>
      <div className=" text-sm flex flex-col gap-[3px]">
        <p>{data.like.length} like</p>
        <div className=" flex gap-2">
          <p>{capitalizeName(data.createdBy.username)}</p>
          {data.image.length == 0 ? null : <p>{data.postText}</p>}
        </div>
        <p className=" text-xs text-gray-450">
          {" "}
          see {data.comment.length} comment
        </p>
        <div className=" flex gap-3">
          <div className=" w-[30px] h-[30px]">
            <img
              className=" w-full h-full rounded-full object-cover"
              src={data.createdBy.avatar}
              alt=""
            />
          </div>
          <input
            className=" bg-transparent placeholder:text-xs font-figtree focus:outline-none text-xs"
            type="text"
            placeholder="add comment"
          />
        </div>
        <p className=" text-xs text-slate-450">{timeAgo(data.createdDate)}</p>
      </div>
    </div>
  );
};

export default FooterPostComponent;
