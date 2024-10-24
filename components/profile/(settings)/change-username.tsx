"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Form } from "UI/form";
import { changeUsernameSchema } from "Lib/formSchema";
import { IUser } from "@/nextauth";
import defaultNotification from "Lib/locale/default-notification";
import NotificationContext from "@/contexts/notification-context";
import SubmitButton from "UI/custom-ui/submit-btn";
import renderFormField from "Components/ui/custom-ui/render-form-field";
import { ChangeUsernameApi } from "@/lib/actions";

function ChangeUsernameForm() {
  const notifCtx = useContext(NotificationContext);
  const { data: session, update } = useSession();
  const { email, name } = session?.user as IUser;

  const form = useForm<z.infer<typeof changeUsernameSchema>>({
    resolver: zodResolver(changeUsernameSchema),
    defaultValues: { username: "" }
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof changeUsernameSchema>) {
    notifCtx.setNotification(defaultNotification.changeusername.pending);

    try {
      const res = await ChangeUsernameApi(email as string, values.username);
      const { err, msg } = await res?.json();
      notifCtx.setNotification(defaultNotification.changeusername[err ? "error" : "success"](msg));

      if (!err) {
        await update({ name: values.username });
        update();
      }
    } catch (error) {
      console.log(error);
      notifCtx.setNotification(defaultNotification.changeusername.error(""));
    } finally {
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4 mt-4 text-start">
        {renderFormField(form, { name: "username", placeholder: name || "", autoComplete: "username" })}

        <SubmitButton variant="secondary" isLoading={isLoading}>
          Change
        </SubmitButton>
      </form>
    </Form>
  );
}

export default ChangeUsernameForm;
