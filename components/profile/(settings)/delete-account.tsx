"use client";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import NotificationContext from "Lib/context/notification-context";
import defaultNotification from "Lib/locale/default-notification";
import { Button } from "UI/button";

export default function DeleteAccount({ email }: { email?: string | null }) {
  const { setNotification } = useContext(NotificationContext);
  if (!email) return;

  const handleDelete = async () => {
    if (!window.confirm("Ae you sure you want to delete your account?")) return;
    setNotification(defaultNotification["deleteacc"]["pending"]);
    try {
      const res = await fetch("/api/account/delete", {
        method: "DELETE",
        body: JSON.stringify(email)
      });
      const { err, msg } = await res.json();

      if (!err) signOut();
      setNotification(defaultNotification["deleteacc"][err ? "error" : "success"](msg));
    } catch (error) {
      console.log(error);
      setNotification(defaultNotification.changeusername.error(""));
    }
  };

  return (
    <>
      <Button variant="destructive" className="mt-4" onClick={() => handleDelete()}>
        Delete Account
      </Button>
    </>
  );
}
