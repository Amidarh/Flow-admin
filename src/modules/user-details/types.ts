export interface UserDetailsStats {
  notesCount: number;
  standardCoursesCount: number;
  flexibleCoursesCount: number;
  totalCourses: number;
}

export interface UserDetails {
  id: string;
  name: string;
  email: string;
  country: string | null;
  joined: string;
  role?: string;
  status?: string;
  lastActive?: string;
  isBlocked?: boolean;
  stats: UserDetailsStats;
}

export interface UserNote {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface UserCourse {
  id: string;
  title: string;
  type: "standard" | "flexible";
  progress: number;
  enrolledAt: string;
}
