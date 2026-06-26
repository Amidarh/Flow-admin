import { IUser } from "./user";

export type AnalyticsRange = "7d" | "30d" | "6m" | "1y" | "5y";
export type AnalyticsGranularity = "day" | "week" | "month";

export interface DashboardSummaryData {
    totalUsers: number;
    totalCourses: number;
    totalChapters: number;
    totalLessons: number;
    totalQuizzes: number;
    totalNotes: number;
    totalPages: number;
    totalNotifications: number;
    loggedInUsersToday: number;
    activeSubscriptions: number;
    flexibleCoursesCount: number;
    standardCoursesCount: number;
    latest5Users: IUser[];
    range: AnalyticsRange;
    granularity: AnalyticsGranularity;
    /** bucket is a date string: "YYYY-MM-DD" (day/week) or "YYYY-MM" (month). */
    signupsSeries: {
        bucket: string;
        count: number;
    }[];
    courseCreationSeries: {
        bucket: string;
        flexible: number;
        standard: number;
    }[];
    subscriptionsByPlan: {
        planName: string;
        count: number;
    }[];
}


export interface DashboardSummary {
    data: DashboardSummaryData;
    message: string;
    status: string;
}