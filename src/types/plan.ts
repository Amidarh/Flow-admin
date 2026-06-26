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
  /** Derived total (flexible + standard); kept in sync, not a direct admin input. */
  numberOfCourses: number;
  allowsFlexibleCourses: boolean;
  numberOfFlexibleCourses: number;
  allowsStandardCourses: boolean;
  numberOfStandardCourses: number;
  supportsByok: boolean;
  isByokPlan: boolean;
  /** The plan auto-assigned to new signups. Exclusive: only one plan can be default. */
  isDefault?: boolean;
  /** The plan featured to users as "Recommended". Exclusive, independent of isDefault. */
  isRecommended?: boolean;
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

