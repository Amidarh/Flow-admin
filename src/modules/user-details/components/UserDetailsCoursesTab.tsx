"use client";

import { UserCourse } from "@/types";
import { cn } from "@/lib/utils";
import moment from "moment";

interface UserDetailsCoursesTabProps {
  courses: UserCourse[];
  className?: string;
}

export function UserDetailsCoursesTab({ courses, className }: UserDetailsCoursesTabProps) {
  if (courses.length === 0) {
    return (
      <div
        className={cn(
          "rounded-xl border border-border bg-card p-12 text-center",
          className
        )}
      >
        <p className="text-sm text-muted-foreground">No courses enrolled.</p>
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
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Course
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Type
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Progress
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Enrolled
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course._id}
                className="border-b border-border/50 transition-colors hover:bg-muted/20 last:border-b-0"
              >
                <td className="px-5 py-4 text-sm font-medium text-foreground">
                  {course.title}
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground capitalize">
                  {course.courseType}
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground tabular-nums">
                  {course.status}%
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground tabular-nums">
                  {moment(course.createdAt).fromNow()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
