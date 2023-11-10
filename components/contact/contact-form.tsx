"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { contactFormSchema } from "@/lib/formSchema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button type="submit" aria-disabled={isLoading} disabled={isLoading}>
      {isLoading ? "Sending..." : "Send Message"}
    </Button>
  );
}

export default function ProfileForm() {
  const [srvMsg, setSrvMsg] = useState(null || []);
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

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ ...values })
    });
    const { err, msg } = await res.json();

    setSrvMsg(err ? msg : null);
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

        {srvMsg && Array.isArray(srvMsg) ? (
          <ul>
            {srvMsg.map((m: string, i: number) => (
              <li key={i}>
                <p>{m}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>{srvMsg}</p>
        )}
      </form>
    </Form>
  );
}
