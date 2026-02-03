"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, RefreshCw, Settings, LogOut, Sun, Moon, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useLogoutService } from "@/hooks/auth/logout";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { logout, isLoading } = useLogoutService();
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const handleLogout = () => {
    // TODO: invalidate session / clear tokens
    logout();
    router.push("/login");
  };

  return (
    <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 py-2.5 sm:px-6 lg:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {onMenuClick && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="h-9 w-9 shrink-0 rounded-lg lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <h1 className="truncate text-base font-semibold tracking-tight text-foreground sm:text-lg">
          Dashboard
        </h1>
      </div>
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 rounded-lg"
          aria-label="Refresh"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="ml-1 flex h-auto shrink-0 items-center gap-2 rounded-lg border-l border-border py-1.5 pl-2 sm:pl-3"
              aria-label="Account menu"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground"
                aria-hidden
              >
                A
              </div>
              <span className="hidden truncate text-sm text-muted-foreground sm:inline">
                Admin
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onSelect={(e: Event) => {
                e.preventDefault();
                if (mounted) setTheme(isDark ? "light" : "dark");
              }}
              className="cursor-pointer"
            >
              {mounted ? (
                <>
                  {isDark ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                  <span>{isDark ? "Light mode" : "Dark mode"}</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  <span className="text-muted-foreground">Theme</span>
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex cursor-pointer items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={handleLogout}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Log out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
