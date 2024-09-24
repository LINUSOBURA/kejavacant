import Image from "next/image";
import { getUserAndProfile } from "@/utils/checkLogin";

export default async function AccountForm() {
  const userAndProfile = await getUserAndProfile();

  if (!userAndProfile) {
    console.log("Profile not found");
    return null;
  }
  const { profile } = userAndProfile;

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <Image
        src={profile.avatar_url}
        alt="Avatar"
        width={100}
        height={100}
        className="rounded-full"
      ></Image>
      <div>Name: {profile.full_name}</div>
      <div>Email: {profile.email}</div>
    </div>
  );
}
