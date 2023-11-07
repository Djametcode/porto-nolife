import { FaFacebookSquare } from "react-icons/fa";

export default function AuthComponent() {
  return (
    <form className=" flex flex-col w-[350px] gap-5" action="">
      <div className=" flex flex-col gap-4">
        <input
          className=" p-3 rounded-lg text-sm bg-transparent border-[0.5px] focus:outline-none"
          type="email"
          placeholder="Email"
        />
        <input
          className=" p-3 rounded-lg text-sm bg-transparent border-[0.5px] focus:outline-none"
          type="password"
          placeholder="Password"
        />
      </div>
      <div className=" flex justify-end">
        <p className=" text-sm text-blue-400 font-extrabold">
          Forget password?
        </p>
      </div>
      <div className=" bg-blue-400 p-3 rounded-lg flex justify-center">
        <button className=" text-sm">Login</button>
      </div>
      <div className=" flex justify-center w-full gap-4 items-center p-3">
        <hr className=" w-full" />
        <p className=" text-sm">OR</p>
        <hr className=" w-full" />
      </div>
      <div className=" flex gap-4 text-blue-400 p-3 items-center justify-center">
        <FaFacebookSquare size={25} />
        <p className=" text-sm">continue with facebook</p>
      </div>
    </form>
  );
}
