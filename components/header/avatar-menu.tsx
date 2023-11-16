import { AvatarIcon } from "./avatar-icon";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LogOut } from "lucide-react";

export function AvatarMenu() {
  return (
    <Popover>
      <PopoverTrigger>
        <AvatarIcon variant="mini" />
      </PopoverTrigger>
      <PopoverContent className="p-0 mt-2 mr-4">
        <header id="menu-header" className="flex items-end gap-4 px-4 py-6 border-b-2">
          <AvatarIcon />
          <div className="text-sm">
            <h2>Common Name</h2>
            <Button variant="link" className="h-auto p-0 m-0">
              <Link href={"/profile"}>View your profile</Link>
            </Button>
          </div>
        </header>

        <div id="menu-container" className="flex flex-col gap-1 py-6">
          <ModeToggle className="bg-transparent border-none" />
          <Button variant="outline" size="lg" className="w-full bg-transparent border-none">
            <Link href={"/profile"}>Profile</Link>
          </Button>
          <Button variant="outline" size="lg" className="w-full bg-transparent border-none">
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button className="flex w-full gap-2 mt-4 text-black bg-transparent border-none dark:text-white">
            <LogOut />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
