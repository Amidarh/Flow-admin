export type CourseType = "standard" | "flexible";

export interface CourseListItem {
  id: string;
  title: string;
  user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  createdAt: string;
  courseType: CourseType;
  isDisabled?: boolean;
}
