import { GoHome, GoSearch, GoPlus, GoVideo } from "react-icons/go";
import { BiSolidUserCircle } from "react-icons/bi";

const NavbarComponent = () => {
  return (
    <div className=" p-3 flex w-full">
      <div className=" w-full flex justify-center">
        <GoHome size={25} />
      </div>
      <div className=" w-full flex justify-center">
        <GoSearch size={25} />
      </div>
      <div className=" w-full flex justify-center">
        <GoPlus size={25} />
      </div>
      <div className=" w-full flex justify-center">
        <GoVideo size={25} />
      </div>
      <div className=" w-full flex justify-center">
        <BiSolidUserCircle size={25} />
      </div>
    </div>
  );
};

export default NavbarComponent;
