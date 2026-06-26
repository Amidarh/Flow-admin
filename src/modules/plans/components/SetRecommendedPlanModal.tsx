"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface SetRecommendedPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
}

export function SetRecommendedPlanModal({
  open,
  onOpenChange,
  planName,
  onConfirm,
  isLoading = false,
}: SetRecommendedPlanModalProps) {
  const handleConfirm = async () => {
    try {
      await Promise.resolve(onConfirm());
      onOpenChange(false);
    } catch {
      // Error handled by caller (toast); keep modal open
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!isLoading) onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sparkles className="h-4 w-4" />
            </span>
            Set as recommended plan
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            <strong className="text-foreground">&quot;{planName}&quot;</strong> will be
            featured to users as the recommended plan. This is independent of which
            plan new signups get by default. You can change this anytime. Continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Updating…" : "Set as recommended"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
