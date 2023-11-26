import { Metadata } from "next";
import { getFolderFileNames } from "@/lib/posts-util";
import UserProfile from "@/components/profile/user-profile";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your Profile"
};

export default async function ProfilePage() {
  const avatars = await getFolderFileNames("images/account/remix-rumble-avatars/", "public");

  return <UserProfile avatars={avatars} />;
}
