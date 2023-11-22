import { CardWithForm } from "@/components/auth/auth-form-card";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account"
};

export default async function Login() {
  const session = await getServerSession();

  return <CardWithForm auth="login" session={session} />;
}
