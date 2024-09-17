"use client";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

const UserGreetText = () => {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);
  if (user !== null) {
    return (
      <p className="flex gap-2 items-center">
        <span className="text-3xl font-bold">
          <Image
            alt="avatar"
            src={
              user.user_metadata.avatar_url ??
              "https://www.iconsdb.com/icons/preview/black/add-user-3-xxl.png"
            }
            width="30"
            height="30"
            className="inline-block rounded-full"
          ></Image>
        </span>
        hello&nbsp;
        <code className="font-mono font-bold">
          {user.user_metadata.full_name ?? "user"}!
        </code>
      </p>
    );
  }
  return (
    <p className="flex gap-2 items-center">
      {" "}
      <FaRegUserCircle /> Guest
    </p>
  );
};

export default UserGreetText;
