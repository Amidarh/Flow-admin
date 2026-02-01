"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Ban, CheckCircle } from "lucide-react";
import type { CourseListItem, CourseType } from "../types";
import { cn } from "@/lib/utils";

interface CoursesTableProps {
  courses: CourseListItem[];
  onDisable?: (course: CourseListItem) => void;
  onDelete?: (course: CourseListItem) => void;
  className?: string;
}

const TABLE_HEADERS = [
  { key: "title", label: "Course title" },
  { key: "userEmail", label: "User email" },
  { key: "createdAt", label: "Created at" },
  { key: "courseType", label: "Course type" },
  { key: "actions", label: "Action" },
] as const;

export function CoursesTable({
  courses,
  onDisable,
  onDelete,
  className,
}: CoursesTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {TABLE_HEADERS.map(({ key, label }) => (
                <th
                  key={key}
                  className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <CoursesTableRow
                key={course.id}
                course={course}
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

interface CoursesTableRowProps {
  course: CourseListItem;
  onDisable?: (course: CourseListItem) => void;
  onDelete?: (course: CourseListItem) => void;
}

function CoursesTableRow({
  course,
  onDisable,
  onDelete,
}: CoursesTableRowProps) {
  const typeLabel: Record<CourseType, string> = {
    standard: "Standard",
    flexible: "Flexible",
  };

  return (
    <tr className="border-b border-border/50 transition-colors hover:bg-muted/20 last:border-b-0">
      <td className="px-5 py-4 text-sm font-medium text-foreground">
        {course.title}
      </td>
      <td className="px-5 py-4 text-sm text-muted-foreground">
        {course.userEmail}
      </td>
      <td className="px-5 py-4 text-sm text-muted-foreground tabular-nums">
        {course.createdAt}
      </td>
      <td className="px-5 py-4">
        <span
          className={cn(
            "inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize",
            course.courseType === "standard"
              ? "bg-primary/20 text-primary dark:text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          {typeLabel[course.courseType]}
        </span>
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onDisable?.(course)}
            className="h-8 gap-1.5 px-2.5 text-muted-foreground hover:text-foreground"
            aria-label={course.isDisabled ? "Enable course" : "Disable course"}
          >
            {course.isDisabled ? (
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
            onClick={() => onDelete?.(course)}
            className="h-8 gap-1.5 px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
            aria-label="Delete course"
          >
            <Trash2 className="h-4 w-4 shrink-0" />
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}
