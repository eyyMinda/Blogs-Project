import Link from "next/link";
import { ReactNode } from "react";

type AuthTemplate = {
  title: string;
  description: ReactNode;
  button: string;
};

type AuthTemplates = {
  login: AuthTemplate;
  register: AuthTemplate;
};

export const authTemplate: AuthTemplates = {
  login: {
    title: "Log in to your Account",
    description: (
      <>
        Don&apos;t have an account?{" "}
        <Link className="text-white underline-offset-2 transition-all hover:underline" href={"/register"}>
          Sign Up
        </Link>
      </>
    ),
    button: "Log in"
  },
  register: {
    title: "Create an account",
    description: (
      <>
        Have an account?{" "}
        <Link className="text-white underline-offset-2 transition-all hover:underline" href={"/login"}>
          Log in now
        </Link>
      </>
    ),
    button: "Sign up"
  }
};
