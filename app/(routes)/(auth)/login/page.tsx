import { CardWithForm } from "@/components/auth/auth-form-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account"
};

export default function Login() {
  return <CardWithForm />;
}
