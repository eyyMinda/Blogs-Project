"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import NotificationContext from "@/lib/context/notification-context";
import { contactFormSchema } from "@/lib/formSchema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button type="submit" aria-disabled={isLoading} disabled={isLoading}>
      {isLoading ? "Sending..." : "Send Message"}
    </Button>
  );
}

export default function ProfileForm() {
  const notifCtx = useContext(NotificationContext);
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      username: "",
      email: "",
      message: ""
    }
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    // ✅ This will be type-safe and validated.
    notifCtx.setNotification({
      title: "Signing up...",
      message: "Registering for newsletter...",
      status: "pending"
    });

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ ...values })
    });
    const { err, msg } = await res.json();

    notifCtx.setNotification(
      err
        ? {
            title: "Failed!",
            message: msg || "Something went wrong!",
            status: "error"
          }
        : {
            title: "Success!",
            message: msg || "Successfully registered for our newsletter!",
            status: "success"
          }
    );
    !err && form.reset();
    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="John@Doe.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Message here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-right">
          <SubmitButton isLoading={isLoading} />
        </div>
      </form>
    </Form>
  );
}
