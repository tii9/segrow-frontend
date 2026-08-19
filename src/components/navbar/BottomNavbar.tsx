"use client";

import {
  HomeIcon,
  LucideProps,
  PaperBag,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { cn } from "~/lib/utils";

type NavItem = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const navItems: NavItem[] = [
  {
    name: "Beranda",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Produk",
    href: "/products",
    icon: PaperBag,
  },
  {
    name: "Keranjang",
    href: "/cart",
    icon: ShoppingCartIcon,
  },
  {
    name: "Akun",
    href: "/account",
    icon: UserIcon,
  },
];

const BottomNavbar = () => {
  const path = usePathname();

  return (
    <div className="fixed bottom-0 left-1/2 flex w-full max-w-md -translate-x-1/2 items-center justify-center gap-12 bg-white px-8 py-2 shadow">
      {navItems.map((item, index) => {
        const isActive =
          item.href === "/" ? path === "/" : path.startsWith(item.href);

        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex w-18 flex-col items-center gap-1 text-xs",
              isActive ? "text-primary" : "text-[#5A5A66]",
            )}
          >
            {<item.icon />}
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavbar;
