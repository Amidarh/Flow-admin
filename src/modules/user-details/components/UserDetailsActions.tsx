"use client";

import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserDetailsActionsProps {
  isBlocked?: boolean;
  onBlock?: () => void;
  onUnblock?: () => void;
  className?: string;
}

export function UserDetailsActions({
  isBlocked = false,
  onBlock,
  onUnblock,
  className,
}: UserDetailsActionsProps) {
  const handleClick = isBlocked ? onUnblock : onBlock;

  return (
    <div className={cn("flex shrink-0 items-center gap-2", className)}>
      <Button
        type="button"
        variant={isBlocked ? "outline" : "destructive"}
        size="sm"
        onClick={handleClick}
        className="rounded-lg"
      >
        <Ban className="mr-2 h-4 w-4 shrink-0" />
        {isBlocked ? "Unblock user" : "Block user"}
      </Button>
    </div>
  );
}
