import UserProfile from "@/components/profile/user-profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your Profile"
};

export default function ProfilePage() {
  return <UserProfile />;
}
