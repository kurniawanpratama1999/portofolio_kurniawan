"use client";

import { Link } from "react-router";
import { Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

const NavList = () => {
  const list = [
    { to: '#home', label: 'Home' },
    { to: '#repo', label: 'Repo' },
  ];
  return list.map((v, k) =>
    <NavigationMenuItem key={v.label + '-' + k}>
      <NavigationMenuLink asChild>
        <Link to={v.to}>{v.label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>)
}

export default function MeNavigation() {
  return (
    <nav className="flex items-center justify-between">
      {/* DESKTOP MENU */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="space-x-4 ">
            <NavList />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-neutral-50">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent className="top-14">
            <SheetHeader className="hidden">
              <SheetTitle>Daftar Menu</SheetTitle>
              <SheetDescription>Portofolio masih dalam tahap pengerjaan!</SheetDescription>
            </SheetHeader>

            <NavigationMenu className="items-start pl-3" orientation="vertical" aria-orientation="vertical">
              <NavigationMenuList className="flex-col items-start">
                <NavList />
              </NavigationMenuList>
            </NavigationMenu>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
