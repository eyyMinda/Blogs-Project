"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import NotificationContext from "@/lib/context/notification-context";
import defaultNotification from "@/lib/locale/default-notification";
import { loginFormSchema, registerFormSchema } from "@/lib/formSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "../ui/custom-ui/submit-btn";
import PasswordStrengthChecker from "../ui/custom-ui/password-strength-bar";

export default function AuthForm({ auth, btnText }: { auth: "register" | "login"; btnText: string }) {
  const login = auth === "login";
  const router = useRouter();
  const notifCtx = useContext(NotificationContext);
  const [pass, setPass] = useState<string>("");
  const defaultValues: any = {
    register: { email: "", password: "" },
    login: { email: "", password: "", passwordConfirm: "" }
  };

  const authFormSchema = login ? loginFormSchema : registerFormSchema;
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: defaultValues[auth]
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    // ✅ This will be type-safe and validated.
    notifCtx.setNotification(defaultNotification[auth].pending);
    if (login) {
      const res = await signIn("credentials", { ...values, redirect: false });
      const { error } = res!;
      if (!error) {
        router.push("/");
        router.refresh();
      }
      notifCtx.setNotification(defaultNotification[auth][error ? "error" : "success"](error));
    } else {
      const data = { email: values.email, password: values.password };
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data)
      });
      const { err, msg } = await res.json();
      if (!err) {
        router.push("/login");
        router.refresh();
      }
      notifCtx.setNotification(defaultNotification[auth][err ? "error" : "success"](msg));
    }

    form.reset();
    setPass(""); // For Password Strength Bar Reset
    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@doe.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className={login ? "pb-4" : ""}>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" onChangeCapture={e => setPass(e.currentTarget.value)} type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!login && (
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="confirm password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {!login && <PasswordStrengthChecker password={pass} className="pt-2" />}
        <SubmitButton className="w-full dark:bg-white dark:hover:bg-primary dark:text-black dark:hover:text-white" isLoading={isLoading} text={btnText} />
      </form>
    </Form>
  );
}
