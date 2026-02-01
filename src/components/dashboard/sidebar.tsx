"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Shield,
  BookOpen,
  FileText,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Admin Dashboard" },
  { href: "/admins", icon: Shield, label: "Admins" },
  { href: "/users", icon: Users, label: "Users" },
  { href: "/courses", icon: BookOpen, label: "Courses" },
  { href: "/notes", icon: FileText, label: "Notes" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-[240px] flex-col border-r border-border bg-card">
      <div className="border-b border-border px-5 py-5">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Flow
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">Admin</p>
      </div>
      <nav className="flex-1 space-y-0.5 p-3" aria-label="Main navigation">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive =
            href === "/dashboard"
              ? isDashboard
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-white dark:text-zinc-50"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon
                className="h-5 w-5 shrink-0"
                strokeWidth={1.75}
                aria-hidden
              />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
