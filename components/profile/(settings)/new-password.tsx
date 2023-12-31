import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Button } from "UI/button";
import NewPasswordForm from "./new-password-form";

export default function NewPassword({ needPassword = false }: { needPassword?: boolean }) {
  const [changePassForm, setChangePassForm] = useState<boolean>(false);

  const ButtonText = needPassword ? "Create Password" : "Change Password";
  return (
    <div className="flex flex-col items-start mt-4">
      {needPassword && (
        <div className="flex items-center gap-2 text-orange-400/90 text-lg mb-2">
          <ShieldAlert className="animate-bounce" />
          Create a password to login without 3rd-party
        </div>
      )}

      <div className="w-full flex items-center justify-between">
        <Button
          variant="secondary"
          size={changePassForm ? "sm" : "default"}
          onClick={() => setChangePassForm(v => !v)}
          className={`${changePassForm ? "order-1 mr-4" : ""}`}>
          {changePassForm ? "Cancel" : ButtonText}
        </Button>
        {changePassForm && <h3 className="px-4 py-2 text-sm font-semibold bg-secondary rounded-md transition-all block btnMimick">{ButtonText}</h3>}
      </div>

      <div className={`accordion-by-state ${changePassForm ? "open" : ""}`}>
        <hr className="w-full my-4" />
        <NewPasswordForm needPassword={needPassword} />
      </div>
    </div>
  );
}
