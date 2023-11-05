import Link from "next/link";
import Logo from "./logo";
import { ModeToggle } from "../ui/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

export default function Header() {
  return (
    <header className="flex gap-8 justify-between p-4">
      <Logo />

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/posts" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle}>
                Blog
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
