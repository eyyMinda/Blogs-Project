"use client";

import Image from "next/image";
import { Button } from "../../ui/button";
import { useContext, useRef, useState } from "react";
import { PopoverClose } from "@radix-ui/react-popover";
import { Loader2, X } from "lucide-react";
import NotificationContext from "@/lib/context/notification-context";
import defaultNotification from "@/lib/locale/default-notification";
import { useSession } from "next-auth/react";

const prePath = "/images/account/remix-rumble-avatars/";

export default function ChooseAvatar({ avatars, email }: { avatars: string[]; email?: string | null }) {
  const notifCtx = useContext(NotificationContext);
  const { update } = useSession();
  const [selected, setSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const popoverCloseRef = useRef<HTMLButtonElement>(null);
  const closePopover = () => popoverCloseRef.current?.click();

  const handleChooseAvatar = async () => {
    setIsLoading(true);
    notifCtx.setNotification(defaultNotification.changeavatar.pending);

    const res = await fetch("/api/account/update", {
      method: "POST",
      body: JSON.stringify({ email, image: selected })
    });
    const { err, msg } = await res.json();
    if (!err) {
      await update({ picture: selected });
      update();
    }
    notifCtx.setNotification(defaultNotification.changeavatar[err ? "error" : "success"](msg));
    setIsLoading(false);
    closePopover();
  };

  return (
    <section className="flex flex-col mx-4">
      <PopoverClose ref={popoverCloseRef} title="close" className="self-end px-3 mb-2 rounded-md w-min hover:bg-accent hover:text-accent-foreground h-9">
        <X />
      </PopoverClose>

      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 mb-8 border-4 py-2 max-h-[30rem] overflow-y-scroll">
        {avatars?.map((img, i) => {
          const fullPath = prePath + img;
          const isSelected = selected === img;
          return (
            <div key={img} className={`relative ${isSelected ? "border-4 border-white" : "border-2 border-gray-500"} hover:border-gray-300 w-30 h-30`}>
              <input
                type="checkbox"
                name={img}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onClick={() => setSelected(prev => (prev === img ? null : img))}
              />
              <Image src={fullPath} alt={img} width={100} height={100} className="w-full h-auto" />
            </div>
          );
        })}
      </div>

      <Button type="button" variant="secondary" className="hover:bg-title" onClick={handleChooseAvatar} disabled={!selected || isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : "Choose Avatar"}
      </Button>
    </section>
  );
}
