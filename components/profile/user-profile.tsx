"use client";
import { IUser } from "@/nextauth";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { timeAgo } from "@/lib/utils";
import NewPasswordForm from "./new-password";
import DisplayAvatar from "./display-avatar";
import ChooseAvatar from "./choose-avatar";
import DeleteAccount from "./delete-account";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

function UserProfile({ avatars }: { avatars: string[] }) {
  const [changePassForm, setChangePassForm] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <Loader2 className="animate-spin" />;
  } else if (!session) {
    router.replace("/");
    router.refresh();
    return;
  }
  const { image, name, email, createdAt, needPassword } = session?.user as IUser;
  let formattedDate;
  if (createdAt) formattedDate = timeAgo(createdAt);

  const handleChangePassForm = () => {
    setChangePassForm(v => !v);
  };

  return (
    <section className="mx-auto my-8 px-8 text-center">
      <header className="flex flex-col items-center gap-3 mb-10">
        <Popover>
          <PopoverTrigger>
            <DisplayAvatar image={image} />
          </PopoverTrigger>

          <PopoverContent className="w-[90vw] md:w-[40rem] -translate-y-56 md:-translate-y-72">
            <ChooseAvatar avatars={avatars} />
          </PopoverContent>
        </Popover>

        <h1 className="text-3xl">{name}</h1>
        {formattedDate && <p className="text-gray-500">Joined {formattedDate}</p>}
      </header>

      <div className="flex flex-col items-start">
        {needPassword && (
          <div className="flex items-center gap-2 text-orange-400/90 text-lg">
            <ShieldAlert className="animate-bounce" />
            Create a password to login without 3rd-party
          </div>
        )}
        <hr className="w-full my-4" />
        <div className="w-full flex items-center justify-between">
          <Button
            variant="secondary"
            size={changePassForm ? "sm" : "default"}
            onClick={handleChangePassForm}
            className={`${changePassForm ? "order-1 mr-4" : ""}`}>
            {changePassForm ? "Cancel" : "Change Password"}
          </Button>
          {changePassForm && <h3 className="px-4 py-2 text-sm font-semibold bg-secondary rounded-md transition-all block btnMimick">Change Password</h3>}
        </div>

        <div className={`accordion-by-state ${changePassForm ? "open" : ""}`}>
          <hr className="w-full my-4" />
          <NewPasswordForm needPassword={needPassword} />
        </div>
      </div>

      <DeleteAccount email={email} />
    </section>
  );
}

export default UserProfile;
