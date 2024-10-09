"use client";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import NotificationContext from "@/contexts/notification-context";
import defaultNotification from "Lib/locale/default-notification";
import { Button } from "UI/button";
import { AlertDialogComp } from "@/components/ui/custom-ui/alert-dialog-comp";
import { deleteAccountLocale } from "@/lib/locale/default-alerts";

export default function DeleteAccount({ email }: { email?: string | null }) {
  const { setNotification } = useContext(NotificationContext);
  const { data: session } = useSession();
  if (!email) return;

  const handleDelete = async () => {
    if (!session?.user) return;

    setNotification(defaultNotification.deleteacc.pending);
    try {
      const res = await fetch("/api/account/delete", {
        method: "DELETE",
        body: JSON.stringify(email)
      });
      const { err, msg } = await res.json();

      if (!err) signOut();
      setNotification(defaultNotification.deleteacc[err ? "error" : "success"](msg));
    } catch (error) {
      console.log(error);
      setNotification(defaultNotification.changeusername.error(""));
    }
  };

  return (
    <AlertDialogComp onClickFunc={handleDelete} locale={deleteAccountLocale}>
      <Button variant="destructive" className="mt-4">
        Delete Account
      </Button>
    </AlertDialogComp>
  );
}
