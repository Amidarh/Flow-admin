import { IUser } from "./user";

export interface DashboardSummaryData {
    totalUsers: number;
    totalCourses: number;
    totalChapters: number;
    totalLessons: number;
    totalQuizzes: number;
    totalNotes: number;
    totalPages: number;
    totalNotifications: number;
    latest5Users: IUser[];
    userSignupsByMonth: {
        year: number;
        month: number;
        count: number;
    }[];
}


export interface DashboardSummary {
    data: DashboardSummaryData;
    message: string;
    status: string;
}