import { CgSearch } from "react-icons/cg";

export default function SearchComponent() {
  return (
    <div className=" w-screen h-screen bg-black text-white">
      <div className=" p-2">
        <div className=" p-2 flex items-center bg-slate-300/20 rounded-2xl">
          <CgSearch size={25} />
          <input
            className=" w-full bg-transparent rounded-2xl pl-4 focus:outline-none text-white"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
}
