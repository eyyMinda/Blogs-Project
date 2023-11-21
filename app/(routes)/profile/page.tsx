import UserProfile from "@/components/profile/user-profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your Profile"
};

export default async function ProfilePage() {
  // Redirect away if NOT auth
  return <UserProfile />;
}
