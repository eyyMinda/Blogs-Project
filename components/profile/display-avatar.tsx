"use client";
import { useState } from "react";
import { AvatarIcon } from "../ui/custom-ui/avatar-icon";
import { defaultUserImg } from "@/lib/locale/default-user";

const prePath = "/images/account/remix-rumble-avatars/";

export default function DisplayAvatar({ image }: { image: string | null | undefined }) {
  const [avatarHover, setAvatarHover] = useState<boolean>(false);
  if (image?.startsWith("remix")) image = prePath + image;

  return (
    <div className="relative rounded-full cursor-pointer" onMouseEnter={() => setAvatarHover(true)} onMouseLeave={() => setAvatarHover(false)}>
      <AvatarIcon variant="sm" path={image || defaultUserImg} />
      <div className={`absolute inset-0 rounded-full bg-black opacity-0 border-8 ${avatarHover && "opacity-50"} transition-all duration-200`}></div>
      <div
        className={`absolute rounded-lg w-max py-2 px-4 top-2/3 left-1/2 -translate-x-1/2 transition-all duration-200 opacity-0 ${
          avatarHover && "opacity-100 hover:bg-accent/70"
        }`}>
        Change Avatar
      </div>
    </div>
  );
}
