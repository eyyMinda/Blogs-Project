"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Form } from "UI/form";
import { changePassFormSchema } from "Lib/formSchema";
import defaultNotification from "Lib/locale/default-notification";
import NotificationContext from "Lib/context/notification-context";
import PasswordStrengthChecker from "UI/custom-ui/password-strength-bar";
import SubmitButton from "UI/custom-ui/submit-btn";
import ForgotPassword from "../../auth/forgot-password-link";
import renderFormField from "Components/ui/custom-ui/render-form-field";

interface NewPasswordProps {
  needPassword?: boolean;
  accountEmail?: string | null;
  onSuccessAction?: React.Dispatch<React.SetStateAction<boolean>>;
}

function NewPasswordForm({ needPassword = false, accountEmail, onSuccessAction }: NewPasswordProps) {
  const notifCtx = useContext(NotificationContext);
  const { data: session, update } = useSession();
  const [pass, setPass] = useState<string>("");

  const [passFormSchema, passFormDefaults] = changePassFormSchema(needPassword) as any;
  const form = useForm<z.infer<typeof passFormSchema>>({
    resolver: zodResolver(passFormSchema),
    defaultValues: passFormDefaults
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof passFormSchema>) {
    notifCtx.setNotification(defaultNotification.changepass.pending);
    let data = { password: values.passwordNew, email: accountEmail || session?.user?.email } as any;
    if (!needPassword) data.passwordOld = values.passwordOld;

    try {
      const res = await fetch("/api/account/update", {
        method: "PATCH",
        body: JSON.stringify(data)
      });
      const { err, msg } = await res.json();
      notifCtx.setNotification(defaultNotification.changepass[err ? "error" : "success"](msg));

      if (!err) {
        update({ needPassword: false });
        if (onSuccessAction) onSuccessAction(true);
      }
    } catch (error) {
      console.log(error);
      notifCtx.setNotification(defaultNotification.changepass.error(""));
    } finally {
      form.reset();
      setPass(""); // For Password Strength Bar Reset
    }
  }

  const passwordFields = [
    !needPassword && { name: "passwordOld", label: "Old Password", type: "password" },
    { name: "passwordNew", label: "New Password", type: "password", onChangeCapture: e => setPass(e.currentTarget.value) },
    { name: "passwordConfirm", label: "Confirm New Password", type: "password" }
  ] as ChangePassFieldConfig[];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-4 text-start w-auto max-w-max">
        {passwordFields.map(item => item && renderFormField(form, item))}
        <PasswordStrengthChecker password={pass} className="pt-2" />

        <div className="flex items-center gap-4">
          <SubmitButton variant="secondary" isLoading={isLoading} text="Update password" />
          {!needPassword && <ForgotPassword />}
        </div>
      </form>
    </Form>
  );
}

export default NewPasswordForm;
