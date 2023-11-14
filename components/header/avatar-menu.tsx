import Link from "next/link";
import { NavigationMenuContent, NavigationMenuLink, NavigationMenuTrigger } from "../ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function AvatarMenu({ navStyle }: { navStyle: string }) {
  return (
    <div className="w-[20%]">
      <NavigationMenuTrigger className={navStyle}>
        <Link href={"/login"} legacyBehavior passHref>
          <NavigationMenuLink>
            <Avatar>
              <AvatarImage src="/images/account/default-pic.png" alt="Profile" width={50} height={50} />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
          </NavigationMenuLink>
        </Link>
      </NavigationMenuTrigger>

      <NavigationMenuContent className="w-[20%]">
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-1">
          <li className="row-span-3">
            <Link href={"/login"} legacyBehavior passHref>
              <NavigationMenuLink className={navStyle}>Profile</NavigationMenuLink>
            </Link>
          </li>
          <li className="row-span-3">
            <Link href={"/login"} legacyBehavior passHref>
              <NavigationMenuLink className={navStyle}>Profile</NavigationMenuLink>
            </Link>
          </li>
        </ul>
      </NavigationMenuContent>
    </div>
  );
}
