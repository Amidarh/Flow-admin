import { notFound } from "next/navigation";
import { UserDetailsView } from "@/modules/user-details";
import type { UserDetails, UserNote, UserCourse } from "@/modules/user-details";

const SEED: Omit<UserDetails, "id">[] = [
  {
    name: "Delight Emmanuel",
    email: "ikechukwudelightemmanuel@gmail.com",
    country: "Nigeria",
    joined: "31-1-2026",
    role: "User",
    status: "Active",
    lastActive: "Jan 31, 2026",
    isBlocked: false,
    stats: {
      notesCount: 12,
      standardCoursesCount: 3,
      flexibleCoursesCount: 2,
      totalCourses: 5,
    },
  },
  {
    name: "John Doe",
    email: "john@gmail.com",
    country: "United States",
    joined: "15-12-2025",
    role: "User",
    status: "Active",
    lastActive: "Jan 31, 2026",
    isBlocked: false,
    stats: {
      notesCount: 5,
      standardCoursesCount: 2,
      flexibleCoursesCount: 1,
      totalCourses: 3,
    },
  },
  {
    name: "Melinda Smith",
    email: "melinda@example.com",
    country: null,
    joined: "10-12-2025",
    role: "User",
    status: "Active",
    isBlocked: false,
    stats: {
      notesCount: 0,
      standardCoursesCount: 1,
      flexibleCoursesCount: 0,
      totalCourses: 1,
    },
  },
  {
    name: "Sarah Smith",
    email: "sarah.smith@email.com",
    country: "United Kingdom",
    joined: "8-12-2025",
    role: "User",
    status: "Active",
    isBlocked: false,
    stats: {
      notesCount: 8,
      standardCoursesCount: 4,
      flexibleCoursesCount: 2,
      totalCourses: 6,
    },
  },
  {
    name: "Alex Johnson",
    email: "alex.j@company.com",
    country: "Canada",
    joined: "5-12-2025",
    role: "User",
    status: "Active",
    isBlocked: false,
    stats: {
      notesCount: 3,
      standardCoursesCount: 2,
      flexibleCoursesCount: 3,
      totalCourses: 5,
    },
  },
  {
    name: "Emma Wilson",
    email: "emma.wilson@gmail.com",
    country: "Australia",
    joined: "1-12-2025",
    role: "User",
    status: "Active",
    isBlocked: false,
    stats: {
      notesCount: 15,
      standardCoursesCount: 5,
      flexibleCoursesCount: 1,
      totalCourses: 6,
    },
  },
  {
    name: "Michael Brown",
    email: "mbrown@outlook.com",
    country: "Germany",
    joined: "28-11-2025",
    role: "User",
    status: "Active",
    isBlocked: false,
    stats: {
      notesCount: 2,
      standardCoursesCount: 1,
      flexibleCoursesCount: 2,
      totalCourses: 3,
    },
  },
  {
    name: "Lisa Anderson",
    email: "lisa.a@yahoo.com",
    country: "Sweden",
    joined: "25-11-2025",
    role: "User",
    status: "Active",
    isBlocked: false,
    stats: {
      notesCount: 7,
      standardCoursesCount: 3,
      flexibleCoursesCount: 0,
      totalCourses: 3,
    },
  },
  {
    name: "David Lee",
    email: "david.lee@mail.com",
    country: "Japan",
    joined: "20-11-2025",
    role: "User",
    status: "Active",
    isBlocked: false,
    stats: {
      notesCount: 4,
      standardCoursesCount: 2,
      flexibleCoursesCount: 2,
      totalCourses: 4,
    },
  },
  {
    name: "Rachel Green",
    email: "rachel.g@example.com",
    country: "France",
    joined: "15-11-2025",
    role: "User",
    status: "Active",
    isBlocked: false,
    stats: {
      notesCount: 9,
      standardCoursesCount: 4,
      flexibleCoursesCount: 1,
      totalCourses: 5,
    },
  },
];

const MOCK_NOTES: UserNote[] = [
  { id: "1", title: "Introduction notes", content: "...", createdAt: "30-1-2026" },
  { id: "2", title: "Week 1 summary", content: "...", createdAt: "28-1-2026" },
  { id: "3", title: "Key concepts", content: "...", createdAt: "25-1-2026" },
];

const MOCK_COURSES: UserCourse[] = [
  { id: "1", title: "Introduction to React", type: "standard", progress: 100, enrolledAt: "15-12-2025" },
  { id: "2", title: "Advanced TypeScript", type: "standard", progress: 65, enrolledAt: "20-12-2025" },
  { id: "3", title: "Flexible: Design Systems", type: "flexible", progress: 40, enrolledAt: "5-1-2026" },
  { id: "4", title: "Node.js Backend", type: "standard", progress: 20, enrolledAt: "25-1-2026" },
  { id: "5", title: "Flexible: API Design", type: "flexible", progress: 0, enrolledAt: "30-1-2026" },
];

const TOTAL = 56;

function getMockUser(id: string): UserDetails | null {
  const num = parseInt(id, 10);
  if (Number.isNaN(num) || num < 1 || num > TOTAL) return null;
  const seed = SEED[(num - 1) % SEED.length];
  return { ...seed, id };
}

function getMockNotes(): UserNote[] {
  return MOCK_NOTES;
}

function getMockCourses(): UserCourse[] {
  return MOCK_COURSES;
}

interface UserDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailsPage({ params }: UserDetailsPageProps) {
  const { id } = await params;
  const user = getMockUser(id);

  if (!user) {
    notFound();
  }

  const notes = getMockNotes();
  const courses = getMockCourses();

  return <UserDetailsView user={user} notes={notes} courses={courses} />;
}
