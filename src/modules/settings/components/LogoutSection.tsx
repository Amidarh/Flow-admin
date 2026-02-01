"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut } from "lucide-react";

interface LogoutSectionProps {
  onLogout?: () => Promise<void> | void;
  className?: string;
}

export function LogoutSection({ onLogout, className }: LogoutSectionProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await onLogout?.();
      router.push("/login");
    } catch {
      setIsLoggingOut(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Sign out</CardTitle>
        <CardDescription>
          Sign out of the admin site. You will need to sign in again to access the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          type="button"
          variant="outline"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {isLoggingOut ? "Signing out…" : "Sign out"}
        </Button>
      </CardContent>
    </Card>
  );
}
