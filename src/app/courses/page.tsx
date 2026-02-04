"use client";

import { useState, useCallback } from "react";
import {
  CoursesPageHeader,
  CoursesTable,
  CourseConfirmModal,
  CoursesSkeleton,
  CoursesPagination,
} from "@/modules/courses";
import type { CourseListItem } from "@/modules/courses";
import { useCoursesService } from "@/modules/courses/services";

const PER_PAGE = 10;

type PendingAction =
  | { type: "delete"; course: CourseListItem }
  | { type: "disable"; course: CourseListItem }
  | null;

export default function CoursesPage() {
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [page, setPage] = useState(1);
  const {
    data: courses,
    pagination,
    isLoading,
    error,
    disableCourse,
    deleteCourse,
  } = useCoursesService({ page, limit: PER_PAGE });

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const openDeleteModal = (course: CourseListItem) => {
    setPendingAction({ type: "delete", course });
  };

  const openDisableModal = (course: CourseListItem) => {
    setPendingAction({ type: "disable", course });
  };

  const handleConfirmDelete = async () => {
    if (pendingAction?.type !== "delete") return;
    setActionLoading(true);
    try {
      await deleteCourse(pendingAction.course.id);
      setPendingAction(null);
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmDisable = async () => {
    if (pendingAction?.type !== "disable") return;
    setActionLoading(true);
    try {
      await disableCourse(
        pendingAction.course.id,
        !pendingAction.course.isDisabled
      );
      setPendingAction(null);
    } finally {
      setActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-in fade-in-0 duration-200">
        <CoursesSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <CoursesPageHeader />
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-4 text-sm text-destructive">
          Failed to load courses. Please try again later.
        </div>
      </div>
    );
  }

  const { total } = pagination;

  return (
    <div className="space-y-6">
      <CoursesPageHeader />
      <CoursesTable
        courses={courses}
        onDisable={openDisableModal}
        onDelete={openDeleteModal}
      />
      <CoursesPagination
        page={page}
        perPage={PER_PAGE}
        total={total}
        onPageChange={handlePageChange}
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
          isLoading={actionLoading}
        />
      )}

      {pendingAction?.type === "disable" && (
        <CourseConfirmModal
          open={true}
          onOpenChange={(open) => !open && setPendingAction(null)}
          title={
            pendingAction.course.isDisabled ? "Enable course" : "Disable course"
          }
          description={
            pendingAction.course.isDisabled
              ? `Are you sure you want to enable "${pendingAction.course.title}"? Users will be able to access it again.`
              : `Are you sure you want to disable "${pendingAction.course.title}"? Users will no longer be able to access it.`
          }
          confirmLabel={pendingAction.course.isDisabled ? "Enable" : "Disable"}
          variant="default"
          onConfirm={handleConfirmDisable}
          isLoading={actionLoading}
        />
      )}
    </div>
  );
}
