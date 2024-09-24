"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import LoginButton from "./LoginLogoutButton";
import UserGreetText from "./UserGreetText";
import { createClient } from "@/utils/supabase/client";

export default function Header() {
  const supabase = createClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = supabase.auth.getUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <main className="flex flex-row justify-between items-center px-4 sm:px-8 md:px-12 sticky top-0 z-50 bg-teal-100">
      <div className="section1 flex justify-around items-center">
        <Link href={"/"}>
          <Image
            alt="Logo"
            src="/logo.svg"
            width={70}
            height={70}
            className="mr-10"
          />
        </Link>

        <div className="links hidden md:flex gap-5 sm:gap-5 md:gap-10 text-sm md:text-xl">
          <Link href={"/top-offers"}>Top Offers</Link>
          <Link href={"/houses"}>Vacants</Link>
        </div>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="hamburger-icon">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      <div className="section2 hidden md:flex gap-5 items-center">
        <p className="flex gap-2 items-center">
          <UserGreetText />
        </p>
        <LoginButton />
        <Link href={"/post-ad"}>
          <button className="rounded bg-red-300 px-2 py-1 sm:px-4 sm:py-2">
            Post Ad
          </button>
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu flex flex-col gap-5 items-center absolute top-20 left-0 right-0 bg-white p-5 shadow-md md:hidden">
          <Link href={"/top-offers"} onClick={toggleMenu}>
            Top Offers
          </Link>
          <Link href={"/houses"} onClick={toggleMenu}>
            Vacants
          </Link>
          <div className="flex flex-col items-center gap-5">
            <p className="flex gap-2 items-center">
              <UserGreetText />
            </p>
            <LoginButton />
            <Link href={user ? "/post-ad" : "/login"}>
              <button className="rounded bg-red-300 px-4 py-2">Post Ad</button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
