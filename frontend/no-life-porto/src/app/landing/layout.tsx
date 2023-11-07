import NavbarComponent from "@/component/navbar";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-screen h-screen">
      {children}
      <div className=" fixed bottom-0 w-full">
        <NavbarComponent />
      </div>
    </div>
  );
};

export default LandingLayout;
