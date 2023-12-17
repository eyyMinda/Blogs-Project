"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Fragment, useContext } from "react";
import { useSession } from "next-auth/react";
import NotificationContext from "@/lib/context/notification-context";
import defaultNotification from "@/lib/locale/default-notification";
import { contactFormSchema } from "@/lib/formSchema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "../ui/custom-ui/submit-btn";

export default function ContactForm() {
  const { data: session } = useSession();
  const notifCtx = useContext(NotificationContext);

  const [ContactFormSchema, ContactFormDefaults] = contactFormSchema(!!session?.user) as any;
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: ContactFormDefaults
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof ContactFormSchema>) {
    // ✅ This will be type-safe and validated.
    notifCtx.setNotification(defaultNotification.message.pending);

    const data = {
      ...values,
      ...(session?.user && { username: session.user.name, email: session.user.email })
    };
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data)
    });
    const { err, msg } = await res.json();

    notifCtx.setNotification(defaultNotification.message[err ? "error" : "success"](msg));
    !err && form.reset();
    return;
  }

  const renderFormField = (item: ContactFieldConfig) =>
    item && (
      <FormField
        key={item.name}
        control={form.control}
        name={item.name}
        render={({ field }) => (
          <FormItem>
            {item.label && <FormLabel>{item.label}</FormLabel>}
            <FormControl>{item.name === "message" ? <Textarea {...field} {...item} /> : <Input {...field} {...item} />}</FormControl>
            {item.description && <FormDescription>{item.description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );

  const contactFields = [
    !session?.user && {
      fields: [
        { name: "username", label: "Username", placeholder: "John", description: "What would you like to be referred as." },
        { name: "email", label: "Email", placeholder: "john@doe.com" }
      ]
    },
    { name: "subject", placeholder: "Subject" },
    { name: "message", placeholder: "Message", rows: 12 }
  ] as ContactFieldConfig[];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {contactFields.map((item, index) => (
          <Fragment key={index}>
            {item.fields ? <div className="flex gap-4">{item.fields?.map(item => renderFormField(item))}</div> : renderFormField(item)}
          </Fragment>
        ))}

        <div>
          <SubmitButton
            className="w-full dark:bg-white dark:hover:bg-primary dark:text-black dark:hover:text-white mt-4"
            isLoading={isLoading}
            text="Send message"
          />
        </div>
      </form>
    </Form>
  );
}
