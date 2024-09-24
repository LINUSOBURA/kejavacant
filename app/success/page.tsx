"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/houses");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="p-5 text-green-500">
        Ad Posted Successfully! You will be redirected in 2 seconds...
      </p>
    </div>
  );
}
