"use client";

import { loginHandler } from "@/handler/loginHandlet";
import { useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function AuthComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const data = {
    email: email,
    password: password,
  };

  console.log(data);

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginHandler(data);
      console.log(response);
      setEmail("");
      setPassword("");
      Cookies.set("token", response.token);
      Cookies.set("userId", response.user._id);

      router.push("/landing");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className=" flex flex-col w-[350px] gap-5" action="">
      <div className=" flex flex-col gap-4">
        <input
          className=" p-3 rounded-lg text-sm bg-transparent border-[0.5px] focus:outline-none"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <input
          className=" p-3 rounded-lg text-sm bg-transparent border-[0.5px] focus:outline-none"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </div>
      <div className=" flex justify-end">
        <p className=" text-sm text-blue-400 font-extrabold">
          Forget password?
        </p>
      </div>
      <div className=" bg-blue-400 p-3 rounded-lg flex justify-center">
        <button
          onClick={(e: React.FormEvent) => loginUser(e)}
          className=" text-sm font-extrabold"
        >
          Login
        </button>
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
