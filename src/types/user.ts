export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    createdAt?: Date;
    updatedAt?: Date;
    lastLogin?: Date;
    isDeleted?: boolean;
    deletedAt?: Date;
    otpCode?: string;
    verifyOtp?: string;
    verificationToken?: string;
    phoneNumber?: string;
    isBlocked?: boolean;
    blockedAt?: Date;
    isOnBoarded: boolean;
    isVerified: boolean;
    otpCodeExpiry?: Date;
    isTwoFactorAuthEnabled?: boolean;
    twoFactorAuthCode?: string;
    twoFactorAuthCodeExpiry?: Date;
    image?: string;
    id?: string;
    _id?: string;
    ageBracket?: string;
    language?: string;
    country?: string;
    skillLevel?: "beginner" | "intermediate" | "professional" | "expert";
    learningStyle?: "visual" | "concept-first" | "mixed";
    personalized: boolean;
    extraQuestions?: boolean;
    isCreatingCourse?: boolean;
}

export interface UserListPagination {
    total: number;
    page: number;
    limit: number;
    pages: number;
}

export interface UserListResponse {
    data: {
        users: IUser[];
        pagination: UserListPagination;
    };
    message: string;
    status?: string;
}

export interface UserCourse {
  _id: string;
  title: string;
  user: string;
  description: string;
  isCreated: boolean;
  isFinished: boolean;
  isDeleted: boolean;
  chapters: string[];
  status: number;
  pinned: boolean;
  tags: string[];
  difficulty: string; // e.g. "beginner"
  coverImage: string | null;
  courseType: "flexible" | "standard";
  category?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  streak?: string;
  hasBeenOpendToday?: boolean;
}

export interface UserDetailsData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isBlocked: boolean;
  role: string;
  isVerified: boolean;
  isOnBoarded: boolean;
  isDeleted: boolean;
  isTwoFactorAuthEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastLogin: string;
  authType: string;
  personalized: boolean;
  image: string;
  learningStyle: string;
  language: string;
  extraQuestions: boolean;
  isCreatingCourse: boolean;
  id: string;
  coursesCount: number;
  flexibleCoursesCount: number;
  standardCoursesCount: number;
  courses: UserCourse[];
}

export interface UserDetailsResponse {
  message: string;
  data: UserDetailsData;
}