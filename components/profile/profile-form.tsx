"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { changePassFormSchema } from "@/lib/formSchema";
import defaultNotification from "@/lib/locale/default-notification";
import NotificationContext from "@/lib/context/notification-context";
import PasswordStrengthChecker from "../ui/custom-ui/password-strength-bar";
import SubmitButton from "../ui/custom-ui/submit-btn";

function ProfileForm() {
  const notifCtx = useContext(NotificationContext);
  const [pass, setPass] = useState<string>("");

  const form = useForm<z.infer<typeof changePassFormSchema>>({
    resolver: zodResolver(changePassFormSchema),
    defaultValues: { oldpassword: "", newpassword: "" }
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof changePassFormSchema>) {
    // ✅ This will be type-safe and validated.
    notifCtx.setNotification(defaultNotification.changepass.pending);

    // Fetch to compare the old password and if fits, validate the new password
    // update db with new password

    const error = "Password changed";
    notifCtx.setNotification(defaultNotification.changepass[error ? "error" : "success"](error));

    form.reset();
    setPass(""); // For Password Strength Bar Reset
    return;
  }
  const btnText = "Change Password";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="oldpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="password" onChangeCapture={e => setPass(e.currentTarget.value)} type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PasswordStrengthChecker password={pass} className="pt-2" />

        <SubmitButton className="w-full dark:bg-white dark:hover:bg-primary dark:text-black dark:hover:text-white" isLoading={isLoading} text={btnText} />
      </form>
    </Form>
  );
}

export default ProfileForm;
