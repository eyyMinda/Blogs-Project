import Link from "next/link";
import Logo from "./logo";
import { ModeToggle } from "../ui/theme-toggle";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const navItems = [
  { path: "/", name: "Home" },
  { path: "/posts", name: "Posts" },
  { path: "/contact", name: "Contact" }
];

export default function Header() {
  return (
    <header className="flex gap-8 justify-between p-4">
      <Logo />

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>

          {navItems.map(({ path, name }, index) => (
            <NavigationMenuItem key={index}>
              <Link href={path} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle}>{name}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}

          <NavigationMenuItem>
            <Link href={"/Login"} legacyBehavior passHref>
              <Avatar>
                <AvatarImage src="/images/account/default-pic.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
