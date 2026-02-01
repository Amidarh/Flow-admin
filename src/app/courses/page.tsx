"use client";

import { useState } from "react";
import {
  CoursesPageHeader,
  CoursesTable,
  CourseConfirmModal,
} from "@/modules/courses";
import type { CourseListItem } from "@/modules/courses";

const MOCK_COURSES: CourseListItem[] = [
  { id: "1", title: "Introduction to React", userEmail: "john@gmail.com", createdAt: "15-12-2025", courseType: "standard", isDisabled: false },
  { id: "2", title: "Advanced TypeScript", userEmail: "sarah.smith@email.com", createdAt: "18-12-2025", courseType: "standard", isDisabled: false },
  { id: "3", title: "Design Systems", userEmail: "alex.j@company.com", createdAt: "20-12-2025", courseType: "flexible", isDisabled: false },
  { id: "4", title: "Node.js Backend", userEmail: "emma.wilson@gmail.com", createdAt: "5-1-2026", courseType: "standard", isDisabled: true },
  { id: "5", title: "API Design", userEmail: "mbrown@outlook.com", createdAt: "8-1-2026", courseType: "flexible", isDisabled: false },
  { id: "6", title: "State Management", userEmail: "lisa.a@yahoo.com", createdAt: "10-1-2026", courseType: "standard", isDisabled: false },
  { id: "7", title: "Testing & QA", userEmail: "david.lee@mail.com", createdAt: "12-1-2026", courseType: "flexible", isDisabled: false },
  { id: "8", title: "DevOps Basics", userEmail: "rachel.g@example.com", createdAt: "15-1-2026", courseType: "standard", isDisabled: false },
  { id: "9", title: "Security Fundamentals", userEmail: "ikechukwudelightemmanuel@gmail.com", createdAt: "20-1-2026", courseType: "standard", isDisabled: false },
  { id: "10", title: "Performance Optimization", userEmail: "melinda@example.com", createdAt: "25-1-2026", courseType: "flexible", isDisabled: false },
];

type PendingAction = { type: "delete"; course: CourseListItem } | { type: "disable"; course: CourseListItem } | null;

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseListItem[]>(MOCK_COURSES);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const handleDisable = (course: CourseListItem) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === course.id ? { ...c, isDisabled: !c.isDisabled } : c
      )
    );
  };

  const handleDelete = (course: CourseListItem) => {
    setCourses((prev) => prev.filter((c) => c.id !== course.id));
  };

  const openDeleteModal = (course: CourseListItem) => {
    setPendingAction({ type: "delete", course });
  };

  const openDisableModal = (course: CourseListItem) => {
    setPendingAction({ type: "disable", course });
  };

  const handleConfirmDelete = () => {
    if (pendingAction?.type === "delete") {
      handleDelete(pendingAction.course);
      setPendingAction(null);
    }
  };

  const handleConfirmDisable = () => {
    if (pendingAction?.type === "disable") {
      handleDisable(pendingAction.course);
      setPendingAction(null);
    }
  };

  return (
    <div className="space-y-6">
      <CoursesPageHeader />
      <CoursesTable
        courses={courses}
        onDisable={openDisableModal}
        onDelete={openDeleteModal}
      />

      {pendingAction?.type === "delete" && (
        <CourseConfirmModal
          open={true}
          onOpenChange={(open) => !open && setPendingAction(null)}
          title="Delete course"
          description={`Are you sure you want to delete this course? "${pendingAction.course.title}" will be permanently removed.`}
          confirmLabel="Delete"
          variant="destructive"
          onConfirm={handleConfirmDelete}
        />
      )}

      {pendingAction?.type === "disable" && (
        <CourseConfirmModal
          open={true}
          onOpenChange={(open) => !open && setPendingAction(null)}
          title={pendingAction.course.isDisabled ? "Enable course" : "Disable course"}
          description={
            pendingAction.course.isDisabled
              ? `Are you sure you want to enable "${pendingAction.course.title}"? Users will be able to access it again.`
              : `Are you sure you want to disable "${pendingAction.course.title}"? Users will no longer be able to access it.`
          }
          confirmLabel={pendingAction.course.isDisabled ? "Enable" : "Disable"}
          variant="default"
          onConfirm={handleConfirmDisable}
        />
      )}
    </div>
  );
}
