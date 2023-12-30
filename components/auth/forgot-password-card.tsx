"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ConfirmEmailForm from "Components/profile/(settings)/confirm-email-form";
import NewPasswordForm from "Components/profile/(settings)/new-password-form";
import { signOut, useSession } from "next-auth/react";

export default function ForgotPasswordCard() {
  const { data: session } = useSession();
  const [emailConfirmed, setEmailConfirmed] = useState<string | null>(null);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const accountEmail = { accountEmail: session ? session?.user?.email : emailConfirmed };
  useEffect(() => {
    if (passwordChanged) signOut({ callbackUrl: "/login" });
  }, [passwordChanged]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{emailConfirmed ? "Reset your password" : "Confirm your email"}</CardTitle>
      </CardHeader>
      <CardContent>
        {emailConfirmed ? (
          <NewPasswordForm needPassword={true} {...accountEmail} onSuccessAction={setPasswordChanged} />
        ) : (
          <ConfirmEmailForm setEmailConfirmed={setEmailConfirmed} />
        )}
      </CardContent>
    </Card>
  );
}
