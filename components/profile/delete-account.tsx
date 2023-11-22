"use client";
import { Button } from "../ui/button";

export default function DeleteAccount({ email }: { email: string | null }) {
  const handleDelete = async () => {
    if (window.confirm("Ae you sure you want to delete your account?")) {
      const res = await fetch("/api/account/delete", {
        method: "DELETE",
        body: JSON.stringify(email)
      });
      // const {err, msg} = res.json();
    } else {
      return;
    }
  };
  return (
    <Button variant="destructive" className="mt-40" onClick={() => handleDelete()}>
      Delete Account
    </Button>
  );
}
