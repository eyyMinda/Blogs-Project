"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Form } from "UI/form";
import { confirmEmailSchema } from "Lib/formSchema";
import defaultNotification from "Lib/locale/default-notification";
import NotificationContext from "Lib/context/notification-context";
import SubmitButton from "UI/custom-ui/submit-btn";
import renderFormField from "Components/ui/custom-ui/render-form-field";

function ConfirmEmailForm({ setEmailConfirmed }: { setEmailConfirmed: React.Dispatch<React.SetStateAction<string | null>> }) {
  const { setNotification } = useContext(NotificationContext);

  const form = useForm<z.infer<typeof confirmEmailSchema>>({
    resolver: zodResolver(confirmEmailSchema),
    defaultValues: { email: "" }
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof confirmEmailSchema>) {
    setNotification(defaultNotification.confirmemail.pending);

    try {
      const res = await fetch("/api/account/check", {
        method: "POST",
        body: JSON.stringify({ email: values.email })
      });
      const { err, msg } = await res.json();
      setNotification(defaultNotification.confirmemail[err ? "error" : "success"](msg));
      if (!err) setEmailConfirmed(values.email);
    } catch (error) {
      console.log(error);
      setNotification(defaultNotification.confirmemail.error(""));
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
