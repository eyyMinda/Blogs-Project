import { CardWithForm } from "@/components/auth/auth-form-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register your account"
};

export default function Login() {
  return <CardWithForm auth="register" />;
}
