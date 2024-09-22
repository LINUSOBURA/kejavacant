"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function LoggedIn() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  // Check for errors or if user data is missing
  if (error || !data?.user) {
    redirect("/login");
  }

  // // Query profile table for the current user
  // const { data: profile, profileError } = await supabase
  //   .from("profile")
  //   .select() // Specify columns if needed e.g. select('column1, column2')
  //   .eq("user_id", userData.user.id)
  //   .single(); // If you expect only one profile entry per user, use single()

  // if (profileError) {
  //   console.error("Error fetching profile:", profileError);
  // }

  return data.user;
}
