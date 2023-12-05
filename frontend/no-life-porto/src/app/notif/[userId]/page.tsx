/* eslint-disable @next/next/no-img-element */
"use client";

import capitalizeName from "@/handler/capitalizeName";
import getMyNotifcation from "@/handler/getMyNotif";
import { useEffect, useState } from "react";

interface INotif {
  _id: string;
  notificationText: string;
  createdBy: {
    username: string;
    avatar: string;
  };
}

export default function NotificationComponent({
  params,
}: {
  params: { userId: string };
}) {
  const [notif, setNotif] = useState<INotif[]>([]);
  console.log(notif);

  const getNotifHandler = async () => {
    try {
      const response = await getMyNotifcation();
      setNotif(response.notif);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifHandler();
  }, []);
  return (
    <div className=" p-3 flex flex-col gap-5">
      {notif.map((item) => {
        return (
          <div
            className=" bg-slate-500/20 rounded-lg flex gap-3 font-figtree h-[75px] justify-start pl-2 items-center"
            key={item._id}
          >
            <div>
              <div className=" w-[55px] h-[55px]">
                <img
                  className=" h-full w-full rounded-full object-cover"
                  src={item.createdBy.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-sm">
              <p className=" font-extrabold text-white">
                {capitalizeName(item.createdBy.username)}{" "}
                <span className=" pl-3 text-gray-500">
                  {item.notificationText}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
