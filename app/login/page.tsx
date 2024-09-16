"use client";
import Link from "next/link";
import { login } from "./actions";
import Loading from "../../components/loading";
import { useCheckUser } from "@/utils/hooks/useCheckuser";

export default function LoginPage() {
  const { isCheckingUser, isLoggedIn } = useCheckUser();

  if (isCheckingUser) {
    return <Loading />;
  }

  if (isLoggedIn) {
    return null;
  }
  return (
    <div className="mx-auto w-1/2 mt-8">
      <h4 className="text-xl sm:text-2xl text-center font-bold">Login</h4>
      <form className="flex flex-col gap-2">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="example@email.com"
          required
          className="bg-yellow-50 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-customGreen"
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="**********"
          required
          className="bg-yellow-50 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-customGreen"
        />
        <button
          formAction={login}
          className="bg-customGreen rounded-xl p-2 mt-2"
        >
          Log in
        </button>
      </form>

      <p className="mt-4 text-center">
        Don&apos;t have an account?{" "}
        <Link href={"/signup"} className="underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
