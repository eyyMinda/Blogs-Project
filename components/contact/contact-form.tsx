"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Fragment, useContext } from "react";
import { useSession } from "next-auth/react";
import NotificationContext from "@/lib/context/notification-context";
import defaultNotification from "@/lib/locale/default-notification";
import { contactFormSchema } from "@/lib/formSchema";
import { Form } from "@/components/ui/form";
import SubmitButton from "../ui/custom-ui/submit-btn";
import renderFormField from "../ui/custom-ui/render-form-field";

export default function ContactForm() {
  const { data: session } = useSession();
  const { setNotification } = useContext(NotificationContext);

  const [ContactFormSchema, ContactFormDefaults] = contactFormSchema(!!session?.user) as any;
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: ContactFormDefaults
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof ContactFormSchema>) {
    setNotification(defaultNotification.message.pending);

    const data = {
      ...values,
      ...(session?.user && { username: session.user.name, email: session.user.email }),
      date: new Date().toString()
    };
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data)
    });
    const { err, msg } = await res.json();

    setNotification(defaultNotification.message[err ? "error" : "success"](msg));
    !err && form.reset();
    return;
  }

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
            {item.fields ? <div className="flex gap-4">{item.fields?.map(item => renderFormField(form, item))}</div> : renderFormField(form, item)}
          </Fragment>
        ))}

        <div>
          <SubmitButton
            className="w-full text-black bg-gray-200 hover:text-white dark:bg-white dark:hover:bg-primary dark:text-black dark:hover:text-white mt-4"
            isLoading={isLoading}
            text="Send message"
          />
        </div>
      </form>
    </Form>
  );
}
