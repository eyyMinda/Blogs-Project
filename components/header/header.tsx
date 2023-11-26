"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./logo";
import BurgerMenu from "./burger";
import { AvatarMenu } from "./avatar-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { Loader2, UserCircle2 } from "lucide-react";
import { ModeToggle } from "../ui/theme-toggle";
import { useSession } from "next-auth/react";

const navItems = [
  { path: "/", name: "Home" },
  { path: "/posts", name: "Posts" },
  { path: "/contact", name: "Contact" }
];

export default function Header() {
  const [burgerOpen, setBurgerOpen] = useState<Boolean>(false);
  const { data: session, status } = useSession();

  return (
    <header className="flex gap-8 justify-between p-4">
      <Logo />

      <NavigationMenu>
        <NavigationMenuList>
          {/* <div className={`flex-1 justify-self-center pb-3 mt-8 md:flex md:pb-0 md:mt-0 ${burgerOpen ? "block" : "hidden"}`}></div> */}
          {navItems.map(({ path, name }, index) => (
            <NavigationMenuItem key={index}>
              <Link href={path} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle}>{name}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}

          {status === "loading" ? (
            <Loader2 className="animate-spin" />
          ) : !session ? (
            <>
              <NavigationMenuItem>
                <ModeToggle />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={"/login"} legacyBehavior passHref>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle} gap-2`}>
                    <UserCircle2 />
                    Sign In
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </>
          ) : (
            <NavigationMenuItem className="pl-4">
              <AvatarMenu user={session.user} />
            </NavigationMenuItem>
          )}

          {/* <NavigationMenuItem>
            <BurgerMenu setBurgerOpen={setBurgerOpen} />
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
