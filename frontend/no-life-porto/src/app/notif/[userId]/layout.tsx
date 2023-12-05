import NotificationNavbarComponent from "@/component/navbarNotification";
import React from "react";

export default function NotifLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" w-screen h-screen bg-black">
      <div className=" sticky top-0">
        <NotificationNavbarComponent />
      </div>
      {children}
    </div>
  );
}
