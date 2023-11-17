"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { PopoverClose } from "@radix-ui/react-popover";
import { Loader2, X } from "lucide-react";

const prePath = "/images/account/remix-rumble-avatars/";

export default function ChooseAvatar({ images }: { images: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const popoverCloseRef = useRef<HTMLButtonElement>(null);

  const closePopover = () => popoverCloseRef.current?.click();

  function handleChooseAvatar() {
    setIsLoading(true);
    console.log(selected);
    // update slected avatar to db ==>> profile data
    setTimeout(() => {
      setIsLoading(false);
      // Send notification
      closePopover();
    }, 2000);
  }

  return (
    <section className="flex flex-col mx-4">
      <PopoverClose ref={popoverCloseRef} title="close" className="self-end px-3 mb-2 rounded-md w-min hover:bg-accent hover:text-accent-foreground h-9">
        <X />
      </PopoverClose>

      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 mb-8 border-4 py-2 max-h-[30rem] overflow-y-scroll">
        {images?.map((img, i) => {
          const fullPath = prePath + img;
          const isSelected = selected === fullPath;
          return (
            <div key={i} className={`relative ${isSelected ? "border-4 border-white" : "border-2 border-gray-500"} hover:border-gray-300 w-30 h-30`}>
              <input
                type="checkbox"
                name={img}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onClick={() => setSelected(prev => (prev === fullPath ? null : fullPath))}
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
