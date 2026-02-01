export type CourseType = "standard" | "flexible";

export interface CourseListItem {
  id: string;
  title: string;
  userEmail: string;
  createdAt: string;
  courseType: CourseType;
  isDisabled?: boolean;
}
