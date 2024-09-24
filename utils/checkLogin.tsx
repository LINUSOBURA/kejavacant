"use server";
import { createClient } from "@/utils/supabase/server";

type UserProfile = {
  id: string;
  avatar_url: string;
};

type UserAndProfile = {
  user: any; // You can replace `any` with a more specific user type
  profile: UserProfile | null;
};

export async function getUserAndProfile(): Promise<UserAndProfile | null> {
  const supabase = createClient();

  // Get user data
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    console.log(authError);
    return null; // Return null if there is an error
  }

  // Fetch user profile
  const { data: userProfileData, error: profileError } = await supabase
    .from("profiles")
    .select()
    .eq("id", authData.user.id)
    .single();

  if (profileError) {
    console.log(profileError);
    return null; // Return null if there is an error
  }

  return {
    user: authData.user,
    profile: userProfileData ?? null, // Handle case where no profile exists
  };
}
