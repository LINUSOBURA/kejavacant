import Image from "next/image";
import React from "react";
import LoggedIn from "@/utils/checkLogin";

export default async function Avatar() {
  // const profile = await LoggedIn();
  // console.log(profile);

  return (
    <div>
      <div className="avatar">
        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
          <Image alt="avatar" width={50} height={50} src={""} />
        </div>
      </div>
    </div>
  );
}
