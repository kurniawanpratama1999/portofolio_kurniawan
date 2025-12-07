"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";

const NavList = () => {
  const list = [
    { to: '#home', label: 'Home' },
    { to: '#repo', label: 'Repo' },
  ];
  return list.map((v, k) =>
    <NavigationMenuItem key={v.label + '-' + k}>
      <NavigationMenuLink asChild>
        <a href={v.to}>{v.label}</a>
      </NavigationMenuLink>
    </NavigationMenuItem>)
}

export default function MeNavigation() {
  return (
    <nav className="flex items-center justify-between">
      <div>
        <NavigationMenu>
          <NavigationMenuList className="space-x-4 ">
            <NavList />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
