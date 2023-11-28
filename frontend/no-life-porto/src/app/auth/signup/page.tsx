"use client";

import { signUpHandler } from "@/handler/signUpHandler";
import { registRedux, startLoading, finishLoading } from "@/store/slice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { FaFacebookSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Triangle } from "react-loader-spinner";

export default function SignUpComponent() {
  const isLoading = useSelector((state: RootState) => state.global.isLoading);
  const registData = useSelector((state: RootState) => state.global.regist);
  const dispatch = useDispatch();
  const router = useRouter();

  const data = {
    username: registData.username,
    email: registData.email,
    password: registData.password,
  };

  console.log(data);

  const registUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(startLoading());
      const response = await signUpHandler(data);
      console.log(response);
      dispatch(registRedux({ username: "", email: "", password: "" }));
      dispatch(finishLoading());
      router.push("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (kind: string, data: string) => {
    if (kind == "username") {
      dispatch(
        registRedux({
          username: data,
          email: registData.email,
          password: registData.password,
        })
      );
    }

    if (kind == "email") {
      dispatch(
        registRedux({
          username: registData.username,
          email: data,
          password: registData.password,
        })
      );
    }

    if (kind == "password") {
      dispatch(
        registRedux({
          username: registData.username,
          email: registData.email,
          password: data,
        })
      );
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
          value={registData.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            changeHandler("username", e.target.value)
          }
        />
        <input
          className=" p-3 rounded-lg text-sm bg-transparent border-[0.5px] focus:outline-none"
          type="email"
          placeholder="Email"
          value={registData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            changeHandler("email", e.target.value)
          }
        />
        <input
          className=" p-3 rounded-lg text-sm bg-transparent border-[0.5px] focus:outline-none"
          type="password"
          placeholder="Password"
          value={registData.password}
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
          {isLoading ? (
            <Triangle
              height="20"
              width="20"
              color="white"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              visible={true}
            />
          ) : (
            "Create Account"
          )}
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
