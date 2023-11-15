"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./logo";
import BurgerMenu from "./burger";
import { AvatarMenu } from "./avatar-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu";

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

          <NavigationMenuItem className="pl-4">
            <AvatarMenu />
          </NavigationMenuItem>

          {/* <NavigationMenuItem>
            <BurgerMenu setBurgerOpen={setBurgerOpen} />
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
