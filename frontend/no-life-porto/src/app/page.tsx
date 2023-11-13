import Link from "next/link";

const WelcomeComponent = () => {
  return (
    <div className=" bg-black h-screen w-screen flex flex-col gap-5 justify-center">
      <div className=" font-figtree text-white text-center w-full">
        <h1 className=" text-4xl">Welcome to No-Life</h1>
        <p>Explore No Life Surface Now</p>
      </div>
      <div className=" flex justify-center">
        <Link className=" p-3 border rounded-2xl text-white" href={"/auth"}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default WelcomeComponent;
