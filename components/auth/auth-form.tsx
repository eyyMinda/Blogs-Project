"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import NotificationContext from "@/lib/context/notification-context";
import defaultNotification from "@/lib/locale/default-notification";
import { authFormSchema } from "@/lib/formSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "../ui/submit-btn";

export default function AuthForm() {
  const notifCtx = useContext(NotificationContext);

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: { email: "", password: "" }
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    // ✅ This will be type-safe and validated.
    notifCtx.setNotification(defaultNotification.pending);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ ...values })
    });
    const { err, msg } = await res.json();

    notifCtx.setNotification(defaultNotification[err ? "error" : "success"](msg));
    !err && form.reset();
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
            <FormItem>
              <FormLabel className="">Password</FormLabel>
              <FormControl>
                <Input placeholder="password123" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="">
          <SubmitButton
            className="w-full my-4 dark:bg-white dark:hover:bg-primary dark:text-black dark:hover:text-white"
            isLoading={isLoading}
            text="Sign in"
          />
        </div>
      </form>
    </Form>
  );
}
