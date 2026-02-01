"use client";

import type { UserNote } from "../types";
import { cn } from "@/lib/utils";

interface UserDetailsNotesTabProps {
  notes: UserNote[];
  className?: string;
}

export function UserDetailsNotesTab({ notes, className }: UserDetailsNotesTabProps) {
  if (notes.length === 0) {
    return (
      <div
        className={cn(
          "rounded-xl border border-border bg-card p-12 text-center",
          className
        )}
      >
        <p className="text-sm text-muted-foreground">No notes yet.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Title
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr
                key={note.id}
                className="border-b border-border/50 transition-colors hover:bg-muted/20 last:border-b-0"
              >
                <td className="px-5 py-4 text-sm font-medium text-foreground">
                  {note.title}
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground tabular-nums">
                  {note.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
