"use client";

import { useState } from "react";
import {
  NotesPageHeader,
  NotesTable,
  NoteConfirmModal,
} from "@/modules/notes";
import type { NoteListItem } from "@/modules/notes";

const MOCK_NOTES: NoteListItem[] = [
  { id: "1", title: "Introduction notes", userEmail: "john@gmail.com", createdAt: "15-12-2025", isDisabled: false },
  { id: "2", title: "Week 1 summary", userEmail: "sarah.smith@email.com", createdAt: "18-12-2025", isDisabled: false },
  { id: "3", title: "Key concepts", userEmail: "alex.j@company.com", createdAt: "20-12-2025", isDisabled: false },
  { id: "4", title: "Meeting notes", userEmail: "emma.wilson@gmail.com", createdAt: "5-1-2026", isDisabled: true },
  { id: "5", title: "Project ideas", userEmail: "mbrown@outlook.com", createdAt: "8-1-2026", isDisabled: false },
  { id: "6", title: "Study guide", userEmail: "lisa.a@yahoo.com", createdAt: "10-1-2026", isDisabled: false },
  { id: "7", title: "Review checklist", userEmail: "david.lee@mail.com", createdAt: "12-1-2026", isDisabled: false },
  { id: "8", title: "Action items", userEmail: "rachel.g@example.com", createdAt: "15-1-2026", isDisabled: false },
  { id: "9", title: "Resources list", userEmail: "ikechukwudelightemmanuel@gmail.com", createdAt: "20-1-2026", isDisabled: false },
  { id: "10", title: "Follow-up tasks", userEmail: "melinda@example.com", createdAt: "25-1-2026", isDisabled: false },
];

type PendingAction = { type: "delete"; note: NoteListItem } | { type: "disable"; note: NoteListItem } | null;

export default function NotesPage() {
  const [notes, setNotes] = useState<NoteListItem[]>(MOCK_NOTES);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const handleDisable = (note: NoteListItem) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === note.id ? { ...n, isDisabled: !n.isDisabled } : n
      )
    );
  };

  const handleDelete = (note: NoteListItem) => {
    setNotes((prev) => prev.filter((n) => n.id !== note.id));
  };

  const openDeleteModal = (note: NoteListItem) => {
    setPendingAction({ type: "delete", note });
  };

  const openDisableModal = (note: NoteListItem) => {
    setPendingAction({ type: "disable", note });
  };

  const handleConfirmDelete = () => {
    if (pendingAction?.type === "delete") {
      handleDelete(pendingAction.note);
      setPendingAction(null);
    }
  };

  const handleConfirmDisable = () => {
    if (pendingAction?.type === "disable") {
      handleDisable(pendingAction.note);
      setPendingAction(null);
    }
  };

  return (
    <div className="space-y-6">
      <NotesPageHeader />
      <NotesTable
        notes={notes}
        onDisable={openDisableModal}
        onDelete={openDeleteModal}
      />

      {pendingAction?.type === "delete" && (
        <NoteConfirmModal
          open={true}
          onOpenChange={(open) => !open && setPendingAction(null)}
          title="Delete note"
          description={`Are you sure you want to delete this note? "${pendingAction.note.title}" will be permanently removed.`}
          confirmLabel="Delete"
          variant="destructive"
          onConfirm={handleConfirmDelete}
        />
      )}

      {pendingAction?.type === "disable" && (
        <NoteConfirmModal
          open={true}
          onOpenChange={(open) => !open && setPendingAction(null)}
          title={pendingAction.note.isDisabled ? "Enable note" : "Disable note"}
          description={
            pendingAction.note.isDisabled
              ? `Are you sure you want to enable "${pendingAction.note.title}"? It will be visible again.`
              : `Are you sure you want to disable "${pendingAction.note.title}"? It will no longer be visible.`
          }
          confirmLabel={pendingAction.note.isDisabled ? "Enable" : "Disable"}
          variant="default"
          onConfirm={handleConfirmDisable}
        />
      )}
    </div>
  );
}
