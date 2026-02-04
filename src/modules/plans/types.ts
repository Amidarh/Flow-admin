export interface PlanListItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: string;
  interval_count: number;
  numberOfCourses: number;
  isActive: boolean;
  isDefault?: boolean;
}

