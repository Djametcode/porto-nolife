"use client";

import { getCurrentUser } from "@/handler/getCurrentUser";
import { useEffect, useState } from "react";

interface IUser {
  avatar: string;
  username: string;
  post: any[];
}

export default function ProfileComponent() {
  const [user, setUser] = useState<IUser[]>([]);
  console.log(user);

  const getData = async () => {
    try {
      const response = await getCurrentUser();
      console.log(response);
      setUser([...user, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
