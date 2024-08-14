"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import NotificationContext from "@/contexts/notification-context";
import defaultNotification from "@/lib/locale/default-notification";
import { authFormSchema } from "@/lib/formSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "../ui/custom-ui/submit-btn";
import PasswordStrengthChecker from "../ui/custom-ui/password-strength-bar";
import ForgotPassword from "./forgot-password-link";

export default function AuthForm({ auth, btnText }: { auth: "register" | "login"; btnText: string }) {
  const login = auth === "login";
  const router = useRouter();
  const notifCtx = useContext(NotificationContext);
  const [pass, setPass] = useState<string>("");
  const [passConfirm, setPassConfirm] = useState<string>("");
  const [email, setEmail] = useState<string>(""); // This is just a shadow to avoid uncontrolled -> controlled input error

  const [AuthFormSchema, AuthFormDefaults] = authFormSchema(auth) as any;

  const form = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: AuthFormDefaults
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof AuthFormSchema>) => {
    notifCtx.setNotification(defaultNotification[auth].pending);

    const data = login ? { ...values, redirect: false } : { email: values.email, password: values.password };
    const successRedirect = login ? "/" : "/login";
    let error, message;

    if (login) {
      const res = await signIn("credentials", data)!;
      if (res && res.error) error = res.error || "Something went wrong on our end.";
    } else {
      const { err, msg } = await (await fetch("/api/auth/signup", { method: "POST", body: JSON.stringify(data) })).json();
      error = err;
      message = msg;
    }

    if (!error) {
      router.push(successRedirect);
      router.refresh();
    }
    notifCtx.setNotification(defaultNotification[auth][error ? "error" : "success"](error || message));
    form.reset();
    setPass(""); // For Password Strength Bar Reset
  };

  const authFields = [
    { name: "email", label: "Email", placeholder: "john@doe.com", value: email, onChangeCapture: e => setEmail(e.currentTarget.value) },
    {
      name: "password",
      label: "Password",
      placeholder: "password",
      type: "password",
      value: pass,
      onChangeCapture: e => setPass(e.currentTarget.value),
      className: login ? "!mb-4" : ""
    },
    !login && {
      name: "passwordConfirm",
      label: "Confirm Password",
      placeholder: "confirm password",
      type: "password",
      value: passConfirm,
      onChangeCapture: e => setPassConfirm(e.target.value)
    }
  ] as AuthFieldConfig[];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {authFields.map(
          (item, index) =>
            item && (
              <FormField
                key={index}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem className={item.className}>
                    <FormLabel className={`${item.name === "password" ? "flex justify-between items-center" : ""}`}>
                      {item.label} {login && item.name === "password" && <ForgotPassword className="text-xs" />}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} {...item} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
        )}
        {!login && <PasswordStrengthChecker password={pass} className="pt-2" />}
        <SubmitButton className="w-full dark:bg-white dark:hover:bg-primary dark:text-black dark:hover:text-white" isLoading={isLoading}>
          {btnText}
        </SubmitButton>
      </form>
    </Form>
  );
}
