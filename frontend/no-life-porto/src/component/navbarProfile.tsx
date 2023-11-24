import { IoIosArrowDown } from "react-icons/io";
import { LuPlusSquare } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";

export default function NavbarProfile() {
  return (
    <div className=" relative h-16 bg-black text-white flex items-center pl-3">
      <div className=" flex gap-3">
        <h1>Dummy Name</h1>
        <IoIosArrowDown size={25} />
      </div>
      <div className=" absolute right-3">
        <div className=" flex gap-2">
          <LuPlusSquare size={25} />
          <RxHamburgerMenu size={25} />
        </div>
      </div>
    </div>
  );
}
