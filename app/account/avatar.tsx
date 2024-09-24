"use server";
import { createClient } from "@/utils/supabase/server";
import AvatarComponent from "./components/avatarComponent"; // The client component

// type UserProfile = {
//   id: string;
//   avatar_url: string;
// };

export default async function Avatar() {
  const supabase = createClient();

  // Get user data
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    console.log(authError);
    return null; // Exit early if there is an error
  }

  // Fetch user profile
  const { data: userProfileData, error: profileError } = await supabase
    .from("profiles")
    .select("id, avatar_url")
    .eq("id", authData.user.id)
    .single();

  if (profileError || !userProfileData) {
    console.log(profileError);
    return null; // Exit early if there is an error
  }

  const avatar_url = userProfileData.avatar_url;

  // Pass avatar_url as props to the client component
  return <AvatarComponent avatarUrl={avatar_url} />;
}
