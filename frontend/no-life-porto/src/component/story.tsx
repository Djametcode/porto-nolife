import { BiSolidUserCircle } from "react-icons/bi";

/* eslint-disable @next/next/no-img-element */
interface IData {
  avatar: string | undefined;
}

const StoryComponent = (data: IData) => {
  return (
    <div className=" bg-black text-white h-[125px] w-full pl-3 flex items-start gap-5 overflow-scroll">
      <div className=" max-w-[65px] max-h-[65px] flex flex-col gap-3 items-center">
        <img
          className=" w-full h-full rounded-full object-contain"
          src={data.avatar}
          alt=""
        />
        <p className=" whitespace-nowrap text-sm font-figtree">Your Story</p>
      </div>
    </div>
  );
};

export default StoryComponent;
