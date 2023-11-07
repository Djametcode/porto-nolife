"use client";

import { signUpHandler } from "@/handler/signUpHandler";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";

export default function SignUpComponent() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const data = {
    username: username,
    email: email,
    password: password,
  };

  console.log(data);

  const registUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signUpHandler(data);
      console.log(response);
      setUsername("");
      setEmail("");
      setPassword("");
      router.push("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (kind: string, data: string) => {
    if (kind == "username") {
      setUsername(data);
    }

    if (kind == "email") {
      setEmail(data);
    }

    if (kind == "password") {
      setPassword(data);
    }

    return;
  };
  return (
    <form className=" flex flex-col w-[350px] gap-4" action="">
      <div className=" flex flex-col gap-4">
        <input
          className=" p-3 rounded-lg text-sm bg-transparent border-[0.5px] focus:outline-none"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            changeHandler("username", e.target.value)
          }
        />
        <input
          className=" p-3 rounded-lg text-sm bg-transparent border-[0.5px] focus:outline-none"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            changeHandler("email", e.target.value)
          }
        />
        <input
          className=" p-3 rounded-lg text-sm bg-transparent border-[0.5px] focus:outline-none"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            changeHandler("password", e.target.value)
          }
        />
      </div>
      <div className=" bg-blue-400 p-3 rounded-lg flex justify-center">
        <button
          onClick={(e: React.FormEvent) => registUser(e)}
          className=" text-sm"
        >
          Create Account
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
