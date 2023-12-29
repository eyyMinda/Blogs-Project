"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Form } from "../../ui/form";
import { changeUsernameSchema } from "@/lib/formSchema";
import defaultNotification from "@/lib/locale/default-notification";
import NotificationContext from "@/lib/context/notification-context";
import SubmitButton from "../../ui/custom-ui/submit-btn";
import renderFormField from "@/components/ui/custom-ui/render-form-field";

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
    notifCtx.setNotification(defaultNotification.changeusername.pending);

    const username = values.username;
    try {
      const res = await fetch("/api/account/update", {
        method: "PATCH",
        body: JSON.stringify({ email, username })
      });
      const { err, msg } = await res.json();
      notifCtx.setNotification(defaultNotification.changeusername[err ? "error" : "success"](msg));

      if (!err) {
        await update({ name: username });
        update();
      }
    } catch (error) {
      console.log(error);
      notifCtx.setNotification(defaultNotification.changeusername.error(""));
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4 mt-4 text-start">
        {renderFormField(form, { name: "username", placeholder: name })}

        <SubmitButton variant="secondary" isLoading={isLoading} text="Change" />
      </form>
    </Form>
  );
}

export default ChangeUsernameForm;
