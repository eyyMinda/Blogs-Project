"use client";

import { useState } from "react";
import { AvatarIcon } from "../ui/avatar-icon";
import { Button } from "../ui/button";

export default function DisplayAvatar() {
  const [avatarHover, setAvatarHover] = useState<boolean>(false);

  return (
    <div className="relative rounded-full cursor-pointer" onMouseEnter={() => setAvatarHover(true)} onMouseLeave={() => setAvatarHover(false)}>
      <AvatarIcon variant="sm" />
      <div className={`absolute inset-0 rounded-full bg-black ${avatarHover ? "opacity-50 border-8" : "opacity-0"} duration-200 transition-all`}></div>
      <Button
        type="button"
        variant={"ghost"}
        className={`absolute top-2/3 left-1/2 -translate-x-1/2 transition-all duration-200 ${avatarHover ? "opacity-100 hover:bg-accent/70" : "opacity-0"}`}>
        Change Avatar
      </Button>
    </div>
  );
}
