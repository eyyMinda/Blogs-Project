"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { changePassFormSchema } from "@/lib/formSchema";
import defaultNotification from "@/lib/locale/default-notification";
import NotificationContext from "@/lib/context/notification-context";
import PasswordStrengthChecker from "../../ui/custom-ui/password-strength-bar";
import SubmitButton from "../../ui/custom-ui/submit-btn";
import ForgotPassword from "../../auth/forgotPassword";

function NewPasswordForm({ needPassword = false }: { needPassword?: boolean }) {
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

    let data = { password: values.passwordNew, email: session?.user?.email } as any;
    if (!needPassword) data.passwordOld = values.passwordOld;

    const res = await fetch("/api/account/update", {
      method: "POST",
      body: JSON.stringify(data)
    });
    const { err, msg } = await res.json();
    notifCtx.setNotification(defaultNotification.changepass[err ? "error" : "success"](msg));

    if (!err) update({ needPassword: false });
    form.reset();
    setPass(""); // For Password Strength Bar Reset
  }

  const passwordFields = [
    !needPassword && { name: "passwordOld", label: "Old Password" },
    { name: "passwordNew", label: "New Password", onChangeCapture: e => setPass(e.currentTarget.value) },
    { name: "passwordConfirm", label: "Confirm New Password" }
  ] as ChangePassFieldConfig[];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-4 text-start w-auto max-w-max">
        {passwordFields.map(
          (item, index) =>
            item && (
              <FormField
                key={index}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Input type="password" {...item} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
        )}
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
