export interface IPlan {
  id: string;
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: string;
  interval_count: number;
  trial_period_days: number;
  duration: number;
  flashCardLimitPerFlexibleCourse: number;
  quizLimitPerFlexibleCourse: number;
  contentLimitPerFlexibleCourse: number;
  isActive: boolean;
  numberOfCourses: number;
  isDefault?: boolean;
}

export interface PlanListPagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PlanListResponse {
  data: IPlan[];
  message?: string;
  status?: string;
}

export interface PlanDetailsResponse {
  message: string;
  data: IPlan;
}

