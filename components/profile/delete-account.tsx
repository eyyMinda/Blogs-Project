"use client";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import NotificationContext from "@/lib/context/notification-context";
import defaultNotification from "@/lib/locale/default-notification";
import { Button } from "../ui/button";

export default function DeleteAccount({ email }: { email?: string | null }) {
  const notifCtx = useContext(NotificationContext);
  if (!email) return;

  const handleDelete = async () => {
    if (!window.confirm("Ae you sure you want to delete your account?")) return;

    notifCtx.setNotification(defaultNotification["deleteacc"]["pending"]);
    const res = await fetch("/api/account/delete", {
      method: "POST",
      body: JSON.stringify(email)
    });
    const { err, msg } = await res.json();

    if (!err) signOut();
    notifCtx.setNotification(defaultNotification["deleteacc"][err ? "error" : "success"](msg));
  };

  return (
    <Button variant="destructive" className="mt-40" onClick={() => handleDelete()}>
      Delete Account
    </Button>
  );
}
