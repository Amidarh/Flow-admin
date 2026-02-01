"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Ban, CheckCircle } from "lucide-react";
import type { NoteListItem } from "../types";
import { cn } from "@/lib/utils";

interface NotesTableProps {
  notes: NoteListItem[];
  onDisable?: (note: NoteListItem) => void;
  onDelete?: (note: NoteListItem) => void;
  className?: string;
}

const TABLE_HEADERS = [
  { key: "title", label: "Note title" },
  { key: "userEmail", label: "User email" },
  { key: "createdAt", label: "Created at" },
  { key: "actions", label: "Action" },
] as const;

export function NotesTable({
  notes,
  onDisable,
  onDelete,
  className,
}: NotesTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        className
      )}
    >
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {TABLE_HEADERS.map(({ key, label }) => (
                <th
                  key={key}
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:px-5"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <NotesTableRow
                key={note.id}
                note={note}
                onDisable={onDisable}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface NotesTableRowProps {
  note: NoteListItem;
  onDisable?: (note: NoteListItem) => void;
  onDelete?: (note: NoteListItem) => void;
}

function NotesTableRow({
  note,
  onDisable,
  onDelete,
}: NotesTableRowProps) {
  return (
    <tr className="border-b border-border/50 transition-colors hover:bg-muted/20 last:border-b-0">
      <td className="px-5 py-4 text-sm font-medium text-foreground">
        {note.title}
      </td>
      <td className="px-5 py-4 text-sm text-muted-foreground">
        {note.userEmail}
      </td>
      <td className="px-5 py-4 text-sm text-muted-foreground tabular-nums">
        {note.createdAt}
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onDisable?.(note)}
            className="h-8 gap-1.5 px-2.5 text-muted-foreground hover:text-foreground"
            aria-label={note.isDisabled ? "Enable note" : "Disable note"}
          >
            {note.isDisabled ? (
              <>
                <CheckCircle className="h-4 w-4 shrink-0" />
                Enable
              </>
            ) : (
              <>
                <Ban className="h-4 w-4 shrink-0" />
                Disable
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onDelete?.(note)}
            className="h-9 min-h-[44px] gap-1.5 px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive sm:h-8 sm:min-h-0"
            aria-label="Delete note"
          >
            <Trash2 className="h-4 w-4 shrink-0" />
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}
