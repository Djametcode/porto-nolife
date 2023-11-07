import Link from "next/link";
import React from "react";

interface Children {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Children) => {
  return (
    <div className=" font-figtree bg-black h-screen w-screen text-white flex flex-col gap-16 items-center justify-center">
      <div>
        <h1 className=" text-3xl">No Life</h1>
      </div>
      {children}
      <div className=" absolute bottom-0 w-auto p-4">
        <div className=" flex justify-center">
          <div className=" flex text-sm gap-2">
            <p>Not have account? </p>
            <Link className=" text-blue-400" href={"/auth/signup"}>
              create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
