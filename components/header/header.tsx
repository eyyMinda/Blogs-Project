"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./logo";
import BurgerMenu from "./burger";
import { ModeToggle } from "../ui/theme-toggle";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const navItems = [
  { path: "/", name: "Home" },
  { path: "/posts", name: "Posts" },
  { path: "/contact", name: "Contact" }
];

export default function Header() {
  const [burgerOpen, setBurgerOpen] = useState<Boolean>(false);

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

          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href={"/login"} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle}>
                <Avatar>
                  <AvatarImage src="/images/account/default-pic.png" alt="Profile" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {/* <NavigationMenuItem>
            <BurgerMenu setBurgerOpen={setBurgerOpen} />
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
