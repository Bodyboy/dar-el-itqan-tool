"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Wrench, Settings } from "lucide-react";

const navItems = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/contacts", label: "Contacts", icon: Users },
  { href: "/outils", label: "Outils", icon: Wrench },
  { href: "/parametres", label: "Réglages", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass">
      <div className="flex items-center justify-around h-[70px] max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-all duration-200 ${
                isActive
                  ? "text-[#f9d423]"
                  : "text-[#999] dark:text-[#666] hover:text-[#555] dark:hover:text-[#aaa]"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
