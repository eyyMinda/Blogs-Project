"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../ui/form";
import { confirmEmailSchema } from "@/lib/formSchema";
import defaultNotification from "@/lib/locale/default-notification";
import NotificationContext from "@/lib/context/notification-context";
import SubmitButton from "../../ui/custom-ui/submit-btn";
import renderFormField from "@/components/ui/custom-ui/render-form-field";

function ConfirmEmailForm({ setEmailConfirmed }: { setEmailConfirmed: React.Dispatch<React.SetStateAction<string | null>> }) {
  const notifCtx = useContext(NotificationContext);

  const form = useForm<z.infer<typeof confirmEmailSchema>>({
    resolver: zodResolver(confirmEmailSchema),
    defaultValues: { email: "" }
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof confirmEmailSchema>) {
    notifCtx.setNotification(defaultNotification.confirmemail.pending);

    try {
      const res = await fetch("/api/account/check", {
        method: "POST",
        body: JSON.stringify({ email: values.email })
      });
      const { err, msg } = await res.json();
      notifCtx.setNotification(defaultNotification.confirmemail[err ? "error" : "success"](msg));
      if (!err) setEmailConfirmed(values.email);
    } catch (error) {
      console.log(error);
      notifCtx.setNotification(defaultNotification.confirmemail.error(""));
    } finally {
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4 mt-4 text-start">
        {renderFormField(form, { name: "email", placeholder: "Email" })}

        <SubmitButton variant="secondary" isLoading={isLoading} text="Next" />
      </form>
    </Form>
  );
}

export default ConfirmEmailForm;
