"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { changeUsernameSchema } from "@/lib/formSchema";
import defaultNotification from "@/lib/locale/default-notification";
import NotificationContext from "@/lib/context/notification-context";
import SubmitButton from "../../ui/custom-ui/submit-btn";

function ChangeUsernameForm() {
  const notifCtx = useContext(NotificationContext);
  const { data: session, update } = useSession();
  const { email, name } = session?.user as User;

  const form = useForm<z.infer<typeof changeUsernameSchema>>({
    resolver: zodResolver(changeUsernameSchema),
    defaultValues: { username: "" }
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof changeUsernameSchema>) {
    // ✅ This will be type-safe and validated.
    notifCtx.setNotification(defaultNotification.changeusername.pending);

    const username = values.username;
    const res = await fetch("/api/account/update", {
      method: "POST",
      body: JSON.stringify({ email, username })
    });
    const { err, msg } = await res.json();
    notifCtx.setNotification(defaultNotification.changeusername[err ? "error" : "success"](msg));

    if (!err) {
      await update({ name: username });
      update();
    }
    form.reset();
    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4 mt-4 text-start">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="username" placeholder={name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton variant="secondary" isLoading={isLoading} text="Change" />
      </form>
    </Form>
  );
}

export default ChangeUsernameForm;