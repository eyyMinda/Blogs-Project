import Link from "next/link";
import { NavigationMenuContent, NavigationMenuLink, NavigationMenuTrigger } from "../ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export function AvatarMenu({ navStyle }: { navStyle: string }) {
  return (
    <div className="flex">
      <NavigationMenuTrigger className={navStyle}>
        <Link href={"/profile"} legacyBehavior passHref>
          <NavigationMenuLink>
            <Avatar>
              <AvatarImage src="/images/account/default-pic.png" alt="Profile" width={50} height={50} />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
          </NavigationMenuLink>
        </Link>
      </NavigationMenuTrigger>

      <NavigationMenuContent className="">
        <ul className="grid gap-3 p-6 w-[200px] lg:w-[370px] grid-cols-1 place-items-center">
          <li className="row-span-3">
            <Link href={"/profile"} legacyBehavior passHref>
              <NavigationMenuLink className={navStyle}>Profile</NavigationMenuLink>
            </Link>
          </li>
          <li className="row-span-3">
            <Link href={"/login"} legacyBehavior passHref>
              <NavigationMenuLink className={navStyle}>Login</NavigationMenuLink>
            </Link>
          </li>
          <li className="row-span-3">
            <Button>Logout</Button>
          </li>
        </ul>
      </NavigationMenuContent>
    </div>
  );
}
