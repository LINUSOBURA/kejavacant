import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { createClient } from "@/utils/supabase/server";

export default function Header() {
  const supabase = createClient();

  const currentUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      return "Guest";
    }
    return data.user.user_metadata.display_name;
  };

  return (
    <main className="flex flex-row justify-between items-center px-4 sm:px-8 md:px-12">
      <div className="section1 flex justify-around items-center">
        <Link href={"/"}>
          <Image
            alt="Logo"
            src="/logo.svg"
            width={100}
            height={100}
            className="mr-10"
          />
        </Link>

        <div className="links flex gap-5 sm:gap-10 md:gap-20 text-sm md:text-xl">
          <Link href={"/top-offers"}>Top Offers</Link>
          <Link href={"/houses"}>Vacants</Link>
        </div>
      </div>
      <div className="section2 flex gap-5 items-center">
        <p>
          <FaRegUserCircle />
          {currentUser()}
        </p>
        <Link href={"/post-ad"}>
          <button className="rounded bg-red-300 px-2 py-1 sm:px-4 sm:py-2">
            Post Ad
          </button>
        </Link>
      </div>
    </main>
  );
}
