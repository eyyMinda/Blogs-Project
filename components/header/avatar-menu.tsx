"use client";

import { AvatarIcon } from "../ui/custom-ui/avatar-icon";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function AvatarMenu({ user }: { user?: User }) {
  return (
    <Popover>
      <PopoverTrigger>
        <AvatarIcon variant="mini" path={user?.image || undefined} />
      </PopoverTrigger>
      <PopoverContent className="p-0 mt-2 mr-4">
        <header id="menu-header" className="flex items-end gap-4 px-4 py-6 border-b-2">
          <AvatarIcon path={user?.image || undefined} />
          <div className="text-sm">
            <h2>{user?.name || "User Name"}</h2>
            <Link href={"/profile"}>
              <Button variant="link" className="h-auto p-0 m-0">
                View your profile
              </Button>
            </Link>
          </div>
        </header>

        <div id="menu-container" className="flex flex-col gap-1 py-6">
          <Link href={"/profile"}>
            <Button variant="outline" size="lg" className="w-full bg-transparent border-none">
              Profile
            </Button>
          </Link>
          <ModeToggle variant="large" className="bg-transparent border-none" />
          <Button onClick={() => signOut()} className="flex w-full gap-2 mt-4 text-black bg-transparent border-none dark:text-white">
            <LogOut />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
