import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export function useCheckUser() {
  const supabase = createClient();
  const router = useRouter();
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user) {
        setIsLoggedIn(true);
        router.push("/"); // Redirect to home if user is logged in
      } else {
        setIsCheckingUser(false); // Continue to signup or login page if no user
      }
    };

    checkUser();
  }, [supabase, router]);

  return { isCheckingUser, isLoggedIn };
}
