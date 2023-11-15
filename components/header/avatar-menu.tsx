import { AvatarIcon } from "./avatar-icon";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function AvatarMenu() {
  return (
    <Popover>
      <PopoverTrigger>
        <AvatarIcon />
      </PopoverTrigger>
      <PopoverContent className="p-0 mt-2 mr-4">
        <header className="flex items-end gap-4 px-4 py-6 border-b-2">
          <AvatarIcon />
          <div className="text-sm">
            <h2>Common Name</h2>
            <Button variant="link" className="p-0 m-0 h-auto">
              <Link href={"/profile"}>View your profile</Link>
            </Button>
          </div>
        </header>

        <div className="flex flex-col gap-1 py-6">
          <ModeToggle className="bg-transparent border-none" />
          <Button variant="outline" size="lg" className="w-full bg-transparent border-none">
            <Link href={"/profile"}>Profile</Link>
          </Button>
          <Button variant="outline" size="lg" className="w-full bg-transparent border-none">
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button className="w-full bg-transparent border-none mt-4">Logout</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
