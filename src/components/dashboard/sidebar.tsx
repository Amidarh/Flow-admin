"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  X,
  BadgeDollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FlowLogo } from "@/assets/svg";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Admin Dashboard" },
  // { href: "/admins", icon: Shield, label: "Admins" },
  { href: "/users", icon: Users, label: "Users" },
  { href: "/courses", icon: BookOpen, label: "Courses" },
  { href: "/plans", icon: BadgeDollarSign, label: "Plans" },
  // { href: "/notes", icon: FileText, label: "Notes" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

function NavLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";
  return (
    <>
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive =
          href === "/dashboard"
            ? isDashboard
            : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            onClick={onLinkClick}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-white dark:text-zinc-50"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
            {label}
          </Link>
        );
      })}
    </>
  );
}

export function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar: hidden on mobile, fixed on lg+ */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-20 flex h-screen w-[240px] flex-col border-r border-border bg-card",
          "hidden lg:flex"
        )}
      >
        <div className="border-b border-border px-5 py-5">
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            <FlowLogo className="w-20 h-10" />
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">Admin</p>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3" aria-label="Main navigation">
          <NavLinks />
        </nav>
      </aside>

      {/* Mobile overlay + drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <button
            type="button"
            onClick={onClose}
            className="absolute inset-0 bg-black/50 transition-opacity"
            aria-label="Close menu"
          />
          {/* Drawer panel */}
          <aside
            className={cn(
              "absolute left-0 top-0 z-10 flex h-full w-[280px] max-w-[85vw] flex-col border-r border-border bg-card shadow-xl",
              "animate-in slide-in-from-left-5 duration-200"
            )}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <div>
                <h2 className="text-base font-semibold tracking-tight text-foreground">
                  Flow
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Admin</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-9 w-9 shrink-0 rounded-lg"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 space-y-0.5 overflow-y-auto p-3" aria-label="Main navigation">
              <NavLinks onLinkClick={onClose} />
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
