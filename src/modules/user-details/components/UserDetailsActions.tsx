"use client";

import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserDetailsActionsProps {
  isBlocked?: boolean;
  onBlock?: () => void | Promise<void>;
  onUnblock?: () => void | Promise<void>;
  isLoading?: boolean;
  className?: string;
}

export function UserDetailsActions({
  isBlocked = false,
  onBlock,
  onUnblock,
  isLoading = false,
  className,
}: UserDetailsActionsProps) {
  const handleClick = () => {
    const fn = isBlocked ? onUnblock : onBlock;
    void Promise.resolve(fn?.());
  };

  return (
    <div className={cn("flex shrink-0 items-center gap-2", className)}>
      <Button
        type="button"
        variant={isBlocked ? "outline" : "destructive"}
        size="sm"
        onClick={handleClick}
        disabled={isLoading}
        className="min-h-[44px] rounded-lg sm:min-h-0 cursor-pointer"
      >
        <Ban className="mr-2 h-4 w-4 shrink-0" />
        {isLoading
          ? isBlocked
            ? "Unblocking…"
            : "Blocking…"
          : isBlocked
            ? "Unblock user"
            : "Block user"}
      </Button>
    </div>
  );
}
