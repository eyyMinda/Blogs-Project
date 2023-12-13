"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import NotificationContext from "@/lib/context/notification-context";
import defaultNotification from "@/lib/locale/default-notification";
import { authFormSchema } from "@/lib/formSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "../ui/custom-ui/submit-btn";
import PasswordStrengthChecker from "../ui/custom-ui/password-strength-bar";
import ForgotPassword from "./forgotPassword";

export default function AuthForm({ auth, btnText }: { auth: "register" | "login"; btnText: string }) {
  const login = auth === "login";
  const router = useRouter();
  const notifCtx = useContext(NotificationContext);
  const [pass, setPass] = useState<string>("");
  const [passConfirm, setPassConfirm] = useState<string>("");

  const AuthFormSchema = authFormSchema(auth);
  const form = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      register: { email: "", password: "", passwordConfirm: "" },
      login: { email: "", password: "" }
    }[auth]
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof AuthFormSchema>) => {
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
      console.log(values);
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
  };

  const authFields = [
    { name: "email", label: "Email", placeholder: "john@doe.com" },
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
                      <Input {...field} {...item} type={item.type} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
        )}
        {!login && <PasswordStrengthChecker password={pass} className="pt-2" />}
        <SubmitButton className="w-full dark:bg-white dark:hover:bg-primary dark:text-black dark:hover:text-white" isLoading={isLoading} text={btnText} />
      </form>
    </Form>
  );
}
